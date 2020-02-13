"use strict";

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('memoize function', () => {
  test('single string argument', () => {
    let count = 0;
    const hello = (0, _memoizeOne.default)(name => `${++count}. Hello ${name}`);
    expect(hello('Luca')).toEqual('1. Hello Luca');
    expect(hello('Luca')).toEqual('1. Hello Luca');
    expect(hello('Denys')).toEqual('2. Hello Denys');
    expect(hello('Denys')).toEqual('2. Hello Denys');
    expect(hello('Luca')).toEqual('3. Hello Luca');
    expect(hello('Luca')).toEqual('3. Hello Luca');
  });
  test('two string arguments', () => {
    let count = 0;
    const hello = (0, _memoizeOne.default)((name, surname) => `${++count}. Hello ${name} ${surname}`);
    expect(hello('Luca', 'Pinelli')).toEqual('1. Hello Luca Pinelli');
    expect(hello('Luca', 'Pinelli')).toEqual('1. Hello Luca Pinelli');
    expect(hello('Denys', 'Bogdanov')).toEqual('2. Hello Denys Bogdanov');
    expect(hello('Denys', 'Bogdanov')).toEqual('2. Hello Denys Bogdanov');
    expect(hello('Luca', 'Pinelli')).toEqual('3. Hello Luca Pinelli');
    expect(hello('Luca', 'Pinelli')).toEqual('3. Hello Luca Pinelli');
  });
  test('two object arguments', () => {
    let count = 0;
    const sum = (0, _memoizeOne.default)(({
      a
    }, [b]) => `${++count}. The sum is ${a + b}`);
    const first = {
      a: 1
    };
    const second = [2];
    expect(sum(first, second)).toEqual('1. The sum is 3');
    expect(sum(first, second)).toEqual('1. The sum is 3');
    expect(sum(first, [2])).toEqual('2. The sum is 3');
    expect(sum(first, [2])).toEqual('3. The sum is 3');
    expect(sum(first, [4])).toEqual('4. The sum is 5');
    expect(sum(first, second)).toEqual('5. The sum is 3');
    expect(sum(first, second)).toEqual('5. The sum is 3');
  });
  test('one wrapper (object) argument', () => {
    let count = 0;
    const hello = (0, _memoizeOne.default)(({
      name,
      surname
    }) => `${++count}. Hello ${name} ${surname}`, _utils.shallowEquals);
    expect(hello({
      name: 'Luca',
      surname: 'Pinelli'
    })).toEqual('1. Hello Luca Pinelli');
    expect(hello({
      name: 'Luca',
      surname: 'Pinelli'
    })).toEqual('1. Hello Luca Pinelli');
    expect(hello({
      name: 'Denys',
      surname: 'Bogdanov'
    })).toEqual('2. Hello Denys Bogdanov');
    expect(hello({
      name: 'Denys',
      surname: 'Bogdanov'
    })).toEqual('2. Hello Denys Bogdanov');
    expect(hello({
      name: 'Luca',
      surname: 'Pinelli'
    })).toEqual('3. Hello Luca Pinelli');
    expect(hello({
      name: 'Luca',
      surname: 'Pinelli'
    })).toEqual('3. Hello Luca Pinelli');
  });
});
let simpleHelloCounter = 0;
/**
 *
 */

class Simple {
  constructor() {
    _defineProperty(this, "hello", (0, _memoizeOne.default)(name => `Hello ${name} (count ${++simpleHelloCounter})`));
  }

}

let simpleStaticHelloCounter = 0;
/**
 *
 */

class SimpleStatic {}

_defineProperty(SimpleStatic, "hello", (0, _memoizeOne.default)(name => `Hello ${name} (count ${++simpleStaticHelloCounter})`));

describe('memoize class functions', () => {
  test('instace function', () => {
    const a = new Simple();
    const b = new Simple();
    expect(a.hello('Luca')).toEqual('Hello Luca (count 1)');
    expect(b.hello('Luigi')).toEqual('Hello Luigi (count 2)');
    expect(a.hello('Luca')).toEqual('Hello Luca (count 1)');
    expect(b.hello('Luigi')).toEqual('Hello Luigi (count 2)');
    expect(a.hello('Mario')).toEqual('Hello Mario (count 3)');
    expect(b.hello('Andrea')).toEqual('Hello Andrea (count 4)');
    expect(a.hello('Mario')).toEqual('Hello Mario (count 3)');
    expect(b.hello('Andrea')).toEqual('Hello Andrea (count 4)');
  });
  test('static function', () => {
    const a = new SimpleStatic('hi');
    const b = new SimpleStatic('hello');
    expect(a.constructor.hello('Luca')).toEqual('Hello Luca (count 1)');
    expect(b.constructor.hello('Luigi')).toEqual('Hello Luigi (count 2)');
    expect(a.constructor.hello('Luca')).toEqual('Hello Luca (count 3)');
    expect(b.constructor.hello('Luigi')).toEqual('Hello Luigi (count 4)');
    expect(a.constructor.hello('Mario')).toEqual('Hello Mario (count 5)');
    expect(b.constructor.hello('Andrea')).toEqual('Hello Andrea (count 6)');
    expect(a.constructor.hello('Mario')).toEqual('Hello Mario (count 7)');
    expect(b.constructor.hello('Andrea')).toEqual('Hello Andrea (count 8)');
  });
});