"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Placements = (0, _styledComponents.css)(["position:absolute;", " ", " ", " ", ""], ({
  placement
}) => placement === 'top right' ? `
            top:0; right: 0;
  ` : null, ({
  placement
}) => placement === 'top left' ? `
            top:0; left: 0;
  ` : null, ({
  placement
}) => placement === 'bottom left' ? `
            bottom:0; left: 0;
  ` : null, ({
  placement,
  customPosition
}) => placement === 'bottom right' ? customPosition && customPosition || `
            bottom:0; right:0;
  ` : null);

const PopoverWrapper = _styledComponents.default.span.withConfig({
  displayName: "PopupMenu__PopoverWrapper",
  componentId: "sc-1y0n8ai-0"
})(["position:relative;", ";"], ({
  fluid
}) => fluid ? 'width: 100%;' : '');

const PopoverLink = _styledComponents.default.div.withConfig({
  displayName: "PopupMenu__PopoverLink",
  componentId: "sc-1y0n8ai-1"
})(["display:inline-block;cursor:pointer;", ";", ";"], ({
  fluid
}) => fluid ? 'width: 100%;' : '', ({
  isOpen,
  theme
}) => isOpen && theme ? 'opacity: 0.8;' : '');

const PopoverContainer = _styledComponents.default.div.withConfig({
  displayName: "PopupMenu__PopoverContainer",
  componentId: "sc-1y0n8ai-2"
})(["", ";position:absolute;text-align:left;color:", ";background:", ";box-shadow:", ";min-width:", ";", ";", ";z-index:999;", ""], Placements, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.widget.background, ({
  theme,
  shadow
}) => !shadow ? theme.shadow.z1 : '', ({
  width
}) => width || 'auto', ({
  padding
}) => padding ? 'padding: .1rem;' : '', ({
  isOpen
}) => isOpen ? '' : 'display: none', ({
  nowrap
}) => 'white-space: nowrap;');
/**
 * Dropdown
 */


class PopupMenu extends _react.PureComponent {
  /**
   * Set our prop-types
   */

  /**
   * Set our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      isOpen: Boolean
    });

    _defineProperty(this, "unmounted", false);

    _defineProperty(this, "toggle", event => {
      event.preventDefault();
      this.setState({
        isOpen: !this.state.isOpen
      });
    });

    _defineProperty(this, "handleClickOutside", () => {
      setTimeout(() => !this.unmounted && this.setState({
        isOpen: false
      }), 300);
    });

    this.state = {
      isOpen: false
    };
  }

  componentWillUnmount() {
    this.unmounted = true;
  }
  /**
   * Toggle our Dropdown state (open/closed)
   */


  /**
   * Render our dropdown component
   */
  render() {
    const {
      children,
      content,
      width,
      placement,
      customPosition,
      className,
      shadow,
      nowrap,
      fluid,
      padding
    } = this.props;
    return _react.default.createElement(PopoverWrapper, {
      fluid: fluid,
      onBlur: this.handleClickOutside,
      className: className
    }, _react.default.createElement(PopoverLink, {
      fluid: fluid,
      role: "presentation",
      onClick: this.toggle,
      isOpen: this.state.isOpen
    }, children), _react.default.createElement(PopoverContainer, {
      customPosition: customPosition,
      placement: placement,
      isOpen: this.state.isOpen,
      onClick: this.toggle,
      width: width,
      shadow: shadow,
      nowrap: nowrap,
      padding: padding
    }, content));
  }

}

_defineProperty(PopupMenu, "propTypes", {
  inline: _propTypes.default.bool,
  right: _propTypes.default.bool,
  width: _propTypes.default.string,
  placement: _propTypes.default.string,
  children: _common.ChildrenProp,
  content: _common.ChildrenProp,
  layout: _common.ChildrenProp,
  shadow: _propTypes.default.bool,
  nowrap: _propTypes.default.bool
});

_defineProperty(PopupMenu, "defaultProps", {
  placement: 'top right',
  shadow: true,
  nowrap: false
});

var _default = (0, _reactClickOutside.default)(PopupMenu);

exports.default = _default;