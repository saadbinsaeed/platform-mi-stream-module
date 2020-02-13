"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _event = require("app/utils/http/event");

var _Label = _interopRequireDefault(require("../../molecules/Label/Label"));

var _InputWrapper = _interopRequireDefault(require("../InputWrapper/InputWrapper"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const RadioWrapper = (0, _styledComponents.default)(_InputWrapper.default).withConfig({
  displayName: "Radio__RadioWrapper",
  componentId: "sc-1tyu2xg-0"
})(["display:flex;cursor:pointer;"]);

const RadioInputStyle = _styledComponents.default.div.withConfig({
  displayName: "Radio__RadioInputStyle",
  componentId: "sc-1tyu2xg-1"
})(["position:relative;display:inline-block;width:18px;height:18px;"]);

const RadioInput = _styledComponents.default.input.withConfig({
  displayName: "Radio__RadioInput",
  componentId: "sc-1tyu2xg-2"
})(["display:block;visibility:hidden;width:18px;height:18px;z-index:1;"]);

const RadioBase = _styledComponents.default.div.withConfig({
  displayName: "Radio__RadioBase",
  componentId: "sc-1tyu2xg-3"
})(["position:absolute;left:0;top:0;width:18px;height:18px;background:", ";display:block;border-radius:500rem;z-index:0;border:solid 1px ", ";&:hover,&:focus{border:solid 1px ", ";}"], ({
  theme
}) => theme.input.background, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.active.borderColor);

const RadioChecked = (0, _styledComponents.default)(RadioBase).withConfig({
  displayName: "Radio__RadioChecked",
  componentId: "sc-1tyu2xg-4"
})(["background:", ";"], ({
  theme
}) => theme.input.background);
const CheckedIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "Radio__CheckedIcon",
  componentId: "sc-1tyu2xg-5"
})(["position:absolute;top:-3px;left:0px;width:16px;height:16px;&:before{line-height:21px !important;margin:0;padding:0;color:", ";font-weight:600;}"], ({
  theme
}) => theme.color.primary); // We need to take our default label style and overwrite some stuff

const RadioLabel = (0, _styledComponents.default)(_Label.default).withConfig({
  displayName: "Radio__RadioLabel",
  componentId: "sc-1tyu2xg-6"
})(["display:inline-block;margin:0 0 0 .5rem;cursor:pointer;"]);
/**
 * Our checkbox component
 */

class Radio extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * onChange event handler
   *
   * @param event a SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */


  onChange(event) {
    event.stopPropagation();

    if (this.props.onChange) {
      const {
        name,
        value,
        field
      } = this.props;
      this.props.onChange((0, _event.createEvent)('change', {
        name,
        value,
        field: field || name
      }));
    }
  }
  /**
   * Render our checkbox
   */


  render() {
    const {
      label,
      checked
    } = this.props;
    return _react.default.createElement(RadioWrapper, {
      onClick: this.onChange
    }, _react.default.createElement(RadioInputStyle, null, _react.default.createElement(RadioInput, {
      type: "radio",
      defaultChecked: !!checked
    }), checked ? _react.default.createElement(RadioChecked, this.props, _react.default.createElement(CheckedIcon, {
      name: "checkbox-blank-circle",
      size: "sm"
    })) : _react.default.createElement(RadioBase, this.props)), label && _react.default.createElement(RadioLabel, null, label));
  }

}

_defineProperty(Radio, "propTypes", {
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  checked: _propTypes.default.bool,
  onChange: _propTypes.default.func
});

var _default = Radio;
exports.default = _default;