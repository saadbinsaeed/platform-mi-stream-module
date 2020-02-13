"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

var _Calendar = _interopRequireDefault(require("app/components/molecules/Calendar/Calendar"));

var _taskActions = require("store/actions/abox/taskActions");

var _utils = require("app/utils/utils");

var _bpmnEngineUtils = require("app/utils/bpmn/bpmnEngineUtils");

var _aboxConfig = require("app/config/aboxConfig");

var _lo = require("app/utils/lo/lo");

var _filterConditions = require("app/utils/static/filter-conditions");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _appActions = require("store/actions/app/appActions");

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const CalendarWrapper = _styledComponents.default.div.withConfig({
  displayName: "AboxCalendar__CalendarWrapper",
  componentId: "sc-1x4eowz-0"
})(["overflow:auto;height:100%;max-height:calc(100vh - 147px);@media (max-width:", " ){max-height:calc(100vh - 200px);}"], ({
  theme
}) => theme.media.sm);
/**
 * Renders the view to display the task calendar.
 */


let AboxCalendar = (_dec = (0, _decoratorUtils.memoize)(_utils.shallowEquals), _dec2 = (0, _decoratorUtils.memoize)(), _dec3 = (0, _decoratorUtils.memoize)(), (_class = (_temp = class AboxCalendar extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      start: null,
      end: null
    });

    _defineProperty(this, "filterDefinitions", [{
      field: 'assignee.id',
      type: 'userTypeahead',
      properties: {
        label: 'Assignee',
        name: 'assigneeId'
      },
      condition: '=',
      sort: false
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
      },
      sort: false
    }, {
      field: 'id',
      type: 'text',
      properties: {
        label: 'ID',
        name: 'id'
      },
      condition: '=',
      sort: false
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
      condition: '=',
      sort: false
    }, {
      field: 'startDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Created date',
        name: 'startDate'
      },
      sort: false
    }, {
      field: 'endDate',
      type: 'dateTimeRange',
      properties: {
        label: 'End date',
        name: 'endDate'
      },
      sort: false
    }, {
      field: 'taskStatus.lastUpdate',
      type: 'dateTimeRange',
      properties: {
        label: 'Last updated date',
        name: 'taskStatusLastUpdate'
      },
      sort: false
    }]);

    _defineProperty(this, "searchBar", ['name', 'id']);

    _defineProperty(this, "defaultFilters", {
      involvement: 'assignee'
    });
  }

  componentDidMount() {
    this.props.setHeader({
      title: 'A-Box Calendar '
    });
  }

  buildEvents(tasks) {
    return tasks.filter(task => task).map(task => {
      const {
        dueDate,
        bpmnVariables,
        name,
        ...event
      } = task;
      let end = (0, _utils.datefy)(dueDate);
      const variables = (0, _bpmnEngineUtils.bmpnVariablesToObject)(bpmnVariables);
      let start = (0, _utils.getDate)(variables, 'startDate');

      if (!start && end) {
        start = (0, _moment.default)(end).startOf('day').toDate();
        end = (0, _moment.default)(end).endOf('day').toDate();
      }

      if (start && !end) {
        start = (0, _moment.default)(start).startOf('day').toDate();
        end = (0, _moment.default)(start).endOf('day').toDate();
      }

      return { ...event,
        title: name || 'No Name',
        start,
        end
      };
    }).filter(({
      start,
      end
    }) => start && end);
  }

  goToTask({
    id
  }) {
    this.props.history.push(`/abox/task/${id}`);
  }

  buildEventProp({
    endDate,
    priority
  }, start, end, isSelected) {
    const {
      theme
    } = this.props;
    const style = {};
    const priorityColor = endDate ? 'disabled' : (0, _aboxConfig.getPriorityColor)(priority);
    const backgroundColor = String((0, _lo.get)(theme, `priorityColors.${priorityColor}`));

    if (backgroundColor) {
      style.backgroundColor = `${backgroundColor}90`;
    }

    return {
      style
    };
  }

  resetView(start, end, filters) {
    const {
      activitiId,
      groups
    } = this.props.userProfile;
    const filterBy = [];
    (filters || []).forEach(filter => {
      const {
        or,
        field,
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
      } else {
        filterBy.push(filter);
      }
    });
    const {
      userProfile: {
        id
      }
    } = this.props;

    if (start && end) {
      this.props.loadCalendarTasks(id, start, end, {
        filterBy
      });
    }
  }

  onDateRangeChange(filterBy) {
    return ({
      start,
      end
    }) => {
      this.setState({
        start,
        end
      }, () => this.resetView(start, end, filterBy));
    };
  }

  buildCalendar(events) {
    return filterBy => {
      const {
        start,
        end
      } = this.state;
      this.resetView(start, end, filterBy);
      return _react.default.createElement(CalendarWrapper, null, _react.default.createElement(_Calendar.default, {
        calendarId: 'abox',
        isLoading: this.props.isLoading,
        events: events,
        eventPropGetter: this.buildEventProp,
        onSelectEvent: this.goToTask,
        onDateRangeChange: this.onDateRangeChange(filterBy)
      }));
    };
  }
  /**
   * @override
   */


  render() {
    const {
      tasks
    } = this.props;
    const events = this.buildEvents(tasks);
    return _react.default.createElement(_Filters.default, {
      id: "AboxCalendarFilters",
      filterDefinitions: this.filterDefinitions,
      searchBar: this.searchBar,
      defaultFilters: this.defaultFilters
    }, this.buildCalendar(events));
  }

}, _temp), (_applyDecoratedDescriptor(_class.prototype, "buildEvents", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildEvents"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "goToTask", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "goToTask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildEventProp", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "buildEventProp"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetView", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "resetView"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onDateRangeChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onDateRangeChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildCalendar", [_decoratorUtils.bind, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "buildCalendar"), _class.prototype)), _class));

var _default = (0, _styledComponents.withTheme)((0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile,
  tasks: state.abox.task.calendar.records,
  isLoading: state.abox.task.calendar.isLoading
}), {
  loadCalendarTasks: _taskActions.loadCalendarTasks,
  setHeader: _appActions.setHeader
})(AboxCalendar));

exports.default = _default;