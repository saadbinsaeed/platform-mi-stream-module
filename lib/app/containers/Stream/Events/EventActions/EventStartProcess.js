"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _eventsActions = require("store/actions/stream/eventsActions");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the button and the dialog to start one or more processes related to this event.
 */
class EventStartProcess extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "buildCheckboxes", (0, _fastMemoize.default)((processDefinitions, processes) => processDefinitions.map(def => _react.default.createElement(_CheckBox.default, {
      key: def.start_message,
      name: def.start_message,
      label: def.process_name,
      type: "checkbox",
      checked: processes[def.start_message],
      onChange: this.handleChange
    }))));

    this.state = {
      visible: false,
      processes: {}
    };
    this.showDialog = this.showDialog.bind(this);
    this.startProcess = this.startProcess.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * @override
   * @param nextProps the next props
   * @param nextState the next state
   * @return {boolean} true if the component have to call the render function.
   */


  shouldComponentUpdate(nextProps, nextState) {
    const {
      eventId,
      processDefinitions
    } = nextProps;
    const {
      visible,
      processes
    } = nextState;
    const props = this.props;
    const state = this.state;
    return props.eventId !== eventId || props.processDefinitions !== processDefinitions || state.visible !== visible || state.processes !== processes;
  }
  /**
   * @override
   * @param nextProps the propertiesd that the Component will receive.
   */


  componentWillReceiveProps(nextProps) {
    if (!nextProps.lastActionError && nextProps.lastActionType === _eventsActions.EVENT_START_PROCESS) {
      this.closeDialog();
    }
  }
  /**
   * Shows the dialog
   */


  showDialog(event) {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      visible: true
    });
  }
  /**
   * Toggle checkbox
   */


  handleChange(event) {
    const name = event.target.name;
    this.setState((0, _lo.set)(this.state, `processes.${name}`, !this.state.processes[name]));
  }
  /**
   * starts the processes related to this event
   */


  startProcess() {
    const processes = this.state.processes;
    const promises = Object.keys(processes).map(startMessage => {
      if (!processes[startMessage]) {
        return null;
      }

      return this.props.eventStartProcess(startMessage, {
        eventId: this.props.eventId
      });
    }).filter(promise => promise);

    if (promises.length) {
      Promise.all(promises).then(() => {
        this.props.postAction && this.props.postAction();
      });
    }
  }
  /**
   * Close the dialog
   */


  closeDialog() {
    this.setState({
      visible: false
    });
  }

  /**
   * @override
   * @return {XML}
   */
  render() {
    const {
      processes,
      visible
    } = this.state;
    const {
      eventId,
      processDefinitions,
      color
    } = this.props;
    const startProcessDisabled = !Object.keys(processes).find(key => processes[key]);
    const checkboxes = this.buildCheckboxes(processDefinitions, processes);
    const title = `Start new process for Event ${eventId}`;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ButtonIcon.default, {
      icon: "processes",
      type: "af",
      size: "lg",
      alt: "Start Process",
      title: "Start Process",
      iconColor: color,
      onClick: this.showDialog
    }), visible ? _react.default.createElement(_Modal.default, {
      open: true,
      disableBack: true,
      title: title,
      onToggle: this.closeDialog
    }, _react.default.createElement("div", null, checkboxes, _react.default.createElement("br", null), _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: this.startProcess,
      disabled: startProcessDisabled
    }, "Start process"), _react.default.createElement(_Button.default, {
      onClick: this.closeDialog
    }, "Cancel"))) : null);
  }

}

_defineProperty(EventStartProcess, "propTypes", {
  /* props */
  eventId: _propTypes.default.number.isRequired,
  processDefinitions: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  postAction: _propTypes.default.func,
  color: _propTypes.default.string,

  /* redux */
  eventStartProcess: _propTypes.default.func.isRequired,
  lastActionType: _propTypes.default.string,
  lastActionError: _propTypes.default.bool
});

var _default = (0, _reactRedux.connect)(state => ({
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError
}), {
  eventStartProcess: _eventsActions.eventStartProcess
})(EventStartProcess);

exports.default = _default;