"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _polished = require("polished");

var _reactBigCalendar = _interopRequireDefault(require("react-big-calendar"));

var _moment = _interopRequireDefault(require("moment"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _date2 = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _calendarActions = require("store/actions/common/calendarActions");

require("./Calendar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledBigCalendar = (0, _styledComponents.default)(_reactBigCalendar.default).withConfig({
  displayName: "Calendar__StyledBigCalendar",
  componentId: "sc-12yg2ws-0"
})(["max-width:100vw;.rbc-row-segment{padding:1px;}.rbc-month-view{min-height:532px;overflow:auto;}.rbc-overlay{background:", ";}.rbc-toolbar{overflow-y:hidden;overflow-x:auto;min-height:70px;button{border-color:", ";color:", ";&:hover{color:", ";border-color:", ";background:", ";}&:focus{color:", ";border-color:", ";background:", ";}&.rbc-active{color:", ";border-color:", ";background:", ";&:hover{color:", ";border-color:", ";background:", ";}}}}& .rbc-time-header.rbc-overflowing{margin-right:6px !important;}& .rbc-month-view,& .rbc-time-view,& .rbc-header,& .rbc-time-header,& .rbc-time-header.rbc-overflowing,& .rbc-month-view .rbc-header + .rbc-header,& .rbc-time-header > .rbc-row > * + *,& .rbc-time-header > .rbc-row:first-child,& .rbc-date-cell,& .rbc-day-bg + .rbc-day-bg,& .rbc-month-row + .rbc-month-row,& .rbc-time-content,& .rbc-time-content > * + * > *,& .rbc-agenda-view table,& .rbc-agenda-view table tbody > tr > td + td,& .rbc-day-slot .rbc-time-slot,& .rbc-overlay,& .rbc-overlay-header{border-color:", ";}& .rbc-event{background:", ";&.rbc-selected{background:", ";}}& .rbc-selected-cell{background-color:red;}& .rbc-show-more{color:", ";background:transparent;}& .rbc-today{background:", ";}& .rbc-current{color:white;}& .rbc-off-range-bg{background:", ";}"], ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.active.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.focus.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.focus.background, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.active.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.color.secondary, ({
  theme
}) => theme.color.primary, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => (0, _polished.darken)(0.1, theme.color.background), ({
  theme
}) => (0, _polished.lighten)(0.03, theme.color.background));

_reactBigCalendar.default.setLocalizer(_reactBigCalendar.default.momentLocalizer(_moment.default));
/**
 * Renders the view to display the classification.
 */


class Calendar extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "defaultDate", void 0);

    _defineProperty(this, "defaultView", void 0);

    _defineProperty(this, "isAllDay", ({
      start,
      end
    }) => start.getDate() !== end.getDate() || start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear() || (0, _date2.equals)(start, (0, _date2.setHours)(start, 0, 0, 0, 0)) && (0, _date2.equals)(end, (0, _date2.setHours)(start, 23, 59, 59, 999)));

    _defineProperty(this, "onView", view =>
    /* 'month'|'week'|'work_week'|'day'|'agenda' */
    {
      const {
        date,
        start: prevStart,
        end: prevEnd
      } = this.props.calendarState;
      const {
        start,
        end
      } = this.calculateDateRange(view, date);
      this.saveState({
        view,
        start,
        end
      });
      this.props.onView && this.props.onView(view);
      this.onDateRangeChange({
        start,
        end,
        prevStart,
        prevEnd
      });
    });

    _defineProperty(this, "onNavigate", date => {
      const {
        view,
        start: prevStart,
        end: prevEnd
      } = this.props.calendarState;
      const {
        start,
        end
      } = this.calculateDateRange(view, date);
      this.saveState({
        date,
        start,
        end
      });
      this.props.onNavigate && this.props.onNavigate(date);
      this.onDateRangeChange({
        start,
        end,
        prevStart,
        prevEnd
      });
    });

    const {
      calendarState
    } = props;
    let state = calendarState;

    if (!state) {
      state = this._buildState(props);
      this.saveState(state);
    }

    const {
      start: _start,
      end: _end,
      date: _date,
      view: _view
    } = state;
    this.defaultDate = _date;
    this.defaultView = _view;
    props.onDateRangeChange && props.onDateRangeChange({
      start: _start,
      end: _end
    });
  }

  _buildState(props) {
    const {
      defaultDate,
      defaultView
    } = props;
    const view = defaultView || 'month';
    const date = defaultDate || new Date();
    const {
      start,
      end
    } = this.calculateDateRange(view, date);
    return {
      view,
      date,
      start,
      end
    };
  }

  saveState(partialState) {
    const {
      calendarState,
      calendarId,
      saveCalendarState
    } = this.props;
    const next = { ...calendarState,
      ...partialState
    };
    saveCalendarState(calendarId, next);
  }

  calculateDateRange(view, date) {
    let start;
    let end;

    switch (view) {
      case 'day':
        {
          start = (0, _moment.default)(date).startOf('day').toDate();
          end = (0, _moment.default)(date).endOf('day').toDate();
          break;
        }

      case 'week':
        {
          start = (0, _moment.default)(date).startOf('week').toDate();
          end = (0, _moment.default)(date).endOf('week').toDate();
          break;
        }

      case 'agenda':
        {
          start = (0, _moment.default)(date).startOf('day').toDate();
          end = (0, _moment.default)(date).add(30, 'days').endOf('day').toDate();
          break;
        }

      default:
        start = (0, _moment.default)(date).startOf('month').subtract(7, 'days').toDate();
        end = (0, _moment.default)(date).endOf('month').add(7, 'days').toDate();
    }

    return {
      start,
      end
    };
  }

  onDateRangeChange({
    start,
    end,
    prevStart,
    prevEnd
  }) {
    if (start < prevStart || prevEnd < end) {
      this.props.onDateRangeChange && this.props.onDateRangeChange({
        start,
        end
      });
    }
  }

  render() {
    return _react.default.createElement(_react.Fragment, null, this.props.isLoading && _react.default.createElement(_Loader.default, {
      absolute: true
    }), _react.default.createElement(StyledBigCalendar, _extends({
      startAccessor: "start",
      endAccessor: "end",
      defaultDate: this.defaultDate,
      defaultView: this.defaultView,
      allDayAccessor: this.isAllDay
    }, this.props, {
      onNavigate: this.onNavigate,
      onView: this.onView
    })));
  }

}

var _default = (0, _reactRedux.connect)((state, props) => ({
  userProfile: state.user.profile,
  tasks: state.abox.task.calendar.records,
  isLoading: state.abox.task.calendar.isLoading,
  calendarState: (0, _lo.get)(state, `common.calendar.state.${props.calendarId}`)
}), {
  saveCalendarState: _calendarActions.saveCalendarState
})(Calendar);

exports.default = _default;