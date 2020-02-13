"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadProcessesDone = exports.loadProcessesMemberOf = exports.loadProcessesOwned = exports.loadProcessesAssigned = exports.loadTasksDone = exports.loadTasksMemberOf = exports.loadTasksOwned = exports.loadTasksAssigned = exports.LOAD_PROCESSES_DONE = exports.LOAD_PROCESSES_DONE_STARTED = exports.LOAD_PROCESSES_FOLLOWING = exports.LOAD_PROCESSES_FOLLOWING_STARTED = exports.LOAD_PROCESSES_OWNED = exports.LOAD_PROCESSES_OWNED_STARTED = exports.LOAD_PROCESSES_ASSIGNED = exports.LOAD_PROCESSES_ASSIGNED_STARTED = exports.LOAD_TASKS_DONE = exports.LOAD_TASKS_DONE_STARTED = exports.LOAD_TASKS_FOLLOWING = exports.LOAD_TASKS_FOLLOWING_STARTED = exports.LOAD_TASKS_OWNED = exports.LOAD_TASKS_OWNED_STARTED = exports.LOAD_TASKS_ASSIGNED = exports.LOAD_TASKS_ASSIGNED_STARTED = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _actionUtils = require("app/utils/redux/action-utils");

var _dashboardTasksQuery = _interopRequireDefault(require("graphql/dashboard/dashboardTasksQuery"));

var _dashboardTasksLinksQuery = _interopRequireDefault(require("graphql/dashboard/dashboardTasksLinksQuery"));

var _dashboardProcessesQuery = _interopRequireDefault(require("graphql/dashboard/dashboardProcessesQuery"));

