"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SideBar = _interopRequireDefault(require("./SideBar"));

var _Content = _interopRequireDefault(require("./Content"));

var _ActionBar = _interopRequireDefault(require("../ActionBar/ActionBar"));

var _ButtonIcon = _interopRequireDefault(require("../ButtonIcon/ButtonIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const LayoutStyle = _styledComponents.default.section.withConfig({
  displayName: "Layout__LayoutStyle",
  componentId: "sc-16v8gdr-0"
})(["grid-area:pContent;position:relative;display:grid;grid-template-columns:auto 1fr auto;grid-template-areas:\"sidebar content rightbar\";overflow:auto;"]);
/**
 * Create our layout component to handle more strict functional inner layouts
 */


class Layout extends _react.Component {
  /**
   * Define our initial state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleLeftNav", () => {
      if (this.props.toggleLeftNav) {
        this.props.toggleLeftNav();
      } else {
        this.setState({
          isLeftNavOpen: !this.state.isLeftNavOpen
        });
      }
    });

    _defineProperty(this, "toggleRightNav", () => {
      if (this.props.toggleRightNav) {
        this.props.toggleRightNav();
      } else {
        this.setState({
          isRightNavOpen: !this.state.isRightNavOpen
        });
      }
    });

    _defineProperty(this, "openRightNav", () => {
      if (!this.state.toggledRightNav) {
        this.setState({
          isRightNavOpen: true
        });
      }
    });

    this.state = {
      isLeftNavOpen: props.leftNavOpen || false,
      isRightNavOpen: props.rightNavOpen || false
    };
  }

  componentDidUpdate(prevProps) {
    const {
      leftNavOpen,
      rightNavOpen,
      isToggled
    } = this.props;

    if (prevProps.leftNavOpen !== leftNavOpen) {
      this.setState({
        isLeftNavOpen: leftNavOpen
      });
    }

    if (prevProps.rightNavOpen !== rightNavOpen) {
      this.setState({
        isRightNavOpen: rightNavOpen
      });
    }

    if (prevProps.isToggled !== isToggled) {
      this.toggleLeftNav();
    }
  }
  /**
   * Toggle the state of the left navigation
   */


  /**
   * Render our layout container component
   */
  render() {
    const {
      className,
      leftSidebar,
      content,
      children,
      showToggle,
      noPadding,
      layoutStyle,
      rightSidebar
    } = this.props;

    const toggleLeftButton = _react.default.createElement(_ButtonIcon.default, {
      icon: "menu",
      iconColor: "white",
      onClick: this.toggleLeftNav
    });

    const toggleRightButton = _react.default.createElement(_ButtonIcon.default, {
      icon: "menu",
      iconColor: "white",
      onClick: this.toggleRightNav
    });

    const rightButton = rightSidebar ? toggleRightButton : toggleLeftButton;
    const leftButton = rightSidebar && leftSidebar ? toggleLeftButton : null;
    return _react.default.createElement(LayoutStyle, {
      className: `${className || ''} Layout`,
      style: layoutStyle
    }, leftSidebar && _react.default.createElement(_SideBar.default, {
      isOpened: this.state.isLeftNavOpen
    }, leftSidebar), _react.default.createElement(_Content.default, {
      header: showToggle && _react.default.createElement(_ActionBar.default, {
        left: leftButton,
        right: rightButton
      }),
      showToggle: showToggle,
      noPadding: noPadding
    }, content, children), rightSidebar && _react.default.createElement(_SideBar.default, {
      isRightBar: true,
      isOpened: this.state.isRightNavOpen
    }, rightSidebar));
  }

}

Layout.propTypes = {
  leftNavOpen: _propTypes.default.bool,
  showToggle: _propTypes.default.bool,
  noPadding: _propTypes.default.bool,
  content: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  leftSidebar: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};
var _default = Layout;
exports.default = _default;