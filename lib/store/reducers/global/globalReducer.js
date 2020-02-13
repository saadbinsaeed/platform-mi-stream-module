"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Global reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
const reducer = (state = (0, _Immutable.default)({
  lastActionType: null,
  lastActionError: false,
  lastActionMeta: null
}), action) => {
  return (0, _Immutable.default)({
    //...state,
    lastActionType: action.type,
    lastActionError: !!action.error,
    lastActionMeta: action.meta,
    lastActionPayload: action.payload
  });
};

var _default = reducer;
exports.default = _default;