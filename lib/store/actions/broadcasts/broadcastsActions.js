"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markBroadcastRead = exports.fetchBroadcastNotification = exports.fetchBroadcastNotifications = exports.saveBroadcast = exports.fetchBroadcast = exports.fetchBroadcastMembers = exports.fetchBroadcastsCalendar = exports.fetchBroadcasts = exports.expandBroadcastMembers = exports.MARK_BROADCAST_READ = exports.MARK_BROADCAST_READ_STARTED = exports.GET_ACTIVE_BROADCASTS = exports.GET_ACTIVE_BROADCASTS_STARTED = exports.EXPAND_BROADCAST_MEMEBERS = exports.GET_BROADCAST_MEMBERS = exports.GET_BROADCAST_MEMBERS_STARTED = exports.SAVE_BROADCAST_STARTED = exports.SAVE_BROADCAST = exports.GET_BROADCAST = exports.GET_BROADCAST_STARTED = exports.GET_BROADCASTS_CALENDAR = exports.GET_BROADCASTS_CALENDAR_STARTED = exports.GET_BROADCASTS = exports.GET_BROADCASTS_STARTED = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _actionUtils = require("app/utils/redux/action-utils");

var _lo = require("app/utils/lo/lo");

var _notifyBroadcast = require("app/utils/notification/notify-broadcast");

var _utils = require("app/utils/utils");

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _client = require("graphql/client");

var _activeBroadcastsQuery = _interopRequireDefault(require("graphql/broadcast/activeBroadcastsQuery"));

var _broadcastQuery = _interopRequireDefault(require("graphql/broadcast/broadcastQuery"));

var _broadcastsQuery = _interopRequireDefault(require("graphql/broadcast/broadcastsQuery"));

var _broadcastsCalendarQuery = _interopRequireDefault(require("graphql/broadcast/broadcastsCalendarQuery"));

var _saveBroadcastMutation = _interopRequireDefault(require("graphql/broadcast/saveBroadcastMutation"));

