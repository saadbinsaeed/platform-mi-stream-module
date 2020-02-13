"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _legacyActions = require("store/actions/legacy/legacyActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  legacyAppFormUpdate: Date.now()
};

var _default = (state = initialState, action) => {
  const {
    type,
    error
  } = action;

  switch (type) {
    case _legacyActions.RELOAD_IFRAME:
      {
        if (error) return (0, _Immutable.default)({ ...state
        });
        return (0, _Immutable.default)({ ...state,
          legacyAppFormUpdate: Date.now()
        });
      }

    default:
      return state;
  }
};

exports.default = _default;