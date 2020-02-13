"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Indicator = _styledComponents.default.div.withConfig({
  displayName: "OfflineIndicator__Indicator",
  componentId: "sc-1gq8byo-0"
})(["width:60px;text-align:center;padding:.3rem;border-radius:.7rem;"]);

const Online = (0, _styledComponents.default)(Indicator).withConfig({
  displayName: "OfflineIndicator__Online",
  componentId: "sc-1gq8byo-1"
})(["background:MEDIUMAQUAMARINE;"]);
const Offline = (0, _styledComponents.default)(Indicator).withConfig({
  displayName: "OfflineIndicator__Offline",
  componentId: "sc-1gq8byo-2"
})(["background:indianred;"]);
/**
 * Small component to detect whether you're online
 */

class OfflineIndicator extends _react.PureComponent {
  /**
   * Create our default state
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "goOnline", () => {
      this.setState({
        online: true
      });
    });

    _defineProperty(this, "goOffline", () => {
      this.setState({
        online: false
      });
    });

    this.state = {
      online: true
    };
  }

  /**
   * Add event listeners for window.online and check window exists for SSR Support
   */
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.goOnline);
      window.addEventListener('offline', this.goOffline);
    }
  }
  /**
   * Remove listeners when component is no longer shown
   */


  componentWillUnmount() {
    window.removeEventListener('online', this.goOnline);
    window.removeEventListener('offline', this.goOffline);
  }

  /**
   * Render our indicator
   * TODO: Make it look pretty, add animations etc;
   */
  render() {
    if (this.state.online) {
      return _react.default.createElement(Online, null, "Online");
    }

    return _react.default.createElement(Offline, null, "Offline");
  }

}

var _default = OfflineIndicator;
exports.default = _default;