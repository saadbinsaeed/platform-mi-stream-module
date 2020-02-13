"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query classificationsQuery($page: Int, $pageSize: Int, $where: [JSON], $excludeBy: [JSON], $orderBy: [JSON], $countMax: Int) {
  count: count(entity: "classification", filterBy: $where, excludeBy: $excludeBy, max: $countMax)
  records: classifications(page: $page, itemsPerPage: $pageSize, filterBy: $where, excludeBy: $excludeBy, orderBy: $orderBy) {
    id
    uri
    name
    active
    abstract
    createdBy {
      id
      name
      image
    }
    createdDate
    modifiedBy {
      id
      name
      image
    }
    modifiedDate
    applicableOn
  }
}
`;

exports.default = _default;