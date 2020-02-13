"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _aboxActions = require("store/actions/abox/aboxActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (state = (0, _Immutable.default)({
  range: 'weeks'
}), {
  type,
  payload,
  error,
  meta
}) => {
  switch (type) {
    case _aboxActions.SET_TIMELINE_ZOOM:
      return (0, _Immutable.default)({ ...state,
        range: payload
      });

    default:
      return state;
  }
};

exports.default = _default;