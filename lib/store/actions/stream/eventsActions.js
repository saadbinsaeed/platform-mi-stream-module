"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTranslationRuleDescription = exports.loadVTR = exports.loadEventProcesses = exports.eventStartProcess = exports.updateEventStatus = exports.loadEvents = exports.LOAD_TRANSLATION_RULE = exports.LOAD_TRANSLATION_RULE_STARTED = exports.LOAD_VTR = exports.LOAD_VTR_STARTED = exports.UPDATE_EVENT_STATUS = exports.UPDATE_EVENT_STATUS_STARTED = exports.LOAD_EVENTS = exports.LOAD_EVENTS_STARTED = exports.LOAD_EVENT_PROCESSES = exports.LOAD_EVENT_PROCESSES_STARTED = exports.EVENT_START_PROCESS = exports.EVENT_START_PROCESS_STARTED = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _client = require("graphql/client");

var _eventsQuery = _interopRequireDefault(require("graphql/stream/event/eventsQuery"));

var _eventProcessesQuery = _interopRequireDefault(require("graphql/stream/event/eventProcessesQuery"));

var _vtrQuery = _interopRequireDefault(require("graphql/stream/event/vtrQuery"));

var _actionUtils = require("app/utils/redux/action-utils");

var _translationRuleQuery = _interopRequireDefault(require("graphql/stream/event/translationRuleQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EVENT_START_PROCESS_STARTED = '@@affectli/stream/events/EVENT_START_PROCESS_STARTED';
exports.EVENT_START_PROCESS_STARTED = EVENT_START_PROCESS_STARTED;
const EVENT_START_PROCESS = '@@affectli/stream/events/EVENT_START_PROCESS';
exports.EVENT_START_PROCESS = EVENT_START_PROCESS;
const LOAD_EVENT_PROCESSES_STARTED = '@@affectli/stream/events/processes/LOAD_PROCESSES_STARTED';
exports.LOAD_EVENT_PROCESSES_STARTED = LOAD_EVENT_PROCESSES_STARTED;
const LOAD_EVENT_PROCESSES = '@@affectli/stream/processes/LOAD_PROCESSES';
exports.LOAD_EVENT_PROCESSES = LOAD_EVENT_PROCESSES;
const LOAD_EVENTS_STARTED = '@@affectli/stream/LOAD_EVENTS_STARTED';
exports.LOAD_EVENTS_STARTED = LOAD_EVENTS_STARTED;
const LOAD_EVENTS = '@@affectli/stream/LOAD_EVENTS';
exports.LOAD_EVENTS = LOAD_EVENTS;
const UPDATE_EVENT_STATUS_STARTED = '@@affectli/stream/events/UPDATE_EVENT_STATUS_STARTED';
exports.UPDATE_EVENT_STATUS_STARTED = UPDATE_EVENT_STATUS_STARTED;
const UPDATE_EVENT_STATUS = '@@affectli/stream/events/UPDATE_EVENT_STATUS';
exports.UPDATE_EVENT_STATUS = UPDATE_EVENT_STATUS;
const LOAD_VTR_STARTED = '@@affectli/stream/events/LOAD_VTR_STARTED';
exports.LOAD_VTR_STARTED = LOAD_VTR_STARTED;
const LOAD_VTR = '@@affectli/stream/events/LOAD_VTR';
exports.LOAD_VTR = LOAD_VTR;
const LOAD_TRANSLATION_RULE_STARTED = '@@affectli/stream/events/LOAD_TRANSLATION_RULE_STARTED';
exports.LOAD_TRANSLATION_RULE_STARTED = LOAD_TRANSLATION_RULE_STARTED;
const LOAD_TRANSLATION_RULE = '@@affectli/stream/translationRule/LOAD_TRANSLATION_RULE';
/**
 * Load the data for the DataTable in the Events Monitor view
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */

exports.LOAD_TRANSLATION_RULE = LOAD_TRANSLATION_RULE;
const loadEvents = (0, _actionUtils.loadTableData)(LOAD_EVENTS_STARTED, LOAD_EVENTS, _eventsQuery.default, 1000);
/**
 * Events actions
 *
 * @param status the params to attach to the query string
 * @param eventId the query's options
 */

exports.loadEvents = loadEvents;

const updateEventStatus = status => dispatch => {
  dispatch({
    type: UPDATE_EVENT_STATUS_STARTED
  });
  return _HttpFetch.default.postResource('api/rpc?proc_name=events', status).then(response => {
    const successMessage = `Status changed to ${status.status} of event ${status.eventId}`;
    dispatch({
      type: UPDATE_EVENT_STATUS,
      payload: (0, _Immutable.default)(response.data),
      meta: (0, _Immutable.default)({
        successMessage
      })
    });
  }).catch(error => {
    dispatch({
      type: UPDATE_EVENT_STATUS,
      payload: (0, _Immutable.default)(error),
      error: true
    });
  });
};
/**
 * Events start process
 *
 * @param params the params to attach to the query string
 */


exports.updateEventStatus = updateEventStatus;

const eventStartProcess = (message, params) => dispatch => {
  dispatch({
    type: EVENT_START_PROCESS_STARTED
  });
  return _HttpFetch.default.putResource(`activiti-app/app/rest/message/${message}`, params).then(resp => {
    dispatch({
      type: EVENT_START_PROCESS,
      payload: (0, _Immutable.default)(resp),
      meta: (0, _Immutable.default)({
        successMessage: 'Started process'
      })
    });
  }).catch(error => {
    dispatch({
      type: EVENT_START_PROCESS,
      payload: (0, _Immutable.default)(error),
      error: true
    });
  });
};
/**
 * Load a list of processes
 * @param options { Object } contains information for page, itemsPerPage ...
 */


exports.eventStartProcess = eventStartProcess;

const loadEventProcesses = processesIds => dispatch => {
  dispatch({
    type: LOAD_EVENT_PROCESSES_STARTED
  });
  const variables = {
    where: [{
      field: 'id',
      op: 'in',
      value: processesIds
    }]
  };

  _client.graphql.query({
    query: _eventProcessesQuery.default,
    variables,
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: LOAD_EVENT_PROCESSES,
      payload: (0, _Immutable.default)(response && response.data)
    });
  }).catch(error => {
    dispatch({
      type: LOAD_EVENT_PROCESSES,
      payload: error,
      error: true
    });
  });
};

exports.loadEventProcesses = loadEventProcesses;

const loadVTR = () => (0, _actionUtils.loadData)(LOAD_VTR_STARTED, LOAD_VTR, _vtrQuery.default)({
  filterBy: [{
    field: 'uri',
    op: 'in',
    value: ['UMS/Vendor', 'UMS/Tenant', 'region']
  }]
});

exports.loadVTR = loadVTR;

const loadTranslationRule = key => (0, _actionUtils.loadData)(LOAD_TRANSLATION_RULE_STARTED, LOAD_TRANSLATION_RULE, _translationRuleQuery.default)({
  filterBy: [{
    field: 'classes.uri',
    op: '=',
    value: 'translation_rule'
  }, {
    field: 'active',
    op: '=',
    value: true
  }],
  groupBy: [{
    field: `attributes.translation_rule/${key}`,
    alias: 'translation'
  }],
  orderBy: [{
    field: `attributes.translation_rule/${key}`,
    direction: 'asc'
  }]
});

const loadTranslationRuleDescription = () => loadTranslationRule('description');

exports.loadTranslationRuleDescription = loadTranslationRuleDescription;