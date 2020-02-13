"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ImageProps = _interopRequireDefault(require("app/components/atoms/Image/ImageProps"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _Popover = _interopRequireDefault(require("app/components/molecules/Popover/Popover"));

var _UserAvatarContent = _interopRequireDefault(require("app/components/molecules/UserAvatarContent/UserAvatarContent"));

var _UserStatus = _interopRequireDefault(require("app/components/molecules/UserStatus/UserStatus"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserAvatarStyle = _styledComponents.default.div.withConfig({
  displayName: "UserAvatar__UserAvatarStyle",
  componentId: "uew27g-0"
})(["position:relative;display:inline-block;&:focus{box-shadow:0 0 1px ", ";}"], ({
  theme
}) => theme.base.active.borderColor);

const UserAvatar = props => {
  const {
    src,
    size,
    alt,
    fluid,
    name,
    width,
    height,
    placement,
    status,
    className,
    title
  } = props;
  return _react.default.createElement(UserAvatarStyle, {
    className: `UserAvatar ${className}`,
    title: title
  }, _react.default.createElement(_Popover.default, {
    placement: placement,
    width: "260px",
    content: _react.default.createElement(_UserAvatarContent.default, {
      name: name,
      image: src
    })
  }, _react.default.createElement(_UserStatus.default, {
    status: status
  }), _react.default.createElement(_Avatar.default, {
    src: src,
    size: size,
    width: width,
    height: height,
    alt: alt,
    fluid: fluid
  })));
};

UserAvatar.propTypes = { ..._ImageProps.default,
  status: _common.UserStatusProps,
  className: _propTypes.default.string,
  placement: _common.PlacementProps
};
var _default = UserAvatar;
exports.default = _default;