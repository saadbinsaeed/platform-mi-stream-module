"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenArray = void 0;

const flattenArray = arr => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
};

exports.flattenArray = flattenArray;