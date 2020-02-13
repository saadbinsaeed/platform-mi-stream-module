"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query processesQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
  count: count(entity: "process", filterBy: $where, max: $countMax)
  records: processes(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
    id
    businessKey
    name
    processDefinition {
      name
      deployedModel {
        modelData(fields: ["icon"])
      }
    }
    createdBy {
      id
      name
      image
    }
    createDate
    endDate
    status {
      lastUpdate
      initiatedBy {
       id
      }
      payload(fields: ["maintenancesite.region", "maintenancesite.tenants[*].tenant_id", "maintenancesite.fse_obj.display_name", "maintenancesite.rto_obj.display_name", "maintenancesite.sfom_obj.display_name", "maintenancesite.new_ihs_id", "selectedTenants[*].tenant_id"])
    }
    tasks {
      id
    }
    variables(fields: ["progress", "priority"])
  }

}
`;

exports.default = _default;