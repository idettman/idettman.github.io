/**
 * The module exports the `Foreman` object which contains all components
 * exposed by the framework.
 *
 * They are exposed as both properties on the default export, as well as
 * individually re-exported as module elements.
 */
import 'core-js/shim';
import Brick_ from './brick';
import Composer_, { intoBrickParam as intoBrickParam_ }  from './composer';
import BaseRange_ from './range';
import itertools_ from './itertools';
import * as utils_ from './utils';
import * as range_ from './range';

export const Brick = Brick_;
export const Composer = Composer_;
export const BaseRange = BaseRange_;
export const intoBrickParam = intoBrickParam_;
export const itertools = itertools_;
export const utils = utils_;
export const range = range_;

export default {
  Brick,
  Composer,
  BaseRange,
  intoBrickParam,
  utils,
  range,
}
