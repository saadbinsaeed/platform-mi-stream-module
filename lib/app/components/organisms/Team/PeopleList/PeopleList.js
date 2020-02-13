"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _UserAvatar = _interopRequireDefault(require("app/components/molecules/UserAvatar/UserAvatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import ListGroup from 'app/components/molecules/List/ListGroup';

/**
 * Component that displays a list of team members related to a process or task
 */
class PeopleList extends _react.PureComponent {
  /**
   * Render our team member list using data props passed in
   * @returns {XML}
   */
  render() {
    return _react.default.createElement("div", null, _react.default.createElement(_List.default, null, _react.default.createElement(_ListItem.default, {
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

var _default = PeopleList;
exports.default = _default;