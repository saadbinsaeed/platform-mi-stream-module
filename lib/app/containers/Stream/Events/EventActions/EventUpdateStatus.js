"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _eventsActions = require("store/actions/stream/eventsActions");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the icon to show the actions.
 */
class EventUpdateStatus extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.showDialog = this.showDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.action = this.action.bind(this);
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
   * Close the dialog
   */


  closeDialog() {
    this.setState({
      visible: false
    });
  }
  /**
   * Updates the status of the event
   */


  action(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const {
      status,
      eventId,
      postAction
    } = this.props;
    this.props.updateEventStatus({
      status,
      eventId
    }).then(() => postAction && postAction());
  }
  /**
   * @override
   * @return {XML}
   */


  render() {
    const {
      visible
    } = this.state;
    const {
      status,
      color
    } = this.props;
    return _react.default.createElement("span", null, _react.default.createElement(_ButtonIcon.default, {
      icon: status === 'ACK' ? 'check' : 'close',
      onClick: this.showDialog,
      size: "lg",
      title: status === 'ACK' ? 'Acknowledged' : 'Discard',
      alt: status === 'ACK' ? 'Acknowledged' : 'Discard',
      iconColor: color
    }), visible ? _react.default.createElement(_Modal.default, {
      open: true,
      title: status === 'ACK' ? 'Acknowledge Event' : 'Discard Event',
      onToggle: this.closeDialog
    }, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: this.action
    }, "Proceed"), _react.default.createElement(_Button.default, {
      onClick: this.closeDialog
    }, "Cancel"))) : null);
  }

}

_defineProperty(EventUpdateStatus, "propTypes", {
  updateEventStatus: _propTypes.default.func.isRequired,
  postAction: _propTypes.default.func,
  status: _propTypes.default.string,
  eventId: _propTypes.default.number,
  color: _propTypes.default.string
});

var _default = (0, _reactRedux.connect)(null, {
  updateEventStatus: _eventsActions.updateEventStatus
})(EventUpdateStatus);

exports.default = _default;