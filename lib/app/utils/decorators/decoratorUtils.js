"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.memoize = memoize;
exports.bind = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _classMethodDecorator = _interopRequireDefault(require("./_classMethodDecorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bind = (0, _classMethodDecorator.default)((target, key, descriptor) => ({
  configurable: true,

  get() {
    const value = descriptor.value.bind(this);
    Object.defineProperty(this, key, { ...descriptor,
      value
    });
    return value;
  },

  set(value) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Unable to set new value to decorated method');
    }

    Object.defineProperty(this, key, { ...descriptor,
      value
    });
  }

}));
exports.bind = bind;

function debounceFunc(fn, delayMs) {
  const delay = delayMs && delayMs > 0 ? delayMs : 0;
  let timeoutKey;
  return function wrapper(...args) {
    clearTimeout(timeoutKey);
    timeoutKey = setTimeout(() => fn.apply(this, args), delay);
  };
}

function debounce(delay = 300) {
  return (0, _classMethodDecorator.default)((target, key, descriptor) => ({ ...descriptor,
    value: debounceFunc(descriptor.value, delay)
  }));
}

function memoize(isEqual) {
  return (0, _classMethodDecorator.default)((target, key, descriptor) => ({ ...descriptor,
    value: (0, _memoizeOne.default)(descriptor.value, isEqual)
  }));
}