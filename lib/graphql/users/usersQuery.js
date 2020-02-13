"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query usersQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
  count: count(entity: "user", filterBy: $where, max: $countMax)
  records: users(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
    name
    login
    partyId
    image
    groups {
      name
      id
    }
    createdDate
    active
    userStatus
    lastUpdatedDate
    relations {
      id
      organisation2 {
        name
        id
      }
      relationDefinition {
        id
      }
    }
  }
}

`;

exports.default = _default;