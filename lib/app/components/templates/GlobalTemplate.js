"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

var _FullHeight = _interopRequireDefault(require("app/components/atoms/FullHeight/FullHeight"));

var _NotificationsBar = _interopRequireDefault(require("app/components/molecules/NotificationsBar/NotificationsBar"));

var _Content = _interopRequireDefault(require("app/components/organisms/AppContent/Content"));

var _Header = _interopRequireDefault(require("app/components/organisms/AppHeader/Header"));

var _Navigation = _interopRequireDefault(require("app/components/organisms/AppNavigation/Navigation"));

var _Chat = _interopRequireDefault(require("app/components/organisms/Chat/Chat"));

var _Notifications = _interopRequireDefault(require("app/components/organisms/Notifications/Notifications"));

var _Toastr = _interopRequireDefault(require("app/containers/Toastr/Toastr"));

var _prime = _interopRequireDefault(require("app/themes/prime"));

var _common = require("app/utils/propTypes/common");

var _appActions = require("store/actions/app/appActions");

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

var _Messenger = _interopRequireDefault(require("app/components/organisms/Messenger/Messenger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GlobalThemeWrapper = (0, _styledComponents.default)(_FullHeight.default).withConfig({
  displayName: "GlobalTemplate__GlobalThemeWrapper",
  componentId: "sc-9rypix-0"
})(["", ";#datatable-filters{.ui-multiselect-panel .ui-multiselect-filter-container .fa{position:absolute;left:5px;top:12px;}.ui-dropdown-panel .ui-dropdown-item{min-height:20px;}.ui-inputtext{min-height:0;}}a{color:", ";}*::-webkit-scrollbar{width:7px;height:7px;}*::-webkit-scrollbar-thumb{border-radius:5px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3);background-color:rgba(255,255,255,.2);min-height:65px;}*::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:0;background-color:transparent;}"], _prime.default, ({
  theme
}) => theme.base.linkColor);

const CssGridLayout = _styledComponents.default.div.withConfig({
  displayName: "GlobalTemplate__CssGridLayout",
  componentId: "sc-9rypix-1"
})(["display:grid;grid-template-columns:auto 1fr auto;grid-template-areas:\"gNav gContent gMessenger\";height:100%;overflow:auto;"]);

const DrawerWrapper = _styledComponents.default.div.withConfig({
  displayName: "GlobalTemplate__DrawerWrapper",
  componentId: "sc-9rypix-2"
})(["position:relative;z-index:900;"]);

const DatePickerWrapper = _styledComponents.default.div.withConfig({
  displayName: "GlobalTemplate__DatePickerWrapper",
  componentId: "sc-9rypix-3"
})(["position:relative;z-index:99999;"]); // z-index needed to be higher than modal items, as date picker can be inside modal

/**
 * Layout that controls the page
 */


class GlobalTemplate extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "interval", void 0);

    _defineProperty(this, "markNotificationRead", id => {
      this.props.markBroadcastRead(id).then(this.props.fetchBroadcastNotifications);
    });

    _defineProperty(this, "buildMessages", (0, _memoizeOne.default)(activeBroadcasts => (activeBroadcasts || []).filter(({
      broadcast: {
        priority
      }
    }) => priority === 'broadcast').map(({
      broadcast: {
        id,
        message,
        actionType,
        actionData
      }
    }) => ({
      id,
      text: message,
      actionType,
      actionData
    }))));
  }

  /**
   * @override
   */
  componentDidMount() {
    this.props.fetchBroadcastNotifications();
    this.interval = setInterval(this.props.loadNotifications, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Render our page template
   */
  render() {
    const {
      children,
      activeBroadcasts
    } = this.props;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Toastr.default, null), _react.default.createElement(GlobalThemeWrapper, null, _react.default.createElement("div", {
      id: "modals"
    }), _react.default.createElement(DatePickerWrapper, {
      id: "date-pickers"
    }), _react.default.createElement("div", {
      id: "datatable-filters"
    }), _react.default.createElement("div", {
      id: "messenger"
    }), _react.default.createElement(_Drawer.default, {
      isToggled: this.props.toggleChat,
      title: "Messenger",
      isOpen: this.props.app.isChatOpen
    }, _react.default.createElement(_Chat.default, null)), _react.default.createElement(_Drawer.default, {
      isToggled: this.props.toggleNotifications,
      title: "Notifications",
      isOpen: this.props.app.isNotificationsOpen
    }, _react.default.createElement(_Notifications.default, null)), _react.default.createElement("div", {
      id: "carousel-item"
    }), _react.default.createElement(DrawerWrapper, {
      id: "drawers"
    }), _react.default.createElement(CssGridLayout, null, _react.default.createElement(_Navigation.default, {
      toggleMenu: this.props.toggleNav,
      openMenu: this.props.openNav,
      isLeftOpen: this.props.app.isNavOpen
    }), _react.default.createElement(_Content.default, {
      isLeftOpen: this.props.app.isNavOpen
    }, _react.default.createElement(_NotificationsBar.default, {
      messages: this.buildMessages(activeBroadcasts),
      notificationRead: this.markNotificationRead
    }), !this.props.app.isHeaderDisabled && _react.default.createElement(_Header.default, {
      openMenu: this.props.toggleNav,
      openNotifications: this.props.toggleNotifications,
      openChat: this.props.toggleChat
    }), children), _react.default.createElement(_Messenger.default, null))));
  }

}

_defineProperty(GlobalTemplate, "propTypes", {
  children: _common.ChildrenProp,
  app: _propTypes.default.object,
  activeBroadcasts: _propTypes.default.array,
  loadNotifications: _propTypes.default.func.isRequired,
  fetchBroadcastNotifications: _propTypes.default.func.isRequired,
  markBroadcastRead: _propTypes.default.func.isRequired,
  toggleNav: _propTypes.default.func.isRequired,
  openNav: _propTypes.default.func.isRequired,
  toggleChat: _propTypes.default.func.isRequired,
  toggleNotifications: _propTypes.default.func.isRequired
});

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  activeBroadcasts: state.broadcasts.active.records
});

const mapDispatchToProps = {
  toggleNav: _appActions.toggleNav,
  openNav: _appActions.openNav,
  toggleChat: _appActions.toggleChat,
  toggleNotifications: _appActions.toggleNotifications,
  loadNotifications: _appActions.loadNotifications,
  fetchBroadcastNotifications: _broadcastsActions.fetchBroadcastNotifications,
  markBroadcastRead: _broadcastsActions.markBroadcastRead
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GlobalTemplate);

exports.default = _default;