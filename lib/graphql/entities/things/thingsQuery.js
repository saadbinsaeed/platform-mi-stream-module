"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query thingsQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
        count: count(entity: "thing", filterBy: $where, max: $countMax)
        records: things(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
            id
            name
            image
            description
            thingId
            children {
                name
                id
            }
            classes {
                id
                name
                uri
                color
            }
            organisation {
                id
                name
                image
            }
            parent {
                id
                name
                image
            }
            locationInfo
            active
            createdBy {
                name
                image
                id
            }
            createdDate
            modifiedBy {
                name
                image
                id
            }
            _attachmentsCount
            _relationshipsCount
            modifiedDate
            iconName
            iconColor
        }
    }
`;

exports.default = _default;