"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query relationshipClassificationsQuery($id: Int!) {
        result: classification(id: $id) {
            id
            name
            active
            uri
            color
            formDefinitions
            parents {
                id
                name
                active
                uri
                color
                formDefinitions
            }
        }
    }
`;

exports.default = _default;