"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query groupsQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON]) {
    records: groups(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
        id
        name
        category
        active
        createdDate
        modifiedDate
        createdBy {
            id
            name
            image
        }
        modifiedBy {
            id
            name
            image
        }
        parent {
            id
        }
        _usersCount
        _classificationsCount
        _entitiesCount
        _processDefinitionsCount
    }
}
`;

exports.default = _default;