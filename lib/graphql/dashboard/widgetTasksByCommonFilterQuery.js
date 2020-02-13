"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query widgetTasksByCommonFilterQuery($today: [JSON], $yesterday: [JSON], $lastThirtyDays: [JSON], $lastThirtyPlusDays: [JSON], $notSet: [JSON]) {
  today: count(entity: "task", filterBy: $today)
  yesterday: count(entity: "task", filterBy: $yesterday)
  lastThirtyDays: count(entity: "task", filterBy: $lastThirtyDays)
  lastThirtyPlusDays: count(entity: "task", filterBy: $lastThirtyPlusDays)
  notSet: count(entity: "task", filterBy: $notSet)
}
`;

exports.default = _default;