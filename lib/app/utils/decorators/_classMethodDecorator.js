"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classMethodDecorator;

function classMethodDecorator(decorator) {
  return (target, key, descriptor) => {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new Error(`Unable to apply "@${decorator.name}" for "${key}": it must be class method.`);
    }

    return decorator(target, key, descriptor);
  };
}