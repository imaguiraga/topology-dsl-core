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
 * Class ResourceElt.
 */
export class ResourceElt {
  /**
   * Create a ResourceElt.
   * @param {object} elts - The elts value.
   * @param {string} kind - The kind value.
   * @param {string} tagName - The tagName value.
   * @param {string} provider - The resource provider value.
   */
  constructor(elts, kind, tagName, provider) {
    // Next Id Generator
    this.idGenIt = NODEIDGENFN;
    this.title = 'title';

    // Add start finish nodes
    this.nostart = false;
    this.noend = false;

    //get new id
    this.kind = kind || 'resource';
    this.tagName = tagName || 'resource';
    this.id = this.tagName + '.' + this.idGenIt.next().value;
    this.provider = provider;
    this.compound = false;
    this.tags = [];

    // Layout direction
    this.direction = null;

    this._start = null;
    this._finish = null;

    this.data = {};
    this.name = this.id;
    this.title = this.id;

    this.elts = [];
    this.eltsFrom = [];
    this.eltsTo = [];

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

  get start() {
    if (this._start == null) {
      this._start = {
        kind: this.kind,
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
        kind: this.kind,
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
    return (this.kind === 'group');
  }

  initElts(elts) {
    let result = [];
    if (elts === undefined || elts === null) {
      return result;
    }

    if (Array.isArray(elts)) {
      result = elts.map(
        (elt) => { return this.resolveElt(elt); }, this
      ).filter(e => { return e != null; }, this);

    } else {
      let r = this.resolveElt(elts);
      if (r != null) {
        result.push(r);
      }
    }
    return result;
  }

  resolveElt(elt) {
    // Only accept primitive types as Terminal Element 
    let result = null;
    if (elt !== undefined) {
      try {
        if (typeof elt === 'function') {
          result = elt.call();
        }

        if (typeof result === 'object' && elt instanceof ResourceElt) {
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
    let result = null;
    if (elt !== undefined && elt !== null) {
      result = elt;
      if (result instanceof ResourceElt) {
        return result;
      } else {
        try {
          if (typeof elt === 'function') {
            result = elt.call();
          }

          if (result instanceof ResourceElt) {
            return result;
          } else if (typeof result === 'object') {
            // Allow complex element as terminal
            if (Array.isArray(elt)) {
              result = elt.map(
                (el) => { return this.toElt(el); }, this
              ).filter((el) => { return el != null; }, this);

            } else {
              result = this.toElt(elt);
            }

          } else {
            // very likely a primitive type
            result = new ResourceElt(elt, 'resource', 'resource', this.provider);
          }

        } catch (err) {
          console.error(err.message + ' - ' + err);
        }
      }
    }
    // default to object
    return result;
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

  _tagName_(value) {
    if (value) {
      this.tagName = value;
      // Replace prefix with tagName
      let tmp = this.id.split('\.');
      tmp[0] = this.tagName;
      this.id = tmp.join('.');
      // Add to tags set
      this.tag(value);
      
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

  // Inbound bindings
  _in_(...elts) {
    return this.from(...elts);
  }

  // Outbound bindings
  _out_(...elts) {
    return this.to(...elts);
  }

  to(...elts) {
    if (Array.isArray(elts)) {
      elts.forEach((elt) => {
        this.eltsTo.push(this.toElt(elt));
      }, this);

    } else {
      this.eltsTo.push(this.toElt(elts));
    }
    return this;
  }

  from(...elts) {
    if (Array.isArray(elts)) {
      elts.forEach((elt) => {
        this.eltsFrom.push(this.toElt(elt));
      }, this);

    } else {
      this.eltsFrom.push(this.toElt(elts));
    }
    return this;
  }
 
  tag(...values) {
    // Add only to tags if it doesn't exist
    if (Array.isArray(values)) {
      values.forEach((v) => {
        if (!this.tags.includes(v)) {
          this.tags.push(v);
        }
      }, this);

    } else {
      if (!this.tags.includes(values)) {
        this.tags.push(values);
      }
    }

    return this;
  }

  _noend_(value) {
    this.noend = value;
    return this;
  }

  _nostart_(value) {
    this.nostart = value;
    return this;
  }

}


/**
 * Class CompositeResourceElt.
 * @extends ResourceElt
 */
export class CompositeResourceElt extends ResourceElt {
  /**
   * Create a CompositeResourceElt.
   * @param {object} elts - The elts value.
   * @param {string} kind - The kind value.
   * @param {string} tagName - The tagName value.
   * @param {string} provider - The resource provider value.
   */
  constructor(elts, kind, tagName, provider) {
    super(elts, kind, tagName, provider);
    this.elts = [];
    this.title = null;
    this._start = null;
    this._finish = null;
    //this.start = new ResourceElt('start', 'resource', 'mark', provider);
    //this.finish = new ResourceElt('finish', 'resource', 'mark', provider);
    this.compound = true;

    this.elts = this.initElts(elts);//this.resolveElt(elts);//

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
    return this.elts.filter(e => e.id === elt.id, this).length > 0;
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

}
