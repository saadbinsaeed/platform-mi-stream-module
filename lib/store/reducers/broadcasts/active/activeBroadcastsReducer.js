"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _appActions = require("store/actions/app/appActions");

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reducer = (state = (0, _Immutable.default)({
  isLoading: false,
  records: []
}), action) => {
  const {
    type,
    error,
    payload = {}
  } = action;

  switch (type) {
    case _broadcastsActions.GET_ACTIVE_BROADCASTS_STARTED:
    case _appActions.LOAD_NOTIFICATIONS_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _broadcastsActions.GET_ACTIVE_BROADCASTS:
    case _appActions.LOAD_NOTIFICATIONS:
      if (error) {
        return (0, _Immutable.default)({
          isLoading: false
        });
      }

      return (0, _Immutable.default)({ ...state,
        isLoading: false,
        records: payload.broadcasts
      });

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;