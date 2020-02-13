"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _platformUi = require("@mic3/platform-ui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Input = _interopRequireDefault(require("app/components/atoms/Input/Input"));

var _Label = _interopRequireDefault(require("../Label/Label"));

var _lo = require("app/utils/lo/lo");

var _date = require("app/utils/date/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CalendarWrapper = (0, _styledComponents.default)(_InputWrapper.default).withConfig({
  displayName: "DateTimePickerModal__CalendarWrapper",
  componentId: "ohduse-0"
})(["", ""], ({
  spacing
}) => spacing && `padding: ${spacing};`);
const InputStyled = (0, _styledComponents.default)(_Input.default).withConfig({
  displayName: "DateTimePickerModal__InputStyled",
  componentId: "ohduse-1"
})(["", ""], ({
  tiny
}) => tiny && `
        height: 27px;
        border-radius: 3px;

        &::placeholder {
            font-size: 1em;
        }
    `);

const ReadOnlyInput = props => _react.default.createElement(InputStyled, _extends({}, props, {
  readOnly: true
}));

const DisabledInput = props => _react.default.createElement(ReadOnlyInput, _extends({}, props, {
  onClick: () => {}
}));
/**
 * A date-time input component
 */


class DateTimePickerModal extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", event => {
      const value = (0, _lo.get)(event, 'target.value');

      if (this.props.onChange && !this.props.disableFormating) {
        this.props.onChange({
          target: {
            name: this.props.name,
            value: value ? (0, _date.saveByKind)(this.props.kind, value) : value
          }
        });
      } else {
        this.props.onChange(event);
      }
    });
  }

  /**
   * Render our component
   * @returns {*}
   */
  render() {
    const {
      placeholder,
      tiny,
      name,
      required,
      label,
      value,
      kind,
      format,
      readOnly,
      spacing
    } = this.props;
    const DateComponentProps = {
      format: {
        time: 'HH:mm',
        date: format.toUpperCase(),
        datetime: `${format.toUpperCase()} HH:mm`
      }[kind || 'datetime'],
      value: required ? value || new Date() : value,
      onChange: this.onChange,
      TextFieldComponent: readOnly ? DisabledInput : ReadOnlyInput,
      key: kind,
      id: name,
      disable: readOnly,
      fullWidth: true,
      showTodayButton: true,
      clearable: !required,
      DialogProps: {
        style: {
          zIndex: 3000
        }
      },
      placeholder,
      tiny,
      name
    };
    const DateComponent = {
      time: _react.default.createElement(_platformUi.TimePicker, _extends({}, DateComponentProps, {
        ampm: false
      })),
      date: _react.default.createElement(_platformUi.DatePicker, DateComponentProps),
      datetime: _react.default.createElement(_platformUi.DateTimePicker, _extends({}, DateComponentProps, {
        ampm: false
      }))
    }[kind || 'datetime'];
    return _react.default.createElement(CalendarWrapper, {
      spacing: spacing
    }, _react.default.createElement(_Label.default, {
      htmlFor: name,
      required: required
    }, label), DateComponent);
  }

}

_defineProperty(DateTimePickerModal, "propTypes", {
  format: _propTypes.default.string,
  kind: _propTypes.default.string,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  label: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  required: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  disableFormating: _propTypes.default.bool,
  tiny: _propTypes.default.bool
});

_defineProperty(DateTimePickerModal, "defaultProps", {
  format: 'DD/MM/YY',
  kind: 'datetime',
  disableFormating: false,
  tiny: false
  /**
   * Create synthetic event for name and value output
   * @param event
   */

});

var _default = DateTimePickerModal;
exports.default = _default;