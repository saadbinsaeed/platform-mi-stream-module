"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _EventsList = _interopRequireDefault(require("./EventsList/EventsList"));

var _Mistream = _interopRequireDefault(require("app/containers/Stream/Events/Mistream/Mistream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ValidatedRoute = (0, _recompose.pure)(props => {
  const {
    title,
    canView,
    ...rest
  } = props;

  if (!canView) {
    return _react.default.createElement(_PageNotAllowed.default, {
      title: title
    });
  }

  return _react.default.createElement(_reactRouterDom.Route, rest);
});
/**
 * Define the routes for the Event's views.
 */

class EventsRoute extends _react.PureComponent {
  /**
   * @override
   */
  render() {
    const {
      match: {
        url
      }
    } = this.props;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canViewEvents = isAdmin || permissionsSet.has('mistream.events.view');
    const canViewMistream = isAdmin || permissionsSet.has('mistream.main.view');
    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(ValidatedRoute, {
      path: `${url}/`,
      exact: true,
      component: _EventsList.default,
      title: "Events",
      canView: canViewEvents
    }), _react.default.createElement(ValidatedRoute, {
      path: `${url}/mi-stream`,
      exact: true,
      component: _Mistream.default,
      title: "Mi Stream",
      canView: canViewMistream
    }));
  }

}

_defineProperty(EventsRoute, "propTypes", {
  match: _propTypes.default.shape({
    url: _propTypes.default.string
  }),
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile
}))(EventsRoute);

exports.default = _default;