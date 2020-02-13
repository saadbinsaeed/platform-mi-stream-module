"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeToJS = safeToJS;
exports.safeToJsArray = safeToJsArray;

/**
 * Converts object to mutable.
 * @param obj
 * @returns {Object}
 */
function safeToJS(obj) {
  return obj;
}
/**
 * Converts object to a mutable array.
 * @param obj
 * @returns {Object}
 */


function safeToJsArray(obj) {
  if (!obj) {
    return null;
  }

  return Array.isArray(obj) ? obj : [obj];
}