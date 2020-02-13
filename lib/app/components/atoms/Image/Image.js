"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _default_user = _interopRequireDefault(require("assets/images/icons/default_user.jpg"));

var _ImageProps = _interopRequireDefault(require("./ImageProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ImageStyle = _styledComponents.default.img.withConfig({
  displayName: "Image__ImageStyle",
  componentId: "sc-13lpj78-0"
})(["", ";", ";width:", ";height:", ";border-radius:", ";"], ({
  fluid
}) => fluid ? ' width: 100%; height: auto;' : '', ({
  size,
  theme
}) => size && theme ? `width: ${theme.sizes[size].image}; height: ${theme.sizes[size].image};` : '', ({
  width
}) => width || '', ({
  height
}) => height || '', ({
  rounded
}) => rounded ? '500rem' : 'none');

const Image = props => {
  const {
    src,
    fluid,
    size,
    width,
    height,
    alt,
    rounded,
    className,
    ...rest
  } = props;
  const srcWithAuth = src && (src.startsWith('data:') ? src : `${src}?access_token=${_affectliSso.default.getToken() || ''}`) || _default_user.default;
  return _react.default.createElement(ImageStyle, _extends({
    rounded: rounded,
    fluid: fluid,
    width: width,
    height: height,
    src: srcWithAuth,
    role: "presentation",
    size: size,
    alt: alt,
    className: className
  }, rest));
};

Image.propTypes = { ..._ImageProps.default
};
Image.defaultProps = {
  src: _default_user.default
};
var _default = Image;
exports.default = _default;