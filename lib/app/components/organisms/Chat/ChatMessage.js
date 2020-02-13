"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ChatMessageBox = _interopRequireDefault(require("./ChatMessageBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const ChatMessageStyle = _styledComponents.default.div.withConfig({
  displayName: "ChatMessage__ChatMessageStyle",
  componentId: "jatehm-0"
})(["display:flex;align-items:center;"]);
/**
 * Chat Component
 */


class ChatMessage extends _react.PureComponent {
  /**
   * Render our chat container
   */
  render() {
    return _react.default.createElement(ChatMessageStyle, null, _react.default.createElement(_ChatMessageBox.default, null));
  }

}

var _default = ChatMessage;
exports.default = _default;