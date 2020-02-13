"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _History = _interopRequireDefault(require("store/History"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

var _aboxConfig = require("app/config/aboxConfig");

var _lo = require("app/utils/lo/lo");

var _date = require("app/utils/date/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the form to a add a Thing
 */
class AddSubtask extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "onFormSubmit", e => {
      e.preventDefault();
      const subtask = { ...this.state
      };
      const {
        addSubtask,
        refreshList,
        closeAddSubtask,
        taskId
      } = this.props;
      addSubtask(String(taskId), subtask).then(response => {
        if (response instanceof Error) return;
        refreshList();
        closeAddSubtask();
        this.props.onSubtaskAdded && this.props.onSubtaskAdded(subtask);
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

    _defineProperty(this, "onDropdownChange", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        [name]: {
          id: value
        }
      });
    });

    const {
      name: _name,
      login,
      id
    } = props.userProfile;
    const user = {
      id,
      name: _name,
      login
    };
    this.state = {
      name: '',
      description: '',
      category: null,
      owner: user,
      assignee: user,
      dueDate: null,
      bpmnVariables: {
        startDate: null
      }
    };
  }
  /**
   * Handle the form submit event.
   * @param e the form submit SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */


  /**
   * @override
   */
  render() {
    // Vars used in our form
    const {
      isLoading
    } = this.props;
    const {
      name,
      priority,
      description,
      assignee,
      owner,
      dueDate,
      bpmnVariables: {
        startDate
      }
    } = this.state;
    return _react.default.createElement(_Form.default, {
      loading: isLoading,
      onSubmit: this.onFormSubmit
    }, _react.default.createElement(_Field.default, {
      label: "Name",
      name: "name",
      value: name,
      placeholder: "Enter the name",
      onChange: this.onChange,
      pattern: ".{3,50}",
      required: true,
      title: "3 to 50 characters"
    }), _react.default.createElement(_Field.default, {
      label: "Description",
      name: "description",
      value: description,
      placeholder: "Enter the description",
      onChange: this.onChange,
      required: true
    }), _react.default.createElement(_DateTimePickerModal.default, {
      label: "Start Date",
      name: "bpmnVariables.startDate",
      minDate: new Date(),
      onChange: this.onChange,
      value: startDate,
      placeholder: "Enter the start date"
    }), _react.default.createElement(_DateTimePickerModal.default, {
      label: "Due Date",
      name: "dueDate",
      minDate: new Date(),
      onChange: this.onChange,
      value: dueDate,
      placeholder: "Enter the due date"
    }), _react.default.createElement(_UserAutocomplete.default, {
      name: "assignee",
      label: "Assignee",
      value: assignee,
      placeholder: "Select Assignee",
      onChange: this.onChange
    }), _react.default.createElement(_UserAutocomplete.default, {
      name: "owner",
      label: "Owner",
      value: owner,
      placeholder: "Select Owner",
      onChange: this.onChange
    }), _react.default.createElement(_Dropdown.default, {
      label: "Priority",
      name: "priority",
      placeholder: "Select Priority",
      onChange: this.onChange,
      value: priority,
      options: _aboxConfig.PRIORITY_OPTIONS
    }), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
      type: "button",
      onClick: _History.default.pushBack
    }, "Cancel"), _react.default.createElement(_Button.default, {
      type: "submit",
      color: "primary"
    }, "Submit")));
  }

}

_defineProperty(AddSubtask, "propTypes", {
  addSubtask: _propTypes.default.func.isRequired,
  refreshList: _propTypes.default.func.isRequired,
  taskId: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool,
  userProfile: _propTypes.default.object,
  onSubtaskAdded: _propTypes.default.func
});

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile
}), null)(AddSubtask);

exports.default = _default;