"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = require("primereact/components/button/Button");

var _OverlayPanel = require("primereact/components/overlaypanel/OverlayPanel");

var _InputText = require("primereact/components/inputtext/InputText");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Option = _styledComponents.default.div.withConfig({
  displayName: "TextFilter__Option",
  componentId: "lgjf3p-0"
})(["&:hover{background:", ";}"], ({
  theme
}) => theme.base.hover.background);

const OptionIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "TextFilter__OptionIcon",
  componentId: "lgjf3p-1"
})(["padding:0 0.6rem 0 0;"]);
/**
 *
 */

class TextFilter extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", void 0);

    _defineProperty(this, "overlayPanel", void 0);

    _defineProperty(this, "iconMap", {
      startsWith: 'mdi mdi-arrow-right',
      '=': 'mdi mdi-equal',
      contains: 'mdi mdi-tilde'
    });

    _defineProperty(this, "options", [{
      label: 'Starts With',
      icon: this.iconMap['startsWith'],
      value: 'startsWith'
    }, {
      label: 'Equals',
      icon: this.iconMap['='],
      value: '='
    }, {
      label: 'Similar',
      icon: this.iconMap['contains'],
      value: 'contains'
    }]);

    _defineProperty(this, "togglePanel", event => {
      this.overlayPanel && this.overlayPanel.toggle(event);
    });

    _defineProperty(this, "onSelect", (event, selectedOption) => {
      const option = this.props.option || 'startsWith';
      const {
        value,
        onChange
      } = this.props;

      if (option !== selectedOption) {
        onChange && onChange({
          option: selectedOption,
          value
        });
      }
    });

    _defineProperty(this, "onChange", event => {
      const option = this.props.option || 'startsWith';
      const {
        value,
        onChange
      } = this.props;
      const newValue = (0, _lo.get)(event, 'target.value');

      if (value !== newValue) {
        onChange && onChange({
          option,
          value: newValue
        });
      }
    });

    _defineProperty(this, "setPanelRef", element => {
      this.overlayPanel = element;
    });
  }

  render() {
    const optionValue = this.props.option || 'startsWith';
    const value = this.props.value;
    return _react.default.createElement("div", {
      className: "ui-inputgroup"
    }, !this.props.filterOptionsDisabled && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Button.Button, {
      onClick: this.togglePanel,
      icon: this.iconMap[optionValue]
    }), _react.default.createElement(_OverlayPanel.OverlayPanel, {
      ref: this.setPanelRef,
      appendTo: this.props.appendTo
    }, this.options.map(({
      label,
      icon,
      value
    }) => _react.default.createElement(Option, {
      onClick: event => this.onSelect(event, value),
      key: value
    }, _react.default.createElement(OptionIcon, {
      name: icon,
      size: "sm"
    }), label)))), _react.default.createElement(_InputText.InputText, {
      onChange: this.onChange,
      value: value,
      placeholder: "Keyword",
      style: {
        width: '100%'
      }
    }));
  }

}

exports.default = TextFilter;
;