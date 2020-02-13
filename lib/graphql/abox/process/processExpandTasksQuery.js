"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query processExpandTasksQuery($startIndex: Int, $stopIndex: Int, $page: Int, $itemsPerPage: Int, $filterBy: [JSON], $orderBy: [JSON]) {
    tasks(startIndex: $startIndex, stopIndex: $stopIndex, page: $page, itemsPerPage: $itemsPerPage, filterBy: $filterBy, orderBy: $orderBy) {
        id
        name
        assignee {
            id
            name
            image
            login
        }
        startDate
        comments {
            id
        }
        description
        endDate
        dueDate
        priority
        variable {
            completion
            taskStatus {
                status
            }
        }
    }
}
`;

exports.default = _default;