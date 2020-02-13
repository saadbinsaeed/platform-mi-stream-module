"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _AutoComplete = require("primereact/components/autocomplete/AutoComplete");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _lo = require("app/utils/lo/lo");

var _mdi = require("app/utils/styles/mdi");

var _filterUtils = require("app/utils/filter/filterUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AutoComplete = (0, _styledComponents.default)(_AutoComplete.AutoComplete).withConfig({
  displayName: "IconsSelect__AutoComplete",
  componentId: "sc-4b8ytm-0"
})(["&.ui-autocomplete{display:flex;}.ui-button-icon-only .ui-button-text{padding:0.74em;}.ui-corner-all{border-radius:0;border-color:black;}.ui-inputtext{width:100%;}"]);

const IconPreview = _styledComponents.default.span.withConfig({
  displayName: "IconsSelect__IconPreview",
  componentId: "sc-4b8ytm-1"
})(["border:0.5px solid black;borderRight:none;padding:0 0.5em;"]);
/**
 *
 */


class IconsSelect extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "filterOptions", event => {
      this.setState({
        filteredOptions: (0, _filterUtils.includes)(_mdi.iconsList, event.query)
      });
    });

    _defineProperty(this, "optionTemplate", icon => _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Icon.default, {
      name: icon
    }), " ", icon));

    _defineProperty(this, "onChange", ({
      originalEvent,
      value
    }) => {
      this.setState({
        value
      });

      if (!this.props.onChange) {
        return;
      }

      const isValid = _mdi.iconsSet.has(value);

      let event = (0, _lo.set)(originalEvent, 'target.name', this.props.name);
      event = (0, _lo.set)(event, 'target.value', isValid ? value : null);
      this.props.onChange(event, isValid ? value : null);
    });

    this.state = {
      filteredOptions: null,
      value: props.value
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const value = this.props.value;

    if (prevProps.value !== value) {
      this.setState({
        value
      });
    }
  }

  /**
   * @override
   * @returns {XML}
   */
  render() {
    const {
      value,
      filteredOptions
    } = this.state;
    const {
      disabled,
      label,
      name,
      required,
      size
    } = this.props;
    return _react.default.createElement(_InputWrapper.default, null, label && _react.default.createElement(_Label.default, {
      htmlFor: name,
      required: required,
      size: size
    }, label), _react.default.createElement("div", {
      className: "ui-inputgroup"
    }, _react.default.createElement(IconPreview, null, _react.default.createElement(_Icon.default, {
      color: disabled ? 'grey' : null,
      name: value && _mdi.iconsSet.has(value) ? value : 'blank'
    })), _react.default.createElement(AutoComplete, {
      name: name,
      value: value,
      suggestions: filteredOptions,
      completeMethod: this.filterOptions,
      itemTemplate: this.optionTemplate,
      onChange: this.onChange,
      placeholder: "Select an icon",
      dropdown: true,
      size: 30,
      minLength: 1,
      disabled: disabled
    })));
  }

}

_defineProperty(IconsSelect, "propTypes", {
  value: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool,
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  required: _propTypes.default.bool,
  size: _propTypes.default.number
});

var _default = IconsSelect;
exports.default = _default;