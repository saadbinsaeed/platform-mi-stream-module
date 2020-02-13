"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A countdown timer
 */
class CountdownTimer extends _react.PureComponent {
  /**
   * @param props the Component's properties.
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "interval", void 0);

    _defineProperty(this, "state", void 0);

    this.state = {
      secondsRemaining: props.seconds
    };
  }
  /**
   * @override
   */


  componentWillReceiveProps(nextProps) {
    this.setState({
      secondsRemaining: nextProps.seconds
    });
  }
  /**
   * @override
   */


  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.secondsRemaining > 0) {
        this.setState({
          secondsRemaining: this.state.secondsRemaining - 1
        });
      } else if (this.state.secondsRemaining === 0) {
        this.props.onCountdownTerminated && this.props.onCountdownTerminated();
        this.setState({
          secondsRemaining: -1
        });
      }
    }, 1000);
  }
  /**
   * @override
   */


  componentWillUnmount() {
    clearInterval(this.interval);
  }
  /**
   * @override
   */


  render() {
    const format = this.props.format || 'seconds';
    const secondsRemaining = this.state.secondsRemaining > 0 ? this.state.secondsRemaining : 0;

    switch (format) {
      case 'seconds':
        return _react.default.createElement("span", null, secondsRemaining);

      case 'minutes':
        {
          const minutes = Math.trunc(secondsRemaining / 60);
          const seconds = Math.trunc(secondsRemaining % 60);
          return _react.default.createElement("span", null, String(minutes).padStart(2, '0'), ":", String(seconds).padStart(2, '0'));
        }

      default:
        throw new Error(`Unhandled format "${format}".`);
    }
  }

}

_defineProperty(CountdownTimer, "propTypes", {
  seconds: _propTypes.default.number.isRequired,
  format: _propTypes.default.oneOf(['seconds', 'minutes']),
  onCountdownTerminated: _propTypes.default.func
});

var _default = CountdownTimer;
exports.default = _default;