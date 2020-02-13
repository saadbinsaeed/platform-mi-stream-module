"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query widgetTasksStatusQuery($open: [JSON], $closed: [JSON]) {
  open: count(entity: "task", filterBy: $open)
  closed: count(entity: "task", filterBy: $closed)
}
`;

exports.default = _default;