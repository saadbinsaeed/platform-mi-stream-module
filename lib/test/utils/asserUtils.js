"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectStateToEqual = void 0;

var _Immutable = require("app/utils/immutable/Immutable");

const expectStateToEqual = (state, expected) => {
  expect(state).toEqual(expected);
  expect((0, _Immutable.isImmutable)(state, true)).toBeTruthy();
};

exports.expectStateToEqual = expectStateToEqual;