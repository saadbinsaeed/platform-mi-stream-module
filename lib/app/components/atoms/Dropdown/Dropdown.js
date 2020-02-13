"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _PrimeDropdown = _interopRequireDefault(require("./PrimeDropdown"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DropdownStyled = (0, _styledComponents.default)(_PrimeDropdown.default).withConfig({
  displayName: "Dropdown__DropdownStyled",
  componentId: "sc-17b7wdo-0"
})(["width:100% !important;font-size:1rem !important;line-height:2rem;.ui-dropdown-panel .ui-dropdown-item{font-size:1rem !important;}"]);

class Dropdown extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", event => {
      const {
        onChange,
        name
      } = this.props;
      onChange && onChange({ ...event,
        target: {
          name,
          value: event.value
        },
        name
      });
    });
  }

  render() {
    const {
      required,
      clearable,
      label,
      value,
      ...restProps
    } = this.props;
    const val = (0, _utils.isDefined)(value) ? value : '';
    return _react.default.createElement(_InputWrapper.default, null, label && _react.default.createElement(_Label.default, {
      required: required
    }, label), _react.default.createElement(DropdownStyled, _extends({}, restProps, {
      value: val,
      required: required,
      showClear: clearable,
      onChange: this.onChange
    })));
  }

}

var _default = Dropdown;
exports.default = _default;