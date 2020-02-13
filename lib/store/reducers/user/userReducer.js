"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usersActions = require("store/actions/admin/usersActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User Preferences reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
const reducer = (state = (0, _Immutable.default)({
  loadingPreferences: false,
  preferences: null,
  loadingProfile: false,
  profile: null
}), action) => {
  const {
    type,
    payload
  } = action || {};

  switch (type) {
    case _usersActions.LOAD_USER_PREFERENCES_STARTED:
      return (0, _Immutable.default)({ ...state,
        loadingPreferences: true
      });

    case _usersActions.LOAD_USER_PREFERENCES:
      return (0, _Immutable.default)({ ...state,
        preferences: payload || {},
        loadingPreferences: false
      });

    case _usersActions.SAVE_USER_PREFERENCES:
    case _usersActions.SAVE_DATA_TABLE_PREFERENCES:
    case _usersActions.RESET_DATA_TABLE_PREFERENCES:
      return (0, _Immutable.default)({ ...state,
        preferences: payload
      });

    case _usersActions.LOAD_USER_PROFILE_STARTED:
      return (0, _Immutable.default)({ ...state,
        loadingProfile: true
      });

    case _usersActions.LOAD_USER_PROFILE:
      {
        const profile = payload && payload.login ? payload : {
          invalid: true
        };
        return (0, _Immutable.default)({ ...state,
          profile,
          loadingProfile: false
        });
      }

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;