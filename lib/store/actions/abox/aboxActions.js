"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTimelineRange = exports.uploadAboxAttachment = exports.deleteAboxAttachment = exports.loadAboxAttachments = exports.outdateAboxAttachments = exports.SET_TIMELINE_ZOOM = exports.GET_ABOX_RELATIONSHIPS = exports.GET_ABOX_RELATIONSHIPS_STARTED = exports.UPLOAD_ABOX_ATTACHMENTS = exports.UPLOAD_ABOX_ATTACHMENTS_STARTED = exports.DELETE_ABOX_ATTACHMENTS = exports.DELETE_ABOX_ATTACHMENTS_STARTED = exports.OUTDATE_ABOX_ATTACHMENTS = exports.LOAD_ABOX_ATTACHMENTS = exports.LOAD_ABOX_ATTACHMENTS_STARTED = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _actionUtils = require("app/utils/redux/action-utils");

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _aboxAttachmentsQuery = _interopRequireDefault(require("graphql/abox/aboxAttachmentsQuery"));

var _deleteAttachmentMutation = _interopRequireDefault(require("graphql/abox/deleteAttachmentMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_ABOX_ATTACHMENTS_STARTED = '@@affectli/abox/LOAD_ABOX_ATTACHMENTS_STARTED';
exports.LOAD_ABOX_ATTACHMENTS_STARTED = LOAD_ABOX_ATTACHMENTS_STARTED;
const LOAD_ABOX_ATTACHMENTS = '@@affectli/abox/LOAD_ABOX_ATTACHMENTS';
exports.LOAD_ABOX_ATTACHMENTS = LOAD_ABOX_ATTACHMENTS;
const OUTDATE_ABOX_ATTACHMENTS = '@@affectli/abox/OUTDATE_ABOX_ATTACHMENTS';
exports.OUTDATE_ABOX_ATTACHMENTS = OUTDATE_ABOX_ATTACHMENTS;
const DELETE_ABOX_ATTACHMENTS_STARTED = '@@affectli/abox/DELETE_ABOX_ATTACHMENTS_STARTED';
exports.DELETE_ABOX_ATTACHMENTS_STARTED = DELETE_ABOX_ATTACHMENTS_STARTED;
const DELETE_ABOX_ATTACHMENTS = '@@affectli/abox/DELETE_ABOX_ATTACHMENTS';
exports.DELETE_ABOX_ATTACHMENTS = DELETE_ABOX_ATTACHMENTS;
const UPLOAD_ABOX_ATTACHMENTS_STARTED = '@@affectli/abox/UPLOAD_ABOX_ATTACHMENTS_STARTED';
exports.UPLOAD_ABOX_ATTACHMENTS_STARTED = UPLOAD_ABOX_ATTACHMENTS_STARTED;
const UPLOAD_ABOX_ATTACHMENTS = '@@affectli/abox/UPLOAD_ABOX_ATTACHMENTS';
exports.UPLOAD_ABOX_ATTACHMENTS = UPLOAD_ABOX_ATTACHMENTS;
const GET_ABOX_RELATIONSHIPS_STARTED = '@@affectli/abox/GET_ABOX_RELATIONSHIPS_STARTED';
exports.GET_ABOX_RELATIONSHIPS_STARTED = GET_ABOX_RELATIONSHIPS_STARTED;
const GET_ABOX_RELATIONSHIPS = '@@affectli/abox/GET_ABOX_RELATIONSHIPS';
exports.GET_ABOX_RELATIONSHIPS = GET_ABOX_RELATIONSHIPS;
const SET_TIMELINE_ZOOM = '@@affectli/abox/SET_TIMELINE_ZOOM';
/**
 * Sets the Abox Attachments as outdated.
 */

exports.SET_TIMELINE_ZOOM = SET_TIMELINE_ZOOM;

const outdateAboxAttachments = (id, type, outdate = true) => (dispatch, getState) => {
  const state = getState();

  if (type === 'task' && id === (0, _lo.get)(state, 'abox.task.details.data.id')) {
    dispatch({
      type: OUTDATE_ABOX_ATTACHMENTS,
      payload: outdate
    });
  } else if (type === 'process' && id === (0, _lo.get)(state, 'abox.process.details.data.id')) {
    dispatch({
      type: OUTDATE_ABOX_ATTACHMENTS,
      payload: outdate
    });
  }
};
/**
 * Load Abox Attachments
 */


exports.outdateAboxAttachments = outdateAboxAttachments;

const loadAboxAttachments = (id, type, options = {}) => (dispatch, getState) => {
  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).filter({
    field: `${type}.id`,
    op: '=',
    value: String(id)
  }).build();
  return (0, _actionUtils.loadData)(LOAD_ABOX_ATTACHMENTS_STARTED, LOAD_ABOX_ATTACHMENTS, _aboxAttachmentsQuery.default)(variables)(dispatch, getState).then(() => outdateAboxAttachments(id, type, false)(dispatch, getState));
};
/**
 * Delete Abox Attachments
 */


exports.loadAboxAttachments = loadAboxAttachments;

const deleteAboxAttachment = attachmentId => dispatch => {
  dispatch({
    type: DELETE_ABOX_ATTACHMENTS_STARTED
  });
  return _client.graphql.mutate({
    mutation: _deleteAttachmentMutation.default,
    variables: {
      attachmentId
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: DELETE_ABOX_ATTACHMENTS,
      payload: response,
      meta: (0, _Immutable.default)({
        successMessage: `Attachment ${attachmentId} has been deleted.`
      })
    });
  }).catch(error => {
    dispatch({
      type: DELETE_ABOX_ATTACHMENTS,
      payload: error,
      error: true
    });
  });
};
/**
 * Upload Abox Attachment
 */


exports.deleteAboxAttachment = deleteAboxAttachment;

const uploadAboxAttachment = (id, type, file) => dispatch => {
  dispatch({
    type: UPLOAD_ABOX_ATTACHMENTS_STARTED
  });
  let query = null;
  let variables = null;

  if (type === 'process') {
    query = 'mutation ($file: Upload!, $processId: String!) { attachToProcess(file: $file, processId: $processId) }';
    variables = {
      file: null,
      processId: String(id)
    };
  } else {
    query = 'mutation ($file: Upload!, $taskId: String!) { attachToTask(file: $file, taskId: $taskId) }';
    variables = {
      file: null,
      taskId: id
    };
  }

  return _client.graphql.upload({
    query,
    variables,
    file
  }).then(resp => {
    const meta = (0, _Immutable.default)({
      successMessage: `Attachment has been uploaded successfully.`
    });
    dispatch({
      type: UPLOAD_ABOX_ATTACHMENTS,
      payload: resp,
      meta
    });
  }).catch(error => {
    dispatch({
      type: UPLOAD_ABOX_ATTACHMENTS,
      payload: error,
      error: true
    });
  });
};
/**
 * Set Timeline Range
 */


exports.uploadAboxAttachment = uploadAboxAttachment;

const setTimelineRange = range => dispatch => {
  dispatch({
    type: SET_TIMELINE_ZOOM,
    payload: range
  });
};

exports.setTimelineRange = setTimelineRange;