"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _appActions = require("store/actions/app/appActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  isNavOpen: false,
  isNotificationsOpen: false,
  isChatOpen: false,
  isSearchOpen: false,
  isHeaderDisabled: false,
  headers: {
    title: '',
    subTitle: '',
    headerInfo: [],
    pillText: '',
    actions: '',
    menuItems: '',
    color: {
      background: ''
    }
  },
  theme: 'light',
  listAs: 'cards',
  organisation: {
    name: null,
    image: null
  },
  toastrOptions: {},
  errorOptions: {},
  stepper: {
    hideOnSave: false
  }
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
    payload,
    error
  } = action;

  switch (type) {
    case _appActions.TOGGLE_NAV:
      return { ...state,
        isNavOpen: !state.isNavOpen
      };

    case _appActions.OPEN_NAV:
      return { ...state,
        isNavOpen: true
      };

    case _appActions.TOGGLE_NOTIFICATIONS:
      return { ...state,
        isNotificationsOpen: !state.isNotificationsOpen
      };

    case _appActions.TOGGLE_CHAT:
      return { ...state,
        isChatOpen: !state.isChatOpen
      };

    case _appActions.TOGGLE_SEARCH:
      return { ...state,
        isSearchOpen: !state.isSearchOpen
      };

    case _appActions.SELECT_THEME:
      return { ...state,
        theme: action.theme
      };

    case _appActions.SET_HEADERS:
      // console.log('headersReducer', action);
      return (0, _Immutable.default)({ ...state,
        headers: payload
      });

    case _appActions.LOAD_APP_ORGANISATION_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _appActions.LOAD_APP_ORGANISATION:
      {
        if (error || !payload) return (0, _Immutable.default)({ ...state,
          isLoading: false
        });
        return (0, _Immutable.default)({ ...state,
          isLoading: false,
          organisation: payload
        });
      }

    case _appActions.SHOW_TOASTR:
      {
        return (0, _Immutable.default)({ ...state,
          toastrOptions: payload
        });
      }

    case _appActions.ERROR_ALERT_MESSAGE:
      {
        return (0, _Immutable.default)({ ...state,
          errorOptions: payload
        });
      }

    case _appActions.TOGGLE_APP_HEADERS:
      {
        return (0, _Immutable.default)({ ...state,
          isHeaderDisabled: payload
        });
      }

    case _appActions.HIDE_STEPPER_SAVE_BUTTON:
      {
        return (0, _Immutable.default)({ ...state,
          stepper: { ...state.stepper,
            hideOnSave: true
          }
        });
      }

    case _appActions.SHOW_STEPPER_SAVE_BUTTON:
      {
        return (0, _Immutable.default)({ ...state,
          stepper: { ...state.stepper,
            hideOnSave: false
          }
        });
      }

    default:
      return state;
  }
};

exports.default = _default;