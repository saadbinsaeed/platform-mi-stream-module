"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Browser history reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
const reducer = (state = (0, _Immutable.default)({
  list: []
}), action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      {
        const list = [{
          action: action.payload.action,
          pathname: action.payload.pathname,
          search: action.payload.search
        }, ...state.list];

        if (list.length > 10) {
          list.pop(); // discards the oldest element
        }

        return (0, _Immutable.default)({ ...state,
          list
        });
      }

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;