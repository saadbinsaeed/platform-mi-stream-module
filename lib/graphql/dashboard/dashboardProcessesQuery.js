"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query dashboardProcessesQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
        count: count(entity: "process", filterBy: $filterBy)
        records: processes(startIndex: $startIndex, stopIndex: $stopIndex, filterBy: $filterBy, orderBy: $orderBy) {
            id
            name
            businessKey
            comments {
                id
                createDate
                message
                createdBy {
                    id
                    login
                    image
                    name
                }
            }
            attachments {
                id
            }
            teamMembers {
                id
            }
            tasks {
                id
            }
            endDate
            createDate
            variables(fields: ["progress", "priority"])
            createdBy {
                id
                login
                name
                image
            }
            status {
                payload(fields: ["maintenancesite.region"])                
            }
        }
    }
`;

exports.default = _default;