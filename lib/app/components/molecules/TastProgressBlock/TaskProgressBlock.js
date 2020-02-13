"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _AboxProgressBar = _interopRequireDefault(require("app/components/molecules/ProgressBar/AboxProgressBar"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TaskProgressWrapper = _styledComponents.default.div.withConfig({
  displayName: "TaskProgressBlock__TaskProgressWrapper",
  componentId: "sc-1h8ob94-0"
})(["display:inline-block;margin:1rem;"]);

const TaskProgressInner = _styledComponents.default.div.withConfig({
  displayName: "TaskProgressBlock__TaskProgressInner",
  componentId: "sc-1h8ob94-1"
})(["display:flex;align-items:center;"]);

const AvatarLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "TaskProgressBlock__AvatarLink",
  componentId: "sc-1h8ob94-2"
})(["margin:0;padding:0;line-height:0;"]);
const TaskProgressAvatar = (0, _styledComponents.default)(_Avatar.default).withConfig({
  displayName: "TaskProgressBlock__TaskProgressAvatar",
  componentId: "sc-1h8ob94-3"
})(["margin:0 .5rem 0 0;"]); // We can use our Label component here, but It does nto show the the pointer cursor inside the link, this is why we are using span

const TasksLabel = _styledComponents.default.span.withConfig({
  displayName: "TaskProgressBlock__TasksLabel",
  componentId: "sc-1h8ob94-4"
})(["display:inline-block;width:9rem;font-size:0.9rem;font-weight:500;text-transform:capitalize;color:", ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"], ({
  theme
}) => theme.base.textColor);

const TaskInfo = _styledComponents.default.div.withConfig({
  displayName: "TaskProgressBlock__TaskInfo",
  componentId: "sc-1h8ob94-5"
})(["width:10rem;"]);

const TaskLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "TaskProgressBlock__TaskLink",
  componentId: "sc-1h8ob94-6"
})(["text-decoration:none;"]);
/**
 *
 */

class TaskProgressBlock extends _react.PureComponent {
  /**
   * constructor - description
   *
   * @param  {type} props: Object description
   * @return {type}               description
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "showTeamModal", () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }));
    });

    this.state = {
      showModal: false
    };
  }
  /**
   *
   */


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const {
      name,
      variable,
      id,
      assignee,
      endDate,
      priority
    } = this.props;
    const {
      completion
    } = variable || {};
    return _react.default.createElement(TaskProgressWrapper, null, _react.default.createElement(TaskProgressInner, null, assignee && assignee.id ? _react.default.createElement(AvatarLink, {
      to: `/people/${assignee.id}/summary`
    }, _react.default.createElement(TaskProgressAvatar, {
      title: assignee.name || 'No Name',
      name: assignee && assignee.name || 'No Name',
      src: assignee.image,
      size: "lg"
    })) : _react.default.createElement(TaskProgressAvatar, {
      title: assignee && assignee.name || 'No Name',
      name: assignee && assignee.name || 'No Name',
      src: assignee && assignee.image,
      size: "lg"
    }), _react.default.createElement(TaskLink, {
      to: `/abox/task/${id}`
    }, _react.default.createElement(TaskInfo, null, _react.default.createElement(TasksLabel, {
      title: name
    }, name || 'No Name'), _react.default.createElement(_AboxProgressBar.default, {
      value: completion || 0,
      priority: priority,
      disabled: !!endDate
    })))));
  }

}

var _default = TaskProgressBlock;
exports.default = _default;