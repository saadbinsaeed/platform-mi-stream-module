"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactDeviceDetect = require("react-device-detect");

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Tooltip = _interopRequireDefault(require("app/components/atoms/Tooltip/Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HeaderWrapper = _styledComponents.default.header.withConfig({
  displayName: "MessengerHeader__HeaderWrapper",
  componentId: "xzasg3-0"
})(["grid-area:chatHead;display:grid;grid-template-columns:1fr auto;align-items:center;justify-content:space-between;padding:1rem;background:#31343d;color:", ";box-shadow:", ";z-index:1;"], ({
  theme
}) => theme.color.white, ({
  theme
}) => theme.shadow.z1);

const Left = _styledComponents.default.div.withConfig({
  displayName: "MessengerHeader__Left",
  componentId: "xzasg3-1"
})(["display:grid;align-items:center;grid-template-columns:auto auto 1fr;"]);

const Right = _styledComponents.default.div.withConfig({
  displayName: "MessengerHeader__Right",
  componentId: "xzasg3-2"
})(["display:flex;align-items:center;margin-left:1rem"]);

const TitleWrapper = _styledComponents.default.div.withConfig({
  displayName: "MessengerHeader__TitleWrapper",
  componentId: "xzasg3-3"
})(["overflow:hidden;"]); // eslint-disable-next-line max-len


const MessengerHeader = ({
  fullScreen,
  toggleFullscreen,
  openTeamMembers,
  goToSummary,
  goToAttachments,
  title,
  subTitle,
  onClose,
  toggleSidebar
}) => _react.default.createElement(HeaderWrapper, null, _react.default.createElement(Left, null, _react.default.createElement(TitleWrapper, null, _react.default.createElement(_Title.default, {
  as: "h2"
}, title), _react.default.createElement(_Title.default, {
  as: "h4"
}, subTitle))), _react.default.createElement(_Tooltip.default, {
  x: -30,
  y: -200
}, _react.default.createElement(Right, null, _react.default.createElement(_ButtonIcon.default, {
  alt: "Go to Task/Process",
  icon: "login-variant",
  iconColor: "white",
  onClick: goToSummary
}), _reactDeviceDetect.isBrowser && _react.default.createElement(_ButtonIcon.default, {
  alt: fullScreen ? 'Collapse Messenger' : 'Expand Messenger',
  icon: fullScreen ? 'arrow-collapse' : 'open-in-new',
  iconColor: "white",
  onClick: toggleFullscreen
}), _react.default.createElement(_ButtonIcon.default, {
  alt: "See Team",
  icon: "account-multiple",
  iconColor: "white",
  onClick: openTeamMembers
}), _react.default.createElement(_Tooltip.default, {
  x: -30,
  y: -150
}, _react.default.createElement(_ButtonIcon.default, {
  alt: "See Attachments",
  icon: "paperclip",
  iconColor: "white",
  onClick: goToAttachments
})), _react.default.createElement(_ButtonIcon.default, {
  alt: "Close",
  icon: "close",
  iconColor: "white",
  onClick: onClose
}))));

var _default = MessengerHeader;
exports.default = _default;