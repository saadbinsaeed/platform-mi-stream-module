"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query groupUsersAddQuery($page: Int, $pageSize: Int, $where: [JSON], $excludeBy: [JSON], $orderBy: [JSON], $countMax: Int) {
  count: count(entity: "user", filterBy: $where, excludeBy: $excludeBy, max: $countMax)
  records: users(page: $page, itemsPerPage: $pageSize, filterBy: $where, excludeBy: $excludeBy, orderBy: $orderBy) {
    id
    name
    login
    active
    person {
      relationships {
        organisation1 {
          id
          name
        }
        organisation2 {
          id
          name
        }
      }
    }
  }
}
`;

exports.default = _default;