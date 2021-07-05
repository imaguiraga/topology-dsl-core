import {
  CompositeResourceElt,
  ResourceElt
} from './resource-base.js';

export const WORKFLOW_KIND = 'workflow';
export const WORKFLOW_PROVIDER = 'default';

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
    super(elts, 'group', 'group', WORKFLOW_PROVIDER);
  }

}

/**
 * Class FanInFanOutElt.
 * @extends CompositeResourceElt
 */
export class FanOutFanInElt extends CompositeResourceElt {
  /**
   * Create a FanOutFanInElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, 'fanOut_fanIn', 'fanOut_fanIn', WORKFLOW_PROVIDER);
  }

}

/**
 * Class FanInElt.
 * @extends CompositeResourceElt
 */
export class FanInElt extends CompositeResourceElt {
  /**
   * Create a FanInElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, 'fanIn', 'fanIn', WORKFLOW_PROVIDER);
  }

}

/**
 * Class FanOutElt.
 * @extends CompositeResourceElt
 */
export class FanOutElt extends CompositeResourceElt {
  /**
   * Create a FanOutElt.
   * @param {object} elts - The elts value.
   */
  constructor(elts) {
    super(elts, 'fanOut', 'fanOut', WORKFLOW_PROVIDER);
  }

}

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
    super(elts, 'optional', 'optional', WORKFLOW_PROVIDER);
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
    super(elts, 'repeat', 'repeat', WORKFLOW_PROVIDER);
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
    super(elts, 'sequence', 'sequence', WORKFLOW_PROVIDER);
  }

}

/**
 * Class TerminalElt.
 */
export class TerminalElt extends ResourceElt {

  /**
   * Create a TerminalElt.
   * @param {object} elt - The elt value.
   */
  constructor(elt) {
    super(elt, 'resource', 'resource', WORKFLOW_PROVIDER);
  }

}
