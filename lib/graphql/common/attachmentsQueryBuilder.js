"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  entity,
  countType
}) => _graphqlTag.default`
query attachmentsQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
    count: count(entity: "${countType}", filterBy: $filterBy)
    records: ${entity}(startIndex: $startIndex, stopIndex: $stopIndex,filterBy: $filterBy, orderBy: $orderBy) {
        id
        url
        name
        createdDate
        createdBy {
            login
        }
        mimeType
        size
    }
}
`;

exports.default = _default;