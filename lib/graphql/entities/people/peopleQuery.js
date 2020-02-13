"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query peopleQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
        count: count(entity: "person", filterBy: $where, max: $countMax)
        records: people(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
            id
            name
            image
            locationInfo
            classes {
                id
                name
                color
                uri
            }
            modifiedDate
            active
            createdBy {
                id
                name
                image
            }
            _attachmentsCount
            _relationshipsCount
        }
    }
`;

exports.default = _default;