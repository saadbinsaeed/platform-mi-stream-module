"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query tasksQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
    count: count(entity: "task", filterBy: $filterBy)
    records: tasks(startIndex: $startIndex, stopIndex: $stopIndex, filterBy: $filterBy, orderBy: $orderBy) {
    id
    priority
    dueDate
    endDate
    owner {
        id
        name
        login
    }
    teamMembers {
        user {
            login
        }
    }
    taskStatus {
        lastUpdate
    }
    name
    assignee {
        login
        name
        image
    }
    comments {
        id
        createDate
        message
    }
    _attachmentsCount
    _childrenCount
    description
    variable {
        completion
        isRead
        taskStatus {
            status
                category
            }
        }
    }
}
`;

exports.default = _default;