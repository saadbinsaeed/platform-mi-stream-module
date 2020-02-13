"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query eventsQuery($page: Int, $pageSize: Int, $where: [JSON], $orderBy: [JSON], $countMax: Int) {
  count: count(entity: "event", filterBy: $where, max: $countMax)
  records: events(page: $page, itemsPerPage: $pageSize, filterBy: $where, orderBy: $orderBy) {
    id,
    deviceFound,
    device {
      id
      name
      active
      thingId
      description
      modifiedDate
      active
      attributes(fields: ["Sites/tenants", "Sites/vendor", "Sites/region", "Sites/old_ihs_id"])
    },
    status,
    severity,
    description,
    eventDate,
    streamReceivedDate,
    modifiedDate,
    updatedBy {
      id
      name
      image
    },
    eventSource {
      name
    },
    sourceDevice,
    streamId,
    alarmCode,
    dataPayload( fields: [ "impact", "type" ]),
    displayPayload
    receivedDate,
    eventType {
      id
      displayExpression
      processDefinitions
    },
    processInstances {
      id
    }
  }
}
`;

exports.default = _default;