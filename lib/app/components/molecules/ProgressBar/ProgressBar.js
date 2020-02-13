"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ProgressBarStyle = _styledComponents.default.div.withConfig({
  displayName: "ProgressBar__ProgressBarStyle",
  componentId: "sc-1ha4m9i-0"
})(["display:block;background:", ";border-radius:0;height:0.3rem;overflow:hidden;"], ({
  color,
  theme
}) => color ? `${color}44` : `${theme.progressBar.color}44`);

const ProgressLine = _styledComponents.default.div.withConfig({
  displayName: "ProgressBar__ProgressLine",
  componentId: "sc-1ha4m9i-1"
})(["display:block;width:", "%;background:", ";height:0.3rem;"], ({
  value
}) => value || 0, ({
  color,
  theme
}) => color || theme.progressBar.color);
/**
 * ProgressBar
 */


class ProgressBar extends _react.PureComponent {
  /**
   * Define our props
   */
  render() {
    const {
      value,
      color
    } = this.props;
    return _react.default.createElement(ProgressBarStyle, {
      color: color
    }, _react.default.createElement(ProgressLine, {
      value: value,
      color: color
    }));
  }

}

_defineProperty(ProgressBar, "propTypes", {
  value: _propTypes.default.number.isRequired,
  color: _propTypes.default.string
});

_defineProperty(ProgressBar, "defaultProps", {
  value: 0
  /**
   * Render our progress bar based on % value
   */

});

var _default = ProgressBar;
exports.default = _default;