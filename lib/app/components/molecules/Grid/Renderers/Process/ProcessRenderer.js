"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _DataTableClient = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableClient/DataTableClient"));

var _eventsActions = require("store/actions/stream/eventsActions");

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ProcessLinkRenderer = ({
  data,
  value
}) => {
  if (!data || !value) {
    return null;
  }

  return _react.default.createElement(_reactRouterDom.Link, {
    to: `/abox/process/${data.id}`
  }, value);
};

const ContentAreaStyle = _styledComponents.default.div.withConfig({
  displayName: "ProcessRenderer__ContentAreaStyle",
  componentId: "wwy1xu-0"
})(["overflow:auto;"]);
/**
 * @public
 * Renders process icon with number of processes for the event
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */


class ProcessRenderer extends _react.PureComponent {
  /**
   *
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefinitions", [{
      header: 'ID',
      field: 'id',
      bodyComponent: ProcessLinkRenderer,
      style: {
        width: '100px'
      }
    }, {
      header: 'Process',
      field: 'name',
      bodyComponent: ProcessLinkRenderer,
      style: {
        width: '400px'
      }
    }, {
      header: 'Start Time',
      field: 'createDate',
      type: 'date'
    }, {
      header: 'Started by',
      field: 'createdBy.name'
    }].map(column => ({ ...column,
      filter: false,
      sortable: false
    })));

    _defineProperty(this, "messageStyle", {
      padding: '12px 12px 0px 12px'
    });

    _defineProperty(this, "getProcessesIds", (0, _fastMemoize.default)(processInstances => (processInstances || []).map(({
      id
    }) => id)));

    _defineProperty(this, "toggleModal", event => {
      if (event) {
        event.preventDefault();
      }

      const {
        processInstances,
        loadEventProcesses
      } = this.props;
      const {
        visible
      } = this.state;

      if (!visible) {
        const processesIds = this.getProcessesIds(processInstances);

        if (processesIds.length > 0) {
          loadEventProcesses(processesIds);
        }
      }

      this.setState({
        visible: !visible
      });
    });

    this.state = {
      visible: false
    };
  }

  /**
   * @override
   */
  render() {
    const {
      eventId,
      processInstances,
      color,
      isLoading,
      processes
    } = this.props;
    const ids = this.getProcessesIds(processInstances);
    let message = '';
    const notVisible = ids.length - processes.length;

    if (notVisible > 0 && !isLoading) {
      if (ids.length === 1) {
        message = `You are not allowed to see the process associated to the event.`;
      } else if (processes.length === 0) {
        message = `You are not allowed to see the processes associated to the event.`;
      } else {
        message = `You are not allowed to see ${notVisible} of the ${ids.length} processes associated to the event.`;
      }
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ButtonIcon.default, {
      icon: "abox",
      type: "af",
      title: "No of Processes",
      alt: "No of Processes",
      size: "md",
      iconColor: color,
      onClick: this.toggleModal
    }), ids.length, _react.default.createElement(_Modal.default, {
      open: !!ids.length && this.state.visible,
      onToggle: this.toggleModal,
      disableBack: true,
      title: `Processes related to the Event ${eventId}`
    }, _react.default.createElement(ContentAreaStyle, null, _react.default.createElement(_DataTableClient.default, {
      dataTableId: "hellomyfriend",
      columnDefinitions: this.columnDefinitions,
      value: processes,
      isLoading: isLoading,
      disableCountdown: true,
      totalRecords: processes.length
    })), _react.default.createElement("span", {
      style: this.messageStyle
    }, message)));
  }

}

_defineProperty(ProcessRenderer, "propTypes", {
  /* props */
  eventId: _propTypes.default.number.isRequired,
  processInstances: _propTypes.default.arrayOf(_propTypes.default.object),
  color: _propTypes.default.string,

  /* redux */
  loadEventProcesses: _propTypes.default.func.isRequired,
  processes: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  isLoading: _propTypes.default.bool.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.stream.events.processes.isLoading,
  processes: state.stream.events.processes.list
}), {
  loadEventProcesses: _eventsActions.loadEventProcesses
})(ProcessRenderer);

exports.default = _default;