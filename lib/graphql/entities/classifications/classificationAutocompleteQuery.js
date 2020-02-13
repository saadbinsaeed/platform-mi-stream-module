"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query classificationAutocompleteQuery($page: Int, $pageSize: Int, $filterBy: [JSON], $orderBy: [JSON]) {
  result: classifications(page: $page, itemsPerPage: $pageSize, filterBy: $filterBy, orderBy: $orderBy) {
    id
    name
    uri
    color
  }
}
`;

exports.default = _default;