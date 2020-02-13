"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _TaskFormTab = _interopRequireDefault(require("app/containers/Abox/TaskView/TaskFormTab"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _TaskAboutTab = _interopRequireDefault(require("app/containers/Abox/TaskView/TaskAboutTab"));

var _AboxAttachments = _interopRequireDefault(require("app/components/ABox/Attachments/AboxAttachments"));

var _AboxTeam = _interopRequireDefault(require("app/components/ABox/Team/AboxTeam"));

var _TaskSubTasksTab = _interopRequireDefault(require("app/containers/Abox/TaskView/TaskSubTasksTab"));

var _TaskProcessMapTab = _interopRequireDefault(require("app/containers/Abox/TaskView/TaskProcessMapTab"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _TaskTimelineTab = _interopRequireDefault(require("app/containers/Abox/TaskView/TaskTimelineTab"));

var _aboxConfig = require("app/config/aboxConfig");

var _lo = require("app/utils/lo/lo");

var _date = require("app/utils/date/date");

var _bpmnEngineUtils = require("app/utils/bpmn/bpmnEngineUtils");

var _taskActions = require("store/actions/abox/taskActions");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _legacyActions = require("store/actions/legacy/legacyActions");

var _utils = require("app/utils/utils");

var _RelationshipsTab = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipsTab"));

var _AddRelationship = _interopRequireDefault(require("app/containers/Entities/Relationships/AddRelationship"));

var _dataTableIds = require("app/config/dataTableIds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TaskStatus = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "TaskRoute__TaskStatus",
  componentId: "sc-1feilit-0"
})(["font-weight:400;text-transform:capitalize;"]);
/**
 *
 */

class TaskRoute extends _react.PureComponent {
  /**
   *
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "buildInfo", (0, _memoizeOne.default)(details => {
      const ownerName = (0, _lo.get)(details, 'owner.name', '');
      const startDate = (0, _date.formatDate)((0, _lo.get)(details, 'startDate', ''));
      const status = (0, _lo.get)(details, 'variable.taskStatus.status', '');
      return [{
        key: 'Owner',
        value: ownerName
      }, {
        key: 'Created Date',
        value: startDate
      }, {
        key: 'Status',
        value: _react.default.createElement(TaskStatus, null, status)
      }];
    }));

    _defineProperty(this, "loadDetails", () => {
      return this.props.loadTaskDetails(this.id);
    });

    _defineProperty(this, "updateField", event => {
      const {
        name,
        value
      } = event.target || event;
      const {
        setTaskAssignee,
        setTaskOwner,
        setTaskPriority,
        reloadIframe
      } = this.props;
      const {
        loadDetails
      } = this;

      switch (name) {
        case 'assignee':
          setTaskAssignee(String(this.id), value && {
            id: value.id
          }).then(() => {
            reloadIframe();
            loadDetails();
          });
          break;

        case 'owner':
          setTaskOwner(String(this.id), value && {
            id: value.id
          }).then(loadDetails);
          break;

        case 'priority':
          value && setTaskPriority(this.id, value).then(loadDetails);
          break;

        case 'bpmnVariables.startDate':
          {
            const task = {
              id: this.id,
              bpmnVariables: {
                startDate: value
              }
            };
            const start = (0, _date.setSeconds)((0, _utils.datefy)(value), 0, 0);
            const due = (0, _date.setSeconds)((0, _utils.getDate)(this.props.details, 'dueDate'), 0, 0);

            if (start && due && due <= start) {
              task.dueDate = new Date(start.getTime() + 3600000);
            }

            this.props.updateTask(task).then(loadDetails);
            break;
          }

        case 'dueDate':
          {
            const task = {
              id: this.id,
              dueDate: value
            };
            const bpmnVariables = (0, _bpmnEngineUtils.bmpnVariablesToObject)(this.props.details.bpmnVariables);
            const start = (0, _date.setSeconds)((0, _utils.getDate)(bpmnVariables, 'startDate'), 0, 0);
            let due = (0, _date.setSeconds)((0, _utils.datefy)(value), 0, 0);
            due = due && new Date(due);
            due && due.setSeconds(0, 0);

            if (start && due && start >= due) {
              task.bpmnVariables = {
                startDate: new Date(due.getTime() - 3600000)
              };
            }

            this.props.updateTask(task).then(loadDetails);
            break;
          }

        default:
          {
            let task = {
              id: this.id
            };
            task = (0, _lo.set)(task, name, typeof value === 'string' ? value.trim() : value);
            this.props.updateTask(task).then(loadDetails);
          }
      }
    });

    _defineProperty(this, "handleCloseTask", () => this.props.closeTask(this.id).then(response => {
      if (response instanceof Error) return;
      this.props.loadTaskDetails(this.id);
    }));

    _defineProperty(this, "buildAboxAttachments", (0, _memoizeOne.default)(routeProps => _react.default.createElement(_AboxAttachments.default, _extends({}, routeProps, {
      type: "task"
    }))));

    _defineProperty(this, "buildAboxTeam", (0, _memoizeOne.default)((details, reloadDetails) => _react.default.createElement(_AboxTeam.default, {
      reloadDetails: reloadDetails,
      details: details,
      type: "task"
    })));

    _defineProperty(this, "buildTaskFormTab", (0, _memoizeOne.default)((details, updateField) => _react.default.createElement(_TaskFormTab.default, {
      details: details,
      updateField: updateField
    })));

    _defineProperty(this, "buildTaskAboutTab", (0, _memoizeOne.default)((details, updateField) => _react.default.createElement(_TaskAboutTab.default, {
      details: details,
      updateField: updateField
    })));

    _defineProperty(this, "buildMenuItems", (0, _memoizeOne.default)((hasActions, handleCloseTask) => hasActions && _react.default.createElement(_MenuItem.default, {
      name: "Close task",
      icon: "check-circle",
      onClick: handleCloseTask
    })));

    _defineProperty(this, "getHeaderStyle", (0, _memoizeOne.default)(headerBackgroundColor => ({
      background: headerBackgroundColor
    })));

    _defineProperty(this, "buildSubtaskTab", (0, _memoizeOne.default)(() => _react.default.createElement(_TaskSubTasksTab.default, {
      onSubtaskAdded: this.loadDetails
    })));

    this.id = (0, _utils.getStr)(props, 'match.params.id') || '';

    if (this.id) {
      this.props.loadTaskDetails(this.id);
    }
  }

  componentDidUpdate(prevProps) {
    this.id = (0, _utils.getStr)(this.props, 'match.params.id') || '';

    if (!prevProps.outdated && this.props.outdated) {
      this.props.loadTaskDetails(this.id);
    }
  }

  /**
   * @override
   */
  render() {
    const {
      details,
      isLoading,
      match,
      loadMessenger,
      theme,
      loadTaskDetails
    } = this.props;

    if (!isLoading && !details) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `Task. (ID:${this.id})`
      });
    }

    const areDetailsWrong = this.id !== (0, _utils.getStr)(details, 'id');
    const loading = isLoading || areDetailsWrong;
    const {
      name,
      variable,
      endDate,
      priority,
      form
    } = details || {};
    const infoArray = this.buildInfo(details);
    const isClosed = !!endDate;
    const priorityColor = endDate ? 'disabled' : (0, _aboxConfig.getPriorityColor)(priority);
    const headerBackgroundColor = `linear-gradient(45deg, ${theme.priorityGradients[priorityColor][0]}, ${theme.priorityGradients[priorityColor][1]})`;
    const hasForm = form && form.id;
    const updateField = this.updateField;
    return _react.default.createElement(_react.Fragment, null, loading && _react.default.createElement(_Loader.default, {
      backdrop: true,
      absolute: true
    }), !areDetailsWrong && details && _react.default.createElement(_PageTemplate.default, {
      title: `${name || 'No Name'} ${isClosed ? '(closed)' : ''}`,
      subTitle: `#${this.id}`,
      pillText: `${variable && Math.floor(Number(variable.completion)) || 0}%`,
      info: infoArray,
      actions: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ButtonIcon.default, {
        icon: "messenger",
        type: "af",
        title: "Open messenger",
        onClick: () => loadMessenger(this.id, 'task')
      })),
      menuItems: this.buildMenuItems(!hasForm && !isClosed, this.handleCloseTask),
      color: this.getHeaderStyle(headerBackgroundColor),
      overflowHidden: true
    }, _react.default.createElement(_TabRow.default, {
      color: headerBackgroundColor
    }, hasForm && _react.default.createElement(_TabItem.default, {
      label: "Form",
      to: `/abox/task/${this.id}/form`
    }), _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/abox/task/${this.id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "Sub-Tasks",
      to: `/abox/task/${this.id}/subtasks`
    }), _react.default.createElement(_TabItem.default, {
      label: "Team",
      to: `/abox/task/${this.id}/team`
    }), _react.default.createElement(_TabItem.default, {
      label: "Relationships",
      to: `/abox/task/${this.id}/relationships`
    }), _react.default.createElement(_TabItem.default, {
      label: "Attachments",
      to: `/abox/task/${this.id}/attachments`
    }), _react.default.createElement(_TabItem.default, {
      label: "Process Map",
      to: `/abox/task/${this.id}/process-map`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/abox/task/${this.id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/`,
      exact: true,
      render: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `${match.url}/${hasForm ? 'form' : 'about'}`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/form',
      render: () => hasForm ? this.buildTaskFormTab(details, updateField) : _react.default.createElement(_reactRouterDom.Redirect, {
        to: `${match.url}/about`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/about',
      render: () => this.buildTaskAboutTab(details, updateField)
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/subtasks',
      render: () => this.buildSubtaskTab()
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/team',
      render: () => this.buildAboxTeam(details, loadTaskDetails)
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/attachments',
      render: props => this.buildAboxAttachments(props)
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/task/:entityId/relationships/:type2/add`,
      exact: true,
      render: ({
        match: {
          params
        },
        location
      }) => _react.default.createElement(_AddRelationship.default, _extends({}, params, {
        location: location,
        type1: 'task'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/relationships',
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/abox/task/${this.id}/relationships/thing`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:entityId/relationships/:type2',
      render: ({
        match: {
          params
        }
      }) => _react.default.createElement(_RelationshipsTab.default, _extends({}, params, {
        dataTableId: _dataTableIds.ABOX_TASKS_RELATIONSHIPS_DATA_TABLE,
        baseUri: `/abox/task/${this.id}/relationships`,
        type1: 'task'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/process-map',
      component: _TaskProcessMapTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/task/:id/history',
      render: () => _react.default.createElement(_TaskTimelineTab.default, {
        id: this.id
      })
    }))));
  }

}

_defineProperty(TaskRoute, "propTypes", {
  details: _propTypes.default.object,
  isLoading: _propTypes.default.bool,
  loadTaskDetails: _propTypes.default.func,
  updateTask: _propTypes.default.func,
  setTaskAssignee: _propTypes.default.func,
  setTaskOwner: _propTypes.default.func,
  setTaskPriority: _propTypes.default.func,
  reloadIframe: _propTypes.default.func
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.task.details.isLoading,
  details: state.abox.task.details.data,
  outdated: state.abox.task.detailsOutdated,
  message: state.chat.messages
}), {
  loadTaskDetails: _taskActions.loadTaskDetails,
  closeTask: _taskActions.closeTask,
  updateTask: _taskActions.updateTask,
  setTaskAssignee: _taskActions.setTaskAssignee,
  setTaskOwner: _taskActions.setTaskOwner,
  setTaskPriority: _taskActions.setTaskPriority,
  loadMessenger: _messengerActions.loadMessenger,
  reloadIframe: _legacyActions.reloadIframe
})((0, _styledComponents.withTheme)(TaskRoute));

exports.default = _default;