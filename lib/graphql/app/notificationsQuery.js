"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query notificationsQuery {
  tasks: lastMinuteActiveTasks {
    id
    name
    description
    assignee {
      login
    }
    owner {
      login
    }
  }
  broadcasts: activeBroadcasts {
    broadcast {
      id
      message
      priority
      actionType
      actionData
    }
  }
}
`;

exports.default = _default;