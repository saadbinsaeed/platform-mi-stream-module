"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _Calendar = require("primereact/components/calendar/Calendar");

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CalendarWrapper = _styledComponents.default.span.withConfig({
  displayName: "DateTimeRangePicker__CalendarWrapper",
  componentId: "sc-121ge0q-0"
})(["display:block;& input{width:100%;}"]);

const calendarStyle = {
  display: 'block',
  width: '100%'
};
/**
 * A date-time input component
 */

class DateTimeRangePicker extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", (0, _v.default)());

    _defineProperty(this, "onChange", event => {
      const value = (event.value || []).filter(el => el);

      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          value
        });
      }
    });
  }

  /**
   * Render our component
   * @returns {*}
   */
  render() {
    const {
      name,
      required,
      label,
      value,
      readOnlyInput
    } = this.props;
    return _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(_Label.default, {
      htmlFor: `${this.id}_${name}`,
      required: required
    }, label), _react.default.createElement(CalendarWrapper, null, _react.default.createElement(_Calendar.Calendar, {
      id: `${this.id}_${name}`,
      name: name,
      value: value,
      dateFormat: "dd/mm/yy"
      /*showTime="true"*/
      ,
      selectionMode: "range",
      readOnlyInput: readOnlyInput,
      style: calendarStyle,
      hourFormat: "24",
      showButtonBar: true,
      onChange: this.onChange
    })));
  }

}

var _default = DateTimeRangePicker;
exports.default = _default;