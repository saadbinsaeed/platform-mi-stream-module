"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TextAreaStyle = _styledComponents.default.textarea.withConfig({
  displayName: "SimpleTextArea__TextAreaStyle",
  componentId: "sc-102r3fj-0"
})(["width:100%;font-size:", ";border-radius:", ";padding:", ";&::placeholder{font-size:", ";}border:", ";color:", ";background:", ";"], ({
  theme,
  size
}) => size ? theme.sizes[size].fontSize : theme.sizes.md.fontSize, ({
  theme,
  size
}) => size ? theme.sizes[size].borderRadius : theme.sizes.md.borderRadius, ({
  theme,
  size
}) => size ? `${theme.sizes[size].paddingTB} ${theme.sizes[size].paddingLR}` : `${theme.sizes.md.paddingTB} ${theme.sizes.md.paddingLR}`, ({
  theme,
  size
}) => size ? theme.sizes[size].fontSize : theme.sizes.md.fontSize, ({
  theme
}) => `solid 1px ${theme.base.borderColor}`, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.input.background);
/**
 *
 */


class SimpleTextArea extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", event => {
      const {
        name,
        value
      } = event.target;
      this.props.onChange && this.props.onChange({
        originalEvent: event,
        name,
        value
      });
    });

    _defineProperty(this, "onBlur", event => {
      const {
        name,
        value
      } = event.target;
      this.props.onBlur && this.props.onBlur({
        originalEvent: event,
        name,
        value
      });
    });
  }

  render() {
    const {
      name
    } = this.props;
    return _react.default.createElement(TextAreaStyle, {
      name: name,
      value: this.props.value,
      onChange: this.onChange,
      onBlur: this.onBlur
    });
  }

}

_defineProperty(SimpleTextArea, "propTypes", {
  name: _propTypes.default.string,
  value: _propTypes.default.string,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func
});

var _default = SimpleTextArea;
exports.default = _default;