"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query broadcastQuery($id: Int) {
    result: broadcast(id: $id) {
        id
        message
        active
        startDate
        users {
            id
            login
            name
        }
        groups {
            id
            name
        }
        expiresAfterValue
        expiresAfterUnit
        repeat
        repeatInterval
        repeatValue
        repeatEnds
    }
}
`;

exports.default = _default;