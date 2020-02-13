"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveProcessPageView = exports.setProcessPriority = exports.cancelProcess = exports.removeTeamMember = exports.addTeamMember = exports.loadSubprocesses = exports.loadStartedProcessDetails = exports.loadProcessDetails = exports.outdateProcessDetails = exports.loadExpandedProcess = exports.loadProcessesCards = exports.loadProcesses = exports.loadProcessChangelog = exports.LOAD_PROCESS_CHANGELOG = exports.LOAD_PROCESS_CHANGELOG_STARTED = exports.LOAD_PROCESSES_CARDS = exports.LOAD_PROCESSES_CARDS_STARTED = exports.SAVE_PROCESS_PAGE_VIEW = exports.SAVE_PROCESS_PAGE_VIEW_STARTED = exports.LOAD_SUBPROCESSES = exports.LOAD_SUBPROCESSES_STARTED = exports.SET_PROCESS_PRIORITY = exports.SET_PROCESS_PRIORITY_STARTED = exports.CANCEL_PROCESS = exports.CANCEL_PROCESS_STARTED = exports.REMOVE_TEAM_MEMBER = exports.REMOVE_TEAM_MEMBER_STARTED = exports.ADD_TEAM_MEMBER = exports.ADD_TEAM_MEMBER_STARTED = exports.LOAD_STARTED_PROCESS_DETAILS = exports.LOAD_STARTED_PROCESS_DETAILS_STARTED = exports.LOAD_PROCESS_DETAILS = exports.LOAD_PROCESS_DETAILS_STARTED = exports.OUTDATE_PROCESS_DETAILS = exports.LOAD_EXPANDED_PROCESS = exports.LOAD_EXPANDED_PROCESS_STARTED = exports.LOAD_PROCESSES = exports.LOAD_PROCESSES_STARTED = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _actionUtils = require("app/utils/redux/action-utils");

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _usersActions = require("store/actions/admin/usersActions");

var _processesQuery = _interopRequireDefault(require("graphql/abox/process/processesQuery"));

var _processesCardsQuery = _interopRequireDefault(require("graphql/abox/process/processesCardsQuery"));

var _processChangelogQuery = _interopRequireDefault(require("graphql/abox/process/processChangelogQuery"));

var _processExpandTasksQuery = _interopRequireDefault(require("graphql/abox/process/processExpandTasksQuery"));

var _processDetailsQuery = _interopRequireDefault(require("graphql/abox/process/processDetailsQuery"));

var _processStartedDetailsQuery = _interopRequireDefault(require("graphql/abox/process/processStartedDetailsQuery"));

var _subprocessesQuery = _interopRequireDefault(require("graphql/abox/process/subprocessesQuery"));

var _addTeamMemberToProcessMutation = _interopRequireDefault(require("graphql/abox/process/addTeamMemberToProcessMutation"));

