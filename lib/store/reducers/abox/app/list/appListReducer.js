"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _myAppsActions = require("store/actions/abox/myAppsActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  records: [],
  favorites: {},
  isLoading: false,
  isFavoritesLoading: false
};
/**
 * Reducer to handle app actions
 * @param state
 * @param action
 * @returns {*}
 */

var _default = (state = initialState, action) => {
  const {
    type,
    error,
    payload
  } = action;

  switch (type) {
    case _myAppsActions.LOAD_APPS_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _myAppsActions.LOAD_APPS:
      {
        if (error) return (0, _Immutable.default)({ ...state,
          isLoading: false
        });
        return (0, _Immutable.default)({ ...state,
          isLoading: false,
          records: payload
        });
      }

    case _myAppsActions.LOAD_APPS_FAVORITES_STARTED:
      return (0, _Immutable.default)({ ...state,
        isFavoritesLoading: true
      });

    case _myAppsActions.LOAD_APPS_FAVORITES:
      {
        if (error) return (0, _Immutable.default)({ ...state,
          isFavoritesLoading: false
        });
        return (0, _Immutable.default)({ ...state,
          isFavoritesLoading: false,
          favorites: (0, _lo.get)(payload, 'myApp', {})
        });
      }

    case _myAppsActions.SAVE_APPS_FAVORITES:
      {
        if (error) return (0, _Immutable.default)({ ...state
        });
        return (0, _Immutable.default)({ ...state,
          favorites: (0, _lo.get)(payload, 'myApp', {})
        });
      }

    default:
      return state;
  }
};

exports.default = _default;