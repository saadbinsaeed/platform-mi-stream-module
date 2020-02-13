"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledTheme = require("styled-theme");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from 'prop-types';
const UserStatusIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "UserStatus__UserStatusIcon",
  componentId: "lciwgm-0"
})(["background:white;border-radius:100%;display:inline-block;position:absolute;right:-3px;z-index:0;margin:0;padding:0;line-height:1;&:before{color:", "}"], ({
  theme,
  status,
  colorIndex
}) => (0, _styledTheme.palette)(status, colorIndex, true));

const UserStatus = props => {
  const {
    status
  } = props;
  let statusColor;
  let statusColorIndex;
  let statusIcon;

  switch (status) {
    case 'online':
      statusColor = 'green';
      statusColorIndex = 4;
      statusIcon = 'check-circle';
      break;

    case 'offline':
      statusColor = 'red';
      statusColorIndex = 1;
      statusIcon = 'minus-circle';
      break;

    case 'busy':
      statusColor = 'grey';
      statusColorIndex = 1;
      statusIcon = 'minus-circle';
      break;

    default:
      statusColor = 'grey';
      statusColorIndex = 8;
      statusIcon = 'check-circle';
  }

  return status !== 'disabled' && _react.default.createElement(UserStatusIcon, {
    name: statusIcon,
    size: "sm",
    status: statusColor,
    colorIndex: statusColorIndex
  });
};

UserStatus.propTypes = {
  status: _common.UserStatusProps
};
UserStatus.defaultProps = {
  status: 'disabled'
};
var _default = UserStatus;
exports.default = _default;