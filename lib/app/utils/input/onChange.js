"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onChangeFix = onChangeFix;

function onChangeFix(onChange, event) {
  if (typeof event.target.value === 'string') {
    event.target.value = event.target.value.trimLeft();
  }

  return onChange(event);
}