var _removeTeamMemberFromProcessMutation = _interopRequireDefault(require("graphql/abox/process/removeTeamMemberFromProcessMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_PROCESSES_STARTED = '@@affectli/process/LOAD_PROCESSES_STARTED';
exports.LOAD_PROCESSES_STARTED = LOAD_PROCESSES_STARTED;
const LOAD_PROCESSES = '@@affectli/process/LOAD_PROCESSES';
exports.LOAD_PROCESSES = LOAD_PROCESSES;
const LOAD_EXPANDED_PROCESS_STARTED = '@@affectli/process/LOAD_EXPANDED_PROCESS_STARTED';
exports.LOAD_EXPANDED_PROCESS_STARTED = LOAD_EXPANDED_PROCESS_STARTED;
const LOAD_EXPANDED_PROCESS = '@@affectli/process/LOAD_EXPANDED_PROCESS';
exports.LOAD_EXPANDED_PROCESS = LOAD_EXPANDED_PROCESS;
const OUTDATE_PROCESS_DETAILS = '@@affectli/process/OUTDATE_PROCESS_DETAILS';
exports.OUTDATE_PROCESS_DETAILS = OUTDATE_PROCESS_DETAILS;
const LOAD_PROCESS_DETAILS_STARTED = '@@affectli/process/LOAD_PROCESS_DETAILS_STARTED';
exports.LOAD_PROCESS_DETAILS_STARTED = LOAD_PROCESS_DETAILS_STARTED;
const LOAD_PROCESS_DETAILS = '@@affectli/process/LOAD_PROCESS_DETAILS';
exports.LOAD_PROCESS_DETAILS = LOAD_PROCESS_DETAILS;
const LOAD_STARTED_PROCESS_DETAILS_STARTED = '@@affectli/process/LOAD_STARTED_PROCESS_DETAILS_STARTED';
exports.LOAD_STARTED_PROCESS_DETAILS_STARTED = LOAD_STARTED_PROCESS_DETAILS_STARTED;
const LOAD_STARTED_PROCESS_DETAILS = '@@affectli/process/LOAD_STARTED_PROCESS_DETAILS';
exports.LOAD_STARTED_PROCESS_DETAILS = LOAD_STARTED_PROCESS_DETAILS;
const ADD_TEAM_MEMBER_STARTED = '@@affectli/process/ADD_TEAM_MEMBER_STARTED';
exports.ADD_TEAM_MEMBER_STARTED = ADD_TEAM_MEMBER_STARTED;
const ADD_TEAM_MEMBER = '@@affectli/process/ADD_TEAM_MEMBER';
exports.ADD_TEAM_MEMBER = ADD_TEAM_MEMBER;
const REMOVE_TEAM_MEMBER_STARTED = '@@affectli/process/REMOVE_TEAM_MEMBER_STARTED';
exports.REMOVE_TEAM_MEMBER_STARTED = REMOVE_TEAM_MEMBER_STARTED;
const REMOVE_TEAM_MEMBER = '@@affectli/process/REMOVE_TEAM_MEMBER';
exports.REMOVE_TEAM_MEMBER = REMOVE_TEAM_MEMBER;
const CANCEL_PROCESS_STARTED = '@@affectli/process/CANCEL_PROCESS_STARTED';
exports.CANCEL_PROCESS_STARTED = CANCEL_PROCESS_STARTED;
const CANCEL_PROCESS = '@@affectli/process/CANCEL_PROCESS';
exports.CANCEL_PROCESS = CANCEL_PROCESS;
const SET_PROCESS_PRIORITY_STARTED = '@@affectli/process/SET_PROCESS_PRIORITY_STARTED';
exports.SET_PROCESS_PRIORITY_STARTED = SET_PROCESS_PRIORITY_STARTED;
const SET_PROCESS_PRIORITY = '@@affectli/process/SET_PROCESS_PRIORITY';
exports.SET_PROCESS_PRIORITY = SET_PROCESS_PRIORITY;
const LOAD_SUBPROCESSES_STARTED = '@@affectli/process/LOAD_SUBPROCESSES_STARTED';
exports.LOAD_SUBPROCESSES_STARTED = LOAD_SUBPROCESSES_STARTED;
const LOAD_SUBPROCESSES = '@@affectli/process/LOAD_SUBPROCESSES';
exports.LOAD_SUBPROCESSES = LOAD_SUBPROCESSES;
const SAVE_PROCESS_PAGE_VIEW_STARTED = '@@affectli/process/SAVE_PROCESS_PAGE_VIEW_STARTED';
exports.SAVE_PROCESS_PAGE_VIEW_STARTED = SAVE_PROCESS_PAGE_VIEW_STARTED;
const SAVE_PROCESS_PAGE_VIEW = '@@affectli/process/SAVE_PROCESS_PAGE_VIEW';
exports.SAVE_PROCESS_PAGE_VIEW = SAVE_PROCESS_PAGE_VIEW;
const LOAD_PROCESSES_CARDS_STARTED = '@@affectli/abox/LOAD_PROCESSES_CARDS_STARTED';
exports.LOAD_PROCESSES_CARDS_STARTED = LOAD_PROCESSES_CARDS_STARTED;
const LOAD_PROCESSES_CARDS = '@@affectli/abox/LOAD_PROCESSES_CARDS';
exports.LOAD_PROCESSES_CARDS = LOAD_PROCESSES_CARDS;
const LOAD_PROCESS_CHANGELOG_STARTED = '@@affectli/task/LOAD_TASK_CHANGELOG_STARTED';
exports.LOAD_PROCESS_CHANGELOG_STARTED = LOAD_PROCESS_CHANGELOG_STARTED;
const LOAD_PROCESS_CHANGELOG = '@@affectli/task/LOAD_TASK_CHANGELOG';
/**
 * Fetch the process changelog.
 *
 * @param id the process ID.
 */

exports.LOAD_PROCESS_CHANGELOG = LOAD_PROCESS_CHANGELOG;

const loadProcessChangelog = (id, options) => dispatch => {
  dispatch({
    type: LOAD_PROCESS_CHANGELOG_STARTED
  });
  return _client.graphql.query({
    query: _processChangelogQuery.default,
    variables: {
      id,
      ...options
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    const payload = {
      changes: (0, _lo.get)(response, 'data.process.changelog'),
      startIndex: options.startIndex,
      count: (0, _lo.get)(response, 'data.count')
    };
    dispatch({
      type: LOAD_PROCESS_CHANGELOG,
      payload
    });
  }).catch(error => {
    dispatch({
      type: LOAD_PROCESS_CHANGELOG,
      payload: error,
      error: true
    });
  });
};
/**
 * Load the Abox processes for the DataTable
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */


exports.loadProcessChangelog = loadProcessChangelog;
const loadProcesses = (0, _actionUtils.loadTableData)(LOAD_PROCESSES_STARTED, LOAD_PROCESSES, _processesQuery.default);
/**
 * Load the Abox Card View
 */

exports.loadProcesses = loadProcesses;

const loadProcessesCards = (options = {}) => {
  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).filter({
    field: 'endDate',
    op: 'is null'
  }).build();
  return (0, _actionUtils.loadData)(LOAD_PROCESSES_CARDS_STARTED, LOAD_PROCESSES_CARDS, _processesCardsQuery.default)({ ...variables,
    startIndex: options.startIndex
  });
};
/**
 * Load the Abox Expanded Process List
 */


exports.loadProcessesCards = loadProcessesCards;

const loadExpandedProcess = processId => (dispatch, getState) => {
  if (!processId) {
    throw new Error('The processId is mandatory.');
  }

  dispatch({
    type: LOAD_EXPANDED_PROCESS_STARTED,
    meta: (0, _Immutable.default)({
      processId
    })
  });

  _client.graphql.query({
    query: _processExpandTasksQuery.default,
    variables: {
      filterBy: [{
        field: 'process.id',
        op: '=',
        value: processId
      }]
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: LOAD_EXPANDED_PROCESS,
      payload: (0, _Immutable.default)((0, _lo.get)(response, 'data.tasks')),
      meta: (0, _Immutable.default)({
        processId
      })
    });
  }).catch(error => {
    dispatch({
      type: LOAD_EXPANDED_PROCESS,
      payload: error,
      error: true,
      meta: (0, _Immutable.default)({
        processId
      })
    });
  });
};
/**
 * Sets the process details as outdated.
 */


exports.loadExpandedProcess = loadExpandedProcess;

const outdateProcessDetails = (id, outdate = true) => (dispatch, getState) => {
  if (id && id === (0, _lo.get)(getState(), 'abox.process.details.data.id')) {
    dispatch({
      type: OUTDATE_PROCESS_DETAILS,
      payload: outdate
    });
  }
};
/**
 * Loads the process details.
 */


exports.outdateProcessDetails = outdateProcessDetails;

const loadProcessDetails = id => (dispatch, getState) => {
  return (0, _actionUtils.loadData)(LOAD_PROCESS_DETAILS_STARTED, LOAD_PROCESS_DETAILS, _processDetailsQuery.default)({
    id
  })(dispatch, getState).then(() => outdateProcessDetails(id, false)(dispatch, getState));
};
/**
 * Load the Abox Process Details after process is started
 */


exports.loadProcessDetails = loadProcessDetails;

const loadStartedProcessDetails = processId => (dispatch, getState) => {
  if (!processId) {
    dispatch({
      type: LOAD_STARTED_PROCESS_DETAILS_STARTED
    });
    dispatch({
      type: LOAD_STARTED_PROCESS_DETAILS,
      payload: []
    });
    return Promise.resolve(null);
  }

  const queryOptions = {
    filterBy: [{
      field: 'process.id',
      op: '=',
      value: processId
    }]
  };
  return (0, _actionUtils.loadData)(LOAD_STARTED_PROCESS_DETAILS_STARTED, LOAD_STARTED_PROCESS_DETAILS, _processStartedDetailsQuery.default)(queryOptions)(dispatch, getState);
};
/**
 * Load the Abox Process Activities List
 */


exports.loadStartedProcessDetails = loadStartedProcessDetails;

const loadSubprocesses = (id = '') => {
  const variables = new _OptionsBuilder.default().filter({
    field: 'status.initiatedByProcessId',
    op: '=',
    value: id
  }).build();
  return (0, _actionUtils.loadData)(LOAD_SUBPROCESSES_STARTED, LOAD_SUBPROCESSES, _subprocessesQuery.default)(variables);
};

exports.loadSubprocesses = loadSubprocesses;

const addTeamMember = (id, family, memberId) => (0, _actionUtils.mutateData)(ADD_TEAM_MEMBER_STARTED, ADD_TEAM_MEMBER, _addTeamMemberToProcessMutation.default, 'Team member successfully added.')({
  id,
  family,
  memberId
});

exports.addTeamMember = addTeamMember;

const removeTeamMember = (id, family, memberId) => (0, _actionUtils.mutateData)(ADD_TEAM_MEMBER_STARTED, ADD_TEAM_MEMBER, _removeTeamMemberFromProcessMutation.default, 'Team member successfully removed.')({
  id,
  family,
  memberId
});

exports.removeTeamMember = removeTeamMember;

const cancelProcess = id => (dispatch, getState) => {
  dispatch({
    type: CANCEL_PROCESS_STARTED
  });
  return _HttpFetch.default.deleteResource(`activiti-app/app/rest/process-instances/${id}`).then(response => {
    dispatch({
      type: CANCEL_PROCESS,
      payload: response.data,
      meta: (0, _Immutable.default)({
        successMessage: `Activity ${id} has been cancelled.`
      })
    });
  }).catch(error => {
    dispatch({
      type: CANCEL_PROCESS,
      payload: error,
      error: true
    });
    return new Error(error);
  });
};
/**
 * Change the priority of the process
 */


exports.cancelProcess = cancelProcess;

const setProcessPriority = (processId, priority) => (dispatch, getState) => {
  dispatch({
    type: SET_PROCESS_PRIORITY_STARTED,
    payload: priority
  });
  const body = {
    priority
  };

  _HttpFetch.default.putResource(`activiti-app/app/rest/process-instances/${processId}/update-priority`, body).then(resp => {
    // As response of this call is not returning the priority, this is why we are passing the priority parameter
    dispatch({
      type: SET_PROCESS_PRIORITY,
      payload: priority,
      meta: (0, _Immutable.default)({
        successMessage: `Priority of process ${processId} has been changed to ${priority}.`
      })
    }); // FIXME: do not nest actions

    return loadProcessDetails(processId)(dispatch, getState);
  }).then(async data => {
    if (data instanceof Error) {
      throw data;
    } else {
      return data;
    }
  }).catch(error => {
    dispatch({
      type: SET_PROCESS_PRIORITY,
      payload: error,
      error: true
    });
  });
};
/**
 * Save process page view
 */


exports.setProcessPriority = setProcessPriority;

const saveProcessPageView = (state, id) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_PROCESS_PAGE_VIEW_STARTED
  });

  try {
    const oldPreferences = await (0, _usersActions._fetchPreferences)();
    const preferences = (0, _lo.set)(oldPreferences, `pageView.${id}`, state);
    await (0, _usersActions._savePreferences)(preferences);
    dispatch({
      type: _usersActions.LOAD_USER_PREFERENCES,
      payload: (0, _Immutable.default)(preferences)
    });
  } catch (error) {
    dispatch({
      type: SAVE_PROCESS_PAGE_VIEW,
      error: true,
      payload: (0, _Immutable.default)(error),
      meta: (0, _Immutable.default)({
        errorMessage: 'An error occured saving the view preferences.'
      })
    });
  }
};

exports.saveProcessPageView = saveProcessPageView;