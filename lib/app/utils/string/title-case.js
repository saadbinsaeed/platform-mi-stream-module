"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const toTitleCase = phrase => {
  if (!phrase) {
    return phrase;
  }

  return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

var _default = toTitleCase;
exports.default = _default;