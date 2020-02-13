"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query groupPermissionsQuery($page: Int, $pageSize: Int, $where: [JSON]) {
    records: groupPermissions(page: $page, itemsPerPage: $pageSize, filterBy: $where) {
        name
        displayName
        description
        parent {
            name
        }
    }
}
`;

exports.default = _default;