"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _taskActions = require("store/actions/abox/taskActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (state = {}, action = {}) => {
  const {
    type,
    payload,
    error,
    meta
  } = action;

  switch (type) {
    case _taskActions.LOAD_PROCESS_TASKS_STARTED:
      {
        const {
          processId
        } = meta || {};
        let processTasksState = (0, _lo.get)(state, processId) || {};
        processTasksState = { ...processTasksState,
          isLoading: true
        };
        return (0, _Immutable.default)({ ...state,
          [processId]: processTasksState
        });
      }

    case _taskActions.LOAD_PROCESS_TASKS:
      {
        const {
          processId
        } = meta || {};
        let processTasksState = (0, _lo.get)(state, processId) || {};

        if (error) {
          processTasksState = { ...processTasksState,
            isLoading: false
          };
        } else {
          processTasksState = { ...processTasksState,
            isLoading: false,
            data: payload
          };
        }

        return (0, _Immutable.default)({ ...state,
          [processId]: processTasksState
        });
      }

    default:
      return state;
  }
};

exports.default = _default;