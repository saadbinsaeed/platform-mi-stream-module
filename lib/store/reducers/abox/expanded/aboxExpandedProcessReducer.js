"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _processActions = require("store/actions/abox/processActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reducer to handle app actions
 * @param state
 * @param action
 * @returns {*}
 */
var _default = (state = (0, _Immutable.default)({}), {
  type,
  payload,
  error,
  meta
}) => {
  switch (type) {
    case _processActions.LOAD_EXPANDED_PROCESS_STARTED:
      return (0, _Immutable.default)({ ...state,
        [meta.processId]: {
          isLoading: true
        }
      });

    case _processActions.LOAD_EXPANDED_PROCESS:
      {
        if (error) return (0, _Immutable.default)({ ...state,
          [meta.processId]: {
            isLoading: false
          }
        });
        const data = payload || [];
        return (0, _Immutable.default)({ ...state,
          [meta.processId]: {
            isLoading: false,
            data
          }
        });
      }

    default:
      return state;
  }
};

exports.default = _default;