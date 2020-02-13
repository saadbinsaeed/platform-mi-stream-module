"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadProcessDefinition = exports.loadAboxMyAppsFavorites = exports.saveAboxMyAppsFavorites = exports.loadTypeaheadProcessDefinitions = exports.loadAboxMyApps = exports.LOAD_TYPEAHEAD_PROCESS_DEFINITIONS = exports.LOAD_TYPEAHEAD_PROCESS_DEFINITIONS_STARTED = exports.LOAD_ABOX_PROCESS_DEFINITION = exports.LOAD_ABOX_PROCESS_DEFINITION_STARTED = exports.SAVE_APPS_FAVORITES = exports.SAVE_APPS_FAVORITES_STARTED = exports.LOAD_APPS_FAVORITES = exports.LOAD_APPS_FAVORITES_STARTED = exports.LOAD_APPS = exports.LOAD_APPS_STARTED = void 0;

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _processesDefinitionsTypeaheadQuery = _interopRequireDefault(require("graphql/abox/processesDefinitionsTypeaheadQuery"));

var _processesDefinitionsQuery = _interopRequireDefault(require("graphql/abox/processesDefinitionsQuery"));

var _processDefinitionQuery = _interopRequireDefault(require("graphql/abox/processDefinitionQuery"));

var _usersActions = require("store/actions/admin/usersActions");

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _utils = require("app/utils/utils");

var _actionUtils = require("app/utils/redux/action-utils");

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_APPS_STARTED = '@@affectli/abox/myapps/LOAD_APPS_STARTED';
exports.LOAD_APPS_STARTED = LOAD_APPS_STARTED;
const LOAD_APPS = '@@affectli/abox/myapps/LOAD_APPS';
exports.LOAD_APPS = LOAD_APPS;
const LOAD_APPS_FAVORITES_STARTED = '@@affectli/abox/myapps/LOAD_APPS_FAVORITES_STARTED';
exports.LOAD_APPS_FAVORITES_STARTED = LOAD_APPS_FAVORITES_STARTED;
const LOAD_APPS_FAVORITES = '@@affectli/abox/myapps/LOAD_APPS_FAVORITES';
exports.LOAD_APPS_FAVORITES = LOAD_APPS_FAVORITES;
const SAVE_APPS_FAVORITES_STARTED = '@@affectli/abox/myapps/SAVE_APPS_FAVORITES_STARTED';
exports.SAVE_APPS_FAVORITES_STARTED = SAVE_APPS_FAVORITES_STARTED;
const SAVE_APPS_FAVORITES = '@@affectli/abox/myapps/SAVE_APPS_FAVORITES';
exports.SAVE_APPS_FAVORITES = SAVE_APPS_FAVORITES;
const LOAD_ABOX_PROCESS_DEFINITION_STARTED = '@@affectli/abox/myapps/LOAD_ABOX_PROCESS_DEFINITION_STARTED';
exports.LOAD_ABOX_PROCESS_DEFINITION_STARTED = LOAD_ABOX_PROCESS_DEFINITION_STARTED;
const LOAD_ABOX_PROCESS_DEFINITION = '@@affectli/abox/myapps/LOAD_ABOX_PROCESS_DEFINITION';
exports.LOAD_ABOX_PROCESS_DEFINITION = LOAD_ABOX_PROCESS_DEFINITION;
const LOAD_TYPEAHEAD_PROCESS_DEFINITIONS_STARTED = '@@affectli/abox/myapps/LOAD_TYPEAHEAD_PROCESS_DEFINITIONS_STARTED';
exports.LOAD_TYPEAHEAD_PROCESS_DEFINITIONS_STARTED = LOAD_TYPEAHEAD_PROCESS_DEFINITIONS_STARTED;
const LOAD_TYPEAHEAD_PROCESS_DEFINITIONS = '@@affectli/abox/myapps/LOAD_TYPEAHEAD_PROCESS_DEFINITIONS';
/**
 * Load the Abox App List
 */

