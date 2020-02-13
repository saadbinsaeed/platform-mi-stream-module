"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _PopoverContainerProps = _interopRequireDefault(require("app/components/molecules/Popover/Container/PopoverContainerProps.js"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserAvatarContentStyle = _styledComponents.default.div.withConfig({
  displayName: "UserAvatarContent__UserAvatarContentStyle",
  componentId: "sc-1212frf-0"
})(["display:block;text-align:center;"]);

const UserAvatarName = (0, _styledComponents.default)(_Title.default).withConfig({
  displayName: "UserAvatarContent__UserAvatarName",
  componentId: "sc-1212frf-1"
})(["padding:1rem;"]);

const UserAvatarContent = props => {
  const {
    name,
    image
  } = props;
  return _react.default.createElement(UserAvatarContentStyle, null, _react.default.createElement(_Avatar.default, {
    src: image,
    width: "150px",
    height: "150px"
  }), _react.default.createElement("br", null), _react.default.createElement(UserAvatarName, {
    as: "h3"
  }, name));
};

UserAvatarContent.propTypes = { ..._PopoverContainerProps.default,
  name: _propTypes.default.string,
  image: _propTypes.default.string
};
var _default = UserAvatarContent;
exports.default = _default;