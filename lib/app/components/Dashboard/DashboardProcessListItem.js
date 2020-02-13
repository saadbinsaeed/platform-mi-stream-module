"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _moment = _interopRequireDefault(require("moment"));

var _platformUi = require("@mic3/platform-ui");

var _reactDeviceDetect = require("react-device-detect");

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ResizableListItem = _interopRequireDefault(require("app/components/molecules/VirtualList/ResizableListItem"));

var _AboxCircularProgressBar = _interopRequireDefault(require("app/components/atoms/CircularProgressBar/AboxCircularProgressBar"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

var _Ticker = _interopRequireDefault(require("app/components/molecules/Ticker/Ticker"));

var _date = require("app/utils/date/date");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _lo = require("app/utils/lo/lo");

var _stringUtils = require("app/utils/string/string-utils");

var _utils = require("app/utils/utils");

var _History = _interopRequireDefault(require("store/History"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CardContainer = _styledComponents.default.div.withConfig({
  displayName: "DashboardProcessListItem__CardContainer",
  componentId: "sc-1r61fkt-0"
})(["width:100%;max-width:1000px;margin:0 auto;"]);

const DesktopItems = (0, _styledComponents.default)(_Flex.default).withConfig({
  displayName: "DashboardProcessListItem__DesktopItems",
  componentId: "sc-1r61fkt-1"
})(["@media (min-width:", "){min-width:120px;}"], ({
  theme
}) => theme.media.md);

const CommentsStyled = _styledComponents.default.div.withConfig({
  displayName: "DashboardProcessListItem__CommentsStyled",
  componentId: "sc-1r61fkt-2"
})(["color:", ";font-style:italic;max-width:30%;"], ({
  theme
}) => `${theme.base.textColor}55`);

const ButtonIconStyled = (0, _styledComponents.default)(_ButtonIcon.default).withConfig({
  displayName: "DashboardProcessListItem__ButtonIconStyled",
  componentId: "sc-1r61fkt-3"
})(["padding:0.3rem;& *,& i:before{color:rgba(255,255,255,0.6) !important;}& span{font-size:0.8rem !important;margin-left:0.6rem;}"]);

const Badge = _styledComponents.default.span.withConfig({
  displayName: "DashboardProcessListItem__Badge",
  componentId: "sc-1r61fkt-4"
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

const DurationComponent = ({
  startDate,
  endDate,
  time,
  label
}) => {
  if (startDate && endDate) {
    // $FlowFixMe
    return (0, _date.formatInterval)((0, _moment.default)(endDate) - (0, _moment.default)(startDate));
  } // $FlowFixMe


  return `${label} ${(0, _date.formatInterval)((0, _moment.default)(time) - (0, _moment.default)(startDate))}`;
};
/**
 * A single task item
 */


class DashboardProcessListItem extends _react.PureComponent {
  // $FlowFixMe
  constructor(props) {
    super(props);

    _defineProperty(this, "anchorDotsEl", _react.default.createRef());

    _defineProperty(this, "toggleMenu", () => this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    })));

    _defineProperty(this, "openMessenger", id => this.props.loadMessenger(this.props.data.id, 'process'));

    _defineProperty(this, "renderLastComments", (0, _memoizeOne.default)(comments => (0, _stringUtils.cut)(String((0, _lo.get)(comments, '[0].message.plainMessage', 'No comments')), 35)));

    _defineProperty(this, "buildDesktopMenu", (0, _memoizeOne.default)((tasks, commentCount, id) => _react.default.createElement(DesktopItems, {
      spaceBetween: true
    }, _react.default.createElement(_ProcessLink.default, {
      key: 1,
      id: id,
      path: "tasks"
    }, _react.default.createElement(ResponsiveLabelStyled, {
      type: "af",
      icon: 'task-list',
      count: tasks.length.toString(),
      label: 'Subtasks'
    })), _react.default.createElement(ResponsiveLabelStyled, {
      key: 2,
      type: "af",
      icon: 'messenger',
      onClick: this.openMessenger,
      count: commentCount.toString(),
      label: 'Chat'
    }))));

    _defineProperty(this, "goToProcessTasks", () => _History.default.push(`/abox/process/${this.props.data.id}/tasks`));

    _defineProperty(this, "buildMobileMenu", (0, _memoizeOne.default)((tasks, commentCount, id, isMenuOpen) => _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", {
      ref: this.anchorDotsEl
    }, _react.default.createElement(ButtonIconStyled, {
      icon: "dots-vertical",
      onClick: this.toggleMenu
    })), _react.default.createElement(_platformUi.Menu, {
      open: isMenuOpen,
      anchorEl: this.anchorDotsEl.current,
      onClose: this.toggleMenu
    }, _react.default.createElement(_platformUi.MenuItem, {
      onClick: this.goToProcessTasks
    }, _react.default.createElement(ResponsiveLabelStyled, {
      type: "af",
      icon: 'task-list',
      count: tasks.length.toString(),
      label: 'Subtasks'
    })), _react.default.createElement(_platformUi.MenuItem, {
      onClick: this.openMessenger
    }, _react.default.createElement(ResponsiveLabelStyled, {
      type: "af",
      icon: 'messenger',
      onClick: this.openMessenger,
      count: commentCount.toString(),
      label: 'Chat'
    }))))));

    const {
      data: {
        comments: _comments
      }
    } = props;
    this.state = {
      commentCount: (_comments || []).length,
      comments: _comments,
      isMenuOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    const {
      data,
      message
    } = this.props;
    const commentCount = (0, _lo.get)(this.props, 'message.comments.length') || 0;
    const prevCommentCount = (0, _lo.get)(prevProps, 'message.comments.length') || 0;

    if (commentCount !== prevCommentCount && message.id === data.id) {
      this.setState({
        commentCount,
        comments: message.comments
      });
    }
  }

  render() {
    const {
      data: {
        variables,
        name,
        id,
        businessKey,
        createDate,
        tasks,
        status,
        endDate
      },
      index,
      resize,
      style
    } = this.props;
    const {
      commentCount,
      isMenuOpen
    } = this.state;
    const progress = Math.floor((0, _utils.getNum)(variables, 'progress') || 0);
    const priority = (0, _utils.getNum)(variables, 'priority', 3);
    const region = (0, _lo.get)(status, 'payload.maintenancesite.region');
    return _react.default.createElement(_ResizableListItem.default, {
      style: style,
      key: index,
      index: index,
      resize: resize,
      padding: 15
    }, resizeRow => _react.default.createElement(CardContainer, null, _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_AboxCircularProgressBar.default, {
        percentage: progress,
        priority: priority,
        disabled: !!endDate
      }),
      title: _react.default.createElement(_reactRouterDom.Link, {
        to: `/abox/process/${id}`
      }, name || 'No Name'),
      subTitle: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactRouterDom.Link, {
        to: `/abox/process/${id}`
      }, "#", id), businessKey && _react.default.createElement("div", null, "Company ", businessKey), region && _react.default.createElement("div", null, "Region ", region), createDate && _react.default.createElement("div", null, "Created ", (0, _date.formatDate)(createDate)), _react.default.createElement(_Ticker.default, {
        intervalTime: 60000,
        RenderComponent: ({
          time
        }) => _react.default.createElement(DurationComponent, {
          time: time,
          startDate: createDate,
          endDate: endDate,
          label: "Duration"
        })
      })),
      text: _react.default.createElement(CommentsStyled, null, this.renderLastComments(this.state.comments)),
      actions: _reactDeviceDetect.isBrowser ? this.buildDesktopMenu(tasks, commentCount, this.props.data.id) : this.buildMobileMenu(tasks, commentCount, this.props.data.id, isMenuOpen),
      raised: true
    })));
  }

}

;

var _default = (0, _reactRedux.connect)(state => ({
  message: state.chat.messages
}), {
  loadMessenger: _messengerActions.loadMessenger
})(DashboardProcessListItem);

exports.default = _default;