exports.LOAD_TYPEAHEAD_PROCESS_DEFINITIONS = LOAD_TYPEAHEAD_PROCESS_DEFINITIONS;

const loadAboxMyApps = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_APPS_STARTED
  });

  _client.graphql.query({
    query: _processesDefinitionsQuery.default,
    fetchPolicy: 'no-cache'
  }).then(response => {
    const processesDefinitions = (0, _lo.get)(response, 'data.records') || [];
    const apps = {};
    processesDefinitions.forEach(def => {
      let appId = (0, _lo.get)(def, 'application.id');

      if (!appId) {
        return;
      }

      const {
        application,
        ...processDefinition
      } = def;
      appId = (0, _utils.stringify)(appId) || '';

      if (!apps[appId]) {
        apps[appId] = { ...application,
          processesDefinitions: []
        };
      }

      apps[appId].processesDefinitions.push(processDefinition);
    });
    dispatch({
      type: LOAD_APPS,
      payload: Object.values(apps)
    });
  }).catch(error => {
    dispatch({
      type: LOAD_APPS,
      payload: error,
      error: true
    });
  });
};

exports.loadAboxMyApps = loadAboxMyApps;

const loadTypeaheadProcessDefinitions = () => (0, _actionUtils.loadData)(LOAD_TYPEAHEAD_PROCESS_DEFINITIONS_STARTED, LOAD_TYPEAHEAD_PROCESS_DEFINITIONS, _processesDefinitionsTypeaheadQuery.default)({});
/**
 * Load the Abox App List
 */


exports.loadTypeaheadProcessDefinitions = loadTypeaheadProcessDefinitions;

const saveAboxMyAppsFavorites = (path, id, name, isApp = false) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_APPS_FAVORITES_STARTED
  });

  try {
    const fullPath = `myApp.${path}`;
    let preferences = await (0, _usersActions._fetchPreferences)();
    const favorites = new Set((0, _lo.get)(preferences, fullPath) || []);
    let msg;

    if (favorites.has(id)) {
      msg = 'removed from';
      favorites.delete(id);
    } else {
      msg = 'added to';
      favorites.add(id);
    }

    preferences = (0, _Immutable.set)(preferences, fullPath, Array.from(favorites));
    await (0, _usersActions._savePreferences)(preferences);
    dispatch({
      type: SAVE_APPS_FAVORITES,
      payload: (0, _Immutable.default)(preferences),
      meta: (0, _Immutable.default)({
        successMessage: `${isApp ? 'App' : 'Process'} ${name} was ${msg} favorites.`
      })
    });
  } catch (error) {
    dispatch({
      type: SAVE_APPS_FAVORITES,
      error: true,
      payload: (0, _Immutable.default)(error),
      meta: (0, _Immutable.default)({
        errorMessage: 'An error occurred saving to favorites.'
      })
    });
  }
};
/**
  * Load the user preferences
  */


exports.saveAboxMyAppsFavorites = saveAboxMyAppsFavorites;

const loadAboxMyAppsFavorites = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_APPS_FAVORITES_STARTED
  });
  (0, _usersActions._fetchPreferences)().then(data => {
    dispatch({
      type: LOAD_APPS_FAVORITES,
      payload: (0, _Immutable.default)(data)
    });
  }).catch(error => {
    dispatch({
      type: LOAD_APPS_FAVORITES,
      error: true,
      payload: (0, _Immutable.default)(error)
    });
  });
};
/**
 * Load the Abox App List
 */


exports.loadAboxMyAppsFavorites = loadAboxMyAppsFavorites;

const loadProcessDefinition = (appId, definitionKey) => {
  const options = new _OptionsBuilder.default().filter({
    field: 'key',
    op: '=',
    value: definitionKey
  }).filter({
    field: 'application.id',
    op: '=',
    value: appId
  }).build();
  return (0, _actionUtils.loadData)(LOAD_ABOX_PROCESS_DEFINITION_STARTED, LOAD_ABOX_PROCESS_DEFINITION, _processDefinitionQuery.default)(options);
};

exports.loadProcessDefinition = loadProcessDefinition;