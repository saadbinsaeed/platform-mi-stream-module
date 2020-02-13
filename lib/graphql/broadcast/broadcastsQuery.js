"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query broadcastsQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
  count: count(entity: "broadcast", filterBy: $where, max: $countMax)
  records: broadcasts(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
    id
    message
    readStatus
    parent {
      id
    }
    active
    startDate
    expireDate
    users {
      login
    }
    groups {
      users {
        login
      }
    }
  }
}

`;

exports.default = _default;