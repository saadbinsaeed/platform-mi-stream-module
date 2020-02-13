"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _common = require("app/utils/propTypes/common");

var _Dashboard = _interopRequireDefault(require("app/containers/Dashboards/Dashboard"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _MemberOfTasks = _interopRequireDefault(require("app/containers/Dashboards/Lists/MemberOfTasks"));

var _MyOwnedTasks = _interopRequireDefault(require("app/containers/Dashboards/Lists/MyOwnedTasks"));

var _MyAssignedTasks = _interopRequireDefault(require("app/containers/Dashboards/Lists/MyAssignedTasks"));

var _MyDoneTasks = _interopRequireDefault(require("app/containers/Dashboards/Lists/MyDoneTasks"));

var _MyAssignedProcesses = _interopRequireDefault(require("app/containers/Dashboards/Lists/MyAssignedProcesses"));

var _MyOwnedProcesses = _interopRequireDefault(require("app/containers/Dashboards/Lists/MyOwnedProcesses"));

var _MemberOfProcesses = _interopRequireDefault(require("app/containers/Dashboards/Lists/MemberOfProcesses"));

var _MyDoneProcesses = _interopRequireDefault(require("app/containers/Dashboards/Lists/MyDoneProcesses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines the routes for the Classification views
 */
class DashboardsRoute extends _react.Component {
  /**
   * @override
   */
  render() {
    const {
      match
    } = this.props;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canView = isAdmin || permissionsSet.has('dashboard.view');

    if (!canView) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Dashboards"
      });
    }

    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}`,
      exact: true,
      component: _Dashboard.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/tasks/member`,
      exact: true,
      component: _MemberOfTasks.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/tasks/owned`,
      exact: true,
      component: _MyOwnedTasks.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/tasks/assigned`,
      exact: true,
      component: _MyAssignedTasks.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/tasks/done`,
      exact: true,
      component: _MyDoneTasks.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/processes/assigned`,
      exact: true,
      component: _MyAssignedProcesses.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/processes/member`,
      exact: true,
      component: _MemberOfProcesses.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/processes/owned`,
      exact: true,
      component: _MyOwnedProcesses.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/processes/done`,
      exact: true,
      component: _MyDoneProcesses.default
    }));
  }

}

_defineProperty(DashboardsRoute, "propTypes", {
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string
  }),
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile
}), null)((0, _reactRouter.withRouter)(DashboardsRoute));

exports.default = _default;