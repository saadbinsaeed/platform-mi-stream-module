"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _aboxConfig = require("app/config/aboxConfig");

var _moment = _interopRequireDefault(require("moment"));

var _lo = require("app/utils/lo/lo");

var _date = require("app/utils/date/date");

var _utils = require("app/utils/utils");

var _datatableUtils = require("app/utils/datatable/datatableUtils");

var _bpmnEngineUtils = require("app/utils/bpmn/bpmnEngineUtils");

var _ical = require("app/utils/formatter/ical.formatter");

var _env = require("app/utils/env");

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _AboxProgressSlider = _interopRequireDefault(require("app/components/atoms/ProgressSlider/AboxProgressSlider"));

var _style = require("app/components/ABox/Timeline/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A modal for search and add team members
 */
class TimelineTaskModal extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      name: '',
      description: '',
      assignee: null,
      dueDate: null,
      priority: null,
      bpmnVariables: {
        startDate: null
      },
      progress: 0
    });

    _defineProperty(this, "initialState", {});

    _defineProperty(this, "initialTask", {});

    _defineProperty(this, "onSubmit", event => {
      event.preventDefault();
      const {
        task,
        updateTimelineTask,
        updateTask,
        setTaskAssignee
      } = this.props;
      const data = { ...this.state,
        id: task.id
      };
      const dataAssignee = data.assignee ? {
        id: data.assignee.id,
        login: data.assignee.login
      } : null;
      const initialAssignee = this.initialTask.assignee ? {
        id: this.initialTask.assignee.id,
        login: this.initialTask.assignee.login
      } : null; // remove assignee and move it to a different dispatch

      delete data.assignee;
      updateTask(data).then(response => {
        if (response instanceof Error) return;

        if (dataAssignee !== initialAssignee) {
          let assigneeSame = false;

          if (dataAssignee !== null && initialAssignee !== null) {
            assigneeSame = (0, _utils.shallowEquals)(dataAssignee, initialAssignee);
          }

          if (!assigneeSame) {
            setTaskAssignee(data.id, dataAssignee).then(response => {
              if (response instanceof Error) return;
              updateTimelineTask(data);
            });
            return;
          }
        }

        updateTimelineTask(data);
      });
    });

    _defineProperty(this, "onChange", event => {
      const {
        name,
        value
      } = event.target || event;
      let next = { ...this.state
      };

      if (name === 'bpmnVariables.startDate') {
        const start = (0, _date.setSeconds)(value, 0, 0);
        const due = (0, _date.setSeconds)(this.state.dueDate, 0, 0);

        if (start && due && due <= start) {
          next.dueDate = new Date(start.getTime() + 3600000);
        }
      } else if (name === 'dueDate') {
        const start = (0, _date.setSeconds)(this.state.bpmnVariables.startDate, 0, 0);
        const due = (0, _date.setSeconds)(value, 0, 0);

        if (start && due && start >= due) {
          next = (0, _lo.set)(next, 'bpmnVariables.startDate', new Date(due.getTime() - 3600000));
        }
      }

      this.setState((0, _lo.set)(next, name, value));
    });

    _defineProperty(this, "onExport", () => {
      const {
        task: {
          id,
          startDate,
          dueDate,
          name,
          description
        }
      } = this.props;
      const dateIcalFormat = 'YYYYMMDDTHHmmss';
      const rootUrl = _env.isDev ? 'https://affectli.dev.mi-c3.com' : 'https://affectli.mi-c3.com';
      const icalData = {
        id: id,
        stamp: (0, _moment.default)(new Date()).format(dateIcalFormat),
        start: (0, _moment.default)(startDate).format(dateIcalFormat),
        end: (0, _moment.default)(dueDate).format(dateIcalFormat),
        summary: name,
        description: description,
        url: `${rootUrl}/#/abox/task/${id}`
      };
      const formattedIcalData = (0, _ical.formatIcal)(icalData); // download as file

      (0, _datatableUtils.saveText)(name, formattedIcalData, '.ics');
    });

    this.initialState = { ...this.state
    };
  }

  componentDidUpdate(prevProps) {
    const {
      task
    } = this.props;

    if (prevProps.task !== task) {
      if (task !== null) {
        const {
          name,
          description,
          assignee,
          dueDate,
          bpmnVariables,
          priority,
          variable: {
            completion
          }
        } = task;
        const bpmnVars = (0, _bpmnEngineUtils.bmpnVariablesToObject)(bpmnVariables);
        this.setState({
          name: name,
          description: description,
          assignee: assignee,
          dueDate: dueDate,
          priority: priority,
          progress: completion,
          bpmnVariables: {
            startDate: bpmnVars.startDate
          }
        });
        this.initialTask = task;
      } else {
        this.setState(this.initialState);
        this.initialTask = {};
      }
    }
  }

  render() {
    const {
      isOpen,
      isLoading,
      closeModal,
      task
    } = this.props;
    const {
      name,
      priority,
      description,
      assignee,
      dueDate,
      bpmnVariables: {
        startDate
      },
      progress
    } = this.state;
    const disabled = task && !!task.endDate;
    const hasSubtasks = task && !!(task._childrenCount && task._childrenCount.length);
    return _react.default.createElement(_Modal.default, {
      title: "Update Task",
      open: isOpen,
      onToggle: closeModal,
      footer: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Button.default, {
        onClick: closeModal
      }, "Cancel"), _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
        color: "primary",
        onClick: this.onExport
      }, "Export"), task && !task.endDate && _react.default.createElement(_Button.default, {
        color: "primary",
        onClick: this.onSubmit
      }, "Submit")))
    }, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), _react.default.createElement(_Form.default, {
      loading: isLoading,
      onSubmit: this.onSubmit
    }, _react.default.createElement(_Field.default, {
      label: "Name",
      name: "name",
      value: name,
      placeholder: "Enter the name",
      onChange: this.onChange,
      pattern: ".{3,50}",
      required: true,
      title: "3 to 50 characters",
      disabled: disabled
    }), _react.default.createElement(_Field.default, {
      label: "Description",
      name: "description",
      value: description,
      placeholder: "Enter the description",
      onChange: this.onChange,
      disabled: disabled,
      required: true
    }), _react.default.createElement(_DateTimePickerModal.default, {
      label: "Start Date",
      name: "bpmnVariables.startDate",
      onChange: this.onChange,
      value: startDate,
      placeholder: "Enter the start date",
      readOnly: disabled
    }), _react.default.createElement(_DateTimePickerModal.default, {
      label: "Due Date",
      name: "dueDate",
      onChange: this.onChange,
      value: dueDate,
      placeholder: "Enter the due date",
      readOnly: disabled
    }), _react.default.createElement(_UserAutocomplete.default, {
      name: "assignee",
      label: "Assignee",
      value: assignee,
      placeholder: "Select Assignee",
      onChange: this.onChange,
      disabled: disabled
    }), _react.default.createElement(_Dropdown.default, {
      label: "Priority",
      name: "priority",
      placeholder: "Select Priority",
      onChange: this.onChange,
      value: priority,
      options: _aboxConfig.PRIORITY_OPTIONS,
      disabled: disabled
    }), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(_style.Label, null, "Progress ", progress, "%"), hasSubtasks && _react.default.createElement("div", null, _react.default.createElement("small", null, '(progress based on the subtasks\' progress)')), _react.default.createElement(_AboxProgressSlider.default, {
      name: "progress",
      value: progress,
      onChange: this.onChange,
      priority: priority,
      disabled: disabled || hasSubtasks
    }))));
  }

}

_defineProperty(TimelineTaskModal, "propTypes", {
  closeModal: _propTypes.default.func.isRequired,
  updateTask: _propTypes.default.func.isRequired,
  setTaskAssignee: _propTypes.default.func.isRequired,
  updateTimelineTask: _propTypes.default.func.isRequired,
  isOpen: _propTypes.default.bool,
  isLoading: _propTypes.default.bool,
  task: _propTypes.default.object
});

var _default = TimelineTaskModal;
exports.default = _default;