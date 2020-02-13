"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnique = exports.findIntersection = void 0;

/**
 *  This function will take two array and returns those values that are common in both arrays
 */
const findIntersection = (arr1, arr2) => {
  return (arr1 || []).filter(value => -1 !== (arr2 || []).indexOf(value));
};
/**
 * This function will take and array and returns an other array with no duplicate values
 */


exports.findIntersection = findIntersection;

const getUnique = arr => {
  return [...new Set(arr)];
};

exports.getUnique = getUnique;