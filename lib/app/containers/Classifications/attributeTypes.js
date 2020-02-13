"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.label = label;
exports.default = void 0;
const attributeTypes = {
  text: 'Text',
  int: 'Number',
  float: 'Decimal',
  bool: 'Yes / No',
  timestamp: 'Date / Time',
  enum: 'Enumeration',
  things: 'Things',
  people: 'People',
  custom: 'Custom Entity',
  organisations: 'Organizations',
  directory: 'Directory',
  classification: 'Classification'
};

var _default = Object.entries(attributeTypes).map(([value, label]) => ({
  value,
  label
}));
/**
 * function to get label from type
 * @param type
 * @returns {string}
 */


exports.default = _default;

function label(type) {
  return attributeTypes[type] || 'Unknown';
}