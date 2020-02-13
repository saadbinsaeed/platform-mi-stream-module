"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ActionBar = _interopRequireDefault(require("app/components/molecules/ActionBar/ActionBar"));

var _Input = _interopRequireDefault(require("app/components/atoms/Input/Input"));

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _UserAvatar = _interopRequireDefault(require("app/components/molecules/UserAvatar/UserAvatar"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ListGroup = _interopRequireDefault(require("app/components/molecules/List/ListGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import styled from 'styled-components';

/**
 * Fields required to add a team member.
 * This can then be used on a page or inside a modal.
 */
class TeamChangeAssignee extends _react.PureComponent {
  /**
   * Render our add team member form
   */
  render() {
    return _react.default.createElement("div", null, _react.default.createElement(_ActionBar.default, {
      left: _react.default.createElement(_Input.default, {
        name: "searchPeople",
        placeholder: "Search people..."
      })
    }), _react.default.createElement(_ListGroup.default, {
      name: "Select an assignee from the list"
    }), _react.default.createElement(_List.default, null, _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "lg",
        status: "busy",
        name: "Glen Scott"
      }),
      title: "Glen Scott",
      subTitle: "CEO",
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "plus"
      })
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "lg",
        status: "online",
        name: "Ian Jamieson"
      }),
      title: "Ian Jamieson",
      subTitle: "Front-end UI/Dev",
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "plus"
      })
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "lg",
        status: "offline",
        name: "Katie BadHorse"
      }),
      title: "Katie BadHorse",
      subTitle: "Designer",
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "plus"
      })
    }), _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_UserAvatar.default, {
        src: "/temp/img/user.jpg",
        size: "lg",
        name: "Betty DerpyDoop"
      }),
      title: "Betty DerpyDoop",
      subTitle: "Janitor",
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "plus"
      })
    })));
  }

}

var _default = TeamChangeAssignee;
exports.default = _default;