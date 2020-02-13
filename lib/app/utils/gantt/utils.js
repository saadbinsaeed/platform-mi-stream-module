"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTaskStartDate = exports.getLatestPredecessor = void 0;

var _date = require("../date/date");

const getLatestPredecessor = (task, taskWithPredecessor) => {
  // get all predecessor related to the current task and get the dues dates
  const predecessorTasks = taskWithPredecessor.filter(predecessorTask => {
    return predecessorTask.sourceTaskId === task.id;
  }); // get the latest due date and compare with current task start date

  const latestDueDate = new Date(Math.max.apply(null, predecessorTasks.map(({
    predecessor: {
      dueDate
    }
  }) => {
    return new Date(dueDate);
  })));
  return predecessorTasks.find(({
    predecessor: {
      dueDate
    }
  }) => {
    return (0, _date.formatDate)(dueDate, 'DD-MM-YYYY HH:mm') === (0, _date.formatDate)(latestDueDate, 'DD-MM-YYYY HH:mm');
  });
};

exports.getLatestPredecessor = getLatestPredecessor;

const validateTaskStartDate = (task, taskWithPredecessor) => {
  const {
    id,
    start_date
  } = { ...task
  };
  const newStartDate = new Date(start_date);
  const taskHasPredecessor = taskWithPredecessor.find(d => d.sourceTaskId === id); // if task doesn't have any predecessor update the task

  if (!taskHasPredecessor) return true; // get latest predecessor

  const latestPredecessor = getLatestPredecessor(task, taskWithPredecessor);

  if (latestPredecessor && latestPredecessor.predecessor && new Date(latestPredecessor.predecessor.dueDate) > newStartDate) {
    return false;
  }

  return true;
};

exports.validateTaskStartDate = validateTaskStartDate;