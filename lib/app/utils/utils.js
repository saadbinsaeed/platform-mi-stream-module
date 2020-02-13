"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialPromises = exports.getDate = exports.getArray = exports.getStr = exports.getNum = exports.sortAscending = exports.datefy = exports.arrayfy = exports.numberify = exports.stringify = exports.capitalizeFirstLetter = exports.deepEquals = exports.shallowEquals = exports.pick = exports.isBoolean = exports.isEmptyArray = exports.isEmpty = exports.isObject = exports.isDefined = exports.hasOneOf = exports.debounce = void 0;

var _lo = require("app/utils/lo/lo");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates and returns a new debounced version of the passed function.
 * The returned function will postpone its execution when
 * the specified delay is elapsed since the last time it was invoked.
 *
 * @param func the function to debounce.
 * @param dealy the debounce delay in milliseconds.
 */
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(void 0, args);
    }, delay);
  };
};

exports.debounce = debounce;

const isDefined = value => value !== null && value !== undefined;

exports.isDefined = isDefined;

const isObject = value => value && typeof value === 'object' && !Array.isArray(value);

exports.isObject = isObject;

const isBoolean = value => 'boolean' === typeof value;

exports.isBoolean = isBoolean;

const isEmptyArray = array => Array.isArray(array) && array.length === 0;

exports.isEmptyArray = isEmptyArray;

const isEmptyObject = object => Object.keys(object).length === 0;

const isEmpty = value => !value || (Array.isArray(value) ? isEmptyArray(value) : isEmptyObject(value));

exports.isEmpty = isEmpty;

const hasOneOf = (set, values) => values.some(value => set.has(value)); // eslint-disable-line no-shadow

/**
 * Creates an object composed of the picked object properties.
 *
 * @param object The source object.
 * @param fields The property paths to pick.
 * @return the created object.
 */


exports.hasOneOf = hasOneOf;

const pick = (object, fields) => !object ? {} : fields.reduce((acc, field) => (0, _lo.set)(acc, field, (0, _lo.get)(object, field)), {});
/**
 * Performs a shallow equals between the two specified objects.
 * If the fields parameter is specified the equality will be chacked only on the specified fields.
 *
 * @param objA the first object to compare.
 * @param objB the second object to compare.
 * @param fields (optional) the fields to check.
 *
 * @return true if the shallow equality procedure does not find any difference.
 */


exports.pick = pick;

const shallowEquals = (objA, objB, fields) => {
  if (!objA && !objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const keys = fields || Object.keys(objA);

  if (!fields && keys.length !== Object.keys(objB).length) {
    return false;
  }

  return !keys.some(key => (0, _lo.get)(objA, key) !== (0, _lo.get)(objB, key));
};

exports.shallowEquals = shallowEquals;

const deepEquals = (obj1, obj2) => (0, _fastDeepEqual.default)(obj1, obj2);

exports.deepEquals = deepEquals;

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Safe way to cast a value as string. If the value is not defined null will be returned.
 *
 * @param value The value to cast.
 * @return the value as string on null.
 */


exports.capitalizeFirstLetter = capitalizeFirstLetter;

const stringify = value => isDefined(value) ? String(value) : null;
/**
 * Safe way to cast a value as number. If the value is not defined or it does not represent a number null will be returned.
 *
 * @param value The value to cast.
 * @return the value as number or null.
 */


exports.stringify = stringify;

const numberify = value => {
  const num = isDefined(value) ? Number(value) : null;
  return Number.isNaN(num) ? 0 : num;
};
/**
 * Safe way to cast a value as array. If the value is not defined null will be returned.
 *
 * @param value The value to cast.
 * @return the value as array or null.
 */


exports.numberify = numberify;

const arrayfy = value => {
  if (!isDefined(value)) {
    return null;
  }

  return Array.isArray(value) ? value : [value];
};
/**
 * Safe way to cast a value as date. If the value is not defined null will be returned.
 *
 * @param value The value to cast.
 * @return the value as date or null.
 */


exports.arrayfy = arrayfy;

const datefy = value => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }

  return null;
};

exports.datefy = datefy;

const sortAscending = (list, field) => {
  const data = list ? list.slice() : [];
  return data.sort((firstObj, secondObj) => {
    const firstObjLabel = firstObj[field] && firstObj[field].toUpperCase();
    const secondObjLabel = secondObj[field] && secondObj[field].toUpperCase();

    if (firstObjLabel < secondObjLabel) {
      return -1;
    }

    if (firstObjLabel > secondObjLabel) {
      return 1;
    }

    return 0;
  });
};
/**
  * Gets a property value as number. This method is null safe.
  *
  * @param object the object to that contains the value.
  * @param fieldPath the field's path.
  * @param defaultValue the default value.
  * @return the value as number
  */


exports.sortAscending = sortAscending;

const getNum = (object, fieldPath, defaultValue) => numberify((0, _lo.get)(object, fieldPath, defaultValue));
/**
  * Gets a property value as string. This method is null safe.
  *
  * @param object the object to that contains the value.
  * @param fieldPath the field's path.
  * @param defaultValue the default value.
  * @return the value as string
  */


exports.getNum = getNum;

const getStr = (object, fieldPath, defaultValue) => stringify((0, _lo.get)(object, fieldPath, defaultValue));
/**
  * Gets a property value as array. This method is null safe.
  *
  * @param object the object to that contains the value.
  * @param fieldPath the field's path.
  * @param defaultValue the default value.
  * @return the value as array
  */


exports.getStr = getStr;

const getArray = (object, fieldPath, defaultValue) => arrayfy((0, _lo.get)(object, fieldPath, defaultValue));
/**
  * Gets a property value as date. This method is null safe.
  *
  * @param object the object to that contains the value.
  * @param fieldPath the field's path.
  * @param defaultValue the default value.
  * @return the value as Date
  */


exports.getArray = getArray;

const getDate = (object, fieldPath, defaultValue) => datefy((0, _lo.get)(object, fieldPath, defaultValue));
/**
 * Executes the functions sequentially (in order).
 *
 * @param list a list of items
 * @param executePromise a function that returns a promise
 */


exports.getDate = getDate;

const serialPromises = (list, executePromise) => {
  list.reduce(async (prevPromise, item) => {
    await prevPromise;
    return executePromise(item);
  }, Promise.resolve());
};

exports.serialPromises = serialPromises;