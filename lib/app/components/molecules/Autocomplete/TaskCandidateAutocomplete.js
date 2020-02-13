"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _taskActions = require("store/actions/abox/taskActions");

var _AbstractUserAutocomplete = _interopRequireDefault(require("./AbstractUserAutocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more users using lazy loading.
 */
class TaskCandidateAutocomplete extends _AbstractUserAutocomplete.default {
  loadOptions(options) {
    const taskId = this.props.taskId;
    return this.props.loadOptions({ ...options,
      taskId
    });
  }

}

_defineProperty(TaskCandidateAutocomplete, "propTypes", { ..._AbstractUserAutocomplete.default.propTypes,
  taskId: _propTypes.default.string.isRequired
});

;

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.common.autocomplete.taskCandidates.isLoading,
  options: state.common.autocomplete.taskCandidates.data
}), {
  loadOptions: _taskActions.loadTaskCandidateAutocomplete
})(TaskCandidateAutocomplete);

exports.default = _default;