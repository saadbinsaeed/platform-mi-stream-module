"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachMessengerFile = exports.addTaskComment = exports.addProcessComment = exports.loadTaskMessages = exports.loadProcessMessages = exports.saveMessage = exports.loadMessenger = exports.toggleMessenger = exports.ATTACH_FILE_MESSEGE = exports.ATTACH_FILE_MESSEGE_STARTED = exports.SAVE_MESSAGE = exports.SAVE_MESSAGE_STARTED = exports.ADD_TASK_COMMENT = exports.ADD_TASK_COMMENT_STARTED = exports.ADD_PROCESS_COMMENT = exports.ADD_PROCESS_COMMENT_STARTED = exports.LOAD_MESSENGER_TASK_MESSAGES = exports.LOAD_MESSENGER_TASK_MESSAGES_STARTED = exports.LOAD_MESSENGER_PROCESS_MESSAGES = exports.LOAD_MESSENGER_PROCESS_MESSAGES_STARTED = exports.LOAD_MESSENGER = exports.LOAD_MESSENGER_STARTED = exports.TOGGLE_MESSENGER = void 0;

var _client = require("graphql/client");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _processMessageQuery = _interopRequireDefault(require("graphql/messenger/processMessageQuery"));

var _taskMessageQuery = _interopRequireDefault(require("graphql/messenger/taskMessageQuery"));

var _addProcessCommentMutation = _interopRequireDefault(require("graphql/messenger/addProcessCommentMutation"));

var _addTaskCommentMutation = _interopRequireDefault(require("graphql/messenger/addTaskCommentMutation"));

var _actionUtils = require("app/utils/redux/action-utils");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Queries
const TOGGLE_MESSENGER = '@@affectli/messenger/TOGGLE_MESSENGER';
exports.TOGGLE_MESSENGER = TOGGLE_MESSENGER;
const LOAD_MESSENGER_STARTED = '@@affectli/messenger/LOAD_MESSENGER';
exports.LOAD_MESSENGER_STARTED = LOAD_MESSENGER_STARTED;
const LOAD_MESSENGER = '@@affectli/messenger/SET_MESSENGER_SELECTION';
exports.LOAD_MESSENGER = LOAD_MESSENGER;
const LOAD_MESSENGER_PROCESS_MESSAGES_STARTED = '@@affectli/messenger/LOAD_MESSENGER_PROCESS_MESSAGES_STARTED';
exports.LOAD_MESSENGER_PROCESS_MESSAGES_STARTED = LOAD_MESSENGER_PROCESS_MESSAGES_STARTED;
const LOAD_MESSENGER_PROCESS_MESSAGES = '@@affectli/messenger/LOAD_MESSENGER_PROCESS_MESSAGES';
exports.LOAD_MESSENGER_PROCESS_MESSAGES = LOAD_MESSENGER_PROCESS_MESSAGES;
const LOAD_MESSENGER_TASK_MESSAGES_STARTED = '@@affectli/messenger/LOAD_MESSENGER_TASK_MESSAGES_STARTED';
exports.LOAD_MESSENGER_TASK_MESSAGES_STARTED = LOAD_MESSENGER_TASK_MESSAGES_STARTED;
const LOAD_MESSENGER_TASK_MESSAGES = '@@affectli/messenger/LOAD_MESSENGER_TASK_MESSAGES';
exports.LOAD_MESSENGER_TASK_MESSAGES = LOAD_MESSENGER_TASK_MESSAGES;
const ADD_PROCESS_COMMENT_STARTED = '@@affectli/messenger/ADD_PROCESS_COMMENT_STARTED';
exports.ADD_PROCESS_COMMENT_STARTED = ADD_PROCESS_COMMENT_STARTED;
const ADD_PROCESS_COMMENT = '@@affectli/messenger/ADD_PROCESS_COMMENT';
exports.ADD_PROCESS_COMMENT = ADD_PROCESS_COMMENT;
const ADD_TASK_COMMENT_STARTED = '@@affectli/messenger/ADD_TASK_COMMENT_STARTED';
exports.ADD_TASK_COMMENT_STARTED = ADD_TASK_COMMENT_STARTED;
const ADD_TASK_COMMENT = '@@affectli/messenger/ADD_TASK_COMMENT';
exports.ADD_TASK_COMMENT = ADD_TASK_COMMENT;
const SAVE_MESSAGE_STARTED = '@@affectli/messenger/SAVE_MESSAGE_STARTED';
exports.SAVE_MESSAGE_STARTED = SAVE_MESSAGE_STARTED;
const SAVE_MESSAGE = '@@affectli/messenger/SAVE_MESSAGE';
exports.SAVE_MESSAGE = SAVE_MESSAGE;
const ATTACH_FILE_MESSEGE_STARTED = '@@affectli/messenger/ATTACH_FILE_MESSEGE_STARTED';
exports.ATTACH_FILE_MESSEGE_STARTED = ATTACH_FILE_MESSEGE_STARTED;
const ATTACH_FILE_MESSEGE = '@@affectli/messenger/ATTACH_FILE_MESSEGE';
exports.ATTACH_FILE_MESSEGE = ATTACH_FILE_MESSEGE;

const toggleMessenger = () => dispatch => {
  dispatch({
    type: TOGGLE_MESSENGER
  });
};

