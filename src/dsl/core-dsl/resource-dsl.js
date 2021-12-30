import {
  OptionalElt,
  RepeatElt,
  SequenceElt,
  TerminalElt,
  GroupElt
} from './resource-elt.js';

import { BASE_ICONS_MAP } from './base-icons-map';
import { ResourceElt } from './resource-base.js';
const STYLE = 'style';


/**
 * Create a fanIn dsl tree.
 * @param {array|object} elts - The elements fanning in.
 * @param {object} fanInTo - The fanInTo element.
 * @return {object} flow dsl.
 */
export function fanIn(elts, fanInTo) {
  return sequence(elts, fanInTo)._tagName_('fanIn')._set_(STYLE, BASE_ICONS_MAP.get('fanIn'))._nostart_(true);
}

// Extend ResourceElt prototype
ResourceElt.prototype.fanIn = function (elts, fanInTo) {
  let elt = fanIn(elts, fanInTo);
  this.to(elt);
  return elt;

};

/**
 * Create a fanOut dsl tree.
 * @param {object} fanOutFrom - The fanOutFrom element.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function fanOut(fanOutFrom, elts) {
  return sequence(fanOutFrom, elts)._tagName_('fanOut')._set_(STYLE, BASE_ICONS_MAP.get('fanOut'))._noend_(true);
}

// Extend ResourceElt prototype
ResourceElt.prototype.fanOut = function (fanOutFrom, elts) {
  let elt = fanOut(fanOutFrom, elts);
  this.to(elt);
  return elt;

};

/**
 * Create a fanInOut dsl tree.
 * @param {array|object} fanInElts - The fanInElts element.
 * @param {object} fanInTo - The fanInTo element.
 * @param {array|object} fanOutElts - The fanOutElts elements.
 * @return {object} flow dsl.
 */
export function fanIn_fanOut(fanInElts, fanInTo, fanOutElts) {
  return sequence(fanInElts, fanInTo, fanOutElts)._tagName_('fanIn_fanOut')._set_(STYLE, BASE_ICONS_MAP.get('fanIn_fanOut'));
}

/**
 * Create a fanInOut dsl tree.
 * @param {object} fanOutFrom - The fanOutFrom element.
 * @param {array|object} fanOutElts - The fanOutElts elements.
 * @param {object} fanInTo - The fanInTo element.
 * @return {object} flow dsl.
 */
export function fanOut_fanIn(fanOutFrom, fanOutElts, fanInTo) {
  return sequence(fanOutFrom, fanOutElts, fanInTo)._tagName_('fanOut_fanIn')._set_(STYLE, BASE_ICONS_MAP.get('fanOut_fanIn'));
}

/**
 * Create a choice dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function choice(fanOutFrom, fanOutElts, fanInTo) {
  return fanOut_fanIn(fanOutFrom, fanOutElts, fanInTo)._tagName_('choice')._set_(STYLE, BASE_ICONS_MAP.get('choice'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.choice = function (fanOutFrom, fanOutElts, fanInTo) {
  let elt = choice(fanOutFrom, fanOutElts, fanInTo);
  this.to(elt);
  return elt;

};

/**
 * Create a merge dsl tree.
 * @param {array|object} elts - The elements fanning in.
 * @param {object} fanInTo - The fanInTo element.
 * @return {object} flow dsl.
 */
