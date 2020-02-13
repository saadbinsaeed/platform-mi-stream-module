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

var _BroadcastList = _interopRequireDefault(require("app/containers/Broadcasts/BroadcastList"));

var _CreateBroadcast = _interopRequireDefault(require("app/containers/Broadcasts/CreateBroadcast"));

var _EditBroadcast = _interopRequireDefault(require("app/containers/Broadcasts/EditBroadcast"));

var _lazyComponent = _interopRequireDefault(require("app/utils/hoc/lazyComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const BroadcastCalendar = (0, _lazyComponent.default)((0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('app/containers/Broadcasts/BroadcastCalendar')))));
/**
 * Defines the routes for the Broadcasts views
 */

class BroadcastRoute extends _react.Component {
  /**
   * @override
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
    const canView = isAdmin || permissionsSet.has('broadcast.view');

    if (!canView) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Broadcasts"
      });
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactRouterDom.Switch, {
      location: (0, _routerUtils.getLocation)(location, previousLocation)
    }, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}`,
      exact: true,
      component: _BroadcastList.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/calendar`,
      component: BroadcastCalendar
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/add`,
      component: _CreateBroadcast.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/edit/:id`,
      component: _EditBroadcast.default
    })), (0, _routerUtils.isModal)(location, previousLocation) && _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/add`,
      component: _CreateBroadcast.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/edit/:id`,
      component: _CreateBroadcast.default
    })));
  }

}

_defineProperty(BroadcastRoute, "propTypes", {
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
}), null)((0, _reactRouter.withRouter)(BroadcastRoute));

exports.default = _default;