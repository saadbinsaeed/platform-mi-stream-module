"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query processDefinitionQuery($filterBy: [JSON]) {
  result: deployedProcessesDefinitions(filterBy: $filterBy) {
    id
    deployedModel {
      name
    }
    _startFormDefinition {
      id
      definition(fields: ["version", "fields[*].type", "fields[*].miconfig"])
    }
  }
}
`;

exports.default = _default;