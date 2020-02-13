"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutateData = exports.dispatchError = exports.dispatchSuccess = exports.loadData = exports.loadTableData = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return result or full data
 *
 * @param response data from request.
 */
const _getData = response => {
  const data = response.data || {};
  return data && data.result !== undefined ? data.result : data;
};
/**
 * Returns the handler function to dipatch a succes after that a GraphQL action completes succesfully.
 *
 * @param dispatch the Redux's dispatch function.
 * @param type the action type to dispatch.
 * @param successMessage the success message to dispatch.
 */


const dispatchSuccess = (dispatch, type, successMessage) => response => {
  const payload = _getData(response);

  dispatch({
    type,
    payload: (0, _Immutable.default)(payload),
    meta: (0, _Immutable.default)({
      successMessage
    }),
    error: false
  });
  return payload;
};
/**
 * Returns the handler function to dipatch an error after that a GraphQL action throw an Error.
 *
 * @param dispatch the Redux's dispatch function.
 * @param type the action type to dispatch.
 */


exports.dispatchSuccess = dispatchSuccess;

const dispatchError = (dispatch, type) => error => {
  dispatch({
    type,
    payload: (0, _Immutable.default)(error),
    error: true
  });
  return (0, _Immutable.default)(error);
};
/**
 * Returns the action to load the data for a DataTable.
 *
 * The returned action will accept only one parameter where the caller can specify the action options: { page, pageSize, countMax, where, orderBy, download }
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 * @param grqphQlQuery the graphql query.
 *    The query must accept as input variables: page, pageSize, where, orderBy, countMax.
 *    The output of the query must contains 2 properties: records and count.
 *    The records property must contains the list of records to display in the DataTable.
 *    The count property is the total number of records that match the query criterias.
 */


exports.dispatchError = dispatchError;

const loadTableData = (startActionType, endActionType, graphQlQuery, countMax) => options => (dispatch, getState) => {
  const {
    download,
    ...variables
  } = options || {};
  const meta = (0, _Immutable.default)({
    download,
    countMax
  });
  dispatch({
    type: startActionType,
    meta
  });
  return _client.graphql.query({
    query: graphQlQuery,
    variables: {
      page: 1,
      pageSize: 10,
      ...variables,
      countMax: countMax || 10000,
      orderBy: (variables.orderBy || []).map(({
        field,
        asc,
        where
      }) => ({
        field,
        direction: asc ? 'asc' : 'desc',
        where
      }))
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    const {
      count,
      records
    } = (0, _Immutable.default)((0, _lo.get)(response, 'data') || {});

    if (!Number.isInteger(count) || !Array.isArray(records)) {
      console.warn(`The action "${endActionType}" is not returning the correct data.`, response); // eslint-disable-line no-console

      throw new Error('The service\'s response is not well formed.');
    }

    dispatch({
      type: endActionType,
      payload: (0, _Immutable.default)({
        count,
        records: records.filter(record => record)
      }),
      meta,
      error: false
    });
    return {
      count,
      records
    };
  }).catch(error => {
    dispatch({
      type: endActionType,
      error: true,
      payload: (0, _Immutable.default)(error),
      meta
    });
    return error;
  });
};
/**
 * Returns the action to load the data using a GraphQL query.
 *
 * The returned action will accept only one parameter where the caller can specify the GraphQL query variables.
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 * @param graphQlQuery  the graphql query. If the output of the query contains the property "result"
 *                      just the value of this property will be returned, otherwise all the data will be returned.
 */


exports.loadTableData = loadTableData;

const loadData = (startActionType, endActionType, graphQlQuery) => variables => (dispatch, getState) => {
  const meta = { ...(variables || {})
  };
  dispatch({
    type: startActionType,
    meta
  });
  return _client.graphql.query({
    query: graphQlQuery,
    variables,
    fetchPolicy: 'no-cache'
  }).then(async response => {
    const payload = _getData(response);

    dispatch({
      type: endActionType,
      payload: (0, _Immutable.default)(payload),
      meta,
      error: false
    });
    return payload;
  }).catch(dispatchError(dispatch, endActionType));
};
/**
 * Returns the action to mutate data using GraphQL.
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 * @param graphQlMutation the graphql mutation.
 * @param successMessage the success message.
 */


exports.loadData = loadData;

const mutateData = (startActionType, endActionType, graphQlMutation, successMessage) => variables => (dispatch, getState) => {
  dispatch({
    type: startActionType
  });
  return _client.graphql.mutate({
    mutation: graphQlMutation,
    variables
  }).then(dispatchSuccess(dispatch, endActionType, successMessage)).catch(dispatchError(dispatch, endActionType));
};

exports.mutateData = mutateData;