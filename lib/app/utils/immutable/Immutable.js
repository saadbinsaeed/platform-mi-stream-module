"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImmutable = exports.set = exports.splice = exports.sort = exports.reverse = exports.unshift = exports.shift = exports.pop = exports.push = exports.merge = exports.List = exports.default = void 0;

var _deepFreeze = _interopRequireDefault(require("deep-freeze"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _env = require("app/utils/env");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Constructors
 */

/**
 * Freezes the passed value (recursively).
 *
 * @param value the value to freeze.
 * @return the frozen value.
 */
if (_env.isDev) {
  console.log('DEVELOPMENT MODE ENABLED'); // eslint-disable-line no-console
}

const Immutable = value => {
  if (!_env.isDev || value === null || value === undefined) {
    return value;
  }

  return (0, _deepFreeze.default)(value);
};
/**
 * Returns a frozen array.
 *
 * @param array the array to freeze.
 * @return if an array is passed the frozen array otherwise an empty frozen array.
 */


const List = array => {
  if (!array) {
    return Immutable([]);
  }

  if (!Array.isArray(array)) {
    throw new Error('the argument is not an array');
  }

  return Immutable(array);
};
/*
 * Object Modifier
 */

/**
 * Returns an immutable object that it is the merge of the passed objects
 *
 * @param objects the objects to merge
 * @return an immutable object
 */


exports.List = List;

const merge = (a, b, options) => {
  return Immutable((0, _deepmerge.default)(a, b, options));
};
/*
 * Array Modifier
 */

/**
 * @private
 * Freezes the passed value (not recursively).
 *
 * @param value the value to freeze.
 * @return the frozen value.
 */


exports.merge = merge;

const _freeze = value => {
  if (!_env.isDev) {
    return value;
  }

  return Object.freeze(value);
};
/**
 * @private
 * un-freeze (clone) the passed array (not recursively).
 *
 * @param array the array to thaw.
 * @return the thawed array.
 */


const _thawArray = array => {
  return [...array];
};

const _arrayApply = (array, methodName, ...args) => {
  if (!array || !Array.isArray(array)) {
    throw new Error('The first arguments must be an array.');
  }

  const next = _thawArray(array); // $FlowFixMe


  next[methodName](...args);
  return _freeze(next);
};

const push = (array, ...args) => {
  return _arrayApply(array, 'push', ...args);
};

exports.push = push;

const pop = (array, ...args) => {
  return _arrayApply(array, 'pop', ...args);
};

exports.pop = pop;

const shift = (array, ...args) => {
  return _arrayApply(array, 'shift', ...args);
};

exports.shift = shift;

const unshift = (array, ...args) => {
  return _arrayApply(array, 'unshift', ...args);
};

exports.unshift = unshift;

const reverse = (array, ...args) => {
  return _arrayApply(array, 'reverse', ...args);
};

exports.reverse = reverse;

const sort = (array, ...args) => {
  return _arrayApply(array, 'sort', ...args);
};

exports.sort = sort;

const splice = (array, ...args) => {
  return _arrayApply(array, 'splice', ...args);
};
/*
 * Immutability Test
 */

/**
 * @private
 *
 * Recursive method used by the public isImmutable method to deeply check the immutability of an object.
 *
 * @param o the object to test.
 * @param recursivityCounter number of recursion.
 *
 * @throw the error 'The object is too deep or there is a cycle' if the number of recursion is greater than 100.
 */


exports.splice = splice;

const _isImmutable = (o, recursivityCounter) => {
  if (recursivityCounter > 100) {
    throw new Error('The object is too deep or there is a cycle');
  }

  const properties = Object.getOwnPropertyNames(o).filter(prop => {
    // eslint-disable-next-line no-prototype-builtins
    return o.hasOwnProperty(prop) && o[prop] !== null && (typeof o[prop] === 'object' || typeof o[prop] === 'function');
  });
  const oneIsMutable = properties.find(prop => {
    return !Object.isFrozen(o[prop]) || !_isImmutable(o[prop], recursivityCounter + 1);
  });
  return !oneIsMutable;
};
/**
 * Checks if an object is immutable.
 *
 * @param object the object to test.
 * @param recursive if true do a deep test, otherwise do a shallow test.
 * @return true if the object is immutable, false otherwise.
 */


const isImmutable = (object, recursive) => {
  if (!_env.isDev) {
    return true;
  }

  if (!recursive) {
    return Object.isFrozen(object);
  }

  return Object.isFrozen(object) && _isImmutable(object, 0);
};

exports.isImmutable = isImmutable;

const set = (object, fieldPath, value) => {
  return Immutable((0, _lo.set)(object, fieldPath, value));
};

exports.set = set;
var _default = Immutable;
exports.default = _default;