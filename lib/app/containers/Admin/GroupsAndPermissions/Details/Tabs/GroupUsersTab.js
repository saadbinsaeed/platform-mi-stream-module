"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _common = require("app/utils/propTypes/common");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _dataTableIds = require("app/config/dataTableIds");

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ButtonStyle = _styledComponents.default.div.withConfig({
  displayName: "GroupUsersTab__ButtonStyle",
  componentId: "sc-1366qca-0"
})(["display:flex;justify-content:center;"]);
/**
 * Container that is used to display the Users tab of the Groups & Permissions details view.
 */


class GroupsUsersTab extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "key", 0);

    _defineProperty(this, "gridSettings", void 0);

    _defineProperty(this, "canAdd", void 0);

    _defineProperty(this, "canEdit", void 0);

    _defineProperty(this, "loadRows", options => {
      return this.props.loadGroupUsers(this.props.match.params.id, options, this.props.userProfile.isAdmin);
    });

    this.gridSettings = {
      pageSize: 10,
      filters: {},
      sort: [{
        field: 'user.name',
        order: 1
      }],
      globalFilter: {
        value: ''
      }
    };
    const permissions = this.props.userProfile.permissions;
    const isAdmin = this.props.userProfile.isAdmin;
    const permissionsSet = new Set(permissions || []);
    this.canEdit = isAdmin || permissionsSet.has('admin.group.edit');
    this.canAdd = isAdmin || permissionsSet.has('admin.group.add');
    this.columnDefinitions = [{
      header: 'Name',
      field: 'user.name'
    }, {
      header: 'User Login',
      field: 'user.login'
    }];

    if (isAdmin) {
      this.columnDefinitions.push({
        header: 'Active',
        field: 'user.active',
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

    if (this.canEdit) {
      this.columnDefinitions.push({
        header: 'Action',
        field: 'id',
        bodyComponent: ({
          value: id,
          data: {
            user
          }
        }) => id ? _react.default.createElement(ButtonStyle, null, _react.default.createElement(_ButtonIcon.default, {
          style: {
            color: 'white'
          },
          icon: "delete",
          onClick: () => {
            props.removeGroupUser(id, user.id);
          }
        })) : null,
        style: {
          width: '80px'
        },
        filter: false,
        sortable: false,
        exportable: false
      });
    }
  }
  /**
   * This function will be used to pass the query paramerts
   */


  /**
   * @override
   */
  render() {
    const {
      lastActionError,
      lastActionType
    } = this.props;

    if (!lastActionError && [_groupsActions.ADD_GROUP_USERS, _groupsActions.REMOVE_GROUP_USERS].indexOf(lastActionType) >= 0) {
      ++this.key;
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      key: this.key,
      dataTableId: _dataTableIds.GROUP_USERS_DATA_TABLE,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.columnDefinitions,
      loadRows: this.loadRows,
      isLoading: this.props.isLoading,
      isDownloading: this.props.isDownloading,
      disableCountdown: true,
      name: "group_user",
      value: this.props.records,
      totalRecords: this.props.recordsCount,
      countMax: this.props.recordsCountMax,
      dataKey: "user.login",
      selectionMode: "multiple"
    })), _react.default.createElement(_FooterBar.default, null, this.canEdit && _react.default.createElement(_TextIcon.default, {
      icon: "plus",
      label: "Add",
      color: "primary",
      to: `${this.props.match.url}/add`
    })));
  }

}

_defineProperty(GroupsUsersTab, "propTypes", {
  lastActionType: _propTypes.default.string,
  lastActionError: _propTypes.default.bool,
  removeGroupUser: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  isDownloading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  loadGroupUsers: _propTypes.default.func.isRequired,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  }),
  userProfile: _propTypes.default.object.isRequired
});

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(state => ({
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  isLoading: state.admin.groups.users.isLoading,
  isDownloading: state.admin.groups.users.isDownloading,
  records: state.admin.groups.users.records,
  recordsCount: state.admin.groups.users.count,
  recordsCountMax: state.admin.groups.users.countMax,
  userProfile: state.user.profile
}), {
  loadGroupUsers: _groupsActions.loadGroupUsers,
  removeGroupUser: _groupsActions.removeGroupUser
})(GroupsUsersTab));

exports.default = _default;