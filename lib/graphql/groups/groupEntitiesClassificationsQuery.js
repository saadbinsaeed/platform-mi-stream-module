"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query groupEntitiesClassificationsQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON]) {
    count: count(
        entity: "groupEntity",
        filterBy: $where,
    )
    records: groupEntities(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
        id
        permissions
        classification {
            id
            name
            uri
            active
            applicableOn
            parents {
                name
            }
        }
    }
}
`;

exports.default = _default;