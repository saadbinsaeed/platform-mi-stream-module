"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _calendarActions = require("store/actions/common/calendarActions");

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = (0, _redux.combineReducers)({
  state: (state = (0, _Immutable.default)({}), {
    type,
    payload
  }) => type === _calendarActions.SAVE_CALENDAR_STATE ? (0, _Immutable.set)(state, payload.id, payload.state) : state
});

exports.default = _default;