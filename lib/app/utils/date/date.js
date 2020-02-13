"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatInterval = exports.setSeconds = exports.setHours = exports.equals = exports.clone = exports.isIsoDate = exports.resetTime = exports.fromNow = exports.formatDate = exports.formatByKind = exports.saveByKind = exports.displayByKind = exports.TIME_SAVE_REGEXPR = exports.TIME_SAVE_FORMAT = exports.TIME_DISPLAY_FORMAT = exports.DATE_SAVE_FORMAT = exports.DATE_DISPLAY_FORMAT = exports.DATETIME_SAVE_FORMAT = exports.DATETIME_DISPLAY_FORMAT = exports.DATE_FORMAT = exports.DATETIME_FORMAT = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATETIME_FORMAT = 'DD MMM YYYY, H:mm';
exports.DATETIME_FORMAT = DATETIME_FORMAT;
const DATE_FORMAT = 'DD MMM YYYY';
exports.DATE_FORMAT = DATE_FORMAT;
const DATETIME_DISPLAY_FORMAT = 'DD MMM YYYY HH:mm';
exports.DATETIME_DISPLAY_FORMAT = DATETIME_DISPLAY_FORMAT;
const DATETIME_SAVE_FORMAT = '';
exports.DATETIME_SAVE_FORMAT = DATETIME_SAVE_FORMAT;
const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';
exports.DATE_DISPLAY_FORMAT = DATE_DISPLAY_FORMAT;
const DATE_SAVE_FORMAT = 'YYYYMMDD';
exports.DATE_SAVE_FORMAT = DATE_SAVE_FORMAT;
const TIME_DISPLAY_FORMAT = 'HH:mm';
exports.TIME_DISPLAY_FORMAT = TIME_DISPLAY_FORMAT;
const TIME_SAVE_FORMAT = 'HHmmssZ';
exports.TIME_SAVE_FORMAT = TIME_SAVE_FORMAT;
const TIME_SAVE_REGEXPR = /[0-9]{6}\+[0-9]{2}:[0-9]{2}/;
exports.TIME_SAVE_REGEXPR = TIME_SAVE_REGEXPR;
const kindFormatMap = {
  time: [TIME_SAVE_FORMAT, TIME_DISPLAY_FORMAT],
  date: [DATE_SAVE_FORMAT, DATE_DISPLAY_FORMAT],
  datetime: [DATETIME_SAVE_FORMAT, DATETIME_DISPLAY_FORMAT]
};

const displayByKind = (kind, value) => {
  if (!value) return value;
  const [save, display] = kindFormatMap[kind] || kindFormatMap.datetime;
  return (0, _moment.default)(value, save).format(display);
};

exports.displayByKind = displayByKind;

const saveByKind = (kind, value) => {
  if (!value) return value;
  const [save] = kindFormatMap[kind] || kindFormatMap.datetime;
  return (0, _moment.default)(value).format(save);
};

exports.saveByKind = saveByKind;

const formatByKind = (kind, value) => {
  if (!value) return value;
  const [save] = kindFormatMap[kind] || kindFormatMap.datetime;
  const formatted = (0, _moment.default)(value, save);
  return formatted.isValid() ? formatted : null;
};
/**
 * Formats a date.
 *
 * @param date the date to format (can be null or undefined)
 * @param format the format to use (optional)
 */


exports.formatByKind = formatByKind;

const formatDate = (date, format) => date ? (0, _moment.default)(date).format(format || DATETIME_FORMAT) : '';

exports.formatDate = formatDate;

const fromNow = date => date ? (0, _moment.default)(date).fromNow() : '';

exports.fromNow = fromNow;

const resetTime = date => {
  if (!date) {
    return date;
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

exports.resetTime = resetTime;

const isIsoDate = date => date && typeof date === 'string' && (date.length === 24 || date.length === 25) && date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/);
/**
 * Returns a new date object that is a clone of the given one.
 */


exports.isIsoDate = isIsoDate;

const clone = date => {
  const parsedDate = (0, _utils.datefy)(date);
  return parsedDate && parsedDate === date ? new Date(parsedDate) : parsedDate;
};
/**
 * Returns true if the specified dates are refering to the same instant, false otherwise.
 */


exports.clone = clone;

const equals = (dateA, dateB) => {
  const parsedDateA = (0, _utils.datefy)(dateA);
  const parsedDateB = (0, _utils.datefy)(dateB);

  if (!parsedDateA && !parsedDateB) {
    return true;
  }

  if (!parsedDateA || !parsedDateB) {
    return false;
  }

  return parsedDateA.getTime() === parsedDateB.getTime();
};
/**
 * Returns a new date object that is a clone of the given one with the given hours, minutes, seconds and ms.
 */


exports.equals = equals;

const setHours = (date, hours, minutes, seconds, ms) => {
  const newDate = clone(date);

  if (newDate) {
    newDate.setHours(hours, minutes, seconds, ms);
  }

  return newDate;
};
/**
 * Returns a new date object that is a clone of the given one with the given seconds and ms.
 */


exports.setHours = setHours;

const setSeconds = (date, seconds, ms) => {
  const newDate = clone(date);

  if (newDate) {
    newDate.setSeconds(seconds, ms);
  }

  return newDate;
};

exports.setSeconds = setSeconds;

const formatInterval = milliseconds => {
  if (Math.trunc(milliseconds / 1000) < 60) {
    return 'less than a minute';
  }

  const interval = _moment.default.duration(milliseconds);

  let days = interval.days();
  let minutes = interval.minutes();
  days = !days ? '' : days === 1 ? '1 day' : `${days} days`;
  minutes = !minutes ? '' : minutes === 1 ? '1 minute' : `${minutes} minutes`;
  return [days, minutes].filter(t => t).join(', ');
};

exports.formatInterval = formatInterval;