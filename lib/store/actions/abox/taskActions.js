"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendTaskMessage = exports.loadProcessTasks = exports.updateTask = exports.loadTaskDetails = exports.outdateTaskDetails = exports.loadSubtasks = exports.setTaskPriority = exports.removeTeamMember = exports.addTeamMember = exports.setTaskOwner = exports.setTaskAssignee = exports.addSubtask = exports.closeTask = exports.loadCalendarTasks = exports.loadTimelineTasks = exports.loadTasks = exports.loadTaskChangelog = exports.loadTaskMemberAutocomplete = exports.loadTaskCandidateAutocomplete = exports.SEND_TASK_MESSAGE = exports.SEND_TASK_MESSAGE_STARTED = exports.LOAD_TASK_CHANGELOG = exports.LOAD_TASK_CHANGELOG_STARTED = exports.LOAD_PROCESS_TASKS = exports.LOAD_PROCESS_TASKS_STARTED = exports.TASK_UPDATE = exports.TASK_UPDATE_STARTED = exports.OUTDATE_TASK_DETAILS = exports.LOAD_TASK_DETAILS = exports.LOAD_TASK_DETAILS_STARTED = exports.LOAD_SUBTASKS = exports.LOAD_SUBTASKS_STARTED = exports.ADD_SUBTASK = exports.ADD_SUBTASK_STARTED = exports.REMOVE_TEAM_MEMBER = exports.REMOVE_TEAM_MEMBER_STARTED = exports.ADD_TEAM_MEMBER = exports.ADD_TEAM_MEMBER_STARTED = exports.TASK_SET_OWNER = exports.TASK_SET_OWNER_STARTED = exports.TASK_SET_ASSIGNEE = exports.TASK_SET_ASSIGNEE_STARTED = exports.LOAD_FORM = exports.LOAD_FORM_STARTED = exports.CLOSE_TASK = exports.CLOSE_TASK_STARTED = exports.LOAD_TIMELINE_TASKS = exports.LOAD_TIMELINE_TASKS_STARTED = exports.LOAD_CALENDAR_TASKS = exports.LOAD_CALENDAR_TASKS_STARTED = exports.LOAD_TASKS = exports.LOAD_TASKS_STARTED = exports.LOAD_TASK_MEMBER_AUTOCOMPLETE = exports.LOAD_TASK_MEMBER_AUTOCOMPLETE_STARTED = exports.LOAD_TASK_CANDIDATE_AUTOCOMPLETE = exports.LOAD_TASK_CANDIDATE_AUTOCOMPLETE_STARTED = void 0;

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _actionUtils = require("app/utils/redux/action-utils");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _client = require("graphql/client");

var _lo = require("app/utils/lo/lo");

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _addTeamMemberToTaskMutation = _interopRequireDefault(require("graphql/abox/task/addTeamMemberToTaskMutation"));

var _closeTaskMutation = _interopRequireDefault(require("graphql/abox/task/closeTaskMutation"));

var _createSubtaskMutation = _interopRequireDefault(require("graphql/abox/task/createSubtaskMutation"));

var _processTasksQuery = _interopRequireDefault(require("graphql/abox/task/processTasksQuery"));

var _removeTeamMemberFromTaskMutation = _interopRequireDefault(require("graphql/abox/task/removeTeamMemberFromTaskMutation"));

var _setTaskAssigneeMutation = _interopRequireDefault(require("graphql/abox/task/setTaskAssigneeMutation"));

var _setTaskOwnerMutation = _interopRequireDefault(require("graphql/abox/task/setTaskOwnerMutation"));

var _subtasksQuery = _interopRequireDefault(require("graphql/abox/task/subtasksQuery"));

var _taskCandidateAutocompleteQuery = _interopRequireDefault(require("graphql/abox/task/taskCandidateAutocompleteQuery"));

var _taskMemberAutocompleteQuery = _interopRequireDefault(require("graphql/abox/task/taskMemberAutocompleteQuery"));

var _taskChangelogQuery = _interopRequireDefault(require("graphql/abox/task/taskChangelogQuery"));

var _taskQuery = _interopRequireDefault(require("graphql/abox/task/taskQuery"));

var _tasksCalendarQuery = _interopRequireDefault(require("graphql/abox/task/tasksCalendarQuery"));

var _tasksTimelineQuery = _interopRequireDefault(require("graphql/abox/task/tasksTimelineQuery"));