var _dashboardProcessesLinksQuery = _interopRequireDefault(require("graphql/dashboard/dashboardProcessesLinksQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_TASKS_ASSIGNED_STARTED = '@@affectli/dashboard/LOAD_TASKS_ASSIGNED_STARTED';
exports.LOAD_TASKS_ASSIGNED_STARTED = LOAD_TASKS_ASSIGNED_STARTED;
const LOAD_TASKS_ASSIGNED = '@@affectli/dashboard/LOAD_TASKS_ASSIGNED';
exports.LOAD_TASKS_ASSIGNED = LOAD_TASKS_ASSIGNED;
const LOAD_TASKS_OWNED_STARTED = '@@affectli/dashboard/LOAD_TASKS_OWNED_STARTED';
exports.LOAD_TASKS_OWNED_STARTED = LOAD_TASKS_OWNED_STARTED;
const LOAD_TASKS_OWNED = '@@affectli/dashboard/LOAD_TASKS_OWNED';
exports.LOAD_TASKS_OWNED = LOAD_TASKS_OWNED;
const LOAD_TASKS_FOLLOWING_STARTED = '@@affectli/dashboard/LOAD_TASKS_FOLLOWING_STARTED';
exports.LOAD_TASKS_FOLLOWING_STARTED = LOAD_TASKS_FOLLOWING_STARTED;
const LOAD_TASKS_FOLLOWING = '@@affectli/dashboard/LOAD_TASKS_FOLLOWING';
exports.LOAD_TASKS_FOLLOWING = LOAD_TASKS_FOLLOWING;
const LOAD_TASKS_DONE_STARTED = '@@affectli/dashboard/LOAD_TASKS_DONE_STARTED';
exports.LOAD_TASKS_DONE_STARTED = LOAD_TASKS_DONE_STARTED;
const LOAD_TASKS_DONE = '@@affectli/dashboard/LOAD_TASKS_DONE';
exports.LOAD_TASKS_DONE = LOAD_TASKS_DONE;
const LOAD_PROCESSES_ASSIGNED_STARTED = '@@affectli/dashboard/LOAD_PROCESSES_ASSIGNED_STARTED';
exports.LOAD_PROCESSES_ASSIGNED_STARTED = LOAD_PROCESSES_ASSIGNED_STARTED;
const LOAD_PROCESSES_ASSIGNED = '@@affectli/dashboard/LOAD_PROCESSES_ASSIGNED';
exports.LOAD_PROCESSES_ASSIGNED = LOAD_PROCESSES_ASSIGNED;
const LOAD_PROCESSES_OWNED_STARTED = '@@affectli/dashboard/LOAD_PROCESSES_OWNED_STARTED';
exports.LOAD_PROCESSES_OWNED_STARTED = LOAD_PROCESSES_OWNED_STARTED;
const LOAD_PROCESSES_OWNED = '@@affectli/dashboard/LOAD_PROCESSES_OWNED';
exports.LOAD_PROCESSES_OWNED = LOAD_PROCESSES_OWNED;
const LOAD_PROCESSES_FOLLOWING_STARTED = '@@affectli/dashboard/LOAD_PROCESSES_FOLLOWING_STARTED';
exports.LOAD_PROCESSES_FOLLOWING_STARTED = LOAD_PROCESSES_FOLLOWING_STARTED;
const LOAD_PROCESSES_FOLLOWING = '@@affectli/dashboard/LOAD_PROCESSES_FOLLOWING';
exports.LOAD_PROCESSES_FOLLOWING = LOAD_PROCESSES_FOLLOWING;
const LOAD_PROCESSES_DONE_STARTED = '@@affectli/dashboard/LOAD_PROCESSES_DONE_STARTED';
exports.LOAD_PROCESSES_DONE_STARTED = LOAD_PROCESSES_DONE_STARTED;
const LOAD_PROCESSES_DONE = '@@affectli/dashboard/LOAD_PROCESSES_DONE';
/**
 * Loads the assigned tasks.
 */

exports.LOAD_PROCESSES_DONE = LOAD_PROCESSES_DONE;

const loadTasksAssigned = (user, options = {}) => {
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is null'
  }).filter({
    field: 'assignee.activitiId',
    op: '=',
    value: user.activitiId
  }).defaultOrder({
    field: 'startDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardTasksLinksQuery.default : _dashboardTasksQuery.default;
  return (0, _actionUtils.loadData)(LOAD_TASKS_ASSIGNED_STARTED, LOAD_TASKS_ASSIGNED, query)(variables);
};
/**
 * Loads the owned tasks.
 */


exports.loadTasksAssigned = loadTasksAssigned;

const loadTasksOwned = (user, options = {}) => {
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is null'
  }).filter({
    field: 'owner.activitiId',
    op: '=',
    value: user.activitiId
  }).defaultOrder({
    field: 'startDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardTasksLinksQuery.default : _dashboardTasksQuery.default;
  return (0, _actionUtils.loadData)(LOAD_TASKS_OWNED_STARTED, LOAD_TASKS_OWNED, query)(variables);
};
/**
 * Loads the member of tasks.
 */


exports.loadTasksOwned = loadTasksOwned;

const loadTasksMemberOf = (user, options = {}) => {
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is null'
  }).filter({
    field: 'assignee.activitiId',
    op: '<>',
    value: user.activitiId
  }).filter({
    field: 'owner.activitiId',
    op: '<>',
    value: user.activitiId
  }).defaultOrder({
    field: 'startDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardTasksLinksQuery.default : _dashboardTasksQuery.default;
  return (0, _actionUtils.loadData)(LOAD_TASKS_FOLLOWING_STARTED, LOAD_TASKS_FOLLOWING, query)(variables);
};
/**
 * Loads the done tasks.
 */


exports.loadTasksMemberOf = loadTasksMemberOf;

const loadTasksDone = (options = {}) => {
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is not null'
  }).defaultOrder({
    field: 'startDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardTasksLinksQuery.default : _dashboardTasksQuery.default;
  return (0, _actionUtils.loadData)(LOAD_TASKS_DONE_STARTED, LOAD_TASKS_DONE, query)(variables);
};
/**
 * Loads the assigned processes.
 */


exports.loadTasksDone = loadTasksDone;

const loadProcessesAssigned = (user, options = {}) => {
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is null'
  }).filter({
    field: 'tasks.assignee.activitiId',
    op: '=',
    value: user.activitiId
  }).defaultOrder({
    field: 'createDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardProcessesLinksQuery.default : _dashboardProcessesQuery.default;
  return (0, _actionUtils.loadData)(LOAD_PROCESSES_ASSIGNED_STARTED, LOAD_PROCESSES_ASSIGNED, query)(variables);
};
/**
 * Loads the owned processes.
 */


exports.loadProcessesAssigned = loadProcessesAssigned;

const loadProcessesOwned = (user, options = {}) => {
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is null'
  }).filter({
    field: 'createdBy.activitiId',
    op: '=',
    value: user.activitiId
  }).defaultOrder({
    field: 'createDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardProcessesLinksQuery.default : _dashboardProcessesQuery.default;
  return (0, _actionUtils.loadData)(LOAD_PROCESSES_OWNED_STARTED, LOAD_PROCESSES_OWNED, query)(variables);
};
/**
 * Loads the member of processes.
 */


exports.loadProcessesOwned = loadProcessesOwned;

const loadProcessesMemberOf = (user, options = {}) => {
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is null'
  }).filter({
    field: 'createdBy.activitiId',
    op: '<>',
    value: user.activitiId
  }).filter({
    field: 'tasks.assignee.activitiId',
    op: '<>',
    value: user.activitiId
  }).defaultOrder({
    field: 'createDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardProcessesLinksQuery.default : _dashboardProcessesQuery.default;
  return (0, _actionUtils.loadData)(LOAD_PROCESSES_FOLLOWING_STARTED, LOAD_PROCESSES_FOLLOWING, query)(variables);
};
/**
 * Loads the done processes.
 */


exports.loadProcessesMemberOf = loadProcessesMemberOf;

const loadProcessesDone = (userId, options = {}) => {
  const twoMonthsAgo = (0, _moment.default)().startOf('day').subtract(2, 'months').toDate();
  const {
    linkOnly,
    ...opts
  } = options;
  const variables = new _OptionsBuilder.default(opts).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: '>',
    value: twoMonthsAgo
  }).defaultOrder({
    field: 'createDate',
    asc: false
  }).build();
  const query = linkOnly ? _dashboardProcessesLinksQuery.default : _dashboardProcessesQuery.default;
  return (0, _actionUtils.loadData)(LOAD_PROCESSES_DONE_STARTED, LOAD_PROCESSES_DONE, query)(variables);
};

exports.loadProcessesDone = loadProcessesDone;