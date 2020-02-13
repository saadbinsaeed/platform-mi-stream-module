"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactTether = _interopRequireDefault(require("react-tether"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _PopoverContainer = _interopRequireDefault(require("./Container/PopoverContainer"));

var _PopoverContainerProps = _interopRequireDefault(require("./Container/PopoverContainerProps"));

var _PopoverHeaderProps = _interopRequireDefault(require("./Header/PopoverHeaderProps"));

var _PopoverFooterProps = _interopRequireDefault(require("./Footer/PopoverFooterProps"));

var _PopoverContentProps = _interopRequireDefault(require("./Content/PopoverContentProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PopoverLink = _styledComponents.default.div.withConfig({
  displayName: "Popover__PopoverLink",
  componentId: "au9mvw-0"
})(["display:inline-block;cursor:pointer;", ";"], ({
  isOpen,
  theme
}) => isOpen && theme ? 'opacity: 0.8;' : '');
/**
 * Create a popover for elements that need to show more info
 */


class Popover extends _react.Component {
  /**
   * Define our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "Layout", null);

    _defineProperty(this, "timeout", null);

    _defineProperty(this, "close", () => {
      this.setState({
        isOpen: false
      });
    });

    _defineProperty(this, "toggle", () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    });

    _defineProperty(this, "handleClickOutside", () => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.setState({
        isOpen: false
      }), 300);
    });

    this.state = {
      isOpen: this.props.open
    };
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout); // fix memory leak
    }
  }
  /**
   * Close function
   */


  /**
   * Render our component
   */
  render() {
    const {
      children,
      width,
      content,
      placement
    } = this.props;
    const TetherComponentStyle = {
      zIndex: '9999'
    };
    return _react.default.createElement(_reactTether.default, {
      ref: node => {
        this.Layout = node;
      },
      attachment: placement,
      constraints: [{
        to: 'scrollParent',
        attachment: 'together'
      }],
      style: TetherComponentStyle,
      onBlur: this.handleClickOutside
    }, _react.default.createElement(PopoverLink, {
      role: "presentation",
      onClick: this.toggle,
      isOpen: this.state.isOpen
    }, children), _react.default.createElement(_PopoverContainer.default, {
      placement: placement,
      isOpen: this.state.isOpen,
      content: content,
      width: width
    }));
  }

}

_defineProperty(Popover, "defaultProps", {
  placement: 'middle center'
});

_defineProperty(Popover, "propTypes", { ..._PopoverContainerProps.default,
  ..._PopoverHeaderProps.default,
  ..._PopoverContentProps.default,
  ..._PopoverFooterProps.default
});

var _default = (0, _reactClickOutside.default)(Popover);

exports.default = _default;