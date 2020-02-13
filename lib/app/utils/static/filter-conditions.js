"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.involvementConditions = exports.filterConditions = void 0;
const filterConditions = [{
  value: '=',
  label: 'Equals'
}, {
  value: 'contains',
  label: 'Contains'
}, {
  value: 'startsWith',
  label: 'StartsWith'
}];
exports.filterConditions = filterConditions;
const involvementConditions = [{
  value: null,
  label: 'Any'
}, {
  value: 'assignee',
  label: 'Assignee'
}, {
  value: 'owner',
  label: 'Owner'
}, {
  value: 'teamMember',
  label: 'Team Member'
}];
exports.involvementConditions = involvementConditions;