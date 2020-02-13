"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _dataTableIds = require("app/config/dataTableIds");

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _TreeDataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableClient/TreeDataTable"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DeleteActionRenderer = ({
  data,
  deleteFunc
}) => {
  if (!data) {
    return null;
  }

  const element = _react.default.createElement("div", null, _react.default.createElement(_ButtonIcon.default, {
    icon: "delete",
    iconColor: "white",
    onClick: () => {
      deleteFunc(data.id);
    }
  }));

  return element;
};

const GroupLinkRenderer = ({
  data
}) => {
  if (!data) {
    return null;
  }

  const value = data.name || '';
  const displayName = (0, _stringUtils.cut)(value, 25, true);
  return _react.default.createElement(_reactRouterDom.Link, {
    to: `/groups/${encodeURIComponent(data.id)}/general`,
    title: value
  }, displayName);
};
/**
 * Shows the Groups grid view.
 */


class GroupsList extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefs", void 0);

    _defineProperty(this, "key", 0);

    _defineProperty(this, "gridSettings", {
      pageSize: -1,
      filters: {},
      sort: [],
      globalFilter: {
        value: '',
        filterMatchMode: 'contains'
      }
    });

    _defineProperty(this, "getData", (0, _memoizeOne.default)(groups => groups.map(group => ({ ...group,
      parentId: group.parent && group.parent.id,
      _entitiesCount: group._entitiesCount + group._processDefinitionsCount,
      createdBy: group.createdBy || {
        name: ''
      },
      modifiedBy: group.modifiedBy || {
        name: ''
      }
    }))));

    _defineProperty(this, "loadRows", options => {
      return this.props.loadGroups({ ...options,
        pageSize: 1000
      });
    });

    this.columnDefs = [{
      header: 'Group Name',
      field: 'name',
      bodyComponent: GroupLinkRenderer,
      style: {
        width: '300px'
      }
    }, {
      header: 'Category',
      field: 'category'
    }, {
      header: 'Active',
      field: 'active',
      sortable: false,
      bodyComponent: _BooleanRenderer.default,
      renderValue: ({
        value
      }) => value ? 'Active' : 'Inactive',
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
      },
      type: 'boolean'
    }, {
      header: 'Users',
      field: '_usersCount',
      style: {
        width: '100px',
        textAlign: 'center'
      },
      filter: false
    }, {
      header: 'Entities',
      field: '_entitiesCount',
      style: {
        width: '100px',
        textAlign: 'center'
      },
      filter: false
    }, {
      header: 'Classifications',
      field: '_classificationsCount',
      style: {
        width: '120px',
        textAlign: 'center'
      },
      filter: false
    }, {
      header: 'Create Date',
      field: 'createdDate',
      type: 'date'
    }, {
      header: 'Modified Date',
      field: 'modifiedDate',
      type: 'date'
    }, {
      header: 'Created By',
      field: 'createdBy.name',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'createdBy.id',
        imageProperty: 'createdBy.image',
        nameProperty: 'createdBy.name'
      }
    }, {
      header: 'Modified By',
      field: 'modifiedBy.name',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'modifiedBy.id',
        imageProperty: 'modifiedBy.image',
        nameProperty: 'modifiedBy.name'
      }
    }];
    const {
      permissions,
      isAdmin
    } = props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('admin.group.edit');

    if (canEdit) {
      this.columnDefs.push({
        header: 'Action',
        field: '__action__',
        bodyComponent: DeleteActionRenderer,
        bodyComponentProps: {
          deleteFunc: this.props.deleteGroup
        },
        style: {
          textAlign: 'center',
          width: '100px'
        },
        filter: false,
        exportable: false
      });
    }
  }

  /**
   *
   */
  componentDidUpdate(prevProps) {
    const {
      lastActionType,
      lastActionError
    } = this.props;

    if (!lastActionError && [_groupsActions.DELETE_GROUP].indexOf(lastActionType) >= 0) {
      this.props.loadGroups();
      ++this.key;
    }
  }

  /**
   * @override
   */
  render() {
    return _react.default.createElement(_PageTemplate.default, {
      title: 'Groups & Permissions'
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_TreeDataTable.default, {
      dataTableId: _dataTableIds.GROUPS_DATA_TABLE,
      savePreferences: true,
      downloadAll: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.columnDefs,
      isLoading: this.props.isLoading,
      data: this.getData(this.props.groups),
      loadRows: this.loadRows,
      selectionMode: "single",
      dataKey: "id",
      name: "group_list",
      metaKeySelection: false
    })));
  }

}

_defineProperty(GroupsList, "propTypes", {
  loadGroups: _propTypes.default.func.isRequired,
  deleteGroup: _propTypes.default.func.isRequired,
  lastActionType: _propTypes.default.string,
  lastActionError: _propTypes.default.bool,
  groups: _propTypes.default.array,
  isLoading: _propTypes.default.bool.isRequired,
  userProfile: _propTypes.default.object.isRequired
});

_defineProperty(GroupsList, "defaultProps", {});

var _default = (0, _reactRedux.connect)(state => ({
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  groups: state.admin.groups.list.records,
  isLoading: state.admin.groups.list.isLoading,
  userProfile: state.user.profile
}), {
  loadGroups: _groupsActions.loadGroups,
  deleteGroup: _groupsActions.deleteGroup
})(GroupsList);

exports.default = _default;