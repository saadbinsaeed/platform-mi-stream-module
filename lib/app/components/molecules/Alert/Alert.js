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

const AlertStyle = _styledComponents.default.div.withConfig({
  displayName: "Alert__AlertStyle",
  componentId: "sc-1yc7wfh-0"
})(["font-size:.9rem;text-align:center;padding:0.6rem;& a{color:white;}border-radius:.3rem;margin:", ";background:", ";"], ({
  margin
}) => margin ? `${margin}px` : 0, ({
  theme,
  type
}) => theme && type ? theme.color[type] : theme.color.info);
/**
 * Show an inline alert. Good for on-page validation
 */


class Alert extends _react.Component {
  /**
   * Set our initial state
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      visible: Boolean
    });

    _defineProperty(this, "onDismiss", () => {
      this.setState({
        visible: false
      });
    });

    this.state = {
      visible: true
    };
  }

  /**
   * Render our alert component
   */
  render() {
    return _react.default.createElement(AlertStyle, {
      type: this.props.type,
      margin: this.props.margin,
      isOpen: this.state.visible,
      toggle: this.onDismiss
    }, this.props.children);
  }

}

Alert.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  type: _propTypes.default.string,
  margin: _propTypes.default.number
};
var _default = Alert;
exports.default = _default;