import {
  FanOutFanInElt,
  FanInElt,
  FanOutElt,
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
 * Create a fanOut_fanIn dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function fanOut_fanIn(...elts) {
  return new FanOutFanInElt([...elts])._set_(STYLE, BASE_ICONS_MAP.get('fanOut_fanIn'));
}

export function choice(...elts) {
  return fanOut_fanIn(...elts)._tagName_('choice')._set_(STYLE, BASE_ICONS_MAP.get('choice'));
}

/**
 * Create a fanIn dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function fanIn(...elts) {
  return new FanInElt([...elts])._set_(STYLE, BASE_ICONS_MAP.get('fanIn'));
}

export function merge(...elts) {
  return fanIn(...elts)._tagName_('fanIn')._set_(STYLE, BASE_ICONS_MAP.get('merge'));
}

/**
 * Create a fanOut dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function fanOut(...elts) {
  return new FanOutElt([...elts])._set_(STYLE, BASE_ICONS_MAP.get('fanOut'));
}

export function branch(...elts) {
  return fanOut(...elts)._tagName_('branch')._set_(STYLE, BASE_ICONS_MAP.get('branch'));
}

export function split(...elts) {
  return fanOut(...elts)._tagName_('split')._set_(STYLE, BASE_ICONS_MAP.get('split'));
}

export function tree(...elts) {
  return fanOut(...elts)._tagName_('tree')._set_(STYLE, BASE_ICONS_MAP.get('tree'));
}

export function link(...elts) {
  return fanOut(...elts)._tagName_('link')._set_(STYLE, BASE_ICONS_MAP.get('link'));
}

export function use(...elts) {
  return fanOut(...elts)._tagName_('use')._set_(STYLE, BASE_ICONS_MAP.get('use'));
}

export function parallel(...elts) {
  return fanOut(...elts)._tagName_('parallel')._set_(STYLE, BASE_ICONS_MAP.get('parallel'));
}

/**
 * Create an optional dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function optional(elt) {
  return new OptionalElt(elt)._set_(STYLE, BASE_ICONS_MAP.get('optional'));
}

/**
 * Create a repeat dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function repeat(elt) {
  return new RepeatElt(elt)._set_(STYLE, BASE_ICONS_MAP.get('repeat'));
}

export function oneOrMore(elt) {
  return repeat(elt)._set_(STYLE, BASE_ICONS_MAP.get('oneOrMore'));
}

/**
 * Create a sequence dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function sequence(...elts) {
  return new SequenceElt([...elts])._set_(STYLE, BASE_ICONS_MAP.get('sequence'));
}

export function process(...elts) {
  return sequence(...elts)._tagName_('process')._set_(STYLE, BASE_ICONS_MAP.get('process'));
}

export function activity(...elts) {
  return sequence(...elts)._tagName_('activity')._set_(STYLE, BASE_ICONS_MAP.get('activity'));
}

/**
 * Create a terminal dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function terminal(elt) {
  return new TerminalElt(elt)._set_(STYLE, BASE_ICONS_MAP.get('resource'));
}

export function node(elt) {
  return terminal(elt);
}

export function from(elt) {
  return terminal(elt);
}

export function transition(elt) {
  return terminal(elt)._tagName_('transition')._set_(STYLE, BASE_ICONS_MAP.get('transition'));
}

/**
 * Create a state dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function state(elt) {
  return terminal(elt)._tagName_('state')._set_(STYLE, BASE_ICONS_MAP.get('state'));
}

/**
 * Create a zeroOrMore dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function zeroOrMore(elt) {
  return optional(repeat(elt))._set_(STYLE, BASE_ICONS_MAP.get('zeroOrMore'));
}

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

/**
 * Create a block dsl tree.
 * @param {object} elts - The elements.
 * @return {object} group dsl.
 */
export function block(...elts) {
  return group(...elts)._tagName_('block')._set_(STYLE, BASE_ICONS_MAP.get('group'));
}

// pipeline -> stages -> jobs -> tasks -> steps 

// Extend ResourceElt prototype
ResourceElt.prototype.choice = function (...elts) {
  let elt = choice(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.group = function (...elts) {
  let elt = group(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.sequence = function (...elts) {
  let elt = sequence(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.optional = function (...elts) {
  let elt = optional(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.repeat = function (...elts) {
  let elt = repeat(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.merge = function (...elts) {
  let elt = merge(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.branch = function (...elts) {
  let elt = branch(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.fanIn = function (...elts) {
  let elt = fanIn(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.fanOut = function (...elts) {
  let elt = fanOut(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.zeroOrMore = function (...elts) {
  let elt = zeroOrMore(...elts);
  this.to(elt);
  return elt;

};

ResourceElt.prototype.oneOrMore = function (...elts) {
  let elt = oneOrMore(...elts);
  this.to(elt);
  return elt;

};