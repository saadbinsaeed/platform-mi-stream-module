"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _common = require("app/utils/propTypes/common");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _UserList = _interopRequireDefault(require("./UserList"));

var _UserAdd = _interopRequireDefault(require("./UserAdd"));

var _UserDetails = _interopRequireDefault(require("./Details/UserDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const UserManagementRoute = (0, _react.memo)(props => {
  const {
    permissions,
    isAdmin
  } = props.userProfile;
  const permissionsSet = new Set(permissions || []);
  const canView = isAdmin || permissionsSet.has('admin.user.view');

  if (!canView) {
    return _react.default.createElement(_PageNotAllowed.default, {
      title: "Users"
    });
  }

  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: `/user-management`,
    exact: true,
    component: _UserList.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: `/user-management/add`,
    exact: true,
    component: _UserAdd.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: `/user-management/:id`,
    exact: true,
    component: _UserDetails.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: `/user-management/:id/about`,
    component: _UserDetails.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: `/user-management/:id/history`,
    component: _UserDetails.default
  }));
});
UserManagementRoute.propTypes = {
  match: (0, _common.RouterMatchPropTypeBuilder)({}),
  userProfile: _propTypes.default.object,
  isLoading: _propTypes.default.bool
};

var _default = (0, _reactRedux.connect)((state, ownProps) => ({
  id: ownProps.match.params.id,
  userProfile: state.user.profile
}))((0, _reactRouterDom.withRouter)(UserManagementRoute));

exports.default = _default;