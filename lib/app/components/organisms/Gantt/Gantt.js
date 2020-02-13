"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debouncePromise = _interopRequireDefault(require("debounce-promise"));

var _moment = _interopRequireDefault(require("moment"));

var _dhtmlxGantt = require("dhtmlx-gantt");

require("dhtmlx-gantt/codebase/ext/dhtmlxgantt_smart_rendering");

require("dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip");

var _reactDeviceDetect = require("react-device-detect");

var _formatter = require("app/utils/gantt/formatter");

var _utils = require("app/utils/gantt/utils");

var _templates = require("app/utils/gantt/templates");

require("./Gantt.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ganttHeight = _reactDeviceDetect.isMobile ? `calc(${window.innerHeight}px - 170px)` : '100%';

class Gantt extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      tasks: {
        data: [],
        links: []
      }
    });

    _defineProperty(this, "ganttContainer", void 0);

    _defineProperty(this, "ganttEvents", void 0);

    _defineProperty(this, "taskWithPredecessor", []);

    _defineProperty(this, "currentTask", void 0);

    _defineProperty(this, "loadData", (0, _debouncePromise.default)((start, end) => {
      const {
        filterBy,
        orderBy,
        loadData
      } = this.props;
      const promise = loadData({
        filterBy,
        orderBy
      }, start, end);
      const isPromise = promise instanceof Promise;

      if (!isPromise) {
        throw new Error('The loadData function MUST return a Promise.');
      }

      return promise;
    }, 400));
  }

  setGanttRange(start, end) {
    _dhtmlxGantt.gantt.config.start_date = new Date(start);
    _dhtmlxGantt.gantt.config.end_date = new Date(end);
  }

  setGanttRangeOnZoom(range) {
    const today = (0, _moment.default)();
    let startDate, endDate;

    switch (range) {
      case 'days':
        startDate = today.clone().startOf('date');
        endDate = startDate.clone().add(1, 'd').subtract(1, 's');
        break;

      case 'weeks':
        startDate = today.clone().startOf('isoWeek');
        endDate = today.clone().endOf('isoWeek');
        break;

      case 'months':
        startDate = today.clone().startOf('month');
        endDate = today.clone().endOf('month');
        break;

      case 'years':
        startDate = today.clone().startOf('year');
        endDate = today.clone().endOf('year');
        break;

      default:
        break;
    } // set start end date of gantt chart


    this.setGanttRange(startDate, endDate);
  }

  setNewGanttRange(op, units, key) {
    // convert m = minutes to M for months
    const newKey = key === 'm' ? key.toUpperCase() : key;
    const startDate = (0, _moment.default)(_dhtmlxGantt.gantt.config.start_date);
    const endDate = (0, _moment.default)(_dhtmlxGantt.gantt.config.end_date); // add and subract dates based on moment.add().subtract()
    // $FlowFixMe

    startDate[op](units, newKey); // $FlowFixMe

    endDate[op](units, newKey); // set start end date of gantt chart

    this.setGanttRange(startDate, endDate);

    _dhtmlxGantt.gantt.render();
  }

  viewNextDates() {
    const key = this.props.zoom.charAt(0);
    this.setNewGanttRange('add', '1', key);
    this.refreshData();
  }

  viewPreviousDates() {
    const key = this.props.zoom.charAt(0);
    this.setNewGanttRange('subtract', '1', key);
    this.refreshData();
  }

  viewToday() {
    const zoom = 'days';
    this.setGanttZoom(zoom);
    this.setGanttRangeOnZoom(zoom);
    this.refreshData();

    _dhtmlxGantt.gantt.render();
  }

  setGanttZoom(range) {
    switch (range) {
      case 'days':
        _dhtmlxGantt.gantt.config.scale_height = 90;
        _dhtmlxGantt.gantt.config.scale_unit = 'day';
        _dhtmlxGantt.gantt.config.date_scale = '%j %F %Y, %l';
        _dhtmlxGantt.gantt.config.subscales = [{
          unit: 'hour',
          step: 1,
          date: '%g %a',
          template: _templates.hourScaleTemplate
        }];
        break;

      case 'weeks':
        _dhtmlxGantt.gantt.config.scale_height = 90;
        _dhtmlxGantt.gantt.config.scale_unit = 'day';
        _dhtmlxGantt.gantt.config.date_scale = '%j %F %Y, %l';
        _dhtmlxGantt.gantt.config.subscales = [{
          unit: 'hour',
          step: 3,
          date: '%g %a',
          template: _templates.hourScaleTemplate
        }];
        break;

      case 'months':
        _dhtmlxGantt.gantt.config.scale_height = 90;
        _dhtmlxGantt.gantt.config.scale_unit = 'month';
        _dhtmlxGantt.gantt.config.date_scale = '%F %Y';
        _dhtmlxGantt.gantt.config.subscales = [{
          unit: 'day',
          step: 1,
          template: _templates.dayScaleTemplate
        }];
        break;

      case 'years':
        _dhtmlxGantt.gantt.config.scale_height = 130;
        _dhtmlxGantt.gantt.config.scale_unit = 'year';
        _dhtmlxGantt.gantt.config.date_scale = '%Y';
        _dhtmlxGantt.gantt.config.subscales = [{
          unit: 'month',
          step: 1,
          template: _templates.monthScaleTemplate
        }, {
          unit: 'week',
          step: 1,
          template: _templates.weekScaleTemplate
        }];
        break;

      default:
        break;
    }
  }

  updateTask(task) {
    if (!task) return;
    this.refreshData();
  }

  refreshData() {
    this.loadData(new Date(_dhtmlxGantt.gantt.config.start_date), new Date(_dhtmlxGantt.gantt.config.end_date));
  }

  initGanttConfig() {
    _dhtmlxGantt.gantt.config.drag_resize = true;
    _dhtmlxGantt.gantt.config.drag_progress = false;
    _dhtmlxGantt.gantt.config.drag_links = false;
    _dhtmlxGantt.gantt.config.drag_move = true;
    _dhtmlxGantt.gantt.config.row_height = 60;
    _dhtmlxGantt.gantt.config.task_height = 44;
    _dhtmlxGantt.gantt.config.link_line_width = 1;
    _dhtmlxGantt.gantt.config.details_on_dblclick = false;
    _dhtmlxGantt.gantt.config.fit_tasks = true;
    _dhtmlxGantt.gantt.config.smart_rendering = true;
    _dhtmlxGantt.gantt.config.min_column_width = 70;
    _dhtmlxGantt.gantt.config.scale_height = 90;
    _dhtmlxGantt.gantt.config.show_progress = true; // if mobile hide grid

    if (_reactDeviceDetect.isMobile) _dhtmlxGantt.gantt.config.show_grid = false;
    _dhtmlxGantt.gantt.config.columns = [{
      name: 'text',
      label: 'Task Name',
      'width': '*',
      tree: true,
      template: _templates.gridTaskTemplate,
      min_width: 170,
      resize: true
    }, {
      name: 'start_date',
      label: 'Start Date',
      'width': 100,
      align: 'center',
      template: _templates.gridTaskStartDateTemplate
    }, {
      name: 'end_date',
      label: 'Due Date',
      'width': 100,
      align: 'center',
      template: _templates.gridTaskEndDateTemplate
    }];
  }

  initTemplateConfig() {
    // set task content
    _dhtmlxGantt.gantt.templates.task_text = (start, end, task) => {
      return (0, _templates.taskTemplate)(task);
    }; // set tooltip content


    _dhtmlxGantt.gantt.templates.tooltip_text = (start, end, task) => {
      return (0, _templates.tooltipTemplate)(task);
    }; // set task class based on priority


    _dhtmlxGantt.gantt.templates.task_class = (start, end, task) => {
      const isClosed = task.endDate ? true : false;
      if (isClosed) return 'closed';

      switch (task.priority) {
        case 5:
          return 'info';

        case 4:
          return 'success';

        case 3:
          return 'alert';

        case 2:
          return 'warning';

        case 1:
          return 'danger';

        default:
          break;
      }
    };
  }

  initGanttEvents() {
    const {
      onAfterTaskDrag,
      onTaskClick
    } = this.props;
    let clickTimeout = null;
    this.ganttEvents = [];
    this.ganttEvents.push(_dhtmlxGantt.gantt.attachEvent('onGanttReady', () => {
      const tooltips = _dhtmlxGantt.gantt.ext.tooltips;
      tooltips.tooltip.setViewport(_dhtmlxGantt.gantt.$task_data);
    }));
    this.ganttEvents.push(_dhtmlxGantt.gantt.attachEvent('onTaskClick', (id, e) => {
      // handle if single or double click (cannot run onTaskClick and onTaskDblClick at the same time)
      if (clickTimeout !== null) {
        window.open(`/#/abox/task/${id}`, '_blank');
        clearTimeout(clickTimeout);
        clickTimeout = null;
      } else {
        clickTimeout = setTimeout(() => {
          const task = _dhtmlxGantt.gantt.getTask(id);

          onTaskClick(id, task);

          if (clickTimeout) {
            clearTimeout(clickTimeout);
          }

          clickTimeout = null;
        }, 300);
      }
    }));
    this.ganttEvents.push(_dhtmlxGantt.gantt.attachEvent('onBeforeTaskDrag', (id, mode, e) => {
      const modes = _dhtmlxGantt.gantt.config.drag_mode;
      if (!(mode === modes.move || mode === modes.resize)) return true;
      this.currentTask = { ..._dhtmlxGantt.gantt.getTask(id)
      }; // if task is closed disable drag

      if (this.currentTask.endDate) return false;
      return true;
    }));
    this.ganttEvents.push(_dhtmlxGantt.gantt.attachEvent('onAfterTaskDrag', (id, mode, e) => {
      const task = _dhtmlxGantt.gantt.getTask(id);

      if ((0, _utils.validateTaskStartDate)(task, this.taskWithPredecessor)) {
        onAfterTaskDrag(id, mode, task);
      } else {
        task.start_date = new Date(this.currentTask.start_date);
        task.end_date = new Date(this.currentTask.end_date);

        _dhtmlxGantt.gantt.updateTask(id);

        const predecessorTask = (0, _utils.getLatestPredecessor)(task, this.taskWithPredecessor);

        if (predecessorTask) {
          const {
            name,
            dueDate
          } = predecessorTask.predecessor;
          const formattedDueDate = (0, _moment.default)(dueDate).format('DD-MM-YYYY HH:mm');
          this.props.showToastr({
            severity: 'warn',
            detail: `Update not possible due to conflicting due date for a preceeding task (${name}, ${formattedDueDate}). Kindly check your task relationship`
          });
        }
      }
    }));
  }

  componentDidUpdate(prevProps) {
    const {
      orderBy,
      filterBy,
      records,
      zoom
    } = this.props; // rerender gantt

    _dhtmlxGantt.gantt.render(); // reset size of gantt chart


    setTimeout(() => {
      _dhtmlxGantt.gantt.setSizes();
    }, 1000);

    if (orderBy !== prevProps.orderBy || filterBy !== prevProps.filterBy) {
      this.refreshData();
    }

    if (records !== prevProps.records) {
      // format the tasks and lines for the gantt chart
      const formattedTasks = (0, _formatter.tasksFormatter)(records);
      const {
        lines,
        tasksWithPredecessor
      } = (0, _formatter.linesFormatter)(records);
      const formattedLinks = lines;
      this.taskWithPredecessor = tasksWithPredecessor;
      this.setState({
        tasks: {
          data: formattedTasks,
          links: formattedLinks
        }
      }, () => {
        _dhtmlxGantt.gantt.clearAll();

        _dhtmlxGantt.gantt.parse(this.state.tasks);
      });
    }

    if (zoom !== prevProps.zoom) {
      this.setGanttZoom(zoom);
      this.setGanttRangeOnZoom(zoom);
      this.refreshData();
    }
  }

  componentDidMount() {
    this.initGanttConfig();
    this.initTemplateConfig();
    this.initGanttEvents();
    const {
      zoom
    } = this.props;
    this.setGanttZoom(zoom);
    this.setGanttRangeOnZoom(zoom);

    _dhtmlxGantt.gantt.init(this.ganttContainer);

    _dhtmlxGantt.gantt.parse(this.state.tasks);

    this.refreshData();
  }

  componentWillUnmount() {
    while (this.ganttEvents.length) _dhtmlxGantt.gantt.detachEvent(this.ganttEvents.pop());
  }

  render() {
    return _react.default.createElement("div", {
      className: 'dark',
      ref: input => {
        this.ganttContainer = input;
      },
      style: {
        width: '100%',
        height: ganttHeight
      }
    });
  }

}

exports.default = Gantt;

_defineProperty(Gantt, "propTypes", {
  zoom: _propTypes.default.string,
  resize: _propTypes.default.bool,
  loadData: _propTypes.default.func.isRequired,
  onAfterTaskDrag: _propTypes.default.func.isRequired,
  onTaskClick: _propTypes.default.func.isRequired,
  showToastr: _propTypes.default.func.isRequired,
  filterBy: _propTypes.default.array,
  orderBy: _propTypes.default.array,
  records: _propTypes.default.array
});

_defineProperty(Gantt, "defaultProps", {
  zoom: 'weeks',
  resize: false
});