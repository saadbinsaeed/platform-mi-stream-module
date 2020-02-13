"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reducer = (state = (0, _Immutable.default)({
  expandedRows: {}
}), {
  type,
  error,
  payload,
  meta
}) => {
  switch (type) {
    case _broadcastsActions.GET_BROADCAST_MEMBERS_STARTED:
      if (!meta.broadcastId) {
        throw new Error('Ths broadcastId is mandatory.');
      }

      return (0, _Immutable.default)({ ...state,
        [meta.broadcastId]: {
          isLoading: true
        }
      });

    case _broadcastsActions.GET_BROADCAST_MEMBERS:
      {
        if (!meta.broadcastId) {
          throw new Error('Ths broadcastId is mandatory.');
        }

        const {
          data
        } = payload || {};

        if (error || !data) {
          return (0, _Immutable.default)({ ...state,
            [meta.broadcastId]: {
              isLoading: false
            }
          });
        }

        return (0, _Immutable.default)({ ...state,
          [meta.broadcastId]: {
            isLoading: false,
            data
          }
        });
      }

    case _broadcastsActions.EXPAND_BROADCAST_MEMEBERS:
      if (!payload.broadcastId) {
        throw new Error('Ths broadcastId is mandatory.');
      }

      return (0, _lo.set)(state, `expandedRows.${payload.broadcastId}`, payload.expandedRows);

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;