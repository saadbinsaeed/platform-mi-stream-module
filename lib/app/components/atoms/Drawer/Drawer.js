"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactPortal = require("react-portal");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _Animations = require("app/utils/styles/Animations");

var _common = require("app/utils/propTypes/common");

var _DrawerHeader = _interopRequireDefault(require("./DrawerHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DrawerStyle = _styledComponents.default.div.withConfig({
  displayName: "Drawer__DrawerStyle",
  componentId: "b82z3n-0"
})(["display:grid;grid-template-rows:auto 1fr auto;grid-template-areas:\"drawerHeader\" \"drawerContent\" \"drawerFooter\";position:fixed;right:0;top:0;bottom:0;width:100%;@media(min-width:", " ){width:310px;}z-index:10;color:", ";background:", ";animation-name:", ";animation-duration:.3s;animation-timing-function:ease;overflow-y:auto;box-shadow:0 3px 6px rgba(0,0,0,0.16),0 3px 6px rgba(0,0,0,0.23);"], ({
  theme
}) => theme.media.md, ({
  theme
}) => theme.drawer.textColor, ({
  theme
}) => theme.drawer.background, ({
  isOpen
}) => isOpen ? _Animations.animateInRight : _Animations.animateOutRight);

const DrawerBlock = _styledComponents.default.div.withConfig({
  displayName: "Drawer__DrawerBlock",
  componentId: "b82z3n-1"
})(["grid-area:drawerContent;padding:", ";"], ({
  drawerContentPadding
}) => drawerContentPadding || '1rem');

const DrawerFooter = _styledComponents.default.footer.withConfig({
  displayName: "Drawer__DrawerFooter",
  componentId: "b82z3n-2"
})(["grid-area:drawerFooter;padding:1rem;"]);
/**
 * A drawer component that can show hidden content by sliding in from the left, right or bottom;
 */


class Drawer extends _react.PureComponent {
  /**
   * Declare our propTypes
   */

  /**
   * Set our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "toggleDrawer", () => {
      this.setState({
        data: (0, _Immutable.default)({ ...this.state.data,
          isOpen: !this.state.data.isOpen
        })
      });

      if (this.props.isToggled) {
        this.props.isToggled();
      }
    });

    this.state = {
      data: (0, _Immutable.default)({
        isOpen: this.props.isOpen || false
      })
    };
  }
  /**
   * @param nextProps the properties that the Component is receiving.
   */


  componentWillReceiveProps(nextProps) {
    this.setState({
      data: (0, _Immutable.default)({ ...this.state.data,
        isOpen: nextProps.isOpen
      })
    });
  }

  /**
   * Render our drawer component with it's children components
   */
  render() {
    const {
      children,
      position,
      title,
      footer,
      titleAs = 'h3',
      drawerContentPadding
    } = this.props;
    return this.state.data.isOpen && _react.default.createElement(_reactPortal.Portal, {
      node: document && document.getElementById('drawers')
    }, _react.default.createElement(DrawerStyle, {
      position: position,
      isOpen: this.state.data.isOpen
    }, this.props.DrawerHeader ? this.props.DrawerHeader({
      title,
      titleAs,
      toggleDrawer: this.toggleDrawer,
      DrawerHeader: _DrawerHeader.default
    }) : _react.default.createElement(_DrawerHeader.default, null, _react.default.createElement(_Title.default, {
      as: titleAs
    }, title), _react.default.createElement(_HeaderActions.default, null, _react.default.createElement(_ButtonIcon.default, {
      icon: "close",
      onClick: this.toggleDrawer
    }))), _react.default.createElement(DrawerBlock, {
      drawerContentPadding: drawerContentPadding
    }, children), _react.default.createElement(DrawerFooter, null, footer)));
  }

}

_defineProperty(Drawer, "propTypes", {
  children: _common.ChildrenProp,
  footer: _common.ChildrenProp,
  title: _propTypes.default.string,
  isOpen: _propTypes.default.bool,
  dispatch: _propTypes.default.any,
  position: _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']),
  isToggled: _propTypes.default.func,
  DrawerHeader: _propTypes.default.func
});

_defineProperty(Drawer, "defaultProps", {
  DrawerHeader: null
});

var _default = Drawer;
exports.default = _default;