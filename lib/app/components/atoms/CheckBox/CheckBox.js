"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _event = require("app/utils/http/event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CheckboxWrapper = (0, _styledComponents.default)(_InputWrapper.default).withConfig({
  displayName: "CheckBox__CheckboxWrapper",
  componentId: "sc-1mpdc6s-0"
})(["display:flex;"]);

const CheckboxInputStyle = _styledComponents.default.div.withConfig({
  displayName: "CheckBox__CheckboxInputStyle",
  componentId: "sc-1mpdc6s-1"
})(["position:relative;display:inline-block;width:18px;height:18px;", ";"], ({
  disabled
}) => disabled ? 'opacity: 0.5;' : '');

const CheckboxInput = _styledComponents.default.input.withConfig({
  displayName: "CheckBox__CheckboxInput",
  componentId: "sc-1mpdc6s-2"
})(["display:block;visibility:hidden;width:18px;height:18px;z-index:1;"]);

const CheckboxBase = _styledComponents.default.div.withConfig({
  displayName: "CheckBox__CheckboxBase",
  componentId: "sc-1mpdc6s-3"
})(["position:absolute;left:0;top:0;cursor:pointer;width:18px;height:18px;background:", ";display:block;border-radius:.2rem;z-index:0;border:solid 1px ", ";&:hover,&:focus{border:solid 1px ", ";}"], ({
  theme
}) => theme.input.background, ({
  theme
}) => theme.base.borderColor, ({
  disabled,
  theme
}) => disabled ? theme.base.borderColor : theme.base.active.borderColor);

const CheckboxChecked = (0, _styledComponents.default)(CheckboxBase).withConfig({
  displayName: "CheckBox__CheckboxChecked",
  componentId: "sc-1mpdc6s-4"
})(["background:", ";"], ({
  theme
}) => theme.input.background);
const CheckedIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "CheckBox__CheckedIcon",
  componentId: "sc-1mpdc6s-5"
})(["position:absolute;top:-3px;left:0px;width:16px;height:16px;&:before{line-height:21px;margin:0;padding:0;color:", ";font-weight:600;}"], ({
  theme,
  disabled
}) => disabled ? '#ccc' : theme.color.primary); // We need to take our default label style and overwrite some stuff

const CheckboxLabel = (0, _styledComponents.default)(_Label.default).withConfig({
  displayName: "CheckBox__CheckboxLabel",
  componentId: "sc-1mpdc6s-6"
})(["display:inline-block;margin:0 0 0 .5rem;word-break:break-word;"]);
/**
 * Our checkbox component
 */

class Checkbox extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", event => {
      event.stopPropagation();

      if (this.props.onChange && !this.props.disabled) {
        const name = this.props.name;
        const value = !this.props.checked;
        this.props.onChange((0, _event.createEvent)('change', {
          name,
          value,
          checked: value
        }));
      }
    });
  }

  /**
   * Render our checkbox
   */
  render() {
    const {
      label,
      checked,
      disabled
    } = this.props;
    return _react.default.createElement(CheckboxWrapper, {
      disabled: disabled
    }, _react.default.createElement(CheckboxInputStyle, {
      onClick: this.onChange,
      disabled: disabled
    }, _react.default.createElement(CheckboxInput, {
      type: "checkbox",
      checked: !!checked,
      onChange: () => {},
      disabled: disabled
    }), checked ? _react.default.createElement(CheckboxChecked, this.props, _react.default.createElement(CheckedIcon, {
      name: "check",
      size: "sm"
    })) : _react.default.createElement(CheckboxBase, this.props)), label && _react.default.createElement(CheckboxLabel, null, label));
  }

}

_defineProperty(Checkbox, "propTypes", {
  name: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  label: _propTypes.default.string,
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func
});

var _default = Checkbox;
exports.default = _default;