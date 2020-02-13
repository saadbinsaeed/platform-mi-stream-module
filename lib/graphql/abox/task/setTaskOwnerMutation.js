"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    mutation setTaskOwnerMutation($id: String!, $owner: UserReferenceInput) {
        setTaskOwner(id: $id, owner: $owner)
    }
`;

exports.default = _default;