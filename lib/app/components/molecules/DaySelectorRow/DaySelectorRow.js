"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _Label = _interopRequireDefault(require("../Label/Label"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DaysWrapper = _styledComponents.default.div.withConfig({
  displayName: "DaySelectorRow__DaysWrapper",
  componentId: "sc-8xwxgq-0"
})(["display:flex;"]);

const Day = _styledComponents.default.div.withConfig({
  displayName: "DaySelectorRow__Day",
  componentId: "sc-8xwxgq-1"
})(["display:flex;flex-direction:column;text-align:center;padding:.5rem;&:first-child{padding-left:0;}&:last-child{padding-right:0;}"]);
/**
 * A component to allow you to select days of the week via a row of checkboxes
 */


class DaySelectorRow extends _react.PureComponent {
  /**
   * Set our state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "setValuesFromProps", () => {
      const valueObj = {}; // eslint-disable-next-line no-return-assign

      this.props.value && this.props.value.map(val => valueObj[val] = true);
      this.setState({
        days: valueObj
      });
    });

    _defineProperty(this, "setValues", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        days: { ...this.state.days,
          [name]: value
        }
      }, this.onChange);
    });

    _defineProperty(this, "onChange", () => {
      // console.log('State', this.state);
      if (this.props.onChange) {
        this.props.onChange(this.state.days);
      }
    });

    this.state = {
      days: (0, _Immutable.default)({
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
      })
    };
  }
  /**
   * Load data on Mount
   */


  componentDidMount() {
    this.setValuesFromProps();
  }
  /**
   * Re-render component
   * @param nextProps
   */

  /*componentWillReceiveProps(nextProps) {
      this.forceUpdate();
  }*/

  /**
   * Set our values from props
   */


  /**
   * Render our checkboxes
   */
  render() {
    // console.log('DaySelectorRowState', this.state);
    // console.log('DaySelectorRowProps', this.props);
    const {
      label
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement(_Label.default, null, label), _react.default.createElement(DaysWrapper, null, _react.default.createElement(Day, null, _react.default.createElement(_CheckBox.default, {
      name: "Mo",
      checked: this.state.days.Mo,
      onChange: this.setValues
    }), _react.default.createElement(_Label.default, null, "Mo")), _react.default.createElement(Day, null, _react.default.createElement(_CheckBox.default, {
      name: "Tu",
      checked: this.state.days.Tu,
      onChange: this.setValues
    }), _react.default.createElement(_Label.default, null, "Tu")), _react.default.createElement(Day, null, _react.default.createElement(_CheckBox.default, {
      name: "We",
      checked: this.state.days.We,
      onChange: this.setValues
    }), _react.default.createElement(_Label.default, null, "We")), _react.default.createElement(Day, null, _react.default.createElement(_CheckBox.default, {
      name: "Th",
      checked: this.state.days.Th,
      onChange: this.setValues
    }), _react.default.createElement(_Label.default, null, "Th")), _react.default.createElement(Day, null, _react.default.createElement(_CheckBox.default, {
      name: "Fr",
      checked: this.state.days.Fr,
      onChange: this.setValues
    }), _react.default.createElement(_Label.default, null, "Fr")), _react.default.createElement(Day, null, _react.default.createElement(_CheckBox.default, {
      name: "Sa",
      checked: this.state.days.Sa,
      onChange: this.setValues
    }), _react.default.createElement(_Label.default, null, "Sa")), _react.default.createElement(Day, null, _react.default.createElement(_CheckBox.default, {
      name: "Su",
      checked: this.state.days.Su,
      onChange: this.setValues
    }), _react.default.createElement(_Label.default, null, "Su"))));
  }

}

_defineProperty(DaySelectorRow, "propTypes", {
  label: _propTypes.default.string,
  onChange: _propTypes.default.func,
  repeatValueName: _propTypes.default.string,
  value: _propTypes.default.array
});

var _default = DaySelectorRow;
exports.default = _default;