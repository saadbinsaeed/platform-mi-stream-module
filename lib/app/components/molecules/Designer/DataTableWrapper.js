"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _appActions = require("store/actions/app/appActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "DataTableWrapper__Wrapper",
  componentId: "z79rdf-0"
})(["margin:1rem 0;border:1px solid gray;"]);
/**
 * @class
 */


class DataTableWrapper extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      records: [],
      count: 0,
      isLoading: false,
      isDownloading: false
    });

    _defineProperty(this, "loadRows", options => {
      let where, defaultOrderBy;

      try {
        where = JSON.parse(this.props.graphQlWhere || '[]');
      } catch (error) {
        this.props.showToastr({
          severity: 'error',
          detail: `Error parsing graphQlWhere: ${error}`
        });
        return;
      }

      try {
        defaultOrderBy = this.props.graphQlDefaultOrderBy && JSON.parse(this.props.graphQlDefaultOrderBy);
      } catch (error) {
        this.props.showToastr({
          severity: 'error',
          detail: `Error parsing graphQlDefaultOrderBy: ${error}`
        });
        return;
      }

      const variables = options || {};
      variables.where = [...variables.where, ...where];

      if (defaultOrderBy && (!variables.orderBy || !variables.orderBy.length)) {
        variables.orderBy = defaultOrderBy;
      }

      const countMax = 10000;
      this.setState({
        isLoading: true
      });
      return _client.graphql.query({
        query: (0, _graphqlTag.default)(this.props.graphQlQuery),
        variables: {
          page: 1,
          pageSize: 10,
          ...variables,
          countMax,
          orderBy: (variables.orderBy || []).map(({
            field,
            asc
          }) => ({
            field,
            direction: asc ? 'asc' : 'desc'
          }))
        },
        fetchPolicy: 'no-cache'
      }).then(response => {
        const {
          count,
          records
        } = (0, _lo.get)(response, 'data') || {};

        if (!Number.isInteger(count) || !Array.isArray(records)) {
          console.warn(`The query "${this.props.graphQlQuery}" is not returning the correct data.`, response); // eslint-disable-line no-console

          throw new Error('The service\'s response is not well formed.');
        }

        this.setState({
          records,
          count,
          isLoading: false
        });
      }).catch(error => {
        this.props.showToastr({
          severity: 'error',
          detail: `the grqphQl service is returning an error: ${error}`
        });
        this.setState({
          records: [],
          count: 0,
          isLoading: false
        });
      });
    });
  }

  /**
   * @override
   */
  render() {
    const {
      gridSettings,
      columnDefinitions
    } = this.props;
    return _react.default.createElement(Wrapper, null, _react.default.createElement(_DataTable.default, {
      gridSettings: gridSettings,
      columnDefinitions: columnDefinitions,
      loadRows: this.loadRows,
      isLoading: this.state.isLoading,
      isDownloading: this.props.isDownloading,
      disableCountdown: true,
      value: this.state.records,
      totalRecords: this.state.count,
      showMenuButton: true,
      toggleMenu: this.props.toggleMenu
    }));
  }

}

_defineProperty(DataTableWrapper, "propTypes", {
  graphQlQuery: _propTypes.default.string.isRequired,
  graphQlWhere: _propTypes.default.string,
  graphQlDefaultOrderBy: _propTypes.default.string,
  columnDefinitions: _propTypes.default.array.isRequired,
  gridSettings: _propTypes.default.object.isRequired
});

_defineProperty(DataTableWrapper, "defaultProps", {
  graphQlOptions: {},
  isLoading: false
});

var _default = (0, _reactRedux.connect)(null, {
  showToastr: _appActions.showToastr
})(DataTableWrapper);

exports.default = _default;