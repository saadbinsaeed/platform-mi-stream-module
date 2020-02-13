"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`query groupClassQuery($filterBy: [JSON]) {
    result: classifications(filterBy: $filterBy) {
        id
        name
        uri
        color
        formDefinitions
        abstract
        active
    }
}
`;

exports.default = _default;