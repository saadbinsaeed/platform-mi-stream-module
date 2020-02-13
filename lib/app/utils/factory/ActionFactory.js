"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jrpActionFactory = void 0;

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the action to invoke the specified JRP API.
 * The returned function has three parameter:
 * <ul>
 *     <li>queryParams - the params to attach to the query string</li>
 *     <li>queryOptions - the query's options</li>
 *     <li>callback - @deprecated</li>
 * </ul>
 *
 * @param options
 * @returns {function(Object, Object, Function)} the action
 */
const jrpActionFactory = options => {
  const {
    starterActionType,
    actionType,
    url,
    urlBuilder,
    metaBuilder,
    metaStarterBuilder,
    metaErrorBuilder
  } = options;
  return (queryParams, queryOptions, callback) => {
    return (dispatch, getState) => {
      // get or build the url
      let apiUrl = '';

      if (url) {
        apiUrl = url;
      } else if (urlBuilder) {
        apiUrl = urlBuilder(queryParams);
      } else {
        throw new Error('The url and the urlBuilder parameters are not defined: one of the two parameter has to be defined.');
      }

      const metaStarter = metaStarterBuilder ? (0, _Immutable.default)(metaStarterBuilder(queryParams, queryOptions)) : undefined;
      dispatch({
        type: starterActionType,
        meta: metaStarter
      });

      _HttpFetch.default.postResource(apiUrl, queryOptions || {}).then(response => {
        const meta = metaBuilder ? (0, _Immutable.default)(metaBuilder(response, queryParams, queryOptions)) : {
          size: response.recordcount,
          page: response.page_num,
          recordsPerPage: response.records_per_page
        };
        dispatch({
          type: actionType,
          payload: (0, _Immutable.default)(response.data),
          meta
        });
        if (callback) callback(response);
      }).catch(error => {
        const meta = metaErrorBuilder ? (0, _Immutable.default)(metaErrorBuilder(error, queryParams, queryOptions)) : undefined;
        dispatch({
          type: actionType,
          payload: error,
          error: true,
          meta
        });
        if (callback) callback(error);
      });
    };
  };
};

exports.jrpActionFactory = jrpActionFactory;