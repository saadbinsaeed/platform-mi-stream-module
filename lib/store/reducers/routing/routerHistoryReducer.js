"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRouterRedux = require("react-router-redux");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = (0, _Immutable.default)({
  location: {
    action: null,
    pathname: '',
    search: null
  }
});
/**
 * Router history reducer.
 *
 * @param state the current Redux state.
 * @param action the dispatched action.
 *
 * @return the new Redux state.
 */

const router = (state = initialState, action) => {
  if (action.type === _reactRouterRedux.LOCATION_CHANGE) {
    const previousLocation = state.location;
    return (0, _Immutable.default)({ ...state,
      location: action.payload,
      previousLocation
    });
  }

  return state;
};

var _default = router;
exports.default = _default;