var _readBroadcastMutation = _interopRequireDefault(require("graphql/broadcast/readBroadcastMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GET_BROADCASTS_STARTED = '@@affectli/broadcasts/GET_BROADCASTS_STARTED';
exports.GET_BROADCASTS_STARTED = GET_BROADCASTS_STARTED;
const GET_BROADCASTS = '@@affectli/broadcasts/GET_BROADCASTS';
exports.GET_BROADCASTS = GET_BROADCASTS;
const GET_BROADCASTS_CALENDAR_STARTED = '@@affectli/broadcasts/GET_BROADCASTS_CALENDAR_STARTED';
exports.GET_BROADCASTS_CALENDAR_STARTED = GET_BROADCASTS_CALENDAR_STARTED;
const GET_BROADCASTS_CALENDAR = '@@affectli/broadcasts/GET_BROADCASTS_CALENDAR';
exports.GET_BROADCASTS_CALENDAR = GET_BROADCASTS_CALENDAR;
const GET_BROADCAST_STARTED = '@@affectli/broadcasts/GET_BROADCAST_STARTED';
exports.GET_BROADCAST_STARTED = GET_BROADCAST_STARTED;
const GET_BROADCAST = '@@affectli/broadcasts/GET_BROADCAST';
exports.GET_BROADCAST = GET_BROADCAST;
const SAVE_BROADCAST = '@@affectli/broadcasts/SAVE_BROADCAST';
exports.SAVE_BROADCAST = SAVE_BROADCAST;
const SAVE_BROADCAST_STARTED = '@@affectli/broadcasts/SAVE_BROADCAST_STARTED';
exports.SAVE_BROADCAST_STARTED = SAVE_BROADCAST_STARTED;
const GET_BROADCAST_MEMBERS_STARTED = '@@affectli/broadcasts/GET_BROADCAST_MEMBERS_STARTED';
exports.GET_BROADCAST_MEMBERS_STARTED = GET_BROADCAST_MEMBERS_STARTED;
const GET_BROADCAST_MEMBERS = '@@affectli/broadcasts/GET_BROADCAST_MEMBERS';
exports.GET_BROADCAST_MEMBERS = GET_BROADCAST_MEMBERS;
const EXPAND_BROADCAST_MEMEBERS = '@@affectli/broadcasts/EXPAND_BROADCAST_MEMEBERS';
exports.EXPAND_BROADCAST_MEMEBERS = EXPAND_BROADCAST_MEMEBERS;
const GET_ACTIVE_BROADCASTS_STARTED = '@@affectli/broadcasts/GET_BROADCASTS_NOTIFICATIONS_STARTED';
exports.GET_ACTIVE_BROADCASTS_STARTED = GET_ACTIVE_BROADCASTS_STARTED;
const GET_ACTIVE_BROADCASTS = '@@affectli/broadcasts/GET_BROADCASTS_NOTIFICATIONS';
exports.GET_ACTIVE_BROADCASTS = GET_ACTIVE_BROADCASTS;
const MARK_BROADCAST_READ_STARTED = '@@affectli/broadcasts/MARK_BROADCAST_READ_STARTED';
exports.MARK_BROADCAST_READ_STARTED = MARK_BROADCAST_READ_STARTED;
const MARK_BROADCAST_READ = '@@affectli/broadcasts/MARK_BROADCAST_READ';
exports.MARK_BROADCAST_READ = MARK_BROADCAST_READ;

const expandBroadcastMembers = (broadcastId, expandedRows) => dispatch => {
  if (!broadcastId) {
    throw new Error('Ths broadcastId is mandatory.');
  }

  dispatch({
    type: EXPAND_BROADCAST_MEMEBERS,
    payload: (0, _Immutable.default)({
      broadcastId,
      expandedRows
    })
  });
};
/**
 * Loads the broadcasts for the DataTable
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */


exports.expandBroadcastMembers = expandBroadcastMembers;

const fetchBroadcasts = options => {
  const variables = new _OptionsBuilder.default(options, {
    legacyWhere: true
  }).filter({
    field: 'priority',
    op: '=',
    value: 'broadcast'
  }).build();
  return (0, _actionUtils.loadTableData)(GET_BROADCASTS_STARTED, GET_BROADCASTS, _broadcastsQuery.default)(variables);
};
/**
 * Loads the broadcasts for the Calendar
 *
 * @param options the options ({ where, orderBy })
 */


exports.fetchBroadcasts = fetchBroadcasts;
const fetchBroadcastsCalendar = (0, _actionUtils.loadData)(GET_BROADCASTS_CALENDAR_STARTED, GET_BROADCASTS_CALENDAR, _broadcastsCalendarQuery.default);
exports.fetchBroadcastsCalendar = fetchBroadcastsCalendar;

const fetchBroadcastMembers = broadcastId => dispatch => {
  if (!broadcastId) {
    throw new Error('Ths broadcastId is mandatory.');
  }

  dispatch({
    type: GET_BROADCAST_MEMBERS_STARTED,
    meta: {
      broadcastId
    }
  });

  _HttpFetch.default.postResource('api/jrp/broadcasts/members', {
    where: [{
      field: 'broadcast_id',
      op: '=',
      value: broadcastId
    }],
    kendo: false
  }).then(response => {
    dispatch({
      type: GET_BROADCAST_MEMBERS,
      payload: (0, _Immutable.default)(response),
      meta: {
        broadcastId
      }
    });
  }).catch(error => {
    dispatch({
      type: GET_BROADCAST_MEMBERS,
      payload: error,
      error: true,
      meta: {
        broadcastId
      }
    });
  });
};
/**
 * Fetch the specified broadcast.
 */


exports.fetchBroadcastMembers = fetchBroadcastMembers;
const fetchBroadcast = (0, _actionUtils.loadData)(GET_BROADCAST_STARTED, GET_BROADCAST, _broadcastQuery.default);
/**
 * Saves (creates or updates) the specified broadcast.
 */

exports.fetchBroadcast = fetchBroadcast;

const saveBroadcast = record => (0, _actionUtils.mutateData)(SAVE_BROADCAST_STARTED, SAVE_BROADCAST, _saveBroadcastMutation.default, 'Broadcast correctly saved.')({
  record
});

exports.saveBroadcast = saveBroadcast;

const fetchBroadcastNotifications = () => {
  return dispatch => {
    dispatch({
      type: GET_ACTIVE_BROADCASTS_STARTED
    });

    _client.graphql.query({
      query: _activeBroadcastsQuery.default,
      fetchPolicy: 'no-cache'
    }).then(response => {
      // show the broadcast notifications
      const broadcasts = (0, _utils.getArray)(response, 'data.broadcasts') || [];
      (0, _notifyBroadcast.notifyBroadcasts)(broadcasts);
      dispatch({
        type: GET_ACTIVE_BROADCASTS,
        payload: (0, _Immutable.default)((0, _lo.get)(response, 'data'))
      });
    }).catch(error => {
      dispatch({
        type: GET_ACTIVE_BROADCASTS,
        payload: error,
        error: true
      });
    });
  };
};
/**
 * Fetch Single Broadcast Notification
 */


exports.fetchBroadcastNotifications = fetchBroadcastNotifications;

const fetchBroadcastNotification = ({
  page = 1,
  pageSize = 10,
  orderBy,
  where
} = {}) => {
  return dispatch => {
    dispatch({
      type: GET_ACTIVE_BROADCASTS_STARTED
    });

    _HttpFetch.default.postResource('api/jrp/broadcasts/members', {
      kendo: false,
      orderBy,
      where
    }).then(data => {
      dispatch({
        type: GET_ACTIVE_BROADCASTS,
        payload: (0, _Immutable.default)(data)
      });
    }).catch(error => {
      dispatch({
        type: GET_ACTIVE_BROADCASTS,
        payload: error,
        error: true
      });
    });
  };
};
/**
 * Save broadcast notification
 */


exports.fetchBroadcastNotification = fetchBroadcastNotification;

const markBroadcastRead = id => dispatch => {
  dispatch({
    type: MARK_BROADCAST_READ_STARTED
  });
  return _client.graphql.mutate({
    mutation: _readBroadcastMutation.default,
    variables: {
      id
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: MARK_BROADCAST_READ,
      payload: (0, _lo.get)(response, 'data.result'),
      meta: (0, _Immutable.default)({
        successMessage: 'Broadcast marked as read.'
      })
    });
  }).catch(error => {
    dispatch({
      type: MARK_BROADCAST_READ,
      payload: error,
      error: true
    });
    return error;
  });
};

exports.markBroadcastRead = markBroadcastRead;