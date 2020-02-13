"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _common = require("app/utils/propTypes/common");

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _avatar = require("app/utils/avatar/avatar");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CommonStyles = (0, _styledComponents.css)(["display:flex;align-items:center;justify-content:center;", ";", ";width:", ";height:", ";line-height:", ";border-radius:", ";color:white;"], ({
  fluid
}) => fluid ? ' width: 100%; height: auto;' : '', ({
  size,
  theme
}) => size && theme ? `width: ${theme.sizes[size].image}; height: ${theme.sizes[size].image};` : '', ({
  width
}) => width || '', ({
  height
}) => height || '', ({
  lineHeight
}) => lineHeight || '75px', ({
  rounded
}) => rounded ? '500rem' : 'none');

const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Avatar__Wrapper",
  componentId: "lbj41l-0"
})(["line-height:0;min-width:2rem;"]);

const ImageStyle = _styledComponents.default.img.withConfig({
  displayName: "Avatar__ImageStyle",
  componentId: "lbj41l-1"
})(["", ";"], CommonStyles);

const IconStyle = _styledComponents.default.div.withConfig({
  displayName: "Avatar__IconStyle",
  componentId: "lbj41l-2"
})(["", ";overflow:hidden;background:", ";"], CommonStyles, ({
  backgroundColor
}) => backgroundColor || '#3888C1');

const InitialsStyle = _styledComponents.default.div.withConfig({
  displayName: "Avatar__InitialsStyle",
  componentId: "lbj41l-3"
})(["", ";background:", ";"], CommonStyles, ({
  theme,
  name
}) => (0, _avatar.generateColor)(Object.values(theme.statusColors), name));
/**
 * Renders the image of an avatar.
 */


class Avatar extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildAvatar", (0, _memoizeOne.default)((src, size, className, onClick, alt, rounded, width, height, name, initials, iconName, iconColor, lineHeight) => {
      if (src) {
        const srcWithAuth = src.startsWith('data:') ? src : `${src}?access_token=${_affectliSso.default.getToken() || ''}`;
        return _react.default.createElement(ImageStyle, {
          src: srcWithAuth,
          size: size,
          className: className,
          onClick: onClick,
          alt: alt,
          rounded: rounded,
          width: width,
          height: height
        });
      }

      if (iconName) {
        return _react.default.createElement(IconStyle, {
          size: size,
          className: className,
          onClick: onClick,
          alt: alt,
          width: width,
          height: height,
          name: name,
          rounded: rounded,
          lineHeight: lineHeight,
          backgroundColor: iconColor
        }, _react.default.createElement(_Icon.default, {
          type: "mdi",
          name: iconName,
          hexColor: "#fff"
        }));
      }

      return _react.default.createElement(InitialsStyle, {
        size: size,
        className: className,
        onClick: onClick,
        alt: alt,
        width: width,
        height: height,
        name: name,
        rounded: rounded
      }, initials);
    }));
  }

  render() {
    const {
      size,
      src,
      className,
      alt,
      onClick,
      name,
      width,
      height,
      rounded,
      iconName,
      iconColor,
      lineHeight
    } = this.props;
    const initials = (0, _avatar.createInitials)(name);
    return _react.default.createElement(Wrapper, {
      className: "avatar"
    }, this.buildAvatar(src, size, className, onClick, alt, rounded, width, height, name, initials, iconName, iconColor, lineHeight));
  }

}

exports.default = Avatar;

_defineProperty(Avatar, "propTypes", {
  size: _common.SizeProps,
  src: _propTypes.default.string,
  width: _propTypes.default.string,
  height: _propTypes.default.string,
  name: _propTypes.default.string,
  rounded: _propTypes.default.bool,
  className: _propTypes.default.string,
  alt: _propTypes.default.string
});

_defineProperty(Avatar, "defaultProps", {
  rounded: true
});