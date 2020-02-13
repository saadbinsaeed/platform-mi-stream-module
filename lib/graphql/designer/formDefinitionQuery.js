"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query formDefinitionQuery($id: Int!) {
  result: formDefinition(id: $id) {
    id
    name
    version
    definition(fields: ["version", "fields[*].type", "fields[*].miconfig"])
    modified
  }
}
`;

exports.default = _default;