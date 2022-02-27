import {
  CompositeElt,
  BaseElt
} from './base-elt.js';

export const WORKFLOW_KIND = 'workflow';
export const WORKFLOW_PROVIDER = 'default';

const GROUP = 'group';
/**
 * Class GroupElt.
 * @extends CompositeElt
 */
export class GroupElt extends CompositeElt {
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
 * @extends CompositeElt
 */
export class OptionalElt extends CompositeElt {
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
 * @extends CompositeElt
 */
export class RepeatElt extends CompositeElt {
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
 * @extends CompositeElt
 */
export class SequenceElt extends CompositeElt {
  /**
   * Create a SequenceElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, SEQUENCE, SEQUENCE, WORKFLOW_PROVIDER);
  }

}

const TERMINAL = 'terminal';
/**
 * Class TerminalElt.
 */
export class TerminalElt extends BaseElt {

  /**
   * Create a TerminalElt.
   * @param {object} elt - The elt value.
   */
  constructor(elt, config) {
    super(elt, TERMINAL, TERMINAL, WORKFLOW_PROVIDER, config);
  }

}

