"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query customEntitiesQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
        count: count(entity: "customEntity", filterBy: $where, max: $countMax)
        records: customEntities(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
            id
            name
            image
            description
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