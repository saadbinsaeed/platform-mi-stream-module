"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query subtasksQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
  count: count(entity: "task", , filterBy: $filterBy)
  records: tasks(startIndex: $startIndex, stopIndex: $stopIndex, filterBy: $filterBy, orderBy: $orderBy) {
      id
      name
      description
      priority
      startDate
      endDate
      variable {
          completion
      }
      comments {
          id
      }      
      _attachmentsCount
      _childrenCount
      assignee {
          login
          image
          name
      }
  }
}`;

exports.default = _default;