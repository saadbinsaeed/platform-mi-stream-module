"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _dashboardActions = require("store/actions/dashboard/dashboardActions");

var _DashboardProcessList = _interopRequireDefault(require("./DashboardProcessList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * View to display assigned task list
 */
class MyAssignedProcesses extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "loadData", options => {
      const {
        user,
        loadProcessesAssigned
      } = this.props;
      return loadProcessesAssigned(user, options);
    });
  }

  /**
   * @override
   */
  render() {
    const {
      records,
      isLoading,
      totalRecords,
      startIndex
    } = this.props;
    return _react.default.createElement(_DashboardProcessList.default, _extends({
      loadData: this.loadData,
      title: "My Assigned Processes"
    }, {
      records,
      isLoading,
      totalRecords,
      startIndex
    }));
  }

}

_defineProperty(MyAssignedProcesses, "propTypes", {
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  loadProcessesAssigned: _propTypes.default.func.isRequired,
  user: _propTypes.default.object.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.dashboard.processesAssigned.isLoading,
  records: state.dashboard.processesAssigned.records,
  startIndex: state.dashboard.processesAssigned.startIndex,
  totalRecords: state.dashboard.processesAssigned.count,
  user: state.user.profile
}), {
  loadProcessesAssigned: _dashboardActions.loadProcessesAssigned
})(MyAssignedProcesses);

exports.default = _default;