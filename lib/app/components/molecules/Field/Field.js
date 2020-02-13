"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("app/components/atoms/Input/Input"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _TextArea = _interopRequireDefault(require("app/components/atoms/TextArea/TextArea"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _common = require("app/utils/propTypes/common");

var _onChange = require("app/utils/input/onChange");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FieldLabel = (0, _styledComponents.default)(_Label.default).withConfig({
  displayName: "Field__FieldLabel",
  componentId: "qhncwz-0"
})(["word-break:break-all;"]);

const InputFieldWrapper = _styledComponents.default.div.withConfig({
  displayName: "Field__InputFieldWrapper",
  componentId: "qhncwz-1"
})(["position:relative;& .Icon,.fieldIcon{position:absolute;top:.5rem;left:.7rem;}& Input{", "}"], ({
  icon
}) => icon ? 'padding-left: 2rem;' : '');
/**
 * onChange event handler
 *
 * @param value
 * @param multiline
 * @param props
 * @returns {*}
 */


const buildInput = ({
  value,
  multiline,
  ...props
}) => {
  const defValue = value || '';
  return multiline ? _react.default.createElement(_TextArea.default, _extends({}, props, {
    value: defValue || ''
  })) : _react.default.createElement(_Input.default, _extends({}, props, {
    value: value || ''
  }));
};

const Field = props => {
  const childrenProps = { ...props
  };
  const {
    label,
    name,
    required,
    icon,
    iconType,
    size
  } = props;
  return _react.default.createElement(_InputWrapper.default, {
    innerRef: element => {
      // if the inputRef property is defined pass the input element to the function
      if (props.inputRef) {
        const input = element && element.getElementsByTagName ? element.getElementsByTagName('input')[0] : null;

        if (input) {
          props.inputRef(input);
        }
      }
    }
  }, label && _react.default.createElement(FieldLabel, {
    htmlFor: name,
    required: required,
    size: size
  }, label), _react.default.createElement(InputFieldWrapper, childrenProps, icon && _react.default.createElement(_Icon.default, {
    name: icon,
    type: iconType,
    size: "sm",
    className: "fieldIcon"
  }), buildInput({ ...props,
    onChange: _onChange.onChangeFix.bind(null, props.onChange)
  })));
};

Field.propTypes = {
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  value: _propTypes.default.any,
  type: _propTypes.default.string,
  max: _propTypes.default.string,
  min: _propTypes.default.string,
  step: _propTypes.default.string,
  iconType: _propTypes.default.string,
  text_ext: _propTypes.default.string,
  text_ext_position: _propTypes.default.string,
  size: _common.SizeProps,
  required: _propTypes.default.bool,
  icon: _propTypes.default.string,
  inputRef: _propTypes.default.func
};
Field.defaultProps = {
  title: '',
  iconType: 'mdi'
};
var _default = Field;
exports.default = _default;