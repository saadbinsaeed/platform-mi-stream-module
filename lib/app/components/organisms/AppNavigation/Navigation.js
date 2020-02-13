"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _Responsive = require("app/components/atoms/Responsive/Responsive");

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _utils = require("app/utils/utils");

var _NavigationApplications = _interopRequireDefault(require("./NavigationApplications"));

var _NavigationContent = _interopRequireDefault(require("./NavigationContent"));

var _NavApplicationIcon = _interopRequireDefault(require("./NavApplicationIcon"));

var _NavHeader = _interopRequireDefault(require("./NavHeader"));

var _AboxMenu = _interopRequireDefault(require("./menus/AboxMenu"));

var _DashboardsMenu = _interopRequireDefault(require("./menus/DashboardsMenu"));

var _EventsMenu = _interopRequireDefault(require("./menus/EventsMenu"));

var _MapsMenu = _interopRequireDefault(require("./menus/MapsMenu"));

var _EtitiesMenu = _interopRequireDefault(require("./menus/EtitiesMenu"));

var _AnalyticsMenu = _interopRequireDefault(require("./menus/AnalyticsMenu"));

var _MarketplaceMenu = _interopRequireDefault(require("./menus/MarketplaceMenu"));

var _AdminMenu = _interopRequireDefault(require("./menus/AdminMenu"));

var _BroadcastsMenu = _interopRequireDefault(require("./menus/BroadcastsMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NavigationStyle = _styledComponents.default.aside.withConfig({
  displayName: "Navigation__NavigationStyle",
  componentId: "rbgzq2-0"
})(["grid-area:gNav;position:fixed;top:0;left:0;bottom:0;overflow:hidden;display:flex;flex-grow:1;flex-shrink:1;z-index:998;transition:.3s ease-in-out;box-shadow:", ";background:", ";", ";", ";@media(min-width:", "){transform:translateX(0);", ";};"], ({
  theme
}) => theme.shadow.z2, ({
  theme
}) => theme.navigation.background, ({
  theme
}) => theme.navigation.width === '0px' ? 'display: none;' : 'width: 90%', ({
  theme,
  isLeftOpen
}) => isLeftOpen ? 'transform: translateX(0);' : 'transform: translateX(-100%);', ({
  theme
}) => theme.media.md, ({
  theme,
  isLeftOpen
}) => isLeftOpen ? `width: ${theme.navigation.width};
             max-width: ${theme.navigation.width};
             min-width: ${theme.navigation.width};` : `width:  ${theme.navigation.apps.width};
            min-width:  ${theme.navigation.apps.width};
            max-width:  ${theme.navigation.apps.width};`);
/**
 * The main application navigation
 */


class Navigation extends _react.PureComponent {
  /**
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "menu", void 0);

    _defineProperty(this, "openMenu", () => {
      !this.props.isLeftOpen && this.props.openMenu();
    });

    const {
      isAdmin,
      permissions
    } = props;
    this.menu = [{
      permission: 'abox',
      key: 'abox',
      name: 'abox',
      type: 'af',
      title: 'A-Box',
      content: _react.default.createElement(_AboxMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'dashboard.view',
      key: 'dashboard',
      name: 'dashboard',
      type: 'af',
      title: 'Dashboards',
      content: _react.default.createElement(_DashboardsMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'mistream.menu',
      key: 'stream',
      name: 'stream',
      type: 'af',
      title: 'Mi-Stream',
      content: _react.default.createElement(_EventsMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'maps.sa.view',
      key: 'maps',
      name: 'maps',
      type: 'af',
      title: 'Maps',
      content: _react.default.createElement(_MapsMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'entity.menu',
      key: 'things',
      name: 'things',
      type: 'af',
      title: 'Entities',
      content: _react.default.createElement(_EtitiesMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'broadcast.view',
      key: 'signal-variant',
      name: 'signal-variant',
      title: 'Broadcasts',
      content: _react.default.createElement(_BroadcastsMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'intelligence.menu',
      key: 'charts',
      name: 'charts',
      type: 'af',
      title: 'Affectli Intelligence',
      content: _react.default.createElement(_AnalyticsMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'marketplace.designer1.view',
      key: 'designer',
      name: 'designer',
      type: 'af',
      title: 'Marketplace',
      largeScreenOnly: true,
      content: _react.default.createElement(_MarketplaceMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }, {
      permission: 'admin.menu',
      key: 'admin',
      name: 'admin',
      type: 'af',
      title: 'Admin Console',
      content: _react.default.createElement(_AdminMenu.default, {
        onClick: this.props.toggleMenu,
        isAdmin: isAdmin,
        permissions: permissions
      })
    }];
    const item = this.menu[0];
    this.state = {
      title: item.title,
      content: item.content
    };
  }

  /**
   * Pass our icon content prop to the content layout
   * @param item
   */
  setNavigationContent(item) {
    const {
      content,
      title
    } = item;
    this.setState({
      content,
      title
    }, this.openMenu);
  }
  /**
   * Load the menu
   */


  loadMenus(menu, permissions, isAdmin) {
    let accessibleItems = [];

    if (isAdmin) {
      accessibleItems = menu;
    } else {
      const permissionSet = new Set(permissions);
      permissionSet.add('abox'); // everyone can see abox

      if ((0, _utils.hasOneOf)(permissionSet, ['entity.classification.view', 'entity.directory.view', 'entity.organisation.view', 'entity.person.view', 'entity.thing.view'])) {
        permissionSet.add('entity.menu');
      }

      if ((0, _utils.hasOneOf)(permissionSet, ['mistream.events.view', 'mistream.main.view'])) {
        permissionSet.add('mistream.menu');
      }

      if ((0, _utils.hasOneOf)(permissionSet, ['admin.group.view', 'admin.user.view', 'admin.logs.view'])) {
        permissionSet.add('admin.menu');
      }

      if (permissionSet.has('intelligence.analytics.view')) {
        permissionSet.add('intelligence.menu');
      }

      accessibleItems = menu.filter(item => permissionSet.has(item.permission));
    }

    return accessibleItems.map((item, index) => {
      const {
        largeScreenOnly,
        key,
        ...navIconProps
      } = item;

      const icon = _react.default.createElement(_NavApplicationIcon.default, _extends({}, navIconProps, {
        key: key,
        index: index,
        onClick: () => this.setNavigationContent(item)
      }));

      if (largeScreenOnly) {
        return _react.default.createElement(_Responsive.LargeScreenMin, {
          key: key
        }, icon);
      }

      return icon;
    });
  }
  /**
   * Render our Navigation component
   */


  render() {
    const {
      permissions,
      isAdmin
    } = this.props;
    return _react.default.createElement(NavigationStyle, {
      className: 'app-navigation',
      isLeftOpen: this.props.isLeftOpen
    }, _react.default.createElement(_NavigationApplications.default, {
      isLeftOpen: this.props.isLeftOpen
    }, this.loadMenus(this.menu, permissions, isAdmin)), _react.default.createElement(_NavigationContent.default, {
      isLeftOpen: this.props.isLeftOpen
    }, _react.default.createElement(_NavHeader.default, null, _react.default.createElement(_Title.default, {
      as: "h1"
    }, this.state.title), _react.default.createElement(_HeaderActions.default, null, _react.default.createElement(_ButtonIcon.default, {
      icon: "close",
      onClick: this.props.toggleMenu
    }))), this.state.content));
  }

}

_defineProperty(Navigation, "propTypes", {
  toggleMenu: _propTypes.default.func,
  openMenu: _propTypes.default.func,
  isLeftOpen: _propTypes.default.bool,
  isAdmin: _propTypes.default.bool,
  permissions: _propTypes.default.array
});

_defineProperty(Navigation, "defaultProps", {
  IsAdmin: false,
  permissions: []
});

const mapStateToProps = state => ({
  permissions: state.user.profile.permissions,
  isAdmin: state.user.profile.isAdmin
});

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, {})(Navigation));

exports.default = _default;