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

var _Dashboard = _interopRequireDefault(require("app/containers/Dashboards_new/Dashboard"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

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
        title: "Dashboards (BETA)"
      });
    }

    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}`,
      exact: true,
      component: _Dashboard.default
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