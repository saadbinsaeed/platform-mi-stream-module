"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The Ticker component will pass the current time to its RenderComponent.
 *
 * e.g.
 * <Ticker RenderComponent={(props) => props.time.toJSON()} />
 */
class Ticker extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "interval", void 0);

    this.state = {
      time: new Date()
    };
    const {
      intervalTime = 1000
    } = props;
    this.interval = setInterval(() => this.setState({
      time: new Date()
    }), intervalTime);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      RenderComponent
    } = this.props;
    return RenderComponent({
      time: this.state.time
    });
  }

}

var _default = Ticker;
exports.default = _default;