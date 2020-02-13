"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Select component that lists a number of time select types i.e. Hours, Weekly, Monthly etc
 */
class TimeIntervalTypeSelect extends _react.PureComponent {
  /**
   * Render put select option
   */
  render() {
    const {
      name,
      label,
      placeholder,
      value,
      required,
      onChange
    } = this.props;
    const options = [{
      value: 'D',
      label: 'Day(s)'
    }, {
      value: 'H',
      label: 'Hour(s)'
    }, {
      value: 'M',
      label: 'Minutes(s)'
    }, {
      value: 'S',
      label: 'Second(s)'
    }];
    return _react.default.createElement(_Dropdown.default, {
      label: label,
      name: name,
      placeholder: placeholder,
      options: options,
      onChange: onChange,
      value: value,
      required: required
    });
  }

}

var _default = TimeIntervalTypeSelect;
exports.default = _default;