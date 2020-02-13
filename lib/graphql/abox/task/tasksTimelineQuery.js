"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query tasksTimelineQuery($filterBy: [JSON], $orderBy: [JSON]) {
  count: count(entity: "task", filterBy: $filterBy)
  records: tasks(filterBy: $filterBy, orderBy: $orderBy) {
    id
    name
    description
    assignee {
      id
      login
      image
      name
    }
    priority
    dueDate
    startDate
    endDate
    parent {
      id
    }
    variable {
      completion
    }
    bpmnVariables {
      name
      type
      text
      text2
      long
      double
      bytearrayId
    }
    _childrenCount
    relationships {
      id
      relationDefinition {
        id
        relation
        entityType1
      }
      task1 {
        id
        name
      }
      task2 {
        id
        name
        dueDate
      }
    }
  }
}
`;

exports.default = _default;