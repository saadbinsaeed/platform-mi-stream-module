"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _History = _interopRequireDefault(require("store/History"));

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _processActions = require("store/actions/abox/processActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the view to display the classification.
 */
class ProcessStarted extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "processId", void 0);

    this.processId = (0, _utils.getStr)(props, 'match.params.processId');

    if (this.processId) {
      this.props.loadStartedProcessDetails(this.processId);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      processTasks,
      userProfileId,
      match
    } = this.props;
    this.processId = (0, _utils.getStr)(match, 'params.processId');
    const prevProcessId = (0, _utils.getStr)(prevProps, 'match.params.processId');

    if (this.processId && this.processId !== prevProcessId) {
      this.props.loadStartedProcessDetails(this.processId);
    } else if (processTasks && processTasks !== prevProps.processTasks) {
      const processId = String(this.processId);

      if (processTasks.length === 0) {
        return _History.default.push(`/abox/process/${processId}`);
      }

      const assignedTasks = processTasks.filter(task => (0, _lo.get)(task, 'assignee.id') === userProfileId);

      if (assignedTasks.length === 1) {
        return _History.default.push(`/abox/task/${assignedTasks[0].id}`);
      }

      return _History.default.push(`/abox/process/${processId}/tasks`);
    }
  }
  /**
   * @override
   */


  render() {
    const {
      isLoadingProcess
    } = this.props;
    return _react.default.createElement(_PageTemplate.default, {
      title: 'Starting...',
      subTitle: this.processId
    }, isLoadingProcess && _react.default.createElement(_Loader.default, {
      absolute: true
    }));
  }

}

_defineProperty(ProcessStarted, "propTypes", {
  loadStartedProcessDetails: _propTypes.default.func,
  isLoadingProcess: _propTypes.default.bool
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoadingProcess: state.abox.process.started.isLoading,
  processTasks: state.abox.process.started.data,
  userProfileId: state.user.profile.id
}), {
  loadStartedProcessDetails: _processActions.loadStartedProcessDetails
})(ProcessStarted);

exports.default = _default;