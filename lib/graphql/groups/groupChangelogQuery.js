"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query groupChangelogQuery($id: Int!,  $uid: String!, $orderBy: [JSON], $filterBy: [JSON], $startIndex: Int, $stopIndex: Int) {
  group(id: $id) {
    changelog(orderBy: $orderBy, filterBy: $filterBy, startIndex: $startIndex, stopIndex: $stopIndex) {
      id
      modifiedBy {
        id
        name
        image
      }
      modifiedDate
      changes
    }
  },
  count: countChangelog(id:$uid, type: "group", filterBy: $filterBy)
}
`;

exports.default = _default;