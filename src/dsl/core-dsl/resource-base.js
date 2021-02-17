/**
 * idGenFn function.
 */
function* idGenFn(prefix, index) {
  while (index >= 0) {
    let reset = yield index++;
    if (reset) {
      index = 0;
    }
  }
}

export const NODEIDGENFN = idGenFn('node.', 0);

/**
 * Class TerminalResource.
 */
export class TerminalResource {
  /**
   * Create a TerminalResource.
   * @param {object} elts - The elts value.
   * @param {string} resourceType - The resourceType value.
   * @param {string} tagName - The tagName value.
   * @param {string} provider - The resource provider value.
   */
  constructor(elts, resourceType, tagName, provider) {
    // Nex Id Generator
    this.idGenIt = NODEIDGENFN;
    this.title = 'title';

    //get new id
    this.resourceType = resourceType || 'terminal';
    this.subType = this.resourceType;// use for extending the resource
    this.tagName = tagName || 'resource';
    this.id = this.subType + '.' + this.idGenIt.next().value;
    this.provider = provider;
    this.compound = false;

    // Layout direction
    this.direction = null;

    this._start = null;
    this._finish = null;

    this.data = {};
    this.link = null;
    this.name = this.id;
    this.title = this.id;

    this.elts = [];
    // Support for dataflow with input and output bindings
    this.inputElts = [];
    this.outputElts = [];

    let r = this.resolveElt(elts);
    if (r !== null) {
      // only one elt can be added
      this.elts.push(r);
      this.title = r.toString();
    }

  }

  _up_() {
    this.direction = 'UP';
    return this;
  }

  _down_() {
    this.direction = 'DOWN';
    return this;
  }

  _left_() {
    this.direction = 'LEFT';
    return this;
  }

  _right_() {
    this.direction = 'RIGHT';
    return this;
  }

  /**
   * Performs preorder traversal.
   * @param {(value: T, index: number, array: T[], thisArg: any) => void} callbackFn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param {Object} thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  preorder(callbackFn, i = -1, arr = [], thisArg = undefined) {
    let self = this;
    callbackFn(self, i, arr, thisArg);
    self.forEach((v, n, a) => {
      if (v.preorder) {
        v.preorder(callbackFn, n, a, thisArg);
      }
    }, thisArg);

  }

  /**
  * Performs postorder traversal.
  * @param {(value: T, index: number, array: T[], thisArg: any)) => void} callbackFn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
  * @param {Object} thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
  */
  postorder(callbackFn, i = -1, arr = [], thisArg = undefined) {
    let self = this;
    self.forEach((v, n, a) => {
      if (v.postorder) {
        v.postorder(callbackFn, n, a, thisArg);
      }
    }, thisArg);
    callbackFn(self, i, arr, thisArg);
  }

  /**
   * Performs the specified action for each element in an array.
   * @param {(value: T, index: number, array: T[]) => void} callbackFn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param {Object} thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  forEach(callbackFn, thisArg) {
    (this.elts || []).forEach(callbackFn, thisArg);
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param {(value: T, index: number, array: T[]) => U} callbackFn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param {Object} thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   * @returns {U[]}
   */
  map(callbackFn, thisArg) {
    return (this.elts || []).map(callbackFn, thisArg);
  }

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param {(value: T, index: number, array: T[]) => unknown} predicateFn A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param {Object} thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   * @returns {T[]}
   */
  filter(predicateFn, thisArg) {
    // Filter children
    return (this.elts || []).filter(predicateFn, thisArg);

  }

  get start() {
    if (this._start == null) {
      this._start = {
        resourceType: this.resourceType,
        subType: this.subType,
        tagName: this.tagName,
        id: this.id + '.start',
        provider: this.provider,
        compound: this.compound,
        isTerminal: () => true,
        elts: []
      };
    }

    return this._start;
  }

  set start(val) {
    this._start = val;
  }

  get finish() {
    if (this._finish == null) {
      this._finish = {
        resourceType: this.resourceType,
        subType: this.subType,
        tagName: this.tagName,
        id: this.id + '.finish',
        provider: this.provider,
        compound: this.compound,
        isTerminal: () => true,
        elts: []
      };
    }
    return this._finish;

  }

  set finish(val) {
    this._finish = val;
  }

  isTerminal() {
    return true;
  }

  isGroup() {
    return (this.resourceType === 'group');
  }

  resolveElt(elt) {
    // Only accept primitive types as Terminal Element 
    let result = null;
    if (elt !== undefined) {
      try {
        if (typeof elt === 'function') {
          result = elt.call();
        }

        if (typeof result === 'object') {
          // Allow complex element as terminal
          result = elt;

        } else {
          // primitive
          result = elt.toString();
        }

      } catch (err) {
        console.error(err.message + ' - ' + err);
      }
    }
    return result;
  }

