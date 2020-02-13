"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query widgetTasksDueDateQuery($overDue: [JSON], $today: [JSON], $upcoming: [JSON], $notSet: [JSON]) {
  overdue: count(entity: "task", filterBy: $overDue)
  today: count(entity: "task", filterBy: $today)
  upcoming: count(entity: "task", filterBy: $upcoming)
  notSet: count(entity: "task", filterBy: $notSet)
}
`;

exports.default = _default;