"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DirectoriesActions = require("store/actions/common/DirectoriesActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Directories reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
const reducer = (state = (0, _Immutable.default)({}), action) => {
  switch (action.type) {
    case _DirectoriesActions.LOAD_DIRECTORIES_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _DirectoriesActions.LOAD_DIRECTORIES:
      return (0, _Immutable.default)({ ...state,
        [action.meta.directoryType]: action.payload,
        isLoading: false
      });

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;