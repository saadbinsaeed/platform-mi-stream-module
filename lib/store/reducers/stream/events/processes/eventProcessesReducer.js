"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventsActions = require("store/actions/stream/eventsActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultState = (0, _Immutable.default)({
  isLoading: false,
  list: []
});
/**
 * Event Processes reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */

const reducer = (state = defaultState, {
  type,
  payload,
  meta,
  error
}) => {
  switch (type) {
    case _eventsActions.LOAD_EVENT_PROCESSES_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true,
        list: []
      });

    case _eventsActions.LOAD_EVENT_PROCESSES:
      {
        if (error) {
          return (0, _Immutable.default)({ ...state,
            isLoading: false
          });
        }

        return (0, _Immutable.default)({ ...state,
          isLoading: false,
          list: payload.list || []
        });
      }

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;