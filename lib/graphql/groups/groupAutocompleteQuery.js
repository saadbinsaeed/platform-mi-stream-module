"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query groupAutocompleteQuery($page: Int, $pageSize: Int, $filterBy: [JSON], $orderBy: [JSON]) {
  result: groups(page: $page, itemsPerPage: $pageSize, filterBy: $filterBy, orderBy: $orderBy) {
    id
    name
  }
}
`;

exports.default = _default;