"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _GlobalTemplate = _interopRequireDefault(require("app/components/templates/GlobalTemplate"));

var _EventsRoute = _interopRequireDefault(require("app/containers/Stream/Events/EventsRoute"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _usersActions = require("store/actions/admin/usersActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Load main parts of the Application
// import DevTestRoute from 'app/devtest/DevTestRoute'

/**
 * AppRoute Container
 */
class AppRoute extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "timer", void 0);

    _defineProperty(this, "previousRequestTime", void 0);

    _defineProperty(this, "state", {
      key: 1
    });

    _defineProperty(this, "reloadFullPage", () => this.setState({
      key: this.state.key + 1
    }));
  }

  /**
   * @override
   */
  componentWillMount() {
    if (!this.props.preferences && !this.props.loadingPreferences) {
      this.props.loadUserPreferences();
    }

    if (!this.props.profile && !this.props.loadingProfile) {
      this.props.loadUserProfile();
    }
  }
  /**
   * @override
   */


  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /**
   * @override
   */
  render() {
    const {
      profile,
      preferences
    } = this.props;

    if (!profile || !preferences) {
      return _react.default.createElement(_Loader.default, {
        absolute: true
      });
    } // const DevToolsSwitch: Object = this.DevToolsSwitch;
    // eslint-disable-next-line no-restricted-globals


    return _react.default.createElement(_GlobalTemplate.default, {
      key: this.state.key
    }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: "/",
      component: _EventsRoute.default
    })));
  }

}

_defineProperty(AppRoute, "propTypes", {
  profile: _propTypes.default.object,
  loadingProfile: _propTypes.default.bool.isRequired,
  loadUserProfile: _propTypes.default.func.isRequired,
  preferences: _propTypes.default.object,
  loadingPreferences: _propTypes.default.bool.isRequired,
  loadUserPreferences: _propTypes.default.func.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  loadingPreferences: state.user.loadingPreferences,
  preferences: state.user.preferences,
  loadingProfile: state.user.loadingProfile,
  profile: state.user.profile
}), {
  loadUserPreferences: _usersActions.loadUserPreferences,
  loadUserProfile: _usersActions.loadUserProfile
})(AppRoute);

exports.default = _default;