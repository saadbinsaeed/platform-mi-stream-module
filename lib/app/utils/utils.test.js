"use strict";

var _utils = require("./utils");

describe('shallowEquals', () => {
  test('objects are equals', () => {
    const a = {
      x: 12,
      y: 123,
      z: 'ok'
    };
    const b = a;
    expect((0, _utils.shallowEquals)(a, b)).toBeTruthy();
  });
  test('properties x and y are equals', () => {
    const a = {
      x: 12,
      y: 123,
      z: 'ok'
    };
    const b = { ...a,
      z: 'ko'
    };
    expect((0, _utils.shallowEquals)(a, b, ['x', 'y'])).toBeTruthy();
  });
  test('properties x and y are equals', () => {
    const a = {
      x: {
        test: 'something'
      },
      y: 123,
      z: 'ok',
      j: {
        test: 'something else'
      }
    };
    const b = {
      x: a.x,
      y: a.y
    };
    expect((0, _utils.shallowEquals)(a, b, ['x', 'y'])).toBeTruthy();
  });
});