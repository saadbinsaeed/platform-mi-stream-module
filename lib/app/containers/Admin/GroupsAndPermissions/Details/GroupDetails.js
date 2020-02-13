"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _GroupEntitiesTab = _interopRequireDefault(require("app/containers/Admin/GroupsAndPermissions/Details/Tabs/GroupEntitiesTab/GroupEntitiesTab"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _date = require("app/utils/date/date");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _GroupClassificationsTab = _interopRequireDefault(require("./Tabs/GroupClassificationsTab"));

var _GroupPermisionsTab = _interopRequireDefault(require("./Tabs/GroupPermisionsTab"));

var _GroupAboutTab = _interopRequireDefault(require("./Tabs/GroupAboutTab"));

var _GroupUsersTab = _interopRequireDefault(require("./Tabs/GroupUsersTab"));

var _GroupHistoryTab = _interopRequireDefault(require("./Tabs/GroupHistoryTab"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Main container to display the details view of the Groups & Permissions
 */
class GroupDetails extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildInfo", (0, _memoizeOne.default)((createdBy, modified, status) => [{
      key: 'Created by',
      value: createdBy
    }, {
      key: 'Last Modified',
      value: modified
    }, {
      key: 'Status',
      value: status
    }]));
  }

  /**
   * @override
   */
  componentDidMount() {
    const id = this.props.id;
    this.props.loadGroup(id);
  }

  /**
   * @override
   */
  render() {
    const {
      group,
      isLoading,
      savingGroup,
      id
    } = this.props;

    if (!isLoading && !group && !savingGroup) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `Group. (ID:${id})`
      });
    }

    const {
      createdBy,
      createdDate,
      modifiedDate,
      active,
      name
    } = group || {};
    const created_by = `${createdBy ? `${createdBy.name} on` : ''} ${(0, _date.formatDate)(createdDate)}`;
    const modified = (0, _date.formatDate)(modifiedDate);
    const status = active ? 'Active' : 'Inactive';
    const infoArray = this.buildInfo(created_by, modified, status);
    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), group && _react.default.createElement(_PageTemplate.default, {
      title: name,
      subTitle: `#${id}`,
      info: infoArray
    }, _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/groups/${id}/general`
    }), _react.default.createElement(_TabItem.default, {
      label: "Users",
      to: `/groups/${id}/users`
    }), _react.default.createElement(_TabItem.default, {
      label: "Entities",
      to: `/groups/${id}/entities`
    }), _react.default.createElement(_TabItem.default, {
      label: "Classifications",
      to: `/groups/${id}/classifications`
    }), _react.default.createElement(_TabItem.default, {
      label: "Group Permissions",
      to: `/groups/${id}/permissions`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/groups/${id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `/groups/:id`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/groups/${id}/general`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/groups/:id/general',
      component: _GroupAboutTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/groups/:id/users',
      component: _GroupUsersTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/groups/:id/entities',
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/groups/${id}/entities/thing`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/groups/:id/entities/:type`,
      component: _GroupEntitiesTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/groups/:id/classifications',
      component: _GroupClassificationsTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/groups/:id/permissions',
      component: _GroupPermisionsTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/groups/:id/history',
      render: () => _react.default.createElement(_GroupHistoryTab.default, {
        id: id
      })
    }))));
  }

}

_defineProperty(GroupDetails, "propTypes", {
  id: _propTypes.default.string.isRequired,
  group: _propTypes.default.object,
  loadGroup: _propTypes.default.func.isRequired,
  lastActionType: _propTypes.default.string,
  lastActionError: _propTypes.default.bool
});

var _default = (0, _reactRedux.connect)((state, ownProps) => ({
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  group: state.admin.groups.group.details,
  isLoading: state.admin.groups.group.isLoading,
  id: ownProps.match.params.id
}), {
  loadGroup: _groupsActions.loadGroup
})(GroupDetails);

exports.default = _default;