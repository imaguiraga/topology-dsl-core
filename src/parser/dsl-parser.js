const ts = require("typescript/lib/typescriptServices.js");
require("systemjs/dist/system.js");
require("systemjs/dist/extras/global.js");
require("systemjs/dist/extras/amd.js");
require("systemjs/dist/extras/transform.js");
require("systemjs/dist/extras/dynamic-import-maps.js");
require("systemjs/dist/extras/named-exports.js");
require("systemjs/dist/extras/named-register.js");
//*/
//var esprima = require('esprima');
//var escodegen = require("escodegen");
//import * as escodegen from 'escodegen';
import * as esprima from 'esprima';
import * as model from "../tree";

const {
  jsonToDslObject
} = model;

const DEBUG = true;

function debug(msg) {
  if(DEBUG) {
    console.log(msg);
  }
}

const System = window.System;
// Re-export topology-dsl-core
System.register("topology-dsl-core",[], function (exports_1) {
  "use strict";
  exports_1(model);
  return {
    setters: [],
    execute: function () {
    }
  };
});
/*
System.register("topology-dsl-core",[], function (exports_1,context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function exportStar_1(m) {
      var exports = {};
      for (var n in m) {
          if (n !== "default") exports[n] = m[n];
      }
      exports_1(exports);
  }

  exportStar_1(model);
  return {
    setters: [
        function (moment_1_1) {
            exportStar_1(model);
        }
    ],
    execute: function () {
    }
  };
});
// */

export function parseDsl(input,dslModule){

  // Get module ids
  let MODULE_IDS = Object.keys(dslModule); 
  // Parse text
  // eslint-disable-next-line
  let factoryFn = new Function("dslModule","return new Map();");
  let variableIds = [];
  let moduleIds = [];
 
  let callbackFn = function (elt){
    // Extract Identifiers
    if(elt.type === 'VariableDeclaration'){
      let decl = elt.declarations[0];
      let name = decl.id.name;
      let value = name;

      if(decl.init.type === "ArrowFunctionExpression" || decl.init.type === "FunctionExpression") {
        value = name+"()";
      } 
      variableIds.push(`result.set('${name}',${value});`);

    } else if (elt.type === 'CallExpression'){
      let name = elt.callee.name;
      moduleIds.push(name);
    }
  };

  try {
    let tree = esprima.parseScript(input,{},callbackFn);

    // Extract call ids
    // Keep only ids in the default  
    // Remove duplicates
    moduleIds = [...new Set(moduleIds)].filter((elt) => {
      return (MODULE_IDS.indexOf(elt) >= 0);
    });

    let text =
`const {
${moduleIds.join(",\n")}
} = dslModule;

${input}

let result = new Map();
${variableIds.join("\n")}
return result;
`;
  debug(text);
    // eslint-disable-next-line
    factoryFn = new Function("dslModule",text);

  } catch(e) {
    console.error(e.name + ': ' + e.message);
  }

  return Promise.resolve(factoryFn(dslModule));

}

const IMPORT_ID = "IMPORT_ID";
export function parseDslModule(source,dslModule){
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  // https://jsfiddle.net/k78t436y/
  // https://unpkg.com/typescript@latest/lib/typescriptServices.js
  // https://github.com/systemjs/systemjs/blob/master/docs/system-register.md transpileModule
  // Transpile code to Module
  let result = ts.transpileModule(
    source, 
    { 
      compilerOptions: { 
        module: ts.ModuleKind.AMD,
        moduleResolution: ts.ModuleResolutionKind.Node,
        esModuleInterop: true 
      }
    }
  );

  debug(result.outputText);
  // Dynamically register module
  try {
    (0, eval)(result.outputText);
    // Invalidate import cache
    if(System.has(IMPORT_ID)){
      System.delete(IMPORT_ID);
    }
    // Re-register the module
    System.registerRegistry[IMPORT_ID] = System.getRegister();
    debug(System.getRegister());
  } catch (err) {
    console.log(err);
  }

  // Convert exports to map
  return System.import(IMPORT_ID).then((modules) => {
    let variables = new Map();
    for ( let key in modules) {
      if ( key !== 'default' && !key.startsWith('_')) {
        variables.set(key,modules[key]);
      }
    }
    return variables;
  });

}

export function resolveImports(input){
  const result = new Promise( (resolveFn,rejectFn) => {

    const toload = new Map(); // Map of external imports to load with fetch
    // AST callback function to extract imports
    let callbackFn = function (elt){
      // Extract Identifiers
      if(elt.type === "CallExpression" && elt.callee.name === "load") {
        // Extract parameters from function name "load" 
        // Add files to load async
        let key = elt.arguments[0].value;
        toload.set(key,null);
      }
    };

    try {
      let tree = esprima.parseScript(input,{},callbackFn);
    } catch(e) {
      console.error(e.name + ': ' + e.message);
      rejectFn(e);
    }

    // Load files async
    let loadpromises = [];
    toload.forEach((value, key, map) => {
      loadpromises.push(
        fetch(key)
          .then(response => response.json())
          .then( function(data) { 
            console.log("loaded -> "+key);
            map.set(key,jsonToDslObject(data));
          })
      );
    });
    // Wait on all promises to load
    Promise.allSettled(loadpromises).then((iterable) => {
      console.log("loaded imports -> "+iterable);
      // Delegate to main promise (map of resolved imports)
      resolveFn(toload);
    })
    .catch((error) => {
      console.error('Error:', error);
      rejectFn(error);
    });

  });

  return result;

}