"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query customEntitiesChildrenQuery($filterBy: [JSON]) {
        result: customEntities(filterBy: $filterBy) {
            id
            active
            iconName
            iconColor
            parent {
                id
            }
            name
            classes {
                id
                name
                uri
                color
            }
            createdBy {
                id
                image
                name
            }
            createdDate
            modifiedBy {
                id
                image
                name
            }
            modifiedDate
            children {
                id
                parent {
                    id
                }
                name
                classes {
                    uri
                }
                createdBy {
                    name
                }
                createdDate
                modifiedBy {
                    name
                }
                modifiedDate
            }
        }
    }
`;

exports.default = _default;