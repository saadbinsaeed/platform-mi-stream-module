"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadProfileImage = exports.resetDataTablePreferences = exports.saveDataTablePreferences = exports.saveUserPreferences = exports.loadUserPreferences = exports._savePreferences = exports._fetchPreferences = exports.loadUserProfile = exports.loadUserSelect = exports.loadUserAutocomplete = exports.LOAD_USER_SELECT = exports.LOAD_USER_SELECT_STARTED = exports.LOAD_USER_AUTOCOMPLETE = exports.LOAD_USER_AUTOCOMPLETE_STARTED = exports.UPLOAD_PROFILE_IMAGE = exports.UPLOAD_PROFILE_IMAGE_STARTED = exports.LOAD_USER_PROFILE = exports.LOAD_USER_PROFILE_STARTED = exports.SAVE_DATA_TABLE_PREFERENCES = exports.SAVE_DATA_TABLE_PREFERENCES_STARTED = exports.RESET_DATA_TABLE_PREFERENCES = exports.RESET_DATA_TABLE_PREFERENCES_STARTED = exports.SAVE_USER_PREFERENCES = exports.SAVE_USER_PREFERENCES_STARTED = exports.LOAD_USER_PREFERENCES = exports.LOAD_USER_PREFERENCES_STARTED = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _actionUtils = require("app/utils/redux/action-utils");

var _client = require("graphql/client");

var _profileQuery = _interopRequireDefault(require("graphql/users/profileQuery"));

var _preferencesQuery = _interopRequireDefault(require("graphql/users/preferencesQuery"));

var _profileMutation = _interopRequireDefault(require("graphql/users/profileMutation"));

var _userAutocompleteQuery = _interopRequireDefault(require("graphql/users/userAutocompleteQuery"));

