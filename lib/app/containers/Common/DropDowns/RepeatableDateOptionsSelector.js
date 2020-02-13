"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _DaySelectorRow = _interopRequireDefault(require("app/components/molecules/DaySelectorRow/DaySelectorRow"));

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A component for creating repeatable events
 */
class RepeatableDateOptionsSelector extends _react.PureComponent {
  /**
   * Render put select option
   */
  render() {
    // Pass our props
    const {
      isRepeatableName,
      isRepeatableValue,
      repeatIntervalName,
      repeatIntervalValue,
      repeatValueName,
      repeatValue,
      repeatEndsName,
      repeatEndsValue,
      onChange,
      onDaysChange
    } = this.props;
    const repeatTypes = [{
      value: 'H',
      label: 'Hourly',
      name: 'Hour'
    }, {
      value: 'D',
      label: 'Daily',
      name: 'Day'
    }, {
      value: 'DW',
      label: 'By Day of Week',
      name: 'Day(s) of the week'
    }, {
      value: 'W',
      label: 'Weekly',
      name: 'Week'
    }, {
      value: 'M',
      label: 'Monthly',
      name: 'Month'
    }, {
      value: 'Y',
      label: 'Yearly',
      name: 'Year'
    }];
    const selectedRepeatType = repeatTypes.find(key => key.value === repeatIntervalValue) || {};
    return _react.default.createElement("div", null, _react.default.createElement(_CheckBox.default, {
      name: isRepeatableName,
      label: "Repeat",
      onChange: onChange,
      checked: isRepeatableValue
    }), _react.default.createElement("div", {
      style: isRepeatableValue && isRepeatableValue ? {
        display: 'block'
      } : {
        display: 'none'
      }
    }, _react.default.createElement(_Dropdown.default, {
      label: "Repeats",
      name: repeatIntervalName,
      placeholder: "e.g. Weekly",
      options: repeatTypes,
      onChange: onChange,
      value: repeatIntervalValue,
      required: isRepeatableValue
    }), repeatIntervalValue && repeatIntervalValue !== 'DW' && _react.default.createElement(_Field.default, {
      onChange: onChange,
      label: `Repeats Every _${selectedRepeatType.name}`,
      type: "number",
      name: repeatValueName,
      value: repeatValue,
      placeholder: "e.g. 1",
      required: isRepeatableValue
    }), repeatIntervalValue && repeatIntervalValue === 'DW' && _react.default.createElement(_DaySelectorRow.default, {
      onChange: onDaysChange,
      label: `Repeats Every _${selectedRepeatType.name}`,
      name: repeatValueName,
      value: repeatValue
    }), _react.default.createElement(_DateTimePickerModal.default, {
      label: "Repeat ends",
      name: repeatEndsName,
      value: repeatEndsValue,
      onChange: onChange,
      required: isRepeatableValue
    })));
  }

}

_defineProperty(RepeatableDateOptionsSelector, "propTypes", {
  onChange: _propTypes.default.func,
  onDaysChange: _propTypes.default.func,
  isRepeatableName: _propTypes.default.string,
  isRepeatableValue: _propTypes.default.bool,
  repeatIntervalName: _propTypes.default.string,
  repeatIntervalValue: _propTypes.default.string,
  repeatValueName: _propTypes.default.string,
  repeatValue: _propTypes.default.any,
  repeatEndsName: _propTypes.default.string,
  repeatEndsValue: _propTypes.default.any
});

var _default = RepeatableDateOptionsSelector;
exports.default = _default;