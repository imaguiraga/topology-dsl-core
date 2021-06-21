import {
  CompositeResourceElt
} from '../core-dsl';

import { PIPELINE_RESOURCE_TYPE } from './pipeline-terminal.js';

/**
 * Class PipelineElt.
 * @extends CompositeResourceElt
 */
export class PipelineElt extends CompositeResourceElt {
  /**
   * Create a PipelineElt.
   * @param {object} elts - The elts value.
   * @param {object} ctx - The ctx value.
   */
  constructor(elts, ctx) {
    super(elts, ctx, 'container', 'pipeline', PIPELINE_RESOURCE_TYPE);
  }

}
/**
 * Create a Pipeline dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} pipeline dsl.
 */
export function pipeline(...elts) {
  return new PipelineElt([...elts]);
}


/**
 * Class JobElt.
 * @extends CompositeResourceElt
 */
export class JobElt extends CompositeResourceElt {
  /**
   * Create a JobElt.
   * @param {object} elts - The elts value.
   * @param {object} ctx - The ctx value.
   */
  constructor(elts, ctx) {
    super(elts, ctx, 'container', 'job', PIPELINE_RESOURCE_TYPE);
  }

}

/**
 * Create a Job dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} pipeline dsl.
 */
export function job(...elts) {
  return new JobElt([...elts]);
}

/**
 * Class StageElt.
 * @extends CompositeResourceElt
 */
export class StageElt extends CompositeResourceElt {
  /**
   * Create a StageElt.
   * @param {object} elts - The elts value.
   * @param {object} ctx - The ctx value.
   */
  constructor(elts, ctx) {
    super(elts, ctx, 'container', 'stage', PIPELINE_RESOURCE_TYPE);
  }

}

/**
 * Create a Stage dsl tree.
 * @param {array|object} elts - The elements.
 * @return {object} pipeline dsl.
 */
export function stage(...elts) {
  return new StageElt([...elts]);
}