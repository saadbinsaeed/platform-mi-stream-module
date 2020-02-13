"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _recompose = require("recompose");

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _AboxAttachmentsCard = _interopRequireDefault(require("app/components/ABox/Cards/AboxAttachmentsCard"));

var _AboxCommentsCard = _interopRequireDefault(require("app/components/ABox/Cards/AboxCommentsCard"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

var _TaskLink = _interopRequireDefault(require("app/components/atoms/Link/TaskLink"));

var _ProcessSlider = _interopRequireDefault(require("app/components/ABox/Process/ProcessSlider"));

var _AboxTeamCard = _interopRequireDefault(require("app/components/ABox/Cards/AboxTeamCard"));

var _AboxProgressBar = _interopRequireDefault(require("app/components/molecules/ProgressBar/AboxProgressBar"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _History = _interopRequireDefault(require("store/History"));

var _lo = require("app/utils/lo/lo");

var _processActions = require("store/actions/abox/processActions");

var _taskActions = require("store/actions/abox/taskActions");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _utils = require("app/utils/utils");

var _aboxConfig = require("app/config/aboxConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CustomIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "ProcessSummaryTab__CustomIcon",
  componentId: "ygxmy5-0"
})(["cursor:default;"]);
const RowStyled = (0, _styledComponents.default)(_reactStyledFlexboxgrid.Row).withConfig({
  displayName: "ProcessSummaryTab__RowStyled",
  componentId: "ygxmy5-1"
})(["margin-bottom:1rem;"]);
const TasksCard = (0, _recompose.onlyUpdateForKeys)(['process', 'tasks'])(props => {
  return (props.tasks || []).slice(0, 10).map(({
    id,
    name,
    variable,
    assignee,
    priority,
    endDate
  }) => _react.default.createElement(RowStyled, {
    key: id,
    title: `Assigned by ${assignee && assignee.name || 'none'} and has priority ${(0, _aboxConfig.normalizePriorityValue)(priority)}`
  }, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1
  }, _react.default.createElement(CustomIcon, {
    name: "task-list",
    type: "af"
  })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 11,
    sm: 11,
    md: 11,
    lg: 11
  }, _react.default.createElement(_TaskLink.default, {
    id: id,
    noDecoration: true
  }, _react.default.createElement(_Text.default, null, name || 'No Name'), _react.default.createElement(_AboxProgressBar.default, {
    value: variable && variable.completion,
    priority: priority,
    disabled: !!endDate
  })))));
});
const ParentCard = (0, _recompose.onlyUpdateForKeys)(['parent'])(props => {
  const initiatedBy = (0, _lo.get)(props, 'parent.initiatedBy');

  if (!initiatedBy || !initiatedBy.id) {
    return _react.default.createElement("div", null, "This process has no parent.");
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(_Label.default, {
    text: "ID"
  }), _react.default.createElement(_ProcessLink.default, {
    id: initiatedBy.id,
    noDecoration: true
  }, "#", initiatedBy.id)), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(_Label.default, {
    text: "Name"
  }), initiatedBy.name || 'none'), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(_Label.default, {
    text: "Parent Definition"
  }), (0, _lo.get)(initiatedBy, 'processDefinition.name') || 'none'));
});
const ActivityCard = (0, _recompose.onlyUpdateForKeys)(['children'])(({
  children
}) => {
  if (!(children || []).length) {
    return 'This process has no sub-processes.';
  }

  return (children || []).slice(0, 10).map(({
    id,
    name,
    variables,
    endDate,
    createdBy
  }) => {
    const {
      progress,
      priority
    } = variables || {};
    return _react.default.createElement(RowStyled, {
      key: id,
      title: `Assigned by ${createdBy && createdBy.name || 'none'} and has priority ${(0, _aboxConfig.normalizePriorityValue)(priority)}`
    }, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1
    }, _react.default.createElement(CustomIcon, {
      name: "task-list",
      type: "af"
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 11,
      sm: 11,
      md: 11,
      lg: 11
    }, _react.default.createElement(_ProcessLink.default, {
      id: id,
      noDecoration: true
    }, _react.default.createElement(_Text.default, null, name || 'No Name'), _react.default.createElement(_AboxProgressBar.default, {
      value: progress || 0,
      priority: priority,
      disabled: !!endDate
    }))));
  });
});
/**
 *
 */

class ProcessSummaryTab extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "showTeamTab", () => {
      _History.default.push(`/abox/process/${this.props.details.id}/team`);
    });

    _defineProperty(this, "loadMessenger", () => this.props.loadMessenger(this.props.details.id, 'process'));

    props.loadProcessDetails(this.props.details.id);
    props.loadProcessTasks(this.props.details.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.details !== this.props.details) {
      this.props.loadProcessTasks(this.props.details.id);
    }
  }

  /**
   * @override
   */
  render() {
    const {
      details,
      children,
      tasks,
      profileId
    } = this.props;
    const {
      name,
      teamMembers,
      attachments,
      variables,
      comments,
      status,
      summary,
      endDate
    } = details;
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_ProcessSlider.default, {
      summary: summary
    }), _react.default.createElement(_Container.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4
    }, _react.default.createElement(_AboxTeamCard.default, {
      teamMembers: teamMembers,
      action: this.showTeamTab
    }), _react.default.createElement(_AboxCommentsCard.default, {
      profileId: profileId,
      comments: comments,
      loadMessenger: this.loadMessenger
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4
    }, _react.default.createElement(_AboxAttachmentsCard.default, {
      attachments: attachments
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Parent",
      description: _react.default.createElement(ParentCard, {
        parent: status
      })
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4
    }, _react.default.createElement(_Card.default, {
      title: "Tasks",
      headerActions: _react.default.createElement(_reactRouterDom.Link, {
        to: "tasks"
      }, _react.default.createElement(_Icon.default, {
        name: "window-maximize",
        size: "sm"
      })),
      description: this.props.isTasksLoading ? _react.default.createElement(_Loader.default, null) : _react.default.createElement(TasksCard, {
        process: {
          name,
          variables,
          endDate
        },
        tasks: tasks
      })
    }), _react.default.createElement(_Card.default, {
      title: "Sub-Processes",
      headerActions: _react.default.createElement(_reactRouterDom.Link, {
        to: "sub-processes"
      }, _react.default.createElement(_Icon.default, {
        name: "window-maximize",
        size: "sm"
      })),
      description: _react.default.createElement(ActivityCard, {
        children: children
      })
    })))));
  }

}

_defineProperty(ProcessSummaryTab, "propTypes", {
  details: _propTypes.default.object,
  children: _propTypes.default.array,
  isTasksLoading: _propTypes.default.bool,
  tasks: _propTypes.default.array,
  loadProcessTasks: _propTypes.default.func,
  loadProcessDetails: _propTypes.default.func
});

_defineProperty(ProcessSummaryTab, "defaultProps", {
  children: [],
  tasks: [],
  isTasksLoading: false
});

var _default = (0, _reactRedux.connect)(state => {
  const id = (0, _utils.getStr)(state.abox.process.details.data, 'id') || '_';
  const tasks = state.abox.process.tasks[id] || {};
  return {
    profileId: state.user.profile.id,
    details: state.abox.process.details.data,
    children: state.abox.process.children.data,
    isTasksLoading: tasks.isLoading,
    tasks: tasks.data
  };
}, {
  loadProcessTasks: _taskActions.loadProcessTasks,
  loadProcessDetails: _processActions.loadProcessDetails,
  loadMessenger: _messengerActions.loadMessenger
})(ProcessSummaryTab);

exports.default = _default;