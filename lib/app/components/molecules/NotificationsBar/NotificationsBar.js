"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _polished = require("polished");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _utils = require("app/utils/utils");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _notificationUtils = require("app/utils/notification/notificationUtils");

var _notification = _interopRequireDefault(require("media/sounds/notification.mp3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// $FlowFixMe
const audio = new Audio(_notification.default);
const ScrollBarStyle = (0, _styledComponents.css)(["&::-webkit-scrollbar{width:0px !important;height:0px !important;}"]);
const BarDefaults = (0, _styledComponents.css)(["background:tomato;font-size:12px;color:white;display:flex;align-items:center;overflow:hidden;transition:background 0.3s ease-in-out;&:hover{background:", ";}"], (0, _polished.lighten)(0.03, 'tomato'));

const NotificationsComponent = _styledComponents.default.div.withConfig({
  displayName: "NotificationsBar__NotificationsComponent",
  componentId: "sc-1fudxae-0"
})(["display:block;position:absolute;top:0;left:0;right:0;width:70%;@media (min-width:240px){width:80%;}margin:0 auto;z-index:9999;"]);

const NotificationBar = _styledComponents.default.div.withConfig({
  displayName: "NotificationsBar__NotificationBar",
  componentId: "sc-1fudxae-1"
})(["", ";box-shadow:1px 1px 3px rgba(0,0,0,0.3);"], BarDefaults);

const NotificationIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "NotificationsBar__NotificationIcon",
  componentId: "sc-1fudxae-2"
})(["padding:0.5rem;"]);

const IconsWrapper = _styledComponents.default.div.withConfig({
  displayName: "NotificationsBar__IconsWrapper",
  componentId: "sc-1fudxae-3"
})(["margin-left:auto;"]);

const NotificationText = _styledComponents.default.div.withConfig({
  displayName: "NotificationsBar__NotificationText",
  componentId: "sc-1fudxae-4"
})(["padding:0.5rem 0.5rem 0.5rem 0;overflow:hidden;text-overflow:ellipsis;"]);

const NotificationToggler = (0, _styledComponents.default)(NotificationIcon).withConfig({
  displayName: "NotificationsBar__NotificationToggler",
  componentId: "sc-1fudxae-5"
})(["transition:0.5s ease-in-out;", ";"], ({
  isOpen
}) => isOpen ? 'transform: rotate(180deg);' : 'transform: rotate(0deg);');
const NotificationListIcon = (0, _styledComponents.default)(NotificationIcon).withConfig({
  displayName: "NotificationsBar__NotificationListIcon",
  componentId: "sc-1fudxae-6"
})(["padding:0.5rem;margin-left:auto;"]);

const NotificationsWrapper = _styledComponents.default.div.withConfig({
  displayName: "NotificationsBar__NotificationsWrapper",
  componentId: "sc-1fudxae-7"
})(["position:relative;"]);

const NotificationsListContainer = _styledComponents.default.div.withConfig({
  displayName: "NotificationsBar__NotificationsListContainer",
  componentId: "sc-1fudxae-8"
})(["", ";position:absolute;top:0;left:0;right:0;max-height:calc(100vh - 52px);overflow:auto;z-index:99;display:none;", ";"], ScrollBarStyle, ({
  isOpen
}) => isOpen ? 'display:block' : 'display:none');

const NotificationListItem = _styledComponents.default.div.withConfig({
  displayName: "NotificationsBar__NotificationListItem",
  componentId: "sc-1fudxae-9"
})(["", ";"], BarDefaults);
/**
 *
 */


class NotificationsBar extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isNotificationsOpen: false
    });

    _defineProperty(this, "toggleNotificationsList", () => this.setState({
      isNotificationsOpen: !this.state.isNotificationsOpen
    }));

    _defineProperty(this, "markAsRead", (event, id) => {
      event.stopPropagation();
      this.props.notificationRead && this.props.notificationRead(id);
    });

    _defineProperty(this, "playAudio", () => {
      audio.currentTime = 0;
      audio.play().catch(error => {
        if (error.code !== 0) {
          throw error;
        }
      });
    });

    _defineProperty(this, "buildNotificationHeaderBar", (0, _memoizeOne.default)(messages => {
      if (messages && messages.length > 1) {
        return _react.default.createElement(NotificationBar, null, _react.default.createElement(NotificationIcon, {
          name: "radio-tower"
        }), _react.default.createElement(NotificationText, null, messages.length, " Broadcast messages"), _react.default.createElement(IconsWrapper, null, _react.default.createElement(NotificationToggler, {
          name: "arrow-down",
          onClick: this.toggleNotificationsList,
          isOpen: this.state.isNotificationsOpen
        })));
      }

      if (messages && messages.length === 1) {
        return _react.default.createElement(NotificationBar, {
          onClick: this.handleBroadcastNavigation(messages[0])
        }, _react.default.createElement(NotificationIcon, {
          name: "radio-tower"
        }), _react.default.createElement(NotificationText, null, messages[0].text), _react.default.createElement(IconsWrapper, null, _react.default.createElement(NotificationListIcon, {
          name: "check",
          onClick: event => this.markAsRead(event, messages[0].id)
        })));
      }

      return null;
    }));

    _defineProperty(this, "handleBroadcastNavigation", ({
      actionData,
      actionType
    }) => () => {
      const url = (0, _notificationUtils.getCustomAction)(actionData, actionType);
      const isNewWindow = (0, _notificationUtils.isNewWindowNeeded)(actionType);

      if (url) {
        this.toggleNotificationsList();

        if (isNewWindow) {
          window.open(url);
        } else {
          window.open(url, '_self');
        }
      }
    });

    _defineProperty(this, "buildNotificationsList", (0, _memoizeOne.default)(messages => messages && messages.map((message, index) => {
      return _react.default.createElement(NotificationListItem, {
        key: message.id,
        isOpen: this.state.isNotificationsOpen,
        className: setTimeout(() => 'visible', index * 100),
        index: index,
        onClick: this.handleBroadcastNavigation(message)
      }, _react.default.createElement(NotificationIcon, {
        name: "radio-tower"
      }), _react.default.createElement(NotificationText, null, message.text), _react.default.createElement(NotificationListIcon, {
        name: "check",
        onClick: event => this.markAsRead(event, message.id)
      }));
    })));
  }

  componentDidMount() {
    this.props.messages > 0 && this.playAudio();
  }
  /**
   * We want to play audio if the messages props change
   * @param prevProps
   */


  componentDidUpdate(prevProps) {
    if (!(0, _utils.deepEquals)(this.props.messages.map(({
      id
    }) => id), prevProps.messages.map(({
      id
    }) => id))) {
      this.playAudio();
    }
  }
  /**
   * If the item is the list has been checked off. Mark as "Read".
   */


  /**
   * Generate layout based on messages
   */
  render() {
    const messages = this.props.messages;
    return messages && _react.default.createElement(NotificationsComponent, null, this.buildNotificationHeaderBar(messages), messages.length > 1 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(NotificationsWrapper, null, _react.default.createElement(NotificationsListContainer, {
      isOpen: this.state.isNotificationsOpen
    }, this.buildNotificationsList(messages)))));
  }

}

_defineProperty(NotificationsBar, "propTypes", {
  messages: _propTypes.default.array,
  notificationRead: _propTypes.default.func
});

var _default = NotificationsBar;
exports.default = _default;