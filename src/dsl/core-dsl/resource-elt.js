import {
  CompositeResourceElt,
  ResourceElt
} from './resource-base.js';

export const WORKFLOW_KIND = 'workflow';
export const WORKFLOW_PROVIDER = 'default';

const GROUP = 'group';
/**
 * Class GroupElt.
 * @extends CompositeResourceElt
 */
export class GroupElt extends CompositeResourceElt {
  /**
   * Create a SequenceElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, GROUP, GROUP, WORKFLOW_PROVIDER);
  }

}

const OPTIONAL = 'optional';
/**
 * Class OptionalElt.
 * @extends CompositeResourceElt
 */
export class OptionalElt extends CompositeResourceElt {
  /**
   * Create a OptionalElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, OPTIONAL, OPTIONAL, WORKFLOW_PROVIDER);
  }

  _add_(elt) {
    // only one elt can be added
    if (this.elts.length > 0) {
      this.elts.splice(0, this.elts.length);
    }
    this.elts.push(this.resolveElt(elt));
    return this;
  }
}

const REPEAT = 'repeat';
/**
 * Class RepeatElt.
 * @extends CompositeResourceElt
 */
export class RepeatElt extends CompositeResourceElt {
  /**
   * Create a RepeatElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, REPEAT, REPEAT, WORKFLOW_PROVIDER);
  }

  _add_(elt) {
    // only one elt can be added
    if (this.elts.length > 0) {
      this.elts.splice(0, this.elts.length);
    }
    this.elts.push(this.resolveElt(elt));
    return this;
  }
}

const SEQUENCE = 'sequence';
/**
 * Class SequenceElt.
 * @extends CompositeResourceElt
 */
export class SequenceElt extends CompositeResourceElt {
  /**
   * Create a SequenceElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, SEQUENCE, SEQUENCE, WORKFLOW_PROVIDER);
  }

}

const RESOURCE = 'resource';
/**
 * Class TerminalElt.
 */
export class TerminalElt extends ResourceElt {

  /**
   * Create a TerminalElt.
   * @param {object} elt - The elt value.
   */
  constructor(elt) {
    super(elt, RESOURCE, RESOURCE, WORKFLOW_PROVIDER);
  }

}
