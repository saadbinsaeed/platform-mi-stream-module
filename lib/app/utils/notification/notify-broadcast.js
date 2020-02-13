"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifyBroadcasts = void 0;

var _readBroadcastMutation = _interopRequireDefault(require("graphql/broadcast/readBroadcastMutation"));

var _client = require("graphql/client");

var _notification = require("./notification");

var _utils = require("app/utils/utils");

var _Immutable = require("app/utils/immutable/Immutable");

var _notificationUtils = require("app/utils/notification/notificationUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const markBroadcastRead = id => _client.graphql.mutate({
  mutation: _readBroadcastMutation.default,
  variables: {
    id
  },
  fetchPolicy: 'no-cache'
}).catch(error => {
  // TODO: do we have to show a toastr?
  console.error(error); // eslint-disable-line no-console
});

if ('BroadcastChannel' in window) {
  const channel = new window.BroadcastChannel('sw-messages');
  channel.addEventListener('message', event => {
    const {
      action,
      data: {
        id
      }
    } = event.data || {};

    if (id && action === 'markBroadcastRead') {
      markBroadcastRead(id);
    }
  });
}

const notifyBroadcasts = broadcasts => {
  broadcasts.filter(({
    broadcast
  }) => broadcast.priority !== 'broadcast').forEach(({
    broadcast: {
      id,
      message,
      priority,
      actionData,
      actionType
    }
  }) => {
    const title = priority ? `Priority: ${priority}` : 'Message';
    const url = (0, _notificationUtils.getCustomAction)(actionData, actionType);
    const isNewWindow = (0, _notificationUtils.isNewWindowNeeded)(actionType);
    let notificationData = {
      tag: `broadcast_${id}`,
      body: message,
      requireInteraction: true,
      data: {
        id,
        closeAction: 'markBroadcastRead',
        isNewWindow
      },
      sound: priority
    };

    if ((0, _utils.isDefined)(url)) {
      notificationData = (0, _Immutable.set)(notificationData, 'data.link', url);
    }

    (0, _notification.notify)(title, notificationData);
  });
};

exports.notifyBroadcasts = notifyBroadcasts;