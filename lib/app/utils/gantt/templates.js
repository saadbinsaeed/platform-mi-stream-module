"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridTaskEndDateTemplate = exports.gridTaskStartDateTemplate = exports.tooltipTemplate = exports.gridTaskTemplate = exports.taskTemplate = exports.taskAvatar = exports.monthScaleTemplate = exports.weekScaleTemplate = exports.dayScaleTemplate = exports.hourScaleTemplate = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _dhtmlxGantt = require("dhtmlx-gantt");

var _avatar = require("app/utils/avatar/avatar");

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

var _date = require("../date/date");

var _aboxConfig = require("app/config/aboxConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatDayStr = _dhtmlxGantt.gantt.date.date_to_str('%D');

const formatDayNum = _dhtmlxGantt.gantt.date.date_to_str('%d');

const formatFullDate = _dhtmlxGantt.gantt.date.date_to_str('%d/%m/%Y');

const formatHour = _dhtmlxGantt.gantt.date.date_to_str('%H');

const formatWeek = _dhtmlxGantt.gantt.date.date_to_str('%W');

const formatHourMin = _dhtmlxGantt.gantt.date.date_to_str('%H:%i');

const formatMonth = _dhtmlxGantt.gantt.date.date_to_str('%M');

const hourScaleTemplate = date => {
  const dateToday = formatFullDate(new Date());
  const dateFromScale = formatFullDate(new Date(date));
  const hourScale = formatHour(new Date(date));
  const hourTodayScale = formatHour(new Date());
  const isCurrentDate = dateToday === dateFromScale && hourScale === hourTodayScale ? ' date-scale--highlight' : '';
  return `
        <div class="date-scale${isCurrentDate}">
            <div class="date-scale__num">${formatHourMin(date)}</div>
        </div>
    `;
};

exports.hourScaleTemplate = hourScaleTemplate;

const dayScaleTemplate = date => {
  const dateToday = formatFullDate(new Date());
  const dateFromScale = formatFullDate(new Date(date));
  const isCurrentDate = dateToday === dateFromScale ? ' date-scale--highlight' : '';
  return `
        <div class="date-scale${isCurrentDate}">
            <div class="date-scale__str">${formatDayStr(date)}</div>
            <div class="date-scale__num">${formatDayNum(date)}</div>
        </div>
    `;
};

exports.dayScaleTemplate = dayScaleTemplate;

const weekScaleTemplate = date => {
  var endDate = _dhtmlxGantt.gantt.date.add(_dhtmlxGantt.gantt.date.add(date, 1, 'week'), -1, 'day');

  return `
        <div class="date-scale">
            <div class="date-scale__str">Week #${formatWeek(date)}</div>
            <div class="date-scale__num">${formatDayNum(date) + ' - ' + formatDayNum(endDate)}</div>
        </div>
    `;
};

exports.weekScaleTemplate = weekScaleTemplate;

const monthScaleTemplate = date => {
  return `
        <div class="date-scale">
            <div class="date-scale__num">${formatMonth(date)}</div>
        </div>
    `;
};

exports.monthScaleTemplate = monthScaleTemplate;
const taskAvatar = (0, _memoizeOne.default)(assignee => {
  if (assignee) {
    if (assignee.image) {
      const src = assignee.image;
      const withAuthSrc = src.startsWith('data:') ? src : `${src}?access_token=${_affectliSso.default.getToken() || ''}`;
      return `<img src="${withAuthSrc}" alt="avatar"/>`;
    }

    const initials = (0, _avatar.createInitials)(assignee.name);
    const bg = (0, _avatar.generateColor)(Object.values(_theme.default.statusColors), assignee.name);

    if (typeof bg === 'string') {
      return `<div class="task-template__avatar__icon" style="background: ${bg}">${initials}</div>`;
    }
  } else {
    return `<img src="'/temp/img/avatar-default.jpg'" alt="avatar"/>`;
  }
});
exports.taskAvatar = taskAvatar;

const taskTemplate = task => {
  return `
        <div class="task-template">
            <div class="task-template__avatar">
                ${taskAvatar(task.assignee)}
            </div>
            <div class="task-template__info">
               <h3>
                    <a href="javascript:void(0)">${task.text}</a>
               </h3>
               <h4>
                    <a href="javascript:void(0)">#${task.id}</a>
               </h4>
            </div>
        </div>
    `;
};

exports.taskTemplate = taskTemplate;

const gridTaskTemplate = task => {
  return `
        <div class="task-template grid-template">
            <div class="task-template__info">
               <h3>
                    <a href="javascript:void(0)" target="_blank">${task.text}</a>
               </h3>
               <h4>
                    <a href="javascript:void(0)" target="_blank">#${task.id}</a>
               </h4>
            </div>
        </div>
    `;
};

exports.gridTaskTemplate = gridTaskTemplate;

const gridTaskStartDateTemplate = task => {
  return (0, _date.formatDate)(task.start_date, 'DD-MM-YYYY');
};

exports.gridTaskStartDateTemplate = gridTaskStartDateTemplate;

const gridTaskEndDateTemplate = task => {
  return (0, _date.formatDate)(task.end_date, 'DD-MM-YYYY');
};

exports.gridTaskEndDateTemplate = gridTaskEndDateTemplate;

const tooltipTemplate = task => {
  const startDate = (0, _date.formatDate)(task.start_date, 'DD-MM-YYYY HH:mm');
  const endDate = (0, _date.formatDate)(task.end_date, 'DD-MM-YYYY HH:mm');
  return `
        <div class="tooltip-template">
            <b>Assignee: </b>${task.assignee ? task.assignee.name : 'No Assignee'}<br/>
            <b>Progress: </b>${task.progress * 100}%<br/>
            <b>Priority: </b>${(0, _aboxConfig.getPriorityLabel)(task.priority)}<br/>
            <b>Start Date: </b>${startDate}<br/>
            <b>Due Date: </b>${endDate}<br/>
        </div>
    `;
};

exports.tooltipTemplate = tooltipTemplate;