"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _onChange = require("app/utils/input/onChange");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ExtensionBefore = _styledComponents.default.div.withConfig({
  displayName: "Input__ExtensionBefore",
  componentId: "d564w6-0"
})(["position:absolute;top:.4rem;left:.7rem;color:#cccccc;"]);

const ExtensionAfter = _styledComponents.default.div.withConfig({
  displayName: "Input__ExtensionAfter",
  componentId: "d564w6-1"
})(["position:absolute;top:.4rem;right:.7rem;color:#cccccc;"]);

const inputSizes = (0, _styledComponents.css)(["width:100%;font-size:", ";height:", ";line-height:", ";border-radius:", ";padding:", ";&::placeholder{font-size:", ";}"], ({
  theme,
  size
}) => size ? theme.sizes[size].fontSize : theme.sizes.md.fontSize, ({
  theme,
  size
}) => size ? theme.sizes[size].height : theme.sizes.md.height, ({
  theme,
  size
}) => size ? theme.sizes[size].lineHeight : theme.sizes.md.lineHeight, ({
  theme,
  size
}) => size ? theme.sizes[size].borderRadius : theme.sizes.md.borderRadius, ({
  theme,
  size
}) => size ? `${theme.sizes[size].paddingTB} ${theme.sizes[size].paddingLR}` : `${theme.sizes.md.paddingTB} ${theme.sizes.md.paddingLR}`, ({
  theme,
  size
}) => size ? theme.sizes[size].fontSize : theme.sizes.md.fontSize);

const InputWrapper = _styledComponents.default.div.withConfig({
  displayName: "Input__InputWrapper",
  componentId: "d564w6-2"
})(["width:100%;"]);

const InputStyle = _styledComponents.default.input.withConfig({
  displayName: "Input__InputStyle",
  componentId: "d564w6-3"
})(["", ";font-size:inherit;display:flex;flex-grow:1;text-align:left;margin:0;border:", ";color:", ";background:", ";outline:none;padding-left:", ";padding-right:", ";&::placeholder{color:", ";}&:hover{color:", ";border:solid 1px ", ";background:", ";}&:focus{color:", ";border:solid 1px ", ";background:", ";}&:disabled,&:disabled:hover{color:", ";border:", ";background:", ";}&:required{box-shadow:none;}&.error{color:", ";border:", ";background:", ";}"], inputSizes, ({
  theme
}) => `solid 1px ${theme.base.borderColor}`, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.input.background, ({
  text_ext,
  text_ext_position
}) => text_ext && text_ext_position === 'before' && `${text_ext.length / 2 + 1}rem`, ({
  text_ext,
  text_ext_position
}) => text_ext && text_ext_position === 'after' && `${text_ext.length / 2 + 1.5}rem`, ({
  theme
}) => theme.input.placeholder, ({
  theme
}) => theme.input.hover.textColor, ({
  theme
}) => theme.input.hover.borderColor, ({
  theme
}) => theme.input.hover.background, ({
  theme
}) => theme.input.active.textColor, ({
  theme
}) => theme.input.active.borderColor, ({
  theme
}) => theme.input.active.background, ({
  theme
}) => theme.input.disabled.textColor, ({
  theme
}) => `solid 1px ${theme.input.disabled.borderColor}`, ({
  theme
}) => theme.input.disabled.background, ({
  theme
}) => theme.input.error.textColor, ({
  theme
}) => `solid 1px ${theme.input.error.borderColor}`, ({
  theme
}) => theme.input.error.background);
/**
 *
 */


class Input extends _react.PureComponent {
  render() {
    const {
      value,
      onChange,
      ...inputProps
    } = this.props; // eslint-disable-line no-unused-vars

    const {
      text_ext,
      text_ext_position
    } = inputProps;
    return _react.default.createElement(InputWrapper, null, text_ext && text_ext_position === 'before' && _react.default.createElement(ExtensionBefore, null, text_ext), _react.default.createElement(InputStyle, _extends({
      value: value !== null ? value : undefined,
      onChange: _onChange.onChangeFix.bind(null, onChange)
    }, inputProps)), text_ext && text_ext_position === 'after' && _react.default.createElement(ExtensionAfter, null, text_ext));
  }

}

_defineProperty(Input, "propTypes", {
  type: _propTypes.default.string,
  name: _propTypes.default.string,
  value: _propTypes.default.any,
  text_ext: _propTypes.default.string,
  text_ext_position: _propTypes.default.string
});

_defineProperty(Input, "defaultProps", {
  type: 'text'
});

;
var _default = Input;
exports.default = _default;