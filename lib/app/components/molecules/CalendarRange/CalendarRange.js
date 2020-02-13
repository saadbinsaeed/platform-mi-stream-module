"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CalendarRange extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "onChange", () => {
      const {
        name,
        onChange
      } = this.props;

      if (!onChange) {
        return;
      }

      const {
        start,
        end
      } = this.state;
      const value = start && [start, end];
      onChange && onChange({
        name,
        value,
        target: {
          name,
          value
        }
      });
    });

    _defineProperty(this, "onChangeStart", ({
      target: {
        value
      }
    }) => {
      let {
        end
      } = this.state;
      let start = value && new Date(value);

      if (!start) {
        end = null;
      } else if (!end) {
        end = new Date(start);
        end.setHours(23, 59, 59, 999);
      } else if (start.getTime() >= end.getTime()) {
        start = new Date(end.getTime());
      }

      start && start.setMilliseconds(0);
      this.setState({
        start,
        end
      }, this.onChange);
    });

    _defineProperty(this, "onChangeEnd", ({
      target: {
        value
      }
    }) => {
      let {
        start
      } = this.state;
      let end = value && new Date(value);

      if (end && !this.state.end) {
        end.setHours(23, 59, 59, 999);
      }

      if (!end) {
        start = null;
      } else if (!start) {
        start = new Date(end);
        start.setHours(0, 0, 0, 0);
      } else if (start.getTime() >= end.getTime()) {
        end = new Date(start.getTime());
      }

      end && end.setMilliseconds(999);
      this.setState({
        start,
        end
      }, this.onChange);
    });

    const [_start, _end] = props.value && props.value.map(date => new Date(date)) || [null, null];
    this.state = {
      start: _start,
      end: _end
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const props = this.props;
    const [start, end] = props.value && props.value.map(date => new Date(date)) || [null, null];

    if (prevProps.value !== this.props.value) {
      this.setState({
        start,
        end
      });
    }
  }

  render() {
    const {
      minDate,
      maxDate,
      placeholderFrom,
      placeholderTo,
      tiny,
      ...restProps
    } = this.props;
    const {
      start,
      end
    } = this.state;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_DateTimePickerModal.default, _extends({}, restProps, {
      key: `startKey_${String(end)}`
      /* max date is not refrehed otherwise */
      ,
      onChange: this.onChangeStart,
      value: start,
      placeholder: placeholderFrom || 'From',
      minDate: minDate,
      maxDate: end || maxDate,
      spacing: ".5rem 0 .1rem 0",
      tiny: tiny
    })), _react.default.createElement(_DateTimePickerModal.default, _extends({}, restProps, {
      key: `endKey_${String(start)}`
      /* min date is not refrehed otherwise */
      ,
      onChange: this.onChangeEnd,
      value: end,
      placeholder: placeholderTo || 'To',
      minDate: start || minDate,
      maxDate: maxDate,
      spacing: ".1rem 0 .5rem 0",
      tiny: tiny
    })));
  }

}

_defineProperty(CalendarRange, "propTypes", { ..._DateTimePickerModal.default.propTypes,
  value: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.instanceOf(Date)]))
});

var _default = CalendarRange;
exports.default = _default;