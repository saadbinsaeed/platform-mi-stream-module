"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const ChatMessageBoxStyle = _styledComponents.default.div.withConfig({
  displayName: "ChatMessageBox__ChatMessageBoxStyle",
  componentId: "jbcrar-0"
})([""]);
/**
 * Chat Component
 */


class ChatMessageBox extends _react.PureComponent {
  /**
   * Render our chat container
   */
  render() {
    return _react.default.createElement(ChatMessageBoxStyle, null, _react.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam culpa, ea ipsa magni maiores modi omnis pariatur quibusdam sequi sunt suscipit unde veritatis, voluptatibus? Ab culpa deleniti natus velit voluptates?"));
  }

}

var _default = ChatMessageBox;
exports.default = _default;