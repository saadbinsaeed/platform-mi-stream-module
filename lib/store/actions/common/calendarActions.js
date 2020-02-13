"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveCalendarState = exports.SAVE_CALENDAR_STATE = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SAVE_CALENDAR_STATE = '@@affectli/component/calendar/SAVE_CALENDAR_STATE';
/**
 * Save the runtime state of a Calendar.
 *
 * @param id the Calendar's ID.
 * @param status the Calendar's status.
 */

exports.SAVE_CALENDAR_STATE = SAVE_CALENDAR_STATE;

const saveCalendarState = (id, state) => dispatch => {
  if (!id) {
    throw new Error('The calendar ID is required.');
  }

  dispatch({
    type: SAVE_CALENDAR_STATE,
    payload: (0, _Immutable.default)({
      id,
      state
    })
  });
};

exports.saveCalendarState = saveCalendarState;