"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _reactDeviceDetect = require("react-device-detect");

var _platformUi = require("@mic3/platform-ui");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _taskActions = require("store/actions/abox/taskActions");

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _AboxCircularProgressBar = _interopRequireDefault(require("app/components/atoms/CircularProgressBar/AboxCircularProgressBar"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _History = _interopRequireDefault(require("store/History"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _TaskLink = _interopRequireDefault(require("app/components/atoms/Link/TaskLink"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ListItemStyled = (0, _styledComponents.default)(_ListItem.default).withConfig({
  displayName: "TasksViewItem__ListItemStyled",
  componentId: "sc-1j7gf6v-0"
})(["width:100%;max-width:1024px;margin:0 auto;@media (max-width:1100px ){padding-right:2rem;}", ""], ({
  disabled
}) => disabled ? 'opacity: 0.1;' : '');
const DesktopItems = (0, _styledComponents.default)(_Flex.default).withConfig({
  displayName: "TasksViewItem__DesktopItems",
  componentId: "sc-1j7gf6v-1"
})(["@media (min-width:", "){min-width:190px;}"], ({
  theme
}) => theme.media.md);
const ButtonIconStyled = (0, _styledComponents.default)(_ButtonIcon.default).withConfig({
  displayName: "TasksViewItem__ButtonIconStyled",
  componentId: "sc-1j7gf6v-2"
})(["padding:0.3rem;& *,& i:before{color:rgba(255,255,255,0.6) !important;}& span{font-size:0.8rem !important;margin-left:0.6rem;}"]);

const Badge = _styledComponents.default.span.withConfig({
  displayName: "TasksViewItem__Badge",
  componentId: "sc-1j7gf6v-3"
})(["color:rgba(255,255,255,0.5);"]);

const ResponsiveLabelStyled = ({
  count,
  label,
  icon,
  type,
  onClick
}) => _reactDeviceDetect.isBrowser ? _react.default.createElement(ButtonIconStyled, {
  type: type,
  icon: icon,
  label: count,
  onClick: onClick
}) : _react.default.createElement(_Flex.default, {
  onClick: onClick
}, _react.default.createElement(ButtonIconStyled, {
  type: type,
  icon: icon,
  label: label
}), _react.default.createElement(Badge, null, count));
/**
 * A single task item
 */


class TaskListItem extends _react.PureComponent {
  // $FlowFixMe
  constructor(props) {
    super(props);

    _defineProperty(this, "anchorDotsEl", _react.default.createRef());

    _defineProperty(this, "loadMessenger", () => this.props.loadMessenger(this.props.data.id, 'task').then(() => {
      this.closeMenu();
    }));

    _defineProperty(this, "goToTask", () => _History.default.push(`/abox/task/${this.props.data.id}`));

    _defineProperty(this, "goToSubtasks", () => _History.default.push(`/abox/task/${this.props.data.id}/subtasks`));

    _defineProperty(this, "gotToAttachments", () => _History.default.push(`/abox/task/${this.props.data.id}/attachments`));

    _defineProperty(this, "toggleMenu", () => this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    })));

    _defineProperty(this, "closeMenu", () => this.setState({
      isMenuOpen: false
    }));

    _defineProperty(this, "handleCloseTask", () => this.props.closeTask(this.props.data.id).then(response => {
      if (response instanceof Error) return;
      this.props.resetView();
    }));

    _defineProperty(this, "buildDesktopMenuItems", (0, _memoizeOne.default)((id, childrenCount, commentCount, attachmentsCount) => [_react.default.createElement(_TaskLink.default, {
      key: 1,
      id: id,
      path: "subtasks",
      noDecoration: true
    }, _react.default.createElement(ResponsiveLabelStyled, {
      type: "af",
      icon: 'subtask-tree',
      count: childrenCount,
      label: 'Subtasks'
    })), _react.default.createElement(ResponsiveLabelStyled, {
      key: 2,
      onClick: this.loadMessenger,
      type: "af",
      icon: 'messenger',
      count: commentCount.toString(),
      label: 'Chat'
    }), _react.default.createElement(_TaskLink.default, {
      key: 3,
      id: id,
      path: "attachments",
      noDecoration: true
    }, _react.default.createElement(ResponsiveLabelStyled, {
      icon: "paperclip",
      count: attachmentsCount.toString(),
      label: 'Add attachments'
    }))]));

    _defineProperty(this, "buildMobileMenuItems", (0, _memoizeOne.default)((id, childrenCount, commentCount, attachmentsCount) => [_react.default.createElement(_platformUi.MenuItem, {
      key: 1,
      onClick: this.goToSubtasks
    }, _react.default.createElement(ResponsiveLabelStyled, {
      type: "af",
      icon: 'subtask-tree',
      count: childrenCount,
      label: 'Subtasks'
    })), _react.default.createElement(_platformUi.MenuItem, {
      key: 2,
      onClick: this.loadMessenger
    }, _react.default.createElement(ResponsiveLabelStyled, {
      type: "af",
      icon: 'messenger',
      count: commentCount.toString(),
      label: 'Chat'
    })), _react.default.createElement(_platformUi.MenuItem, {
      key: 3,
      onClick: this.gotToAttachments
    }, _react.default.createElement(ResponsiveLabelStyled, {
      icon: "paperclip",
      count: attachmentsCount.toString(),
      label: 'Add attachments'
    }))]));

    this.state = {
      commentCount: (props.data.comments || []).length,
      attachmentsCount: props.data._attachmentsCount || 0
    };
  }

  componentDidUpdate(prevProps) {
    const {
      data,
      message,
      handleDelete
    } = this.props;

    if (message && message !== prevProps.message && message.id === data.id) {
      const commentCount = (0, _lo.get)(message, 'comments.length') || 0;
      const prevCommentCount = (0, _lo.get)(prevProps, 'message.comments.length') || 0;
      const attachmentsCount = (0, _lo.get)(message, '_attachmentsCount') || 0;

      if (commentCount !== prevCommentCount) {
        this.setState({
          commentCount,
          attachmentsCount
        });
      }
    }

    if (!message && message !== prevProps.message && prevProps.message.id === data.id) {
      // we disable item because when message === null we don't have permissions to it and to task also
      handleDelete(data.id);
    }
  }

  render() {
    const {
      data: {
        priority,
        variable,
        name,
        id,
        dueDate,
        endDate,
        _childrenCount
      },
      isDeleted
    } = this.props;
    const {
      completion
    } = variable || {};
    const {
      commentCount,
      attachmentsCount,
      isMenuOpen
    } = this.state;
    const childrenCount = `${_childrenCount || 0}`;
    return _react.default.createElement(ListItemStyled, {
      disabled: isDeleted,
      component: _react.default.createElement(_AboxCircularProgressBar.default, {
        percentage: completion,
        priority: priority,
        disabled: !!endDate
      }),
      title: _react.default.createElement(_TaskLink.default, {
        id: id
      }, name || 'No Name'),
      subTitle: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_TaskLink.default, {
        id: id
      }, "#", id), ", Due ", (0, _date.formatDate)(dueDate)),
      actions: _react.default.createElement(_Flex.default, null, _reactDeviceDetect.isBrowser && _react.default.createElement(DesktopItems, {
        spaceBetween: true
      }, this.buildDesktopMenuItems(id, childrenCount, commentCount, attachmentsCount)), _react.default.createElement("span", {
        ref: this.anchorDotsEl
      }, _react.default.createElement(ButtonIconStyled, {
        icon: "dots-vertical",
        onClick: this.toggleMenu
      })), _react.default.createElement(_platformUi.Menu, {
        open: isMenuOpen,
        anchorEl: this.anchorDotsEl.current,
        onClose: this.toggleMenu
      }, _react.default.createElement(_platformUi.MenuItem, {
        onClick: this.goToTask
      }, _react.default.createElement(ButtonIconStyled, {
        icon: "login-variant",
        label: "Go to task"
      })), !_reactDeviceDetect.isBrowser && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_platformUi.Divider, null), this.buildMobileMenuItems(id, childrenCount, commentCount, attachmentsCount)), _react.default.createElement(_platformUi.Divider, null), _react.default.createElement(_platformUi.MenuItem, {
        onClick: this.handleCloseTask
      }, _react.default.createElement(ButtonIconStyled, {
        icon: "check",
        label: "Close task"
      })))),
      raised: true
    });
  }

}

;

var _default = (0, _reactRedux.connect)(state => ({
  message: state.chat.messages
}), {
  loadMessenger: _messengerActions.loadMessenger,
  closeTask: _taskActions.closeTask
})(TaskListItem);

exports.default = _default;