var _userSelectQuery = _interopRequireDefault(require("graphql/users/userSelectQuery"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_USER_PREFERENCES_STARTED = '@@affectli/users/LOAD_USER_PREFERENCES_STARTED';
exports.LOAD_USER_PREFERENCES_STARTED = LOAD_USER_PREFERENCES_STARTED;
const LOAD_USER_PREFERENCES = '@@affectli/users/LOAD_USER_PREFERENCES';
exports.LOAD_USER_PREFERENCES = LOAD_USER_PREFERENCES;
const SAVE_USER_PREFERENCES_STARTED = '@@affectli/users/SAVE_USER_PREFERENCES_STARTED';
exports.SAVE_USER_PREFERENCES_STARTED = SAVE_USER_PREFERENCES_STARTED;
const SAVE_USER_PREFERENCES = '@@affectli/users/SAVE_USER_PREFERENCES';
exports.SAVE_USER_PREFERENCES = SAVE_USER_PREFERENCES;
const RESET_DATA_TABLE_PREFERENCES_STARTED = '@@affectli/users/RESET_DATA_TABLE_PREFERENCES_STARTED';
exports.RESET_DATA_TABLE_PREFERENCES_STARTED = RESET_DATA_TABLE_PREFERENCES_STARTED;
const RESET_DATA_TABLE_PREFERENCES = '@@affectli/users/RESET_DATA_TABLE_PREFERENCES';
exports.RESET_DATA_TABLE_PREFERENCES = RESET_DATA_TABLE_PREFERENCES;
const SAVE_DATA_TABLE_PREFERENCES_STARTED = '@@affectli/users/SAVE_DATA_TABLE_PREFERENCES_STARTED';
exports.SAVE_DATA_TABLE_PREFERENCES_STARTED = SAVE_DATA_TABLE_PREFERENCES_STARTED;
const SAVE_DATA_TABLE_PREFERENCES = '@@affectli/users/SAVE_DATA_TABLE_PREFERENCES';
exports.SAVE_DATA_TABLE_PREFERENCES = SAVE_DATA_TABLE_PREFERENCES;
const LOAD_USER_PROFILE_STARTED = '@@affectli/users/LOAD_USER_PROFILE_STARTED';
exports.LOAD_USER_PROFILE_STARTED = LOAD_USER_PROFILE_STARTED;
const LOAD_USER_PROFILE = '@@affectli/users/LOAD_USER_PROFILE';
exports.LOAD_USER_PROFILE = LOAD_USER_PROFILE;
const UPLOAD_PROFILE_IMAGE_STARTED = '@@affectli/users/UPLOAD_PROFILE_IMAGE_STARTED';
exports.UPLOAD_PROFILE_IMAGE_STARTED = UPLOAD_PROFILE_IMAGE_STARTED;
const UPLOAD_PROFILE_IMAGE = '@@affectli/users/UPLOAD_PROFILE_IMAGE';
exports.UPLOAD_PROFILE_IMAGE = UPLOAD_PROFILE_IMAGE;
const LOAD_USER_AUTOCOMPLETE_STARTED = '@@affectli/users/LOAD_USER_AUTOCOMPLETE_STARTED';
exports.LOAD_USER_AUTOCOMPLETE_STARTED = LOAD_USER_AUTOCOMPLETE_STARTED;
const LOAD_USER_AUTOCOMPLETE = '@@affectli/users/LOAD_USER_AUTOCOMPLETE';
exports.LOAD_USER_AUTOCOMPLETE = LOAD_USER_AUTOCOMPLETE;
const LOAD_USER_SELECT_STARTED = '@@affectli/users/LOAD_USER_SELECT_STARTED';
exports.LOAD_USER_SELECT_STARTED = LOAD_USER_SELECT_STARTED;
const LOAD_USER_SELECT = '@@affectli/users/LOAD_USER_SELECT';
/**
 * Loads the suggestions for the user autocomplete component.
 */

exports.LOAD_USER_SELECT = LOAD_USER_SELECT;
const loadUserAutocomplete = (0, _actionUtils.loadData)(LOAD_USER_AUTOCOMPLETE_STARTED, LOAD_USER_AUTOCOMPLETE, _userAutocompleteQuery.default);
/**
 * Loads the suggestions for the user select component.
 */

exports.loadUserAutocomplete = loadUserAutocomplete;
const loadUserSelect = (0, _actionUtils.loadData)(LOAD_USER_SELECT_STARTED, LOAD_USER_SELECT, _userSelectQuery.default);
/**
 * Load the user profile
 */

exports.loadUserSelect = loadUserSelect;

const loadUserProfile = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_USER_PROFILE_STARTED
  });

  _client.graphql.query({
    query: _profileQuery.default,
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: LOAD_USER_PROFILE,
      payload: (0, _Immutable.default)((0, _lo.get)(response, 'data.user'))
    });
  }).catch(error => {
    dispatch({
      type: LOAD_USER_PROFILE,
      payload: error,
      error: true
    });
  });
};

exports.loadUserProfile = loadUserProfile;

const _fetchPreferences = () => {
  return _client.graphql.query({
    query: _preferencesQuery.default,
    fetchPolicy: 'no-cache'
  }).then(data => (0, _lo.get)(data, 'data.preferences.preferences') || {});
};

exports._fetchPreferences = _fetchPreferences;

const _savePreferences = preferences => {
  return _client.graphql.mutate({
    mutation: _graphqlTag.default`mutation savePreferences($preferences: JSON) {
          savePreferences(preferences: $preferences)
        }`,
    variables: {
      preferences
    }
  });
};
/**
 * Load the user preferences
 */


exports._savePreferences = _savePreferences;

const loadUserPreferences = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_USER_PREFERENCES_STARTED
  });

  _fetchPreferences().then(data => {
    dispatch({
      type: LOAD_USER_PREFERENCES,
      payload: (0, _Immutable.default)(data)
    });
  }).catch(error => {
    dispatch({
      type: LOAD_USER_PREFERENCES,
      error: true,
      payload: (0, _Immutable.default)(error)
    });
  });
};
/**
 * Saves the user preferences
 */


exports.loadUserPreferences = loadUserPreferences;

