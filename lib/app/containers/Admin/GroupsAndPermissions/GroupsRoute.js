"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _common = require("app/utils/propTypes/common");

var _routerUtils = require("app/utils/router/routerUtils");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _GroupsAdd = _interopRequireDefault(require("./GroupsAdd"));

var _GroupsList = _interopRequireDefault(require("./GroupsList"));

var _GroupDetails = _interopRequireDefault(require("./Details/GroupDetails"));

var _GroupUsersAdd = _interopRequireDefault(require("./Details/GroupUsersAdd"));

var _GroupEntitiesAdd = _interopRequireDefault(require("./Details/GroupEntitiesAdd"));

var _GroupClassesAdd = _interopRequireDefault(require("./Details/GroupClassesAdd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines the routes for the Groups & Permissions views
 */
class GroupsRoute extends _react.Component {
  /**
   * @override
   * Always make sure you use PageTemplate as PageContainer
   */
  render() {
    const {
      match,
      location,
      previousLocation
    } = this.props;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canView = isAdmin || permissionsSet.has('admin.group.view');

    if (!canView) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Groups"
      });
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactRouterDom.Switch, {
      location: (0, _routerUtils.getLocation)(location, previousLocation)
    }, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}`,
      exact: true,
      component: _GroupsList.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/add`,
      component: _GroupsAdd.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id`,
      exact: true,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/general`,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/users`,
      exact: true,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/users/add`,
      component: _GroupUsersAdd.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/entities`,
      exact: true,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/entities/:type`,
      exact: true,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/entities/:type/add`,
      component: _GroupEntitiesAdd.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/permissions`,
      exact: true,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/history`,
      exact: true,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/classifications`,
      exact: true,
      component: _GroupDetails.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id/classifications/add`,
      component: _GroupClassesAdd.default
    })), (0, _routerUtils.isModal)(location, previousLocation) ? _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/add`
    }, _react.default.createElement(_GroupsAdd.default, null)) : null);
  }

}

_defineProperty(GroupsRoute, "propTypes", {
  location: _propTypes.default.object,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string
  }),
  previousLocation: _propTypes.default.object,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  previousLocation: state.routing.previousLocation,
  userProfile: state.user.profile
}), null)((0, _reactRouter.withRouter)(GroupsRoute));

exports.default = _default;