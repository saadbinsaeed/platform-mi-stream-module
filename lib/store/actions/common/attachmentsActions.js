"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEntityAttachment = exports.attachEntityFile = exports.loadEntityAttachments = exports.DELETE_ATTACHMENT = exports.DELETE_ATTACHMENT_STARTED = exports.ATTACH_FILE = exports.ATTACH_FILE_STARTED = exports.GET_ATTACHMENTS = exports.GET_ATTACHMENTS_STARTED = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _actionUtils = require("app/utils/redux/action-utils");

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _client = require("graphql/client");

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _attachmentsQueryBuilder = _interopRequireDefault(require("graphql/common/attachmentsQueryBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GET_ATTACHMENTS_STARTED = '@@affectli/entities/things/attachments/GET_ATTACHMENTS_STARTED';
exports.GET_ATTACHMENTS_STARTED = GET_ATTACHMENTS_STARTED;
const GET_ATTACHMENTS = '@@affectli/entities/things/attachments/GET_ATTACHMENTS';
exports.GET_ATTACHMENTS = GET_ATTACHMENTS;
const ATTACH_FILE_STARTED = '@@affectli/entities/things/attachments/ATTACH_FILE_STARTED';
exports.ATTACH_FILE_STARTED = ATTACH_FILE_STARTED;
const ATTACH_FILE = '@@affectli/entities/things/attachments/ATTACH_FILE';
exports.ATTACH_FILE = ATTACH_FILE;
const DELETE_ATTACHMENT_STARTED = '@@affectli/entities/things/attachments/DELETE_ATTACHMENT_STARTED';
exports.DELETE_ATTACHMENT_STARTED = DELETE_ATTACHMENT_STARTED;
const DELETE_ATTACHMENT = '@@affectli/entities/things/attachments/DELETE_ATTACHMENT';
/**
 * Loads the attachments related to an entity for the DataTable.
 *
 * @param entityId the entity ID
 * @param entityType the entity type
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download, queryParams: { entityType, entityId } })
 */

exports.DELETE_ATTACHMENT = DELETE_ATTACHMENT;

const loadEntityAttachments = (entityId, entityType, options) => {
  const type = entityType === 'custom' ? 'customEntity' : entityType;
  const countType = `file${(0, _utils.capitalizeFirstLetter)(type)}`;
  const entity = entityType === 'custom' ? 'fileCustomEntities' : `${countType}s`;
  const filterByEntityId = {
    field: `${type}.id`,
    op: '=',
    value: entityId
  };
  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).filter(filterByEntityId).build();
  return (0, _actionUtils.loadData)(GET_ATTACHMENTS_STARTED, GET_ATTACHMENTS, (0, _attachmentsQueryBuilder.default)({
    entity,
    countType
  }))({ ...variables
  });
};
/**
 * Adds the given file to the specified entity as an attachment.
 *
 * @param entityId the Entity ID (required).
 * @param file the attachment (required).
 */


exports.loadEntityAttachments = loadEntityAttachments;

const attachEntityFile = (entityId, file) => dispatch => {
  dispatch({
    type: ATTACH_FILE_STARTED
  });
  const operations = {
    query: 'mutation ($file: Upload!, $entityId: Int!) { attachToEntity(file: $file, entityId: $entityId) }',
    variables: {
      file: null,
      entityId
    }
  };
  let errorMessage = 'File upload failed.';
  return _HttpFetch.default.postForm('graphql', operations, file).then(response => {
    if (response.errors) {
      throw new Error((0, _lo.get)(response, 'errors[0].message') || '');
    }

    dispatch({
      type: ATTACH_FILE,
      payload: (0, _Immutable.default)({
        entityId,
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
      type: ATTACH_FILE,
      payload: (0, _Immutable.default)(error),
      error: true,
      meta: (0, _Immutable.default)({
        errorMessage
      })
    });
  });
};
/**
 * Removes the specified attachment from to specified the Entity.
 *
 * @param entityId the Entity ID (required).
 * @param fileName the name of the attachment to delete (required).
 */


exports.attachEntityFile = attachEntityFile;

const deleteEntityAttachment = (entityId, fileName) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ATTACHMENT_STARTED,
    meta: (0, _Immutable.default)({
      entityId,
      fileName
    })
  });
  return _client.graphql.mutate({
    mutation: _graphqlTag.default`mutation ($fileName: String!, $entityId: Int!) { deleteEntityAttachment(fileName: $fileName, entityId: $entityId) }`,
    variables: {
      entityId,
      fileName
    }
  }).then(response => {
    dispatch({
      type: DELETE_ATTACHMENT,
      payload: null,
      meta: (0, _Immutable.default)({
        entityId,
        fileName,
        successMessage: `${fileName} successfully removed.`
      })
    });
  }).catch(error => {
    dispatch({
      type: DELETE_ATTACHMENT,
      payload: (0, _Immutable.default)(error),
      error: true,
      meta: (0, _Immutable.default)({
        entityId,
        fileName
      })
    });
  });
};

exports.deleteEntityAttachment = deleteEntityAttachment;