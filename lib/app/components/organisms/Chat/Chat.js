"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import PropTypes from 'prop-types';
const ChatStyle = _styledComponents.default.div.withConfig({
  displayName: "Chat__ChatStyle",
  componentId: "sc-13sw4kd-0"
})([""]);
/**
 * Chat Component
 */


class Chat extends _react.PureComponent {
  /**
   * Render our chat container
   */
  render() {
    return _react.default.createElement(ChatStyle, null, "Chat");
  }

}

var _default = Chat;
exports.default = _default;