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

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ResizableListItem = _interopRequireDefault(require("app/components/molecules/VirtualList/ResizableListItem"));

var _AboxCircularProgressBar = _interopRequireDefault(require("app/components/atoms/CircularProgressBar/AboxCircularProgressBar"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _date = require("app/utils/date/date");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _lo = require("app/utils/lo/lo");

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { bmpnVariablesToObject } from 'app/utils/bpmn/bpmnEngineUtils';
const CardContainer = _styledComponents.default.div.withConfig({
  displayName: "DashboardTaskListItem__CardContainer",
  componentId: "sc-10u3j4w-0"
})(["width:100%;max-width:1000px;margin:0 auto;"]);

const CommentsStyled = _styledComponents.default.div.withConfig({
  displayName: "DashboardTaskListItem__CommentsStyled",
  componentId: "sc-10u3j4w-1"
})(["color:", ";font-style:italic;max-width:30%;"], ({
  theme
}) => `${theme.base.textColor}55`);
/**
 * A single task item
 */


class DashboardTaskListItem extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "openMessenger", id => this.props.loadMessenger(this.props.data.id, 'task'));

    _defineProperty(this, "renderLastComments", (0, _memoizeOne.default)(comments => (0, _stringUtils.cut)(String((0, _lo.get)(comments, '[0].message.plainMessage', 'No comments')), 35)));

    const {
      data: {
        comments: _comments
      }
    } = props;
    this.state = {
      commentCount: (_comments || []).length,
      comments: _comments
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
        startDate: created,
        priority,
        variable,
        name,
        id,
        dueDate,
        assignee,
        endDate
      },
      index,
      resize,
      style
    } = this.props;
    const {
      completion
    } = variable || {};
    return _react.default.createElement(_ResizableListItem.default, {
      style: style,
      key: index,
      index: index,
      resize: resize,
      padding: 15
    }, resizeRow => _react.default.createElement(CardContainer, null, _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_AboxCircularProgressBar.default, {
        percentage: completion,
        priority: priority,
        disabled: !!endDate
      }),
      title: _react.default.createElement(_reactRouterDom.Link, {
        to: `/abox/task/${id}`
      }, name || 'No Name'),
      subTitle: _react.default.createElement(_react.Fragment, null, "#", id, created && _react.default.createElement("div", null, "Created ", (0, _date.formatDate)(created)), dueDate && _react.default.createElement("div", null, "Due ", (0, _date.formatDate)(dueDate)), assignee && _react.default.createElement("div", null, "Assignee ", _react.default.createElement(_PeopleLink.default, {
        id: assignee.id
      }, assignee.name))),
      text: _react.default.createElement(CommentsStyled, null, this.renderLastComments(this.state.comments)),
      actions: _react.default.createElement(_ButtonIcon.default, {
        type: "af",
        icon: 'messenger',
        onClick: this.openMessenger,
        label: this.state.commentCount.toString()
      }),
      raised: true
    })));
  }

}

;

var _default = (0, _reactRedux.connect)(state => ({
  message: state.chat.messages
}), {
  loadMessenger: _messengerActions.loadMessenger
})(DashboardTaskListItem);

exports.default = _default;