export function merge(elts, fanInTo) {
  return fanIn(elts, fanInTo)._tagName_('fanIn')._set_(STYLE, BASE_ICONS_MAP.get('merge'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.merge = function (elts, fanInTo) {
  let elt = merge(elts, fanInTo);
  this.to(elt);
  return elt;

};

/**
 * Create a branch dsl tree.
 * @param {object} fanOutFrom - The fanOutFrom element.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function branch(fanOutFrom, elts) {
  return fanOut(fanOutFrom, elts)._tagName_('branch')._set_(STYLE, BASE_ICONS_MAP.get('branch'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.branch = function (fanOutFrom, elts) {
  let elt = branch(fanOutFrom, elts);
  this.to(elt);
  return elt;

};

/**
 * Create a split dsl tree.
 * @param {object} fanOutFrom - The fanOutFrom element.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function split(fanOutFrom, elts) {
  return fanOut(fanOutFrom, elts)._tagName_('split')._set_(STYLE, BASE_ICONS_MAP.get('split'));
}

/**
 * Create an optional dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function optional(elt) {
  return new OptionalElt(elt)._set_(STYLE, BASE_ICONS_MAP.get('optional'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.optional = function (...elts) {
  let elt = optional(...elts);
  this.to(elt);
  return elt;

};

/**
 * Create a repeat dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function repeat(elt) {
  return new RepeatElt(elt)._set_(STYLE, BASE_ICONS_MAP.get('repeat'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.repeat = function (...elts) {
  let elt = repeat(...elts);
  this.to(elt);
  return elt;

};

/**
 * Create a oneOrMore dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function oneOrMore(elt) {
  return repeat(elt)._set_(STYLE, BASE_ICONS_MAP.get('oneOrMore'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.oneOrMore = function (...elts) {
  let elt = oneOrMore(...elts);
  this.to(elt);
  return elt;

};

/**
 * Create a sequence dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function sequence(...elts) {
  return new SequenceElt([...elts])._set_(STYLE, BASE_ICONS_MAP.get('sequence'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.sequence = function (...elts) {
  let elt = sequence(...elts);
  this.to(elt);
  return elt;

};

/**
 * Create a terminal dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function terminal(elt) {
  return new TerminalElt(elt)._set_(STYLE, BASE_ICONS_MAP.get('resource'));
}

/**
 * Create a node dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function node(elt) {
  return terminal(elt);
}

/**
 * Create a from dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function from(elt) {
  return terminal(elt);
}

/**
 * Create a zeroOrMore dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function zeroOrMore(elt) {
  return optional(repeat(elt))._set_(STYLE, BASE_ICONS_MAP.get('zeroOrMore'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.zeroOrMore = function (...elts) {
  let elt = zeroOrMore(...elts);
  this.to(elt);
  return elt;

};

/**
 * Create a resource dsl tree.
 * @param {object} elt - The element.
 * @return {object} resource dsl.
 */
export function resource(...elt) {
  if (Array.isArray(elt) && elt.length > 1) {
    return group(...elt);
  } else {
    return terminal(elt[0])._tagName_('resource')._set_(STYLE, BASE_ICONS_MAP.get('resource'));
  }

}

/**
 * Create a group dsl tree.
 * @param {object} elts - The elements.
 * @return {object} group dsl.
 */
export function group(...elts) {
  return new GroupElt([...elts])._set_(STYLE, BASE_ICONS_MAP.get('group'));
}

// Extend ResourceElt prototype
ResourceElt.prototype.group = function (...elts) {
  let elt = group(...elts);
  this.to(elt);
  return elt;

};

/**
 * Create a block dsl tree.
 * @param {object} elts - The elements.
 * @return {object} group dsl.
 */
export function block(...elts) {
  return group(...elts)._tagName_('block')._set_(STYLE, BASE_ICONS_MAP.get('group'));
}

/**
 * Tag as a source.
 * @param {object} elts - The elements to tags.
 * @return {object} tagged elements.
 */
export function source(...elts) {
  if (Array.isArray(elts)) {
    elts.forEach((elt) => {
      this.toElt(elt).tag('source');
    }, this);

  } else {
    this.toElt(elts).tag('source');
  }
  return elts;
}

// Extend ResourceElt prototype
ResourceElt.prototype.source = function (...elts) {
  let elt = source(...elts);
  this.to(elt);
  return elt;

};

/**
 * Tag as a source.
 * @param {object} elts - The elements to tags.
 * @return {object} tageed elements.
 */
export function sink(...elts) {
  if (Array.isArray(elts)) {
    elts.forEach((elt) => {
      this.toElt(elt).tag('sink');
    }, this);

  } else {
    this.toElt(elts).tag('sink');
  }
  return elts;
}

// Extend ResourceElt prototype
ResourceElt.prototype.sink = function (...elts) {
  let elt = sink(...elts);
  this.to(elt);
  return elt;

};
// pipeline -> stages -> jobs -> tasks -> steps 