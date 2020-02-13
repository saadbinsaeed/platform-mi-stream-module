"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
mutation addEntitiesToGroupMutation($groupId: Int!, $entities: [EntityReferenceInput]!) {
  addEntitiesToGroup(groupId: $groupId, entities: $entities)
}
`;

exports.default = _default;