"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntityType = exports.loadEntityChangelog = exports.uploadImage = exports.removeEntityClass = exports.addEntityClasses = exports.GET_ENTITY_TYPE = exports.GET_ENTITY_TYPE_STARTED = exports.LOAD_ENTITY_CHANGELOG = exports.LOAD_ENTITY_CHANGELOG_STARTED = exports.REMOVE_ENTITY_CLASS = exports.REMOVE_ENTITY_CLASS_STARTED = exports.ADD_ENTITY_CLASS = exports.ADD_ENTITY_CLASS_STARTED = exports.LOAD_ENTITY_ACTIVITIES = exports.LOAD_ENTITY_ACTIVITIES_STARTED = exports.UPLOAD_IMAGE = exports.UPLOAD_IMAGE_STARTED = void 0;

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _actionUtils = require("app/utils/redux/action-utils");

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _entityClassesQuery = _interopRequireDefault(require("graphql/entities/entities/entityClassesQuery"));

var _entityChangelogQuery = _interopRequireDefault(require("graphql/entities/entities/entityChangelogQuery"));

var _saveEntityMutation = _interopRequireDefault(require("graphql/entities/entities/saveEntityMutation"));

var _getEntityTypeQuery = _interopRequireDefault(require("graphql/entities/common/getEntityTypeQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UPLOAD_IMAGE_STARTED = '@@affectli/entities/UPLOAD_IMAGE_STARTED';
exports.UPLOAD_IMAGE_STARTED = UPLOAD_IMAGE_STARTED;
const UPLOAD_IMAGE = '@@affectli/entities/UPLOAD_IMAGE';
exports.UPLOAD_IMAGE = UPLOAD_IMAGE;
const LOAD_ENTITY_ACTIVITIES_STARTED = '@@affectli/entities/LOAD_ENTITY_ACTIVITIES_STARTED';
exports.LOAD_ENTITY_ACTIVITIES_STARTED = LOAD_ENTITY_ACTIVITIES_STARTED;
const LOAD_ENTITY_ACTIVITIES = '@@affectli/entities/LOAD_ENTITY_ACTIVITIES';
exports.LOAD_ENTITY_ACTIVITIES = LOAD_ENTITY_ACTIVITIES;
const ADD_ENTITY_CLASS_STARTED = '@@affectli/entities/ADD_ENTITY_CLASS_STARTED';
exports.ADD_ENTITY_CLASS_STARTED = ADD_ENTITY_CLASS_STARTED;
const ADD_ENTITY_CLASS = '@@affectli/entities/ADD_ENTITY_CLASS';
exports.ADD_ENTITY_CLASS = ADD_ENTITY_CLASS;
const REMOVE_ENTITY_CLASS_STARTED = '@@affectli/entities/REMOVE_ENTITY_CLASS_STARTED';
exports.REMOVE_ENTITY_CLASS_STARTED = REMOVE_ENTITY_CLASS_STARTED;
const REMOVE_ENTITY_CLASS = '@@affectli/entities/REMOVE_ENTITY_CLASS';
exports.REMOVE_ENTITY_CLASS = REMOVE_ENTITY_CLASS;
const LOAD_ENTITY_CHANGELOG_STARTED = '@@affectli/entities/LOAD_ENTITY_CHANGELOG_STARTED';
exports.LOAD_ENTITY_CHANGELOG_STARTED = LOAD_ENTITY_CHANGELOG_STARTED;
const LOAD_ENTITY_CHANGELOG = '@@affectli/entities/LOAD_ENTITY_CHANGELOG';
exports.LOAD_ENTITY_CHANGELOG = LOAD_ENTITY_CHANGELOG;
const GET_ENTITY_TYPE_STARTED = '@@affectli/entities/GET_ENTITY_TYPE_STARTED';
exports.GET_ENTITY_TYPE_STARTED = GET_ENTITY_TYPE_STARTED;
const GET_ENTITY_TYPE = '@@affectli/entities/GET_ENTITY_TYPE';
/**
 * Save the specified entity.
 *
 * @param entityId the Entity ID.
 */

exports.GET_ENTITY_TYPE = GET_ENTITY_TYPE;

const _saveEntity = record => _client.graphql.mutate({
  mutation: _saveEntityMutation.default,
  variables: {
    record
  }
});
/**
 * Returns the classes of the specified entity.
 *
 * @param entityId the Entity ID.
 */


const _getEntityClasses = entityId => _client.graphql.query({
  query: _entityClassesQuery.default,
  variables: {
    id: entityId
  },
  fetchPolicy: 'no-cache'
});
/**
 * Add the given class to the specified entity
 *
 * @param entityId the Entity ID.
 * @param classUri the Class URI.
 */


const addEntityClasses = (entityId, classUri) => async dispatch => {
  dispatch({
    type: ADD_ENTITY_CLASS_STARTED
  });
  const prefix = classUri.length === 1 ? 'Classification' : 'Classifications';
  return _getEntityClasses(entityId).then(response => {
    return ((0, _lo.get)(response, 'data.entity.classes') || []).map(({
      uri
    }) => uri);
  }).then(uris => {
    // merge the actual classes and the new ones (removing duplicates, if any)
    const set = new Set([...uris, ...classUri]);

    if (set.size === new Set(uris).size) {
      throw new Error(`${prefix} already added.`);
    }

    return _saveEntity({
      id: entityId,
      classes: Array.from(set).map(uri => ({
        uri
      }))
    });
  }).then((0, _actionUtils.dispatchSuccess)(dispatch, ADD_ENTITY_CLASS, `${prefix} added.`)).catch((0, _actionUtils.dispatchError)(dispatch, ADD_ENTITY_CLASS));
};
/**
 * Remove the specified class from the specified entity.
 *
 * @param entityId the Entity ID.
 * @param classUri the Class URI.
 */


exports.addEntityClasses = addEntityClasses;

const removeEntityClass = (entityId, classUri) => dispatch => {
  dispatch({
    type: REMOVE_ENTITY_CLASS_STARTED
  });
  return _getEntityClasses(entityId).then(response => {
    return ((0, _lo.get)(response, 'data.entity.classes') || []).map(({
      uri
    }) => uri);
  }).then(uris => {
    const set = new Set(uris);
    const deleted = set.delete(classUri);

    if (!deleted) {
      throw new Error('Classification already removed.');
    }

    return _saveEntity({
      id: entityId,
      classes: Array.from(set).map(uri => ({
        uri
      }))
    });
  }).then((0, _actionUtils.dispatchSuccess)(dispatch, REMOVE_ENTITY_CLASS, 'Classification removed.')).catch((0, _actionUtils.dispatchError)(dispatch, REMOVE_ENTITY_CLASS));
};
/**
 * Upload the image for the specified Entity.
 *
 * @param entityId - the Entity ID (required)
 * @param entityType - the Entity type (required)
 * @param image - the image to attach (required)
 */


exports.removeEntityClass = removeEntityClass;

const uploadImage = (entityId, entityType, image) => dispatch => {
  if (!entityId || !entityType || !image) {
    throw new Error(`Cannot upload the image: a required parameter is missing: id=${entityId}, type=${entityType}, image=${String(image)}`);
  } // if the file is not an image return an error


  if (image.type.indexOf('image/') !== 0) {
    dispatch({
      type: UPLOAD_IMAGE,
      payload: new Error('Upload failed: the specified file is not an image.'),
      error: true,
      meta: (0, _Immutable.default)({
        errorTitle: 'Upload failed',
        errorMessage: `The file "${image.name}" is not an image.`
      })
    });
    const error = new Error(`The file "${image.name}" is not an image.`);
    return Promise.reject(error);
  }

  dispatch({
    type: UPLOAD_IMAGE_STARTED,
    meta: (0, _Immutable.default)({
      entityId,
      entityType
    })
  });
  const info = {
    entityId,
    image: ''
  };
  return _HttpFetch.default.uploadFile(`api/rsc/${entityType}_image_${entityId}`, image, 'image').then(response => {
    info.image = response.image;
    return _saveEntity({
      id: entityId,
      image: response.image
    });
  }).then(response => {
    dispatch({
      type: UPLOAD_IMAGE,
      payload: (0, _Immutable.default)(info),
      meta: (0, _Immutable.default)({
        entityId,
        entityType,
        successMessage: 'Image uploaded.'
      })
    });
    return info;
  }).catch(error => {
    dispatch({
      type: UPLOAD_IMAGE,
      payload: error,
      error: true,
      meta: (0, _Immutable.default)({
        entityId,
        entityType,
        errorMessage: 'Image upload failed.'
      })
    });
    return error;
  });
};
/**
 * Fetch the entity changelog.
 *
 * @param id the entity ID.
 */


exports.uploadImage = uploadImage;

const loadEntityChangelog = (id, options) => dispatch => {
  dispatch({
    type: LOAD_ENTITY_CHANGELOG_STARTED
  });
  return _client.graphql.query({
    query: _entityChangelogQuery.default,
    variables: {
      id,
      textId: String(id),
      ...options
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    const payload = {
      changes: (0, _lo.get)(response, 'data.entity.changelog'),
      startIndex: options.startIndex,
      count: (0, _lo.get)(response, 'data.count')
    };
    dispatch({
      type: LOAD_ENTITY_CHANGELOG,
      payload
    });
  }).catch(error => {
    dispatch({
      type: LOAD_ENTITY_CHANGELOG,
      payload: error,
      error: true
    });
  });
};

exports.loadEntityChangelog = loadEntityChangelog;

const getEntityType = id => (0, _actionUtils.loadData)(GET_ENTITY_TYPE_STARTED, GET_ENTITY_TYPE, _getEntityTypeQuery.default)({
  id
});

exports.getEntityType = getEntityType;