var _tasksQuery = _interopRequireDefault(require("graphql/abox/task/tasksQuery"));

var _updateTaskMutation = _interopRequireDefault(require("graphql/abox/task/updateTaskMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_TASK_CANDIDATE_AUTOCOMPLETE_STARTED = '@@affectli/task/LOAD_TASK_CANDIDATE_AUTOCOMPLETE_STARTED';
exports.LOAD_TASK_CANDIDATE_AUTOCOMPLETE_STARTED = LOAD_TASK_CANDIDATE_AUTOCOMPLETE_STARTED;
const LOAD_TASK_CANDIDATE_AUTOCOMPLETE = '@@affectli/task/LOAD_TASK_CANDIDATE_AUTOCOMPLETE';
exports.LOAD_TASK_CANDIDATE_AUTOCOMPLETE = LOAD_TASK_CANDIDATE_AUTOCOMPLETE;
const LOAD_TASK_MEMBER_AUTOCOMPLETE_STARTED = '@@affectli/task/LOAD_TASK_MEMBER_AUTOCOMPLETE_STARTED';
exports.LOAD_TASK_MEMBER_AUTOCOMPLETE_STARTED = LOAD_TASK_MEMBER_AUTOCOMPLETE_STARTED;
const LOAD_TASK_MEMBER_AUTOCOMPLETE = '@@affectli/task/LOAD_TASK_MEMBER_AUTOCOMPLETE';
exports.LOAD_TASK_MEMBER_AUTOCOMPLETE = LOAD_TASK_MEMBER_AUTOCOMPLETE;
const LOAD_TASKS_STARTED = '@@affectli/task/LOAD_TASKS_STARTED';
exports.LOAD_TASKS_STARTED = LOAD_TASKS_STARTED;
const LOAD_TASKS = '@@affectli/task/LOAD_TASKS';
exports.LOAD_TASKS = LOAD_TASKS;
const LOAD_CALENDAR_TASKS_STARTED = '@@affectli/task/LOAD_CALENDAR_TASKS_STARTED';
exports.LOAD_CALENDAR_TASKS_STARTED = LOAD_CALENDAR_TASKS_STARTED;
const LOAD_CALENDAR_TASKS = '@@affectli/task/LOAD_CALENDAR_TASKS';
exports.LOAD_CALENDAR_TASKS = LOAD_CALENDAR_TASKS;
const LOAD_TIMELINE_TASKS_STARTED = '@@affectli/task/LOAD_TIMELINE_TASKS_STARTED';
exports.LOAD_TIMELINE_TASKS_STARTED = LOAD_TIMELINE_TASKS_STARTED;
const LOAD_TIMELINE_TASKS = '@@affectli/task/LOAD_TIMELINE_TASKS';
exports.LOAD_TIMELINE_TASKS = LOAD_TIMELINE_TASKS;
const CLOSE_TASK_STARTED = '@@affectli/task/CLOSE_TASK_STARTED';
exports.CLOSE_TASK_STARTED = CLOSE_TASK_STARTED;
const CLOSE_TASK = '@@affectli/task/CLOSE_TASK';
exports.CLOSE_TASK = CLOSE_TASK;
const LOAD_FORM_STARTED = '@@affectli/task/LOAD_FORM_STARTED';
exports.LOAD_FORM_STARTED = LOAD_FORM_STARTED;
const LOAD_FORM = '@@affectli/task/LOAD_FORM';
exports.LOAD_FORM = LOAD_FORM;
const TASK_SET_ASSIGNEE_STARTED = '@@affectli/task/TASK_SET_ASSIGNEE_STARTED';
exports.TASK_SET_ASSIGNEE_STARTED = TASK_SET_ASSIGNEE_STARTED;
const TASK_SET_ASSIGNEE = '@@affectli/task/TASK_SET_ASSIGNEE';
exports.TASK_SET_ASSIGNEE = TASK_SET_ASSIGNEE;
const TASK_SET_OWNER_STARTED = '@@affectli/task/TASK_SET_OWNER_STARTED';
exports.TASK_SET_OWNER_STARTED = TASK_SET_OWNER_STARTED;
const TASK_SET_OWNER = '@@affectli/task/TASK_SET_OWNER';
exports.TASK_SET_OWNER = TASK_SET_OWNER;
const ADD_TEAM_MEMBER_STARTED = '@@affectli/task/ADD_TEAM_MEMBER_STARTED';
exports.ADD_TEAM_MEMBER_STARTED = ADD_TEAM_MEMBER_STARTED;
const ADD_TEAM_MEMBER = '@@affectli/task/ADD_TEAM_MEMBER';
exports.ADD_TEAM_MEMBER = ADD_TEAM_MEMBER;
const REMOVE_TEAM_MEMBER_STARTED = '@@affectli/task/REMOVE_TEAM_MEMBER_STARTED';
exports.REMOVE_TEAM_MEMBER_STARTED = REMOVE_TEAM_MEMBER_STARTED;
const REMOVE_TEAM_MEMBER = '@@affectli/task/REMOVE_TEAM_MEMBER';
exports.REMOVE_TEAM_MEMBER = REMOVE_TEAM_MEMBER;
const ADD_SUBTASK_STARTED = '@@affectli/task/ADD_SUBTASK_STARTED';
exports.ADD_SUBTASK_STARTED = ADD_SUBTASK_STARTED;
const ADD_SUBTASK = '@@affectli/task/ADD_SUBTASK';
exports.ADD_SUBTASK = ADD_SUBTASK;
const LOAD_SUBTASKS_STARTED = '@@affectli/task/LOAD_SUBTASKS_STARTED';
exports.LOAD_SUBTASKS_STARTED = LOAD_SUBTASKS_STARTED;
const LOAD_SUBTASKS = '@@affectli/task/LOAD_SUBTASKS';
exports.LOAD_SUBTASKS = LOAD_SUBTASKS;
const LOAD_TASK_DETAILS_STARTED = '@@affectli/task/LOAD_TASK_DETAILS_STARTED';
exports.LOAD_TASK_DETAILS_STARTED = LOAD_TASK_DETAILS_STARTED;
const LOAD_TASK_DETAILS = '@@affectli/task/LOAD_TASK_DETAILS';
exports.LOAD_TASK_DETAILS = LOAD_TASK_DETAILS;
const OUTDATE_TASK_DETAILS = '@@affectli/task/OUTDATE_TASK_DETAILS';
exports.OUTDATE_TASK_DETAILS = OUTDATE_TASK_DETAILS;
const TASK_UPDATE_STARTED = '@@affectli/task/TASK_UPDATE_STARTED';
exports.TASK_UPDATE_STARTED = TASK_UPDATE_STARTED;
const TASK_UPDATE = '@@affectli/task/TASK_UPDATE';
exports.TASK_UPDATE = TASK_UPDATE;
const LOAD_PROCESS_TASKS_STARTED = '@@affectli/task/LOAD_PROCESS_TASKS_STARTED';
exports.LOAD_PROCESS_TASKS_STARTED = LOAD_PROCESS_TASKS_STARTED;
const LOAD_PROCESS_TASKS = '@@affectli/task/LOAD_PROCESS_TASKS';
exports.LOAD_PROCESS_TASKS = LOAD_PROCESS_TASKS;
const LOAD_TASK_CHANGELOG_STARTED = '@@affectli/task/LOAD_TASK_CHANGELOG_STARTED';
exports.LOAD_TASK_CHANGELOG_STARTED = LOAD_TASK_CHANGELOG_STARTED;
const LOAD_TASK_CHANGELOG = '@@affectli/task/LOAD_TASK_CHANGELOG';
exports.LOAD_TASK_CHANGELOG = LOAD_TASK_CHANGELOG;
const SEND_TASK_MESSAGE_STARTED = '@@affectli/task/SEND_TASK_MESSAGE_STARTED';
exports.SEND_TASK_MESSAGE_STARTED = SEND_TASK_MESSAGE_STARTED;
const SEND_TASK_MESSAGE = '@@affectli/task/SEND_TASK_MESSAGE';
/**
 * Loads the suggestions for the task candidate autocomplete component.
 */

exports.SEND_TASK_MESSAGE = SEND_TASK_MESSAGE;
const loadTaskCandidateAutocomplete = (0, _actionUtils.loadData)(LOAD_TASK_CANDIDATE_AUTOCOMPLETE_STARTED, LOAD_TASK_CANDIDATE_AUTOCOMPLETE, _taskCandidateAutocompleteQuery.default);
/**
 * Loads the suggestions for the task member autocomplete component.
 */

exports.loadTaskCandidateAutocomplete = loadTaskCandidateAutocomplete;
const loadTaskMemberAutocomplete = (0, _actionUtils.loadData)(LOAD_TASK_MEMBER_AUTOCOMPLETE_STARTED, LOAD_TASK_MEMBER_AUTOCOMPLETE, _taskMemberAutocompleteQuery.default);
/**
 * Fetch the task changelog.
 *
 * @param id the task ID.loadData
 */

exports.loadTaskMemberAutocomplete = loadTaskMemberAutocomplete;

const loadTaskChangelog = (id, options) => dispatch => {
  dispatch({
    type: LOAD_TASK_CHANGELOG_STARTED
  });
  return _client.graphql.query({
    query: _taskChangelogQuery.default,
    variables: {
      id,
      ...options
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    const payload = {
      changes: (0, _lo.get)(response, 'data.task.changelog'),
      startIndex: options.startIndex,
      count: (0, _lo.get)(response, 'data.count')
    };
    dispatch({
      type: LOAD_TASK_CHANGELOG,
      payload
    });
  }).catch(error => {
    dispatch({
      type: LOAD_TASK_CHANGELOG,
      payload: error,
      error: true
    });
  });
};
/**
 * Loads the assigned tasks.
 */


exports.loadTaskChangelog = loadTaskChangelog;

const loadTasks = (options = {}) => {
  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).build();
  return (0, _actionUtils.loadData)(LOAD_TASKS_STARTED, LOAD_TASKS, _tasksQuery.default)({ ...variables,
    startIndex: options.startIndex
  });
};
/**
 * Loads the assigned tasks for the A-Box timeline.
 */


exports.loadTasks = loadTasks;

const loadTimelineTasks = (options = {}, start, end) => {
  let variables; // if start and end is not null use range of timeline as filter. Else, use startDate and dueDate as filter

  if (start && end) {
    variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).filter({
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }).filter({
      field: 'dueDate',
      op: 'is not null'
    }).filter({
      or: [[[{
        field: 'bpmnVariables.name',
        op: '=',
        value: 'startDate'
      }, {
        field: 'bpmnVariables.text',
        op: 'between',
        value: [start, end]
      }]], {
        field: 'dueDate',
        op: 'between',
        value: [start, end]
      }, [[{
        field: 'bpmnVariables.name',
        op: '=',
        value: 'startDate'
      }, {
        field: 'bpmnVariables.text',
        op: '<',
        value: end
      }], {
        field: 'dueDate',
        op: '>',
        value: start
      }]]
    }).build();
  } else {
    variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).filter({
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }).filter({
      field: 'dueDate',
      op: 'is not null'
    }).build();
  }

  return (0, _actionUtils.loadData)(LOAD_TIMELINE_TASKS_STARTED, LOAD_TIMELINE_TASKS, _tasksTimelineQuery.default)({ ...variables
  });
};
/**
* Loads the assigned tasks for the A-Box calendar.
 */


exports.loadTimelineTasks = loadTimelineTasks;

const loadCalendarTasks = (userId, start, end, options = {}) => {
  if (!userId || !start || !end) {
    throw new Error('userID, start and end are required.');
  }

  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30) // filter date where:
  // (startDate between start and end and dueDate is null)
  // or (startDate is null and dueDate between start and end)
  // or (startDate < end and dueDate > start)
  .filter({
    or: [[[{
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }, {
      field: 'bpmnVariables.text',
      op: 'between',
      value: [start, end]
    }], {
      field: 'dueDate',
      op: 'is null'
    }], // I can't verify if start date is null
    {
      field: 'dueDate',
      op: 'between',
      value: [start, end]
    }, [[{
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }, {
      field: 'bpmnVariables.text',
      op: '<',
      value: end
    }], {
      field: 'dueDate',
      op: '>',
      value: start
    }]]
  }).build();
  return (0, _actionUtils.loadData)(LOAD_CALENDAR_TASKS_STARTED, LOAD_CALENDAR_TASKS, _tasksCalendarQuery.default)({ ...variables
  });
};

exports.loadCalendarTasks = loadCalendarTasks;

const closeTask = id => (0, _actionUtils.mutateData)(CLOSE_TASK_STARTED, CLOSE_TASK, _closeTaskMutation.default, 'The task has been closed.')({
  id
});

exports.closeTask = closeTask;

const addSubtask = (parentTaskId, data) => (0, _actionUtils.mutateData)(ADD_SUBTASK_STARTED, ADD_SUBTASK, _createSubtaskMutation.default, `Sub-task ${data.name || ''} added successfully.`)({
  record: { ...data,
    parentTaskId
  }
});

exports.addSubtask = addSubtask;

const setTaskAssignee = (id, assignee) => (0, _actionUtils.mutateData)(TASK_SET_ASSIGNEE_STARTED, TASK_SET_ASSIGNEE, _setTaskAssigneeMutation.default, 'Task assigned succesfully.')({
  id,
  assignee
});

exports.setTaskAssignee = setTaskAssignee;

const setTaskOwner = (id, owner) => (0, _actionUtils.mutateData)(TASK_SET_OWNER_STARTED, TASK_SET_OWNER, _setTaskOwnerMutation.default, 'The owner of the task has been changed.')({
  id,
  owner
});

exports.setTaskOwner = setTaskOwner;

const addTeamMember = (id, family, memberId) => (0, _actionUtils.mutateData)(ADD_TEAM_MEMBER_STARTED, ADD_TEAM_MEMBER, _addTeamMemberToTaskMutation.default, 'Team member successfully added.')({
  id,
  family,
  memberId
});

exports.addTeamMember = addTeamMember;

const removeTeamMember = (id, family, memberId) => (0, _actionUtils.mutateData)(REMOVE_TEAM_MEMBER_STARTED, REMOVE_TEAM_MEMBER, _removeTeamMemberFromTaskMutation.default, 'Team member successfully removed.')({
  id,
  family,
  memberId
});
/**
 * Change the priority of the task
 */


exports.removeTeamMember = removeTeamMember;

const setTaskPriority = (taskId, priority) => updateTask({
  id: taskId,
  priority: priority
});

exports.setTaskPriority = setTaskPriority;

const loadSubtasks = (options = {}) => {
  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).filter({
    field: 'parent.id',
    op: '=',
    value: String(options.id)
  }).build();
  return (0, _actionUtils.loadData)(LOAD_SUBTASKS_STARTED, LOAD_SUBTASKS, _subtasksQuery.default)({ ...variables
  });
};
/**
 * Sets the task details as outdated.
 */


exports.loadSubtasks = loadSubtasks;

const outdateTaskDetails = (id, outdate = true) => (dispatch, getState) => {
  if (id && id === (0, _lo.get)(getState(), 'abox.task.details.data.id')) {
    dispatch({
      type: OUTDATE_TASK_DETAILS,
      payload: outdate
    });
  }
};
/**
 * Loads the task details.
 */


exports.outdateTaskDetails = outdateTaskDetails;

const loadTaskDetails = id => (dispatch, getState) => {
  if (!id) {
    throw new Error('The ID is required.');
  }

  return (0, _actionUtils.loadData)(LOAD_TASK_DETAILS_STARTED, LOAD_TASK_DETAILS, _taskQuery.default)({
    id
  })(dispatch, getState).then(() => outdateTaskDetails(id, false)(dispatch, getState));
};
/**
 * Updates the task details
 */


exports.loadTaskDetails = loadTaskDetails;

const updateTask = record => (0, _actionUtils.mutateData)(TASK_UPDATE_STARTED, TASK_UPDATE, _updateTaskMutation.default, 'Task updated successfully')({
  record
});

exports.updateTask = updateTask;

const loadProcessTasks = processId => {
  const variables = {
    filterBy: [{
      field: 'process.id',
      op: '=',
      value: processId
    }],
    processId // we need the processId in the meta of the action for the reducer

  };
  return (0, _actionUtils.loadData)(LOAD_PROCESS_TASKS_STARTED, LOAD_PROCESS_TASKS, _processTasksQuery.default)(variables);
};

exports.loadProcessTasks = loadProcessTasks;

const sendTaskMessage = url => dispatch => {
  dispatch({
    type: SEND_TASK_MESSAGE_STARTED
  });
  return _HttpFetch.default.putResource(url, {}).then(resp => {
    dispatch({
      type: SEND_TASK_MESSAGE,
      payload: (0, _Immutable.default)(resp),
      meta: (0, _Immutable.default)({
        successMessage: 'Successfully Sent'
      })
    });
  }).catch(error => {
    dispatch({
      type: SEND_TASK_MESSAGE,
      payload: (0, _Immutable.default)(error),
      error: true
    });
  });
};

exports.sendTaskMessage = sendTaskMessage;