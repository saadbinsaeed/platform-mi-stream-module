"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query eventProcessesQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON]) {
    list: processes(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
        id
        createDate
        name
        createdBy {
            name
        }
    }
}
`;

exports.default = _default;