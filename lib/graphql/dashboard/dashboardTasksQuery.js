"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query dashboardTasksQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
        count: count(entity: "task", filterBy: $filterBy)
        records: tasks(startIndex: $startIndex, stopIndex: $stopIndex, filterBy: $filterBy, orderBy: $orderBy) {
            id
            priority
            startDate
            endDate
            dueDate
            name
            assignee {
                id
                name
                login
            }
            owner {
                id
                name
            }
            teamMembers {
                user {
                    id
                    name
                }
            }
            comments {
                id
                createDate
                message
            }
            variable {
                completion
            }
            bpmnVariables {
                name
                type
                bytearrayId
                text
                double
                long
                text2
            }
            taskStatus {
                lastUpdate
            }
            process {
                processDefinition {
                    name
                }
            }
        }
    }
`;

exports.default = _default;