"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Component for render react 16 errors
 */
class ErrorBoundary extends _react.Component {
  /**
   * Set default component state
   */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  /**
   * New R16. Catch error.
   */


  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      hasError: true
    });
  }
  /**
   * Render our error
   * @returns {*}
   */


  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return _react.default.createElement("h3", null, "There as been an error loading the page. If the error persist contact your system administrator.");
    }

    return this.props.children;
  }

}

var _default = ErrorBoundary;
exports.default = _default;