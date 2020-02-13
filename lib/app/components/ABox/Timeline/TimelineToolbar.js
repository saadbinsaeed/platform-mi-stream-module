"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _platformUi = require("@mic3/platform-ui");

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const TimelineToolbar = props => {
  const {
    onChangeRange,
    onPrevious,
    onNext,
    onToday,
    range,
    totalRecords
  } = props;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_style.TimelineToolbarSelect, {
    onChange: onChangeRange,
    disableUnderline: true,
    value: range,
    inputProps: {
      name: 'range',
      id: 'range'
    }
  }, _react.default.createElement(_platformUi.MenuItem, {
    value: 'days'
  }, "DAY"), _react.default.createElement(_platformUi.MenuItem, {
    value: 'weeks'
  }, "WEEK"), _react.default.createElement(_platformUi.MenuItem, {
    value: 'months'
  }, "MONTH"), _react.default.createElement(_platformUi.MenuItem, {
    value: 'years'
  }, "YEAR")), _react.default.createElement(_platformUi.Tooltip, {
    title: "Previous"
  }, _react.default.createElement(_platformUi.IconButton, {
    onClick: onPrevious
  }, _react.default.createElement(_platformUi.MdiIcon, {
    name: "chevron-left",
    color: "inherit"
  }))), _react.default.createElement(_platformUi.Tooltip, {
    title: "Next"
  }, _react.default.createElement(_platformUi.IconButton, {
    onClick: onNext
  }, _react.default.createElement(_platformUi.MdiIcon, {
    name: "chevron-right",
    color: "inherit"
  }))), _react.default.createElement(_platformUi.Tooltip, {
    title: "Today"
  }, _react.default.createElement(_platformUi.IconButton, {
    onClick: onToday
  }, _react.default.createElement(_platformUi.MdiIcon, {
    name: "calendar-range",
    color: "inherit"
  }))), _react.default.createElement("b", null, totalRecords), "\xA0Tasks Found");
};

TimelineToolbar.propTypes = {
  onChangeRange: _propTypes.default.func.isRequired,
  onPrevious: _propTypes.default.func.isRequired,
  onNext: _propTypes.default.func.isRequired,
  onToday: _propTypes.default.func.isRequired,
  range: _propTypes.default.string,
  totalRecords: _propTypes.default.number
};
TimelineToolbar.defaultProps = {
  range: 'weeks',
  totalRecords: 0
};
var _default = TimelineToolbar;
exports.default = _default;