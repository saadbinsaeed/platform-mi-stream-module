"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPriorityColor = exports.getPriorityLabel = exports.PRIORITY_OPTIONS = exports.normalizePriorityValue = void 0;
const PRIORITY_LABELS = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
const PRIORITY_COLORS = ['danger', 'warning', 'alert', 'info', 'success'];

const normalizePriorityValue = priorityValue => {
  let priority = priorityValue && Number(priorityValue);
  priority = priority && priority >= 1 && priority <= 5 ? priority : 3;
  return priority;
};

exports.normalizePriorityValue = normalizePriorityValue;
const PRIORITY_OPTIONS = [{
  value: 1,
  label: PRIORITY_LABELS[0]
}, {
  value: 2,
  label: PRIORITY_LABELS[1]
}, {
  value: 3,
  label: PRIORITY_LABELS[2]
}, {
  value: 4,
  label: PRIORITY_LABELS[3]
}, {
  value: 5,
  label: PRIORITY_LABELS[4]
}];
exports.PRIORITY_OPTIONS = PRIORITY_OPTIONS;

const getPriorityLabel = priority => PRIORITY_LABELS[normalizePriorityValue(priority) - 1];

exports.getPriorityLabel = getPriorityLabel;

const getPriorityColor = priority => PRIORITY_COLORS[normalizePriorityValue(priority) - 1];

exports.getPriorityColor = getPriorityColor;