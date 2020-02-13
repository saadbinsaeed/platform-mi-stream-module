"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query aboxAttachmentsQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
  count: count(entity: "attachment", , filterBy: $filterBy)
  records: attachments(startIndex: $startIndex, stopIndex: $stopIndex, filterBy: $filterBy, orderBy: $orderBy) {
    id
    name
    createdBy {
      id
      name
      image
      login
    }
    createDate
    modifiedBy {
      id
      name
      image
      login
    }
    modifiedDate
    mimeType
    size
  }
}`;

exports.default = _default;