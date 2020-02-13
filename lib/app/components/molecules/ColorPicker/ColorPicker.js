"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactColor = require("react-color");

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _palette = require("app/themes/palette");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SwatchesPickerStyle = (0, _styledComponents.default)(_reactColor.SwatchesPicker).withConfig({
  displayName: "ColorPicker__SwatchesPickerStyle",
  componentId: "sc-8rug4e-0"
})(["width:243px !important;& > div div:nth-child(2){background:#2c2c2c !important;}& > div div:nth-child(1) > div > span div:nth-child(1){fill:white !important;}"]);
/**
 * Create a standard app color picker than can be used throughout the application
 */

class ColorPicker extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", value => {
      const {
        onChange,
        name
      } = this.props;
      onChange && onChange({
        target: {
          name,
          value: (value || {}).hex
        }
      });
    });

    _defineProperty(this, "handleSwatches", () => {
      this.setState({
        displayColorPicker: !this.state.displayColorPicker
      });
    });

    this.state = {
      displayColorPicker: false
    };
  }

  render() {
    const {
      label,
      name,
      value,
      required,
      size
    } = this.props;
    const {
      displayColorPicker
    } = this.state;
    return _react.default.createElement(_InputWrapper.default, null, label && _react.default.createElement(_Label.default, {
      htmlFor: name,
      required: required,
      size: size
    }, label, _react.default.createElement(_Icon.default, {
      onClick: this.handleSwatches,
      hexColor: value ? value : '#00BCD4',
      style: {
        marginLeft: '1rem'
      },
      name: 'circle'
    })), displayColorPicker && _react.default.createElement(SwatchesPickerStyle, {
      name: name,
      color: value || ColorPicker.deafultValue,
      colors: _palette.materialColorPalette || ColorPicker.defaultColors,
      onChange: this.onChange
    }));
  }

}

_defineProperty(ColorPicker, "deafultValue", '#00BCD4');

_defineProperty(ColorPicker, "defaultColors", [['#066ab1', '#0779ca'], ['#FFFFFF', '#00a99d', '#066ab1', '#4FC3F7', '#81C784', '#FF8A65', '#FFC107', '#FF5722', '#c62828']]);

var _default = ColorPicker;
exports.default = _default;