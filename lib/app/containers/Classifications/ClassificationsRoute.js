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

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _common = require("app/utils/propTypes/common");

var _routerUtils = require("app/utils/router/routerUtils");

var _ClassificationList = _interopRequireDefault(require("./ClassificationList/ClassificationList"));

var _ClassificationDetail = _interopRequireDefault(require("./ClassificationDetail/ClassificationDetail"));

var _ClassificationAddContainer = _interopRequireDefault(require("./ClassificationAdd/ClassificationAddContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines the routes for the Classification views
 */
class ClassificationsRoute extends _react.Component {
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
    const canView = isAdmin || permissionsSet.has('entity.classification.view');

    if (!canView) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Classifications"
      });
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactRouterDom.Switch, {
      location: (0, _routerUtils.getLocation)(location, previousLocation)
    }, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}`,
      exact: true,
      component: _ClassificationList.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/add`,
      exact: true,
      component: _ClassificationAddContainer.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id`,
      component: _ClassificationDetail.default
    })), (0, _routerUtils.isModal)(location, previousLocation) ? _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/add`,
      component: _ClassificationAddContainer.default
    }) : null);
  }

}

_defineProperty(ClassificationsRoute, "propTypes", {
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
}), null)((0, _reactRouter.withRouter)(ClassificationsRoute));

exports.default = _default;