  toElt(elt) {
    if (typeof elt === 'function') {
      return elt.call();
    } else if (typeof elt !== 'object') {
      // very likely a primitive type
      return new TerminalResource(elt, 'terminal', 'resource', this.provider);
    }
    // default to object
    return elt;
  }

  foundElt(elt) {
    return this.id === elt.id;
  }

  accept(visitor, filterFn) {
    return visitor.visit(this, filterFn);
  }

  _add_(elt) {
    let r = this.resolveElt(elt);
    if (r !== null) {
      // only one elt can be added
      if (this.elts.length > 0) {
        this.elts.splice(0, this.elts.length);
      }
      this.elts.push(r);
    }

    return this;
  }

  _require_(elt) {
    let e = this.toElt(elt);
    // Add self to group elt
    if (e.isGroup()) {
      e._add_(this);
    } else {
      this._add_(elt);
    }
    return this;
  }

  _subType_(value) {
    if (value) {
      this.subType = value;
      // Replace prefix with subType
      let tmp = this.id.split('\.');
      tmp[0] = this.subType;
      this.id = tmp.join('.');
    }
    return this;
  }

  _title_(value) {
    this.title = value;
    return this;
  }

  _name_(value) {
    this.name = value;
    return this;
  }

  _id_(value) {
    this.id = value;
    return this;
  }

  _set_(key, value) {
    this.data[key] = value;
    return this;
  }

  _get_(key) {
    return this.data[key];
  }

  _link_(value) {
    this.link = value;
    return this;
  }

  // Add a reference 
  _ref_(elt) {
    return this._add_(elt);
  }

  // Inbound bindings
  _in_(...elts) {
    if (Array.isArray(elts)) {
      elts.forEach((e) => {
        let r = this.toElt(e);
        if (r != null) {
          this.inputElts.push(r);
        }
      }, this);

    } else {
      let r = this.toElt(elts);
      if (r != null) {
        this.inputElts.push(r);
      }
    }

    return this;
  }

  // Outbound bindings
  _out_(...elts) {
    if (Array.isArray(elts)) {
      elts.forEach((e) => {
        let r = this.toElt(e);
        if (r != null) {
          this.outputElts.push(r);
        }
      }, this);

    } else {
      let r = this.toElt(elts);
      if (r != null) {
        this.outputElts.push(r);
      }
    }

    return this;
  }

  _from_(...elts) {
    return this._in_(...elts);
  }

  _to_(...elts) {
    return this._out_(...elts);
  }
}


/**
 * Class CompositeResource.
 * @extends TerminalResource
 */
export class CompositeResource extends TerminalResource {
  /**
   * Create a CompositeResource.
   * @param {object} elts - The elts value.
   * @param {string} resourceType - The resourceType value.
   * @param {string} tagName - The tagName value.
   * @param {string} provider - The resource provider value.
   */
  constructor(elts, resourceType, tagName, provider) {
    super(elts, resourceType, tagName, provider);
    this.elts = [];
    this.title = null;
    this._start = null;
    this._finish = null;
    //this.start = new TerminalResource('start', 'terminal', 'mark', provider);
    //this.finish = new TerminalResource('finish', 'terminal', 'mark', provider);
    this.compound = true;

    if (Array.isArray(elts)) {
      this.elts = elts.map(
        (elt) => { return this.resolveElt(elt); }, this
      ).filter(e => { return e != null; }, this);

    } else {
      let r = this.resolveElt(elts);
      if (r != null) {
        this.elts.push(r);
      }
    }

    if (this.title === null) {
      this.title = '' + this.id;
    }
  }

  isTerminal() {
    return false;
  }

  resolveElt(elt) {
    return this.toElt(elt);
  }

  foundElt(elt) {
    return this.elts.filter(e => e.id === elt.id).length > 0;
  }

  _add_(...elts) {
    if (Array.isArray(elts)) {
      elts.forEach((e) => {
        let r = this.resolveElt(e);
        if (r != null) {
          this.elts.push(r);
        }
      }, this);

    } else {
      let r = this.resolveElt(elts);
      if (r != null) {
        this.elts.push(r);
      }
    }

    return this;
  }

  // Add a reference if it doesn't exist
  _ref_(...elts) {
    if (Array.isArray(elts)) {
      elts.forEach((e) => {
        if (!this.foundElt(e)) {
          this._add_(e);
        }
      }, this);

    } else if (!this.foundElt(elts)) {
      this._add_(elts);
    }

    return this;
  }

}
