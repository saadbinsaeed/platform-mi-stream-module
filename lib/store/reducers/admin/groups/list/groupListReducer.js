"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _groupsActions = require("store/actions/admin/groupsActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Groups reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
const reducer = (state = (0, _Immutable.default)({
  isLoading: true,
  records: []
}), action) => {
  const {
    type,
    payload,
    error
  } = action;

  switch (type) {
    case _groupsActions.LOAD_GROUPS_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _groupsActions.LOAD_GROUPS:
      if (error) {
        return (0, _Immutable.default)({ ...state,
          isLoading: false
        });
      }

      const {
        records
      } = payload;
      return (0, _Immutable.default)({ ...state,
        records,
        isLoading: false
      });

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;