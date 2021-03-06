"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linesFormatter = exports.tasksFormatter = void 0;

var _dhtmlxGantt = require("dhtmlx-gantt");

var _bpmnEngineUtils = require("app/utils/bpmn/bpmnEngineUtils");

var _date = require("../date/date");

const tasksFormatter = tasks => {
  const taskIdArr = tasks.map(task => task.id);
  return tasks.map(task => {
    const {
      bpmnVariables,
      dueDate,
      variable,
      parent
    } = task;
    const bpmnVariablesObj = (0, _bpmnEngineUtils.bmpnVariablesToObject)(bpmnVariables);
    const startDate = (0, _date.formatDate)(bpmnVariablesObj.startDate.replace(/['"]+/g, ''), 'DD-MM-YYYY HH:mm');
    const endDate = (0, _date.formatDate)(dueDate, 'DD-MM-YYYY HH:mm');
    const progress = variable ? variable.completion * .01 : 0;
    let parentTaskId = parent && parent.id;
    parentTaskId = taskIdArr.includes(parentTaskId) ? parentTaskId : null;
    return { ...task,
      text: task.name,
      start_date: startDate,
      end_date: endDate,
      parent: parentTaskId,
      progress: progress,
      open: true
    };
  });
};

exports.tasksFormatter = tasksFormatter;

const linesFormatter = tasks => {
  const relationships = [];
  const lines = [];
  const tasksWithPredecessor = []; // get the relationship lines to be formatted later

  tasks.filter(task => task.relationships && task.relationships.length > 0).forEach(task => {
    const newTask = { ...task
    };
    newTask.relationships.forEach(rel => {
      const {
        task2,
        task1,
        relationDefinition: {
          entityType1,
          relation
        }
      } = rel; // filter out relationship based on task

      if (entityType1 === 'task' && task2 && task1 && (relation === 'Predecessor' || relation === 'Successor')) {
        relationships.push({ ...rel,
          sourceTaskId: task.id
        });
      }
    });
  }); // create lines based on relationship array

  relationships.forEach(rel => {
    const {
      sourceTaskId,
      id,
      task2,
      task1
    } = rel;
    const currentLine = {
      id: id
    };
    let source, target; // if the related item is a predecessor

    if (sourceTaskId !== task2.id) {
      source = task2.id;
      target = sourceTaskId;
      tasksWithPredecessor.push({
        sourceTaskId: sourceTaskId,
        predecessor: task2
      });
    } else {
      // if the related item is a successor
      source = sourceTaskId;
      target = task1.id;
    }

    lines.push({ ...currentLine,
      source: source,
      target: target,
      type: _dhtmlxGantt.gantt.config.links.finish_to_start
    });
  });
  return {
    lines: lines,
    tasksWithPredecessor: tasksWithPredecessor
  };
};

exports.linesFormatter = linesFormatter;