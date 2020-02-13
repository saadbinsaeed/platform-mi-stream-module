"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    mutation updateGroupMutation($record: GroupUpdateInput!) {
        result: updateGroup(record: $record) {
            id
            name
            category
            attributes
            classifications {
                id
                name                
                uri
            }
            parent {
                id
                name
            }
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
            modifiedDate
            permissions
        }
    }
`;

exports.default = _default;