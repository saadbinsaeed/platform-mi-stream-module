"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphql = exports.client = void 0;

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _apolloLinkContext = require("apollo-link-context");

var _apolloLinkHttp = require("apollo-link-http");

var _apolloClient = require("apollo-client");

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _lo = require("app/utils/lo/lo");

var _env = require("app/utils/env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const httpLink = (0, _apolloLinkHttp.createHttpLink)({
  uri: String('/graphql'),
  credentials: 'same-origin'
});
const cache = new _apolloCacheInmemory.InMemoryCache({
  addTypename: false
}); // This should allow us to persist the cache to local storage, or use localForage

/*
persistCache({
    cache,
    storage: window.localStorage,
});
*/

const authLink = (0, _apolloLinkContext.setContext)((_, {
  headers
}) => {
  return {
    headers: { ...headers,
      Authorization: _affectliSso.default.getBearerToken()
    }
  };
});
const client = new _apolloClient.ApolloClient({
  link: authLink.concat(httpLink),
  cache
});
/**
 * The application GraphQL client wrapper.
 */

exports.client = client;

class GraphQlClient {
  /**
   *
   */
  constructor(apolloClient) {
    _defineProperty(this, "client", void 0);

    _defineProperty(this, "handleResponse", response => {
      if (response.errors) {
        const message = (0, _lo.get)(response, 'errors[0].message') || 'Server error.';
        throw new Error(message);
      }

      return response;
    });

    _defineProperty(this, "handleError", (error, options) => {
      const definitions = (0, _lo.get)(options, 'query.definitions') || (0, _lo.get)(options, 'mutation.definitions'); // eslint-disable-next-line no-console

      console.log('[GraphQlClient] an error occured executing', Array.isArray(definitions) && definitions.map(def => def.name && def.name.value).join(' '), ', variables:', (0, _lo.get)(options, 'variables'), ', error:', error);
      const message = (0, _lo.get)(error, 'networkError.result.errors[0].message');

      if (message) {
        throw new Error(message);
      }

      if (Array.isArray(error.graphQLErrors)) {
        throw new Error(error.graphQLErrors.map(({
          message
        }) => message).join('\n'));
      }

      if (typeof error.message === 'string') {
        if (error.message.startsWith('Network error: Unexpected token')) {
          throw new Error('Service error.');
        }

        throw new Error(error.message);
      }

      throw error;
    });

    this.client = apolloClient;
  }

  /**
   * Wraps the ApolloClient to fail in case of errors.
   */
  query(options) {
    // eslint-disable-next-line no-console
    _env.isDev && console.debug('[dev] graphql executing query', options.query.definitions.map(def => def.name && def.name.value).join(' '));
    return this.client.query(options).then(this.handleResponse).catch(error => this.handleError(error, options));
  }

  mutate(options) {
    // eslint-disable-next-line no-console
    _env.isDev && console.debug('[dev] graphql executing mutation', options.mutation.definitions.map(def => def.name && def.name.value).join(' '));
    return this.client.mutate(options).then(this.handleResponse).catch(error => this.handleError(error, options));
  }

  upload(options) {
    const {
      query,
      variables,
      file
    } = options;
    return _HttpFetch.default.postForm('graphql', {
      query,
      variables
    }, file).then(this.handleResponse).catch(error => this.handleError(error, options));
  }

}

const graphql = new GraphQlClient(client);
exports.graphql = graphql;