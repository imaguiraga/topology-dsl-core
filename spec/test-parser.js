//import { parseDsl } from '../dist';
fetch('./sample.js')
.then(response => response.text())
.then( function(data) { 
  console.log(data);
  parseDsl(data,null).then((v) => {
    console.log(v);
  });
});