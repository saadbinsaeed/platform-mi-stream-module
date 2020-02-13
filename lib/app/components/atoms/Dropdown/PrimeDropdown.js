"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = require("primereact/components/dropdown/Dropdown");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
    this is to fix #7233
    prime react dropdown component doesn't provide proper "required" validation
    because of "ui-helper-hidden-accessible" class on div around "hidden select"
    the way we are fixing it by applying "ui-helper-hidden-accessible" to select instead of div
    and creating an empty option with value = '' to trigger a browser validation to fail when form is submitted
    and then we adjust the position of error msg with styles (div and select)
 */
class PrimeDropdown extends _Dropdown.Dropdown {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onNativeSelectChange", event => {
      event.preventDefault();
    });

    _defineProperty(this, "renderHiddenSelect", () => {
      if (this.props.autoWidth) {
        const options = this.props.options && this.props.options.map((option, i) => {
          return _react.default.createElement("option", {
            key: this.getOptionLabel(option),
            value: option.value
          }, this.getOptionLabel(option));
        });
        return _react.default.createElement("div", {
          style: {
            position: 'absolute',
            bottom: 0,
            width: '100%'
          }
        }, _react.default.createElement("select", {
          ref: el => this.nativeSelect = el,
          required: this.props.required,
          tabIndex: -1,
          "aria-hidden": true,
          value: (this.findOption(this.props.value) || {
            value: ''
          }).value,
          onChange: this._onNativeSelectChange,
          className: "ui-helper-hidden-accessible",
          style: {
            left: '50%'
          }
        }, _react.default.createElement("option", {
          key: null,
          value: '',
          disabled: true
        }, "-- Select --"), options));
      } else {
        return null;
      }
    });
  }

}

exports.default = PrimeDropdown;

_defineProperty(PrimeDropdown, "propTypes", { ..._Dropdown.Dropdown.propTypes
});