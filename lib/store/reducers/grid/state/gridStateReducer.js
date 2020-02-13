"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gridActions = require("store/actions/grid/gridActions");

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Handle the DataTable application runtime state.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
var _default = (state = (0, _Immutable.default)({}), action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case _gridActions.SAVE_DATATABLE_STATUS:
      return (0, _Immutable.set)(state, payload.id, payload.status);

    default:
      return state;
  }
};

exports.default = _default;