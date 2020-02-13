"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    query subprocessesQuery($page: Int = 1, $itemsPerPage: Int = 10, $filterBy: [JSON] = []) {
        result: processes(page: $page, itemsPerPage: $itemsPerPage, filterBy: $filterBy) {
            id
            name
            endDate
            createdBy {
                id
                image
                login
                name
            }
            createDate
            processDefinition {
                deployedModel {
                    modelData(fields: ["icon", "iconColor"])
                }
            }
            variables(fields: ["progress", "priority"])
            status {
                lastUpdate
            }
        }
    }
`;

exports.default = _default;