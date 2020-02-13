"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A small function to make creating multiple events easier
 * @param element - Element event is attached to
 * @param ev - The event to call i.e onclick, onload etc
 * @param func - The function to call
 * @constructor
 */
function Event(element, ev, func) {
  ev.split(' ').forEach(event => element.addEventListener(event, func));
}

var _default = Event;
exports.default = _default;