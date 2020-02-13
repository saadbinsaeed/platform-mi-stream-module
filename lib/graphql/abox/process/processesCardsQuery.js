"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query processesCardsQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
        count: count(entity: "process", filterBy: $filterBy)
        records: processes(startIndex: $startIndex, stopIndex: $stopIndex, filterBy: $filterBy, orderBy: $orderBy) {
            id
            name
            processDefinition {
                name
                deployedModel {
                    modelData(fields: ["icon", "iconColor"])
                }
            }
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
                type
                user {
                    id
                    name
                    login
                    image
                }
                group {
                  id
                  name
                  users {
                    id
                    name
                    image
                    login
                    active
                  }
                }                                    
            }
            summary
            tasks {
                teamMembers {
                    id
                    type
                    user {
                        id
                        name
                        login
                        image
                    }
                    group {
                      id
                      name
                      users {
                        id
                        name
                        image
                        login
                        active
                      }
                    }
                }
                id
                priority
                assignee {
                    id
                    login
                    name
                    image
                }
                name
                variable {
                    completion
                }
                endDate
            }
            status {
                lastUpdate
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
        }
    }
`;

exports.default = _default;