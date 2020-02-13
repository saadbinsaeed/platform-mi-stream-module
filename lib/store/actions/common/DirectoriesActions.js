"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDirectoriesAutocomplete = exports.loadDirectories = exports.LOAD_DIRECTORIES_AUTOCOMPLETE = exports.LOAD_DIRECTORIES_AUTOCOMPLETE_STARTED = exports.LOAD_DIRECTORIES = exports.LOAD_DIRECTORIES_STARTED = void 0;

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _actionUtils = require("app/utils/redux/action-utils");

var _customEntityAutocompleteQuery = _interopRequireDefault(require("graphql/entities/customEntities/customEntityAutocompleteQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_DIRECTORIES_STARTED = '@@affectli/entities/things/LOAD_DIRECTORIES_STARTED';
exports.LOAD_DIRECTORIES_STARTED = LOAD_DIRECTORIES_STARTED;
const LOAD_DIRECTORIES = '@@affectli/entities/things/LOAD_DIRECTORIES';
exports.LOAD_DIRECTORIES = LOAD_DIRECTORIES;
const LOAD_DIRECTORIES_AUTOCOMPLETE_STARTED = '@@affectli/entities/things/LOAD_DIRECTORIES_AUTOCOMPLETE_STARTED';
exports.LOAD_DIRECTORIES_AUTOCOMPLETE_STARTED = LOAD_DIRECTORIES_AUTOCOMPLETE_STARTED;
const LOAD_DIRECTORIES_AUTOCOMPLETE = '@@affectli/entities/things/LOAD_DIRECTORIES_AUTOCOMPLETE';
/**
 * Loads the directories.
 *
 * @param queryParams the params to attach to the query string
 * @param queryOptions the query's options
 * @param callback
 */

exports.LOAD_DIRECTORIES_AUTOCOMPLETE = LOAD_DIRECTORIES_AUTOCOMPLETE;

const loadDirectories = (type = 'country') => dispatch => {
  dispatch({
    type: LOAD_DIRECTORIES_STARTED
  });
  const fields = [{
    field: 'domain'
  }, {
    field: 'label'
  }, {
    field: 'id'
  }];
  const where = [{
    field: 'domain',
    op: 'contains',
    value: type
  }];

  _HttpFetch.default.postResource('api/jrp/directory', {
    fields,
    where,
    kendo: false,
    continuousScrolling: false
  }).then(data => {
    dispatch({
      type: LOAD_DIRECTORIES,
      payload: (0, _Immutable.default)(data.data),
      meta: {
        directoryType: type
      }
    });
  }).catch(error => {
    dispatch({
      type: LOAD_DIRECTORIES,
      payload: error,
      error: true
    });
  });
};

exports.loadDirectories = loadDirectories;
const loadDirectoriesAutocomplete = (0, _actionUtils.loadData)(LOAD_DIRECTORIES_AUTOCOMPLETE_STARTED, LOAD_DIRECTORIES_AUTOCOMPLETE, _customEntityAutocompleteQuery.default);
exports.loadDirectoriesAutocomplete = loadDirectoriesAutocomplete;