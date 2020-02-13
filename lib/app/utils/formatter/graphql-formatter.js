"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatArray = void 0;

const formatArray = array => {
  if (!array || array.length === 0) {
    return '[]';
  }

  const objs = array.map(obj => {
    return Object.entries(obj).map(([key, value]) => `${key}: "${String(value)}"`).join(', ');
  });
  return `[{${objs.join('},{')}}]`;
};

exports.formatArray = formatArray;