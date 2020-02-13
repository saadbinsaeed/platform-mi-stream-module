"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputText = require("primereact/components/inputtext/InputText");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const InputWidth = {
  width: '100%'
};
/**
 * A stateful InputText
 */

class InputText extends _react.PureComponent {
  /**
   *
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      value: ''
    });

    _defineProperty(this, "getValue", (value = '') => {
      const {
        validationRegEx,
        min,
        max,
        type
      } = this.props;

      if (validationRegEx && validationRegEx.test(value) || !validationRegEx) {
        if (value && type === 'number') {
          if (min && Number(value) < min) {
            return String(min);
          }

          if (max && Number(value) > max) {
            return String(max);
          }
        }

        return value;
      }

      return this.state.value;
    });

    _defineProperty(this, "onChange", (event, el) => {
      const value = this.getValue(event.target.value.trimLeft());
      const name = event.target.name;

      if (value !== this.state.value) {
        this.setState({
          value
        });

        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event,
            name,
            value
          });
        }
      }
    });

    _defineProperty(this, "onBlur", event => {
      const {
        onBlur
      } = this.props;

      if (onBlur) {
        onBlur({
          originalEvent: event,
          name: event.target.name,
          value: this.state.value
        });
      }
    });

    this.state = {
      value: this.getValue(props.initialValue)
    };
  }

  componentDidUpdate(prevProps) {
    const {
      initialValue
    } = this.props;

    if (initialValue !== prevProps.initialValue) {
      this.setState({
        value: this.getValue(initialValue)
      });
    }
  }

  /**
   * @override
   */
  render() {
    // eslint-disable-next-line no-unused-vars
    const {
      initialValue,
      name,
      validationRegEx,
      onChange,
      onBlur,
      ...childProps
    } = this.props;
    return _react.default.createElement(_InputText.InputText, _extends({}, childProps, {
      name: name,
      value: this.state.value || '',
      onChange: this.onChange,
      onBlur: this.onBlur,
      style: InputWidth
    }));
  }

}

_defineProperty(InputText, "propTypes", {
  initialValue: _propTypes.default.string,
  onChange: _propTypes.default.func,
  validationRegEx: _propTypes.default.object
});

var _default = InputText;
exports.default = _default;