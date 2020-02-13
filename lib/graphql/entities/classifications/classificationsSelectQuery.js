"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query classificationsSelectQuery($page: Int, $itemsPerPage: Int, $filterBy: [JSON], $orderBy: [JSON]) {
    records: classifications(page: $page, itemsPerPage: $itemsPerPage, filterBy: $filterBy, orderBy: $orderBy) {
        id
        name
        uri
     }
}
`;

exports.default = _default;