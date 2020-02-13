"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query widgetTasksInvolvementQuery($assignee: [JSON], $owner: [JSON], $teamMember: [JSON]) {
  assignee: count(entity: "task", filterBy: $assignee)
  owner: count(entity: "task", filterBy: $owner)
  teamMember: count(entity: "task", filterBy: $teamMember)
}
`;

exports.default = _default;