const saveUserPreferences = preferences => (dispatch, getState) => {
  dispatch({
    type: SAVE_USER_PREFERENCES_STARTED
  });

  _savePreferences(preferences).then(data => {
    dispatch({
      type: SAVE_USER_PREFERENCES,
      payload: (0, _Immutable.default)(preferences),
      meta: (0, _Immutable.default)({
        successMessage: 'User\'s preferences correctly saved.'
      })
    });
  }).catch(error => {
    dispatch({
      type: SAVE_USER_PREFERENCES,
      error: true,
      payload: error,
      meta: (0, _Immutable.default)({
        errorMessage: 'An error occured saving the user\'s preferences.'
      })
    });
  });
};
/**
 * Saves the data table status in the user preferences.
 *
 * @param dataTableId the data table's ID.
 * @param status the data table's status.
 */


exports.saveUserPreferences = saveUserPreferences;

const saveDataTablePreferences = (dataTableId, status) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_DATA_TABLE_PREFERENCES_STARTED
  });

  try {
    let preferences = await _fetchPreferences();
    preferences = (0, _Immutable.set)(preferences, `dataTable.${dataTableId}`, status);
    await _savePreferences(preferences);
    dispatch({
      type: SAVE_DATA_TABLE_PREFERENCES,
      payload: (0, _Immutable.default)(preferences),
      meta: (0, _Immutable.default)({
        successMessage: 'Data table preferences correctly saved.'
      })
    });
  } catch (error) {
    dispatch({
      type: SAVE_DATA_TABLE_PREFERENCES,
      error: true,
      payload: (0, _Immutable.default)(error),
      meta: (0, _Immutable.default)({
        errorMessage: 'An error occured saving the data table preferences.'
      })
    });
  }
};
/**
 * Reset the data table status in the user preferences.
 *
 * @param dataTableId the data table's ID.
 */


exports.saveDataTablePreferences = saveDataTablePreferences;

const resetDataTablePreferences = dataTableId => async (dispatch, getState) => {
  dispatch({
    type: RESET_DATA_TABLE_PREFERENCES_STARTED
  });

  try {
    let preferences = await _fetchPreferences();
    preferences = (0, _Immutable.set)(preferences, `dataTable.${dataTableId}`, null);
    await _savePreferences(preferences);
    dispatch({
      type: RESET_DATA_TABLE_PREFERENCES,
      payload: (0, _Immutable.default)(preferences),
      meta: (0, _Immutable.default)({
        successMessage: 'Data table preferences successfully restored'
      })
    });
  } catch (error) {
    dispatch({
      type: RESET_DATA_TABLE_PREFERENCES,
      error: true,
      payload: (0, _Immutable.default)(error),
      meta: (0, _Immutable.default)({
        errorMessage: 'An error occured restoring the data table preferences.'
      })
    });
  }
};
/**
 * Upload the user's profile image.
 *
 * @param image - the image to attach (required)
 */


exports.resetDataTablePreferences = resetDataTablePreferences;

const uploadProfileImage = image => (dispatch, getState) => {
  dispatch({
    type: UPLOAD_PROFILE_IMAGE_STARTED
  });
  let id = '';

  try {
    if (!image) {
      throw new Error('The image parameter is required');
    }

    const state = getState();
    id = state.user.profile.id;

    if (!id) {
      throw new Error('The profile.id is required!');
    } // if the file is not an image return an error


    if (image.type.indexOf('image/') !== 0) {
      const error = new Error(`The file "${image.name}" is not an image.`);
      return Promise.reject(error);
    }
  } catch (error) {
    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: (0, _Immutable.default)(error),
      error: true,
      meta: (0, _Immutable.default)({
        errorMessage: error.message
      })
    });
    return Promise.reject(error);
  }

  const info = {
    id,
    image: ''
  };
  return _HttpFetch.default.uploadFile(`api/rsc/profile_image_${id}`, image, 'image').then(response => {
    info.image = response.image;
    return _client.graphql.mutate({
      mutation: _profileMutation.default,
      variables: {
        profile: {
          image: response.image
        }
      }
    });
  }).then(response => {
    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: (0, _Immutable.default)(info),
      meta: (0, _Immutable.default)({
        successMessage: 'Profile image uploaded.'
      })
    });
    return info;
  }).catch(error => {
    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: error,
      error: true,
      meta: (0, _Immutable.default)({
        errorMessage: 'Profile image upload failed.'
      })
    });
    return error;
  });
};

exports.uploadProfileImage = uploadProfileImage;