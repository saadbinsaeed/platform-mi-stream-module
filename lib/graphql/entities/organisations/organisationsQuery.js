"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query organisationsQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
        count: count(entity: "organisation", filterBy: $where, max: $countMax)
        records: organisations(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
            id
            name
            description
            _attachmentsCount
            locationInfo
            classes {
                id
                name
                color
                uri
            }
            children {
                id
                name
            }
            createdDate
            modifiedDate
            active
            image
            parent {
                id
                name
                image
            }
            modifiedBy {
                name
                image
                id
            }
            createdBy {
                id
                name
                image
            }
            _relationshipsCount
        }
    }
`;

exports.default = _default;