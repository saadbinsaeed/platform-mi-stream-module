"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _aboxConfig = require("app/config/aboxConfig");

var _filterConditions = require("app/utils/static/filter-conditions");

var _taskActions = require("store/actions/abox/taskActions");

var _aboxActions = require("store/actions/abox/aboxActions");

var _appActions = require("store/actions/app/appActions");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _TimelineToolbar = _interopRequireDefault(require("app/components/ABox/Timeline/TimelineToolbar"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _style = require("app/components/ABox/Timeline/style");

var _TimelineTaskModal = _interopRequireDefault(require("./TimelineTaskModal"));

var _ReloadCountdown = _interopRequireDefault(require("app/components/molecules/ReloadCountdown/ReloadCountdown"));

var _Gantt = _interopRequireDefault(require("app/components/organisms/Gantt/Gantt"));

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let Timeline = (_class = (_temp = _class2 = class Timeline extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      isModalOpen: false,
      isLoadingUpdateTask: false,
      selectedTask: null,
      disableCountdown: false,
      countdownSeconds: 180
    });

    _defineProperty(this, "searchBar", ['name', 'id']);

    _defineProperty(this, "defaultFilters", {
      status: 'is null',
      involvement: 'assignee'
    });

    _defineProperty(this, "defaultOrder", [{
      field: 'taskStatus.lastUpdate',
      direction: 'desc'
    }]);

    _defineProperty(this, "filterDefinitions", [{
      field: 'assignee.id',
      type: 'userTypeahead',
      properties: {
        label: 'Assignee',
        name: 'assigneeId'
      },
      condition: '='
    }, {
      field: 'involvement',
      type: 'typeahead',
      properties: {
        label: 'My involvement',
        name: 'involvement',
        options: _filterConditions.involvementConditions
      },
      sort: false
    }, {
      field: 'name',
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      }
    }, {
      field: 'id',
      type: 'text',
      properties: {
        label: 'ID',
        name: 'id'
      },
      condition: '='
    }, {
      field: 'endDate',
      type: 'typeahead',
      properties: {
        label: 'Status',
        name: 'status',
        options: [{
          value: 'is null',
          label: 'Open'
        }, {
          value: 'is not null',
          label: 'Closed'
        }]
      },
      sort: false
    }, {
      field: 'priority',
      type: 'typeahead',
      properties: {
        label: 'Priority',
        name: 'priority',
        options: _aboxConfig.PRIORITY_OPTIONS
      },
      condition: '='
    }, {
      field: 'process.processDefinition.name',
      type: 'processTypeTypeahead',
      properties: {
        label: 'Process Type',
        name: 'processDefinitionName'
      },
      condition: '='
    }, {
      field: 'startDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Created date',
        name: 'startDate'
      }
    }, {
      field: 'bpmnVariables.startDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Start date',
        name: 'bpmnVariablesStartDate'
      }
    }, {
      field: 'dueDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Due date',
        name: 'dueDate'
      }
    }, {
      field: 'endDate',
      type: 'dateTimeRange',
      properties: {
        label: 'End date',
        name: 'endDate'
      }
    }, {
      field: 'taskStatus.lastUpdate',
      type: 'dateTimeRange',
      properties: {
        label: 'Last updated date',
        name: 'taskStatusLastUpdate'
      }
    }]);

    _defineProperty(this, "ganttRef", void 0);

    _defineProperty(this, "loadTasks", (0, _memoizeOne.default)((options, start, end) => {
      const filterBy = [];
      const {
        activitiId,
        groups
      } = this.props.userProfile;
      let useFilterOverRange = false;
      (options.filterBy || []).forEach(filter => {
        const {
          or,
          field,
          op,
          value
        } = filter;

        if (or) {
          filterBy.push(filter);
        } else if (field === 'involvement') {
          switch (value) {
            case 'assignee':
              filterBy.push({
                field: 'assignee.activitiId',
                op: '=',
                value: activitiId
              });
              break;

            case 'owner':
              filterBy.push({
                field: 'owner.activitiId',
                op: '=',
                value: activitiId
              });
              break;

            case 'teamMember':
              filterBy.push({
                or: [{
                  field: 'teamMembers.user.activitiId',
                  op: '=',
                  value: activitiId
                }, {
                  field: 'teamMembers.group.id',
                  op: 'in',
                  value: groups
                }]
              });
              break;

            default:
          }
        } else if (field.startsWith('bpmnVariables')) {
          const name = field.split('.')[1];
          filterBy.push({
            field: 'bpmnVariables.name',
            op: '=',
            value: name
          }, {
            field: 'bpmnVariables.text',
            op,
            value
          }); // if start date is filtered prioritize this filter over range

          if (name === 'startDate') {
            useFilterOverRange = true;
          }
        } else {
          // if due date is filtered prioritize this filter over range
          if (field === 'dueDate') {
            useFilterOverRange = true;
          }

          filterBy.push(filter);
        }
      }); // set default range filter to null and use date filters instead

      if (useFilterOverRange) {
        return this.props.loadTimelineTasks({ ...options,
          filterBy
        });
      } else {
        return this.props.loadTimelineTasks({ ...options,
          filterBy
        }, start, end);
      }
    }));

    this.ganttRef = _react.default.createRef();
  }

  onChangeRange(e) {
    this.props.setTimelineRange(e.target.value);
  }

  onPrevious() {
    this.ganttRef.current.viewPreviousDates();
  }

  onNext() {
    this.ganttRef.current.viewNextDates();
  }

  onToday() {
    if (this.props.range === 'days') {
      this.ganttRef.current.viewToday();
    } else {
      this.props.setTimelineRange('days');
    }
  }

  updateTaskDate(id, mode, task) {
    let taskData = {
      id: id
    };

    switch (mode) {
      case 'move':
      case 'resize':
        taskData = { ...taskData,
          bpmnVariables: {
            startDate: new Date(task.start_date)
          },
          dueDate: new Date(task.end_date)
        };
        break;

      default:
        break;
    }

    this.props.updateTask(taskData).then(response => {
      if (response instanceof Error) return;
      this.ganttRef.current.updateTask(task);
    });
  }

  openTaskModal(id, task) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      selectedTask: task
    });
  }

  closeTaskModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      selectedTask: null
    });
  }

  updateTimelineTask(task) {
    this.ganttRef.current.updateTask(task);
    this.closeTaskModal();
  }

  refreshAction() {
    this.ganttRef.current.refreshData();
  }

  componentDidMount() {
    this.props.setHeader({
      title: 'Timeline (Beta)'
    });
  }

  render() {
    const {
      records,
      isLoading,
      totalRecords,
      updateTask,
      setTaskAssignee,
      showToastr,
      range
    } = this.props;
    const {
      isLoadingUpdateTask,
      disableCountdown,
      countdownSeconds
    } = this.state;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_style.FiltersTimeline, {
      id: "TimeLineFilters",
      filterDefinitions: this.filterDefinitions,
      searchBar: this.searchBar,
      defaultFilters: this.defaultFilters,
      defaultOrder: this.defaultOrder,
      leftToolbar: _react.default.createElement(_TimelineToolbar.default, {
        ganttRef: this.ganttRef,
        onChangeRange: this.onChangeRange,
        onPrevious: this.onPrevious,
        onNext: this.onNext,
        onToday: this.onToday,
        range: range,
        totalRecords: totalRecords
      }),
      rightToolbar: _react.default.createElement(_ReloadCountdown.default, {
        disableCountdown: disableCountdown || isLoading,
        seconds: countdownSeconds,
        format: "minutes",
        action: this.refreshAction
      })
    }, (filterBy, orderBy) => {
      return _react.default.createElement(_PageTemplate.default, {
        title: "Dashboard"
      }, _react.default.createElement(_ContentArea.default, null, (isLoading || isLoadingUpdateTask) && _react.default.createElement(_Loader.default, {
        absolute: true
      }), _react.default.createElement(_Gantt.default, {
        ref: this.ganttRef,
        zoom: range,
        resize: this.props.isNavOpen,
        loadData: this.loadTasks,
        filterBy: filterBy,
        orderBy: orderBy,
        records: records,
        onAfterTaskDrag: this.updateTaskDate,
        onTaskClick: this.openTaskModal,
        showToastr: showToastr
      })));
    }), _react.default.createElement(_TimelineTaskModal.default, {
      task: this.state.selectedTask,
      isOpen: this.state.isModalOpen,
      closeModal: this.closeTaskModal,
      updateTask: updateTask,
      setTaskAssignee: setTaskAssignee,
      updateTimelineTask: this.updateTimelineTask
    }));
  }

}, _defineProperty(_class2, "propTypes", {
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  totalRecords: _propTypes.default.number,
  userProfile: _propTypes.default.object,
  loadTimelineTasks: _propTypes.default.func.isRequired,
  updateTask: _propTypes.default.func.isRequired,
  setHeader: _propTypes.default.func
}), _defineProperty(_class2, "defaultProps", {
  isLoading: false,
  records: [],
  totalRecords: 0
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "onChangeRange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onChangeRange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPrevious", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onPrevious"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onNext", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onNext"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onToday", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onToday"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateTaskDate", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "updateTaskDate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openTaskModal", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "openTaskModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeTaskModal", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "closeTaskModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateTimelineTask", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "updateTimelineTask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "refreshAction", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "refreshAction"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.task.timeline.isLoading,
  records: state.abox.task.timeline.records,
  totalRecords: state.abox.task.timeline.count,
  userProfile: state.user.profile,
  isNavOpen: state.app.isNavOpen,
  range: state.abox.timeline.range
}), {
  loadTimelineTasks: _taskActions.loadTimelineTasks,
  updateTask: _taskActions.updateTask,
  setTaskAssignee: _taskActions.setTaskAssignee,
  setHeader: _appActions.setHeader,
  showToastr: _appActions.showToastr,
  setTimelineRange: _aboxActions.setTimelineRange
})(Timeline);

exports.default = _default;