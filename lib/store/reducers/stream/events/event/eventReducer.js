"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventsActions = require("store/actions/stream/eventsActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Event reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
const reducer = (state = (0, _Immutable.default)({
  updatingStatus: false,
  startingProcess: false
}), action) => {
  switch (action.type) {
    case _eventsActions.UPDATE_EVENT_STATUS_STARTED:
      return (0, _Immutable.default)({ ...state,
        updatingStatus: true
      });

    case _eventsActions.UPDATE_EVENT_STATUS:
      return (0, _Immutable.default)({ ...state,
        updatingStatus: false
      });

    case _eventsActions.EVENT_START_PROCESS_STARTED:
      return (0, _Immutable.default)({ ...state,
        startingProcess: true
      });

    case _eventsActions.EVENT_START_PROCESS:
      return (0, _Immutable.default)({ ...state,
        startingProcess: false
      });

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;