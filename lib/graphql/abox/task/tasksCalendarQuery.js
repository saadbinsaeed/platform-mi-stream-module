"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query tasksCalendarQuery($filterBy: [JSON], $orderBy: [JSON]) {
  records: tasks(filterBy: $filterBy, orderBy: $orderBy) {
    id
    priority
    dueDate
    endDate
    name
    bpmnVariables {
      name
      type
      text
    }
  }
}
`;

exports.default = _default;