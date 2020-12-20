import {
  FanOutFanInElt,
  FanInElt,
  FanOutElt,
  OptionalElt,
  RepeatElt,
  SequenceElt,
  TerminalElt,
  GroupElt
} from './resource.js';

import { BASE_ICONS_MAP } from './base-icons-map';

/**
 * Create a fanOut_fanIn dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function fanOut_fanIn(...elts) {
  return new FanOutFanInElt([...elts])._set_('style', BASE_ICONS_MAP.get('fanOut_fanIn'));
}

export function choice(...elts) {
  return fanOut_fanIn(...elts)._subType_('choice')._set_('style', BASE_ICONS_MAP.get('choice'));
}

/**
 * Create a fanIn dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function fanIn(...elts) {
  return new FanInElt([...elts])._set_('style', BASE_ICONS_MAP.get('fanIn'));
}

export function merge(...elts) {
  return fanIn(...elts)._subType_('merge')._set_('style', BASE_ICONS_MAP.get('merge'));
}

/**
 * Create a fanOut dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function fanOut(...elts) {
  return new FanOutElt([...elts])._set_('style', BASE_ICONS_MAP.get('fanOut'));
}

export function branch(...elts) {
  return fanOut(...elts)._subType_('branch')._set_('style', BASE_ICONS_MAP.get('branch'));
}

export function split(...elts) {
  return fanOut(...elts)._subType_('split')._set_('style', BASE_ICONS_MAP.get('split'));
}

export function tree(...elts) {
  return fanOut(...elts)._subType_('tree')._set_('style', BASE_ICONS_MAP.get('tree'));
}

export function link(...elts) {
  return fanOut(...elts)._subType_('link')._set_('style', BASE_ICONS_MAP.get('link'));
}

export function use(...elts) {
  return fanOut(...elts)._subType_('use')._set_('style', BASE_ICONS_MAP.get('use'));
}

export function parallel(...elts) {
  return fanOut(...elts)._subType_('parallel')._set_('style', BASE_ICONS_MAP.get('parallel'));
}

/**
 * Create an optional dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function optional(elt) {
  return new OptionalElt(elt)._set_('style', BASE_ICONS_MAP.get('optional'));
}

/**
 * Create a repeat dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function repeat(elt) {
  return new RepeatElt(elt)._set_('style', BASE_ICONS_MAP.get('repeat'));
}

export function oneOrMore(elt) {
  return repeat(elt)._set_('style', BASE_ICONS_MAP.get('oneOrMore'));
}

/**
 * Create a sequence dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} flow dsl.
 */
export function sequence(...elts) {
  return new SequenceElt([...elts])._set_('style', BASE_ICONS_MAP.get('sequence'));
}

export function process(...elts) {
  return sequence(...elts)._subType_('process')._set_('style', BASE_ICONS_MAP.get('process'));
}

export function activity(...elts) {
  return sequence(...elts)._subType_('activity')._set_('style', BASE_ICONS_MAP.get('activity'));
}

/**
 * Create a terminal dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function terminal(elt) {
  return new TerminalElt(elt)._set_('style', BASE_ICONS_MAP.get('terminal'));
}

export function transition(elt) {
  return terminal(elt)._subType_('transition')._set_('style', BASE_ICONS_MAP.get('transition'));
}

/**
 * Create a state dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function state(elt) {
  return terminal(elt)._subType_('state')._set_('style', BASE_ICONS_MAP.get('state'));
}

/**
 * Create a zeroOrMore dsl tree.
 * @param {object} elt - The element.
 * @return {object} flow dsl.
 */
export function zeroOrMore(elt) {
  return optional(repeat(elt))._set_('style', BASE_ICONS_MAP.get('zeroOrMore'));
}

/**
 * Create a resource dsl tree.
 * @param {object} elt - The element.
 * @return {object} resource dsl.
 */
export function resource(elt) {
  return terminal(elt)._subType_('resource')._set_('style', BASE_ICONS_MAP.get('resource'));
}

/**
 * Create a group dsl tree.
 * @param {object} elts - The elements.
 * @return {object} group dsl.
 */
export function group(...elts) {
  return new GroupElt([...elts])._set_('style', BASE_ICONS_MAP.get('group'));
}

// pipeline -> stages -> jobs -> tasks -> steps 