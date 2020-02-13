"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _lo = require("app/utils/lo/lo");

var _gridActions = require("store/actions/grid/gridActions");

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _Tag = _interopRequireDefault(require("app/components/atoms/Tag/Tag"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "SelectUsersGrid__StyledLink",
  componentId: "sc-1nyt9yu-0"
})(["text-decoration:none;"]);
/**
 * Renders a grid to select one ore more Users.
 */

class SelectUsersGrid extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      // {active: { value: true }} for this purpose column must be visible in grid
      sort: [{
        field: 'name',
        order: 1
      }],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "buildColumnDefinitions", (0, _fastMemoize.default)((organisationOptions, isAdmin) => {
      const organizationOptionsNormalized = (organisationOptions || []).filter(({
        name
      }) => name).map(({
        id,
        name
      }) => ({
        value: id,
        label: `${name} (${id})`
      }));
      const columnDefinitions = [{
        header: 'User Name',
        field: 'name'
      }, {
        header: 'User Login',
        field: 'login'
      }];

      if (isAdmin) {
        columnDefinitions.push({
          header: 'Active',
          field: 'active',
          type: 'boolean',
          sortable: false,
          bodyComponent: _BooleanRenderer.default,
          bodyComponentProps: {
            isTrue: value => value === true
          },
          renderValue: ({
            value
          }) => value === true ? 'Active' : 'Inactive',
          options: [{
            label: 'All',
            value: ''
          }, {
            label: 'Active',
            value: true
          }, {
            label: 'Inactive',
            value: false
          }],
          style: {
            width: '100px',
            textAlign: 'center'
          }
        });
      }

      columnDefinitions.push({
        header: 'Organisations',
        field: 'organisation',
        queryFields: ['person.relationships.organisation1.id', 'person.relationships.organisation2.id'],
        filterMatchMode: '=',
        type: 'number',
        bodyComponent: ({
          data
        }) => {
          const relationships = (0, _lo.get)(data, 'person.relationships', []);

          if (!relationships || !relationships.length) {
            return null;
          }

          return relationships.filter(r => r.organisation1 || r.organisation2).map((r, i) => {
            const organisation = r.organisation1 || r.organisation2;
            return _react.default.createElement(_Tag.default, {
              key: i,
              color: organisation.color
            }, _react.default.createElement(StyledLink, {
              to: `/organisations/${organisation.id}`
            }, organisation.name));
          });
        },
        options: organizationOptionsNormalized,
        sortable: false,
        style: {
          width: '300px'
        }
      });
      return columnDefinitions;
    }));

    _defineProperty(this, "onSelectionChange", event => {
      this.props.onSelectionChange(event.data);
    });

    _defineProperty(this, "loadData", options => {
      return this.props.groupUsersAddList(this.props.groupId, this.props.userProfile.isAdmin, options);
    });

    this.state = {
      lastUpdateDate: Date.now()
    };
    const {
      organisationOptions: _organisationOptions,
      organisationOptionsLoading
    } = props;

    if (!_organisationOptions.length && !organisationOptionsLoading) {
      props.loadOrganisationsDropdownForGrid();
    }
  }
  /**
   * componentDidUpdate - description
   *
   * @param  {type} prevProps: Object description
   * @return {type}                   description
   */


  componentDidUpdate(prevProps) {
    const {
      lastActionType,
      lastActionError
    } = this.props;

    if (this.props.entityType !== prevProps.entityType || !lastActionError && lastActionType === _groupsActions.ADD_GROUP_USERS && lastActionType !== prevProps.lastActionType) {
      this.setState({
        lastUpdateDate: Date.now()
      });
    }
  }
  /**
   *
   */


  /**
   * @override
   */
  render() {
    return _react.default.createElement(_DataTable.default, {
      key: this.state.lastUpdateDate,
      dataTableId: this.props.dataTableId,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.buildColumnDefinitions(this.props.organisationOptions, this.props.userProfile.isAdmin),
      loadRows: this.loadData,
      isLoading: this.props.isLoading,
      disableExport: true,
      disableCountdown: true,
      value: this.props.records,
      countMax: this.props.recordsCountMax,
      totalRecords: this.props.recordsCount,
      dataKey: 'login',
      selectionMode: "multiple",
      onSelectionChange: this.onSelectionChange
    });
  }

}

_defineProperty(SelectUsersGrid, "propTypes", {
  groupUsersAddList: _propTypes.default.func.isRequired,
  loadOrganisationsDropdownForGrid: _propTypes.default.func.isRequired,
  onSelectionChange: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  organisationOptions: _propTypes.default.array,
  organisationOptionsLoading: _propTypes.default.bool,
  groupId: _propTypes.default.string.isRequired,
  lastActionType: _propTypes.default.string,
  lastActionError: _propTypes.default.bool,
  dataTableId: _propTypes.default.string,
  userProfile: _propTypes.default.object
});

_defineProperty(SelectUsersGrid, "defaultProps", {
  isLoading: false,
  organisationOptionsLoading: false,
  organisationOptions: []
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.admin.groups.addUsersList.isLoading,
  records: state.admin.groups.addUsersList.records,
  recordsCount: state.admin.groups.addUsersList.count,
  recordsCountMax: state.admin.groups.addUsersList.countMax,
  organisationOptionsLoading: state.grid.dropdowns.organisations.isLoading,
  organisationOptions: state.grid.dropdowns.organisations.records,
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  userProfile: state.user.profile
}), {
  groupUsersAddList: _groupsActions.groupUsersAddList,
  loadOrganisationsDropdownForGrid: _gridActions.loadOrganisationsDropdownForGrid
})(SelectUsersGrid);

exports.default = _default;