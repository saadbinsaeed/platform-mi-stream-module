"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
var _default = (state = (0, _Immutable.default)({
  isLoading: false,
  data: []
}), action) => {
  switch (action.type) {
    case _customEntitiesActions.LOAD_CUSTOM_ENTITY_CHILDREN_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _customEntitiesActions.LOAD_CUSTOM_ENTITY_CHILDREN:
      {
        if (action.error) {
          return (0, _Immutable.default)({ ...state,
            isLoading: false
          });
        }

        return (0, _Immutable.default)({ ...state,
          data: action.payload,
          isLoading: false
        });
      }

    default:
      return state;
  }
};

exports.default = _default;