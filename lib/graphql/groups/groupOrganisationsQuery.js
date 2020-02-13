"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query groupOrganisationsQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
        count: count(entity: "groupEntity", filterBy: $where, max: $countMax)
        records: groupEntities(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
            id
            permissions
            organisation {
                id
                name
                active
                classes{
                    id
                    uri
                    name
                    color
                }
            }
        }
    }
`;

exports.default = _default;