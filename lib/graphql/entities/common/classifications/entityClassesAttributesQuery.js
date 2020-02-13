"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query entityClassesAttributesQuery($id: Int!) {
    result: entity(id: $id) {
        classes(recursive: true) {
            id
            name
            active
            uri
            color
            formDefinitions
            inherited
            children {
                id
                name
            }
        }
        attributes
        entityPermissions: _permissions
    }
}
`;

exports.default = _default;