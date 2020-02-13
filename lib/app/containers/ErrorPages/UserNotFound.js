"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _Alert = _interopRequireDefault(require("app/components/molecules/Alert/Alert"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * If user profile not found container
 */
class UserNotFound extends _react.Component {
  /**
   * @override
   */
  render() {
    const username = _affectliSso.default.getUserLogin();

    return _react.default.createElement(_PageTemplate.default, {
      title: "User not found",
      overflowHidden: true
    }, _react.default.createElement(_Flex.default, {
      grow: true,
      style: {
        height: '100%',
        justifyContent: 'center'
      }
    }, _react.default.createElement(_Alert.default, {
      type: "error"
    }, _react.default.createElement("div", null, "You are currently logged ", _react.default.createElement("b", null, username), " while trying to access ", _react.default.createElement("b", null, window.location.hostname), "."), _react.default.createElement("div", null, _react.default.createElement("b", null, username), " does not exist or is not allowed to log in to this domain."), _react.default.createElement("div", null, _react.default.createElement(_reactRouterDom.Link, {
      to: "#",
      onClick: () => _affectliSso.default.logout()
    }, "Click here to log out")))));
  }

}

var _default = UserNotFound;
exports.default = _default;