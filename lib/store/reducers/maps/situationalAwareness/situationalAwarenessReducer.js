"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _situationalAwarenessActions = require("store/actions/maps/situationalAwarenessActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The initial state on our reducer
 */
const initialState = {
  isLoading: false,
  payload: []
};
/**
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */

const reducer = (state = (0, _Immutable.default)(initialState), action) => {
  // console.log('reducerState', state, 'reducerAction', action);
  const {
    type,
    error,
    payload = {}
  } = action;

  switch (type) {
    case _situationalAwarenessActions.SITUATIONAL_AWARENESS_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _situationalAwarenessActions.SITUATIONAL_AWARENESS:
      if (error) {
        return {
          isLoading: false
        };
      }

      return (0, _Immutable.default)({ ...state,
        isLoading: false,
        payload
      });

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;