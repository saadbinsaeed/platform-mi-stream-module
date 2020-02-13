"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gridActions = require("store/actions/grid/gridActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Classification List reducer for grid.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
var _default = (state = (0, _Immutable.default)({
  isLoading: false,
  records: null,
  count: 0
}), {
  type,
  payload
}) => {
  switch (type) {
    case _gridActions.LOAD_GROUP_DROPDOWN_OPTIONS_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true,
        records: null
      });

    case _gridActions.LOAD_GROUP_DROPDOWN_OPTIONS:
      return (0, _Immutable.default)({ ...state,
        isLoading: false,
        records: (0, _lo.get)(payload, 'records')
      });

    default:
      return state;
  }
};

exports.default = _default;