exports.toggleMessenger = toggleMessenger;

const loadMessenger = (id, type = 'process') => (dispatch, getState) => {
  dispatch({
    type: LOAD_MESSENGER_STARTED
  });

  if (id && type === 'process') {
    dispatch({
      type: LOAD_MESSENGER,
      payload: {
        id,
        type
      }
    });
    return loadProcessMessages(id)(dispatch, getState);
  } else if (id && type === 'task') {
    dispatch({
      type: LOAD_MESSENGER,
      payload: {
        id,
        type
      }
    });
    return loadTaskMessages(id)(dispatch, getState);
  } else {
    throw new Error(`ID or Type "${type}" is missing or does not exist`);
  }
}; // eslint-disable-next-line max-len


exports.loadMessenger = loadMessenger;

const saveMessage = (id, type, message, plainMessage) => (dispatch, getState) => {
  dispatch({
    type: SAVE_MESSAGE_STARTED
  });

  if (id && type === 'process') {
    dispatch({
      type: SAVE_MESSAGE
    });
    addProcessComment(id, message, plainMessage)(dispatch, getState);
  } else if (id && type === 'task') {
    dispatch({
      type: SAVE_MESSAGE
    });
    addTaskComment(id, message, plainMessage)(dispatch, getState);
  } else {
    throw new Error(`ID or Type "${type}" is missing or does not exist`);
  }
};
/**
 * Load the Abox Process Messages
 */


exports.saveMessage = saveMessage;

const loadProcessMessages = id => {
  if (!id) {
    throw new Error('The ID is required.');
  }

  return (0, _actionUtils.loadData)(LOAD_MESSENGER_PROCESS_MESSAGES_STARTED, LOAD_MESSENGER_PROCESS_MESSAGES, _processMessageQuery.default)({
    id
  });
};
/**
 * Load the Abox Task Messages
 */


exports.loadProcessMessages = loadProcessMessages;

const loadTaskMessages = id => {
  if (!id) {
    throw new Error('The ID is required.');
  }

  return (0, _actionUtils.loadData)(LOAD_MESSENGER_TASK_MESSAGES_STARTED, LOAD_MESSENGER_TASK_MESSAGES, _taskMessageQuery.default)({
    id
  });
};

exports.loadTaskMessages = loadTaskMessages;

const addProcessComment = (processId, message, plainMessage) => (dispatch, getState) => {
  dispatch({
    type: ADD_PROCESS_COMMENT_STARTED
  });
  return _client.graphql.mutate({
    mutation: _addProcessCommentMutation.default,
    variables: {
      processId,
      message,
      plainMessage
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: ADD_PROCESS_COMMENT,
      payload: response
    });
    loadProcessMessages(processId)(dispatch, getState);
  }).catch(error => {
    dispatch({
      type: ADD_PROCESS_COMMENT,
      payload: error,
      error: true
    });
  });
};
/**
 * Send Process Comment
 */


exports.addProcessComment = addProcessComment;

const addTaskComment = (taskId, message, plainMessage) => (dispatch, getState) => {
  dispatch({
    type: ADD_TASK_COMMENT_STARTED
  });
  return _client.graphql.mutate({
    mutation: _addTaskCommentMutation.default,
    variables: {
      taskId,
      message,
      plainMessage
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: ADD_TASK_COMMENT,
      payload: response
    });
    loadTaskMessages(taskId)(dispatch, getState);
  }).catch(error => {
    dispatch({
      type: ADD_TASK_COMMENT,
      payload: error,
      error: true
    });
  });
};
/**
 * Adds the given file to the task/process as an attachment in messenger.
 *
 * @param id the Task/Process ID (required).
 * @param type should be task or process type (required).
 * @param file the attachment (required).
 */


exports.addTaskComment = addTaskComment;

const attachMessengerFile = (id, type, file) => dispatch => {
  dispatch({
    type: ATTACH_FILE_MESSEGE_STARTED
  });
  const mutationName = type === 'task' ? 'addTaskCommentFile' : 'addProcessCommentFile';
  const mutationId = type === 'task' ? 'taskId' : 'processId';
  const query = `mutation ($file: Upload!, $id: String!) { ${mutationName}(file: $file, ${mutationId}: $id) }`;
  const variables = {
    file: null,
    id
  };
  let errorMessage = 'File upload failed.';
  return _client.graphql.upload({
    query,
    variables,
    file
  }).then(response => {
    if (response.errors) {
      throw new Error((0, _lo.get)(response, 'errors[0].message') || '');
    }

    dispatch({
      type: ATTACH_FILE_MESSEGE,
      payload: (0, _Immutable.default)({
        id,
        url: response.url
      }),
      meta: (0, _Immutable.default)({
        successMessage: `${file.name} attached.`
      })
    });
  }).catch(error => {
    if ((error.message || '').includes('exceeds the size limit')) {
      errorMessage = `The size of the file "${file.name}" exceeds the limit allowed and cannot be saved.`;
    }

    dispatch({
      type: ATTACH_FILE_MESSEGE,
      payload: (0, _Immutable.default)(error),
      error: true,
      meta: (0, _Immutable.default)({
        errorMessage
      })
    });
  });
};

exports.attachMessengerFile = attachMessengerFile;