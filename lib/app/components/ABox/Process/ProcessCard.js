"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _WidgetHeader = _interopRequireDefault(require("app/components/atoms/WidgetHeader/WidgetHeader"));

var _AboxProgressBar = _interopRequireDefault(require("app/components/molecules/ProgressBar/AboxProgressBar"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _WidgetFooter = _interopRequireDefault(require("app/components/atoms/WidgetFooter/WidgetFooter"));

var _TaskProgressBlock = _interopRequireDefault(require("app/components/molecules/TastProgressBlock/TaskProgressBlock"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _AboxTeam = _interopRequireDefault(require("app/components/ABox/Team/AboxTeam"));

var _ProcessCardSummaryItemContainer = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessCardSummaryItemContainer"));

var _PopupMenu = _interopRequireDefault(require("app/components/molecules/PopupMenu/PopupMenu"));

var _ProcessIcon = _interopRequireDefault(require("app/components/atoms/Icon/ProcessIcon"));

var _taskActions = require("store/actions/abox/taskActions");

var _processActions = require("store/actions/abox/processActions");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CardStyle = _styledComponents.default.div.withConfig({
  displayName: "ProcessCard__CardStyle",
  componentId: "sc-1o9s7lu-0"
})(["display:flex;flex-direction:column;align-items:stretch;position:relative;border-radius:0.2rem;margin:1rem 1rem 0 1rem;background:", ";box-shadow:", ";", ""], ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.shadow.z1, ({
  disabled
}) => disabled ? 'opacity: 0.1;' : '');

const TitleWrapper = _styledComponents.default.div.withConfig({
  displayName: "ProcessCard__TitleWrapper",
  componentId: "sc-1o9s7lu-1"
})(["white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"]);

const ProgressWrapper = _styledComponents.default.div.withConfig({
  displayName: "ProcessCard__ProgressWrapper",
  componentId: "sc-1o9s7lu-2"
})(["padding:0 1rem 1rem 1rem;"]);

const TaskBlocksWrapper = _styledComponents.default.div.withConfig({
  displayName: "ProcessCard__TaskBlocksWrapper",
  componentId: "sc-1o9s7lu-3"
})(["display:flex;white-space:nowrap;overflow:hidden;overflow-x:auto;padding:0 1rem 0 1rem;"]);

const Footer = (0, _styledComponents.default)(_WidgetFooter.default).withConfig({
  displayName: "ProcessCard__Footer",
  componentId: "sc-1o9s7lu-4"
})(["& .FooterIcons{display:flex;flex-grow:1;justify-content:space-between;@media (min-width:", "){flex-grow:0;margin-left:auto;width:40%;}}"], ({
  theme
}) => theme.media.md);

const HrStyled = _styledComponents.default.div.withConfig({
  displayName: "ProcessCard__HrStyled",
  componentId: "sc-1o9s7lu-5"
})(["width:100%;border:0;position:relative;height:.2rem;&:before{content:'';height:.2rem;position:absolute;bottom:50%;border-bottom:1px #5d5d5d solid;width:100%;z-index:0;}"]);

const HeaderActionPopoverContent = ({
  onCancel
}) => _react.default.createElement(_MenuItem.default, {
  name: "Cancel Process",
  icon: "cancel",
  onClick: onCancel
});
/**
 *
 */


class ProcessCard extends _react.PureComponent {
  /**
   * Define our prop-types for A-Box card
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "getTeamMembersLentgh", (teamMembers = []) => teamMembers.filter(member => (0, _lo.get)(member, 'user') || (0, _lo.get)(member, 'group')).length);

    _defineProperty(this, "toggleTeam", index => this.setState({
      openedTeam: !this.state.openedTeam
    }, this.props.forceUpdateGrid));

    _defineProperty(this, "onDeleteTeamMember", member => {
      const {
        profile
      } = this.props;

      if (member.id === profile.id && !profile.isAdmin) {
        this.setState({
          openedTeam: false
        }, this.props.resetView);
      }
    });

    _defineProperty(this, "cancelProcess", () => this.props.cancelProcess(this.props.data.id));

    _defineProperty(this, "openMessenger", id => this.props.loadMessenger(this.props.data.id, 'process'));

    _defineProperty(this, "getProcessSummaryData", (0, _memoizeOne.default)((definition, variables) => {
      return definition.filter(item => item && !item.hide).map(({
        name,
        label,
        format
      }) => {
        const value = format ? variables[name] && (0, _moment.default)(variables[name]).format(format) : variables[name];
        return {
          key: label || 'No Label',
          value: value || 'No Value'
        };
      });
    }));

    _defineProperty(this, "buildTasks", (0, _memoizeOne.default)((tasks, createdBy) => _react.default.createElement(TaskBlocksWrapper, null, (tasks || []).map((task, index) => _react.default.createElement(_TaskProgressBlock.default, _extends({
      key: `${task.label}_${index}`
    }, task, {
      owner: createdBy
    }))))));

    _defineProperty(this, "reloadDetails", () => {
      this.props.loadProcessDetails(this.props.data.id);
    });

    this.state = {
      commentCount: (0, _lo.get)(props.data, 'comments.length') || 0,
      teamMembersCount: this.getTeamMembersLentgh((0, _lo.get)(props.data, 'teamMembers')),
      attachmentsCount: (0, _lo.get)(props.data, 'attachments.length') || 0,
      openedTeam: false
    };
    props.loadProcessTasks(props.data.id);
  }

  componentDidUpdate(prevProps) {
    const {
      data,
      message,
      tasks,
      details
    } = this.props;

    if (details !== prevProps.details && (0, _lo.get)(details, 'id') === data.id) {
      const teamMembersCount = this.getTeamMembersLentgh((0, _lo.get)(details, 'teamMembers'));
      const prevTeamMembersCount = this.getTeamMembersLentgh((0, _lo.get)(prevProps, 'details.teamMembers'));

      if (teamMembersCount !== prevTeamMembersCount) {
        this.setState({
          teamMembersCount
        });
      }
    }

    if (message !== prevProps.message && message.id === data.id) {
      const commentCount = (0, _lo.get)(message, 'comments.length') || 0;
      const prevCommentCount = (0, _lo.get)(prevProps, 'message.comments.length') || 0;
      const attachmentsCount = (0, _lo.get)(message, 'attachments.length') || 0;

      if (commentCount !== prevCommentCount) {
        this.setState({
          commentCount,
          attachmentsCount
        });
      }
    }

    if (prevProps.tasks !== tasks) {
      this.props.resizeRow();
    }
  }

  /**
   * Render our abox card
   */
  render() {
    const {
      openedTeam,
      commentCount,
      teamMembersCount,
      attachmentsCount
    } = this.state;
    const {
      data,
      isDeleted,
      tasks,
      isTaskLoading,
      details
    } = this.props;
    const {
      name = 'No Name',
      summary = {},
      id,
      createdBy
    } = data;
    const {
      variables,
      definition = []
    } = summary;
    const processSummary = this.getProcessSummaryData(definition, variables);
    const icon = (0, _lo.get)(data, 'processDefinition.deployedModel.modelData.icon') || 'arrange-bring-to-front';
    const {
      progress,
      priority
    } = data.variables || {};
    return _react.default.createElement(CardStyle, {
      disabled: isDeleted
    }, _react.default.createElement(_WidgetHeader.default, null, _react.default.createElement(_ProcessIcon.default, {
      name: icon,
      disabled: data.endDate,
      priority: priority
    }), _react.default.createElement(TitleWrapper, null, _react.default.createElement(_Title.default, {
      as: "h2"
    }, _react.default.createElement(_ProcessLink.default, {
      id: id
    }, name)), _react.default.createElement(_ProcessLink.default, {
      id: id
    }, _react.default.createElement(_Title.default, {
      as: "h4"
    }, `#${id}`))), _react.default.createElement(_HeaderActions.default, null, _react.default.createElement(_PopupMenu.default, {
      placement: "top right",
      content: _react.default.createElement(HeaderActionPopoverContent, {
        onCancel: this.cancelProcess
      })
    }, _react.default.createElement(_ButtonIcon.default, {
      icon: "dots-vertical"
    })))), _react.default.createElement(ProgressWrapper, null, _react.default.createElement(_AboxProgressBar.default, {
      value: progress || 0,
      priority: priority,
      disabled: !!data.endDate
    })), _react.default.createElement(_ProcessCardSummaryItemContainer.default, {
      summary: processSummary
    }), _react.default.createElement(HrStyled, null), isTaskLoading ? _react.default.createElement(_Loader.default, null) : this.buildTasks(tasks, createdBy), _react.default.createElement(HrStyled, null), _react.default.createElement(Footer, null, _react.default.createElement("div", {
      className: "FooterIcons"
    }, _react.default.createElement(_ButtonIcon.default, {
      icon: "account-multiple",
      onClick: this.toggleTeam,
      label: teamMembersCount.toString()
    }), _react.default.createElement(_Modal.default, {
      title: "Team",
      open: openedTeam,
      onToggle: this.toggleTeam,
      disableBack: true
    }, _react.default.createElement(_AboxTeam.default, {
      type: "process",
      details: data.id === (0, _lo.get)(details, 'id') ? details : data,
      onDelete: this.onDeleteTeamMember,
      reloadDetails: this.reloadDetails
    })), _react.default.createElement(_ButtonIcon.default, {
      icon: "messenger",
      type: "af",
      title: "Open messenger",
      onClick: this.openMessenger,
      label: commentCount.toString()
    }), _react.default.createElement(_ProcessLink.default, {
      id: id,
      path: "attachments"
    }, _react.default.createElement(_ButtonIcon.default, {
      icon: "paperclip",
      label: attachmentsCount.toString()
    })))));
  }

}

_defineProperty(ProcessCard, "propTypes", {
  data: _propTypes.default.object,
  index: _propTypes.default.number,
  resetView: _propTypes.default.func,
  forceUpdateGrid: _propTypes.default.func,
  profile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)((state, props) => {
  const processId = props.data.id;
  const tasks = state.abox.process.tasks[processId] || {};
  return {
    message: state.chat.messages,
    isTaskLoading: tasks.isLoading,
    tasks: tasks.data,
    details: state.abox.process.details.data,
    profile: state.user.profile
  };
}, {
  loadMessenger: _messengerActions.loadMessenger,
  loadProcessTasks: _taskActions.loadProcessTasks,
  loadProcessDetails: _processActions.loadProcessDetails
})(ProcessCard);

exports.default = _default;