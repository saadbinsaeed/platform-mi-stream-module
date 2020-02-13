"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _dataTableIds = require("app/config/dataTableIds");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _LabelListRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _lo = require("app/utils/lo/lo");

var _gridActions = require("store/actions/grid/gridActions");

var _userManagementAction = require("store/actions/admin/userManagementAction");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const UserLinkRenderer = data => {
  if (!data.value) {
    return null;
  }

  return _react.default.createElement(_Link.default, {
    to: `/user-management/${data.data.login}`
  }, data.value);
};

const columnIconRenderer = ({
  data
}) => {
  if (!data) {
    return null;
  }

  return _react.default.createElement(_Avatar.default, {
    size: "lg",
    src: data.image,
    name: data.name || 'No Name'
  });
};
/**
 * Shows the user grid view.
 */


class UserManagementList extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "buildGroupOptions", void 0);

    _defineProperty(this, "buildColumnDefinitions", (0, _fastMemoize.default)((groupOptions, organisationOptions) => {
      const groupOptionsNormalized = (groupOptions || []).map(({
        id,
        name
      }) => ({
        value: id,
        label: name
      }));
      const organizationOptionsNormalized = (organisationOptions || []).filter(({
        name
      }) => name).map(({
        id,
        name
      }) => ({
        value: id,
        label: `${name} (${id})`
      }));
      return [{
        header: '',
        field: '__icon__',
        fixed: true,
        exportable: false,
        filter: false,
        sortable: false,
        style: {
          width: '50px'
        },
        bodyComponent: columnIconRenderer
      }, {
        header: 'Display Name',
        field: 'name',
        bodyComponent: UserLinkRenderer
      }, {
        header: 'Username',
        field: 'login'
      }, {
        header: 'Email',
        field: 'partyId'
      }, {
        header: 'Groups',
        field: 'groups.id',
        filterMatchMode: '=',
        type: 'number',
        bodyComponent: ({
          data
        }) => _react.default.createElement(_LabelListRenderer.default, {
          data: data,
          value: (0, _lo.get)(data, 'groups', []),
          label: "name",
          redirectTo: 'group'
        }),
        renderValue: ({
          data
        }) => ((0, _lo.get)(data, 'groups') || []).map(({
          name
        }) => name).join(','),
        options: groupOptionsNormalized,
        sortable: false,
        style: {
          width: '300px'
        }
      }, {
        header: 'Organisations',
        field: 'relations.organisation2.id',
        filterMatchMode: '=',
        type: 'number',
        bodyComponent: ({
          data
        }) => _react.default.createElement(_LabelListRenderer.default, {
          data: data,
          value: (0, _lo.get)(data, 'relations', []),
          id: "organisation2.id",
          label: "organisation2.name",
          redirectTo: 'organisation'
        }),
        renderValue: ({
          data
        }) => ((0, _lo.get)(data, 'relations') || []).map(({
          organisation2
        }) => organisation2 && organisation2.name).filter(org => org !== null).join(','),
        options: organizationOptionsNormalized,
        sortable: false,
        style: {
          width: '300px'
        }
      }, {
        header: 'Created',
        field: 'createdDate',
        type: 'date'
      }, {
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
      }, {
        header: 'Last Authenticated',
        field: 'lastUpdatedDate',
        type: 'date'
      }];
    }));
  }

  /**
   * componentDidMount - description
   *
   * @return {type}  description
   */
  componentDidMount() {
    const {
      groupOptions,
      groupOptionsLoading,
      organisationOptions,
      organisationOptionsLoading
    } = this.props; // We will not load dropdown again if its already been loaded

    if (!groupOptions && !groupOptionsLoading) {
      this.props.loadGroupDropdownOptions();
    }

    if (!organisationOptions.lenght && !organisationOptionsLoading) {
      this.props.loadOrganisationsDropdownForGrid();
    }
  }

  /**
   * @override
   */
  render() {
    const {
      groupsLoading,
      organisationsLoading,
      groupOptions,
      organisationOptions
    } = this.props;

    if (groupsLoading || organisationsLoading) {
      return _react.default.createElement(_Loader.default, {
        radius: "30",
        absolute: true
      });
    }

    const columnDefinitions = this.buildColumnDefinitions(groupOptions, organisationOptions);
    return _react.default.createElement(_PageTemplate.default, {
      title: 'User Management'
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      dataTableId: _dataTableIds.USERS_DATA_TABLE,
      savePreferences: true,
      columnDefinitions: columnDefinitions,
      loadRows: this.props.loadUserManagement,
      gridSettings: this.gridSettings,
      isLoading: this.props.isLoading,
      isDownloading: this.props.isDownloading,
      downloadAll: true,
      disableCountdown: true,
      name: "user_list",
      value: this.props.records,
      totalRecords: this.props.recordsCount,
      countMax: this.props.recordsCountMax,
      dataKey: "login",
      selectionMode: "multiple"
    })));
  }

}

_defineProperty(UserManagementList, "propTypes", {
  loadUserManagement: _propTypes.default.func.isRequired,
  loadGroupDropdownOptions: _propTypes.default.func,
  loadOrganisationsDropdownForGrid: _propTypes.default.func,
  isLoading: _propTypes.default.bool.isRequired,
  isDownloading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  groupOptions: _propTypes.default.array,
  groupOptionsLoading: _propTypes.default.bool.isRequired,
  organisationOptions: _propTypes.default.array,
  organisationOptionsLoading: _propTypes.default.bool.isRequired
});

_defineProperty(UserManagementList, "defaultProps", {});

var _default = (0, _reactRedux.connect)(state => ({
  groupOptionsLoading: state.grid.dropdowns.groups.isLoading,
  groupOptions: state.grid.dropdowns.groups.records,
  organisationOptionsLoading: state.grid.dropdowns.organisations.isLoading,
  organisationOptions: state.grid.dropdowns.organisations.records,
  isLoading: state.admin.users.userlist.isLoading,
  isDownloading: state.admin.users.userlist.isDownloading,
  records: state.admin.users.userlist.records,
  recordsCount: state.admin.users.userlist.count,
  recordsCountMax: state.admin.users.userlist.countMax
}), {
  loadUserManagement: _userManagementAction.loadUserManagement,
  loadGroupDropdownOptions: _gridActions.loadGroupDropdownOptions,
  loadOrganisationsDropdownForGrid: _gridActions.loadOrganisationsDropdownForGrid
})(UserManagementList);

exports.default = _default;