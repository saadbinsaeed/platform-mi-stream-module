"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = void 0;

/**
 * Creates an event.
 *
 * @param type the type of event to create.
 * @param target the value to se in the target property.
 */
const createEvent = (type, target) => {
  const event = new Event(type);
  window.Object.defineProperty(event, 'target', {
    value: target
  });
  return event;
};

exports.createEvent = createEvent;