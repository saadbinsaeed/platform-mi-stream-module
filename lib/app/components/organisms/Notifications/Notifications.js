"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _List = _interopRequireDefault(require("../../molecules/List/List"));

var _ListItem = _interopRequireDefault(require("../../molecules/List/ListItem"));

var _UserAvatar = _interopRequireDefault(require("../../molecules/UserAvatar/UserAvatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import PropTypes from 'prop-types';
const NotificationStyle = _styledComponents.default.div.withConfig({
  displayName: "Notifications__NotificationStyle",
  componentId: "b3z37h-0"
})([""]);
/**
 * Chat Component
 */


class Notifications extends _react.PureComponent {
  /**
   * Render our chat container
   */
  render() {
    return _react.default.createElement(NotificationStyle, null, _react.default.createElement(_List.default, null, _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "md"
      }),
      title: "Completed Task",
      subTitle: "Ian, 2 Hours ago"
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "md"
      }),
      title: "Started a conversation",
      subTitle: "Glen, 2 Hours ago"
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "md"
      }),
      title: "Added you to a task",
      subTitle: "Katie, 2 Hours ago"
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "md"
      }),
      title: "Mentioned you",
      subTitle: "2 Hours ago"
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "md"
      }),
      title: "Did something",
      subTitle: "2 Hours ago"
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "md"
      }),
      title: "Did something else",
      subTitle: "2 Hours ago"
    })));
  }

}

var _default = Notifications;
exports.default = _default;