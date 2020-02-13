"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gridActions = require("store/actions/grid/gridActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We will put all the grid level reducers into this file
// So that we do not have to call the dropdown's API's again and again
// If the dropdown is already loaded, we will not dispatch its action again

/**
 * Classification List reducer for grid.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
var _default = (state = (0, _Immutable.default)({
  isLoading: false,
  records: [],
  total: 0
}), action) => {
  const {
    type,
    payload,
    error
  } = action;

  switch (type) {
    case _gridActions.LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _gridActions.LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID:
      if (error) return (0, _Immutable.default)({ ...state,
        isLoading: false
      });
      const {
        records,
        total
      } = payload;
      return (0, _Immutable.default)({ ...state,
        isLoading: false,
        records,
        total
      });

    default:
      return state;
  }
};

exports.default = _default;