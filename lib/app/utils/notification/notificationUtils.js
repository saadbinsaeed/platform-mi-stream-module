"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNewWindowNeeded = exports.getCustomAction = void 0;

var _utils = require("app/utils/utils");

const ACTIONS_ARRAY = ['navigate', 'pentahoReport', 'sendTaskMessage']; // In future if we have other actions that needs a new window we will add them here

const getCustomAction = (actionData, actionType) => {
  if (!(0, _utils.isDefined)(actionData) || !(0, _utils.isDefined)(actionType)) return null;
  const serverURL = window.location.origin;

  if (actionType === 'sendTaskMessage') {
    const [type, id] = String(actionData).split(',').map(str => str.trim());

    if (type && id) {
      return `/#/activity-actions/${type}/${id}`;
    }

    return null;
  }

  return {
    openTask: `/#/abox/task/${actionData}`,
    openProcess: `/#/abox/process/${actionData}`,
    navigate: actionData,
    openEntity: `/#/entity/${actionData}`,
    pentahoReport: `${serverURL}/pentaho/api/repos/${actionData}/generatedContent`
  }[actionType];
};

exports.getCustomAction = getCustomAction;

const isNewWindowNeeded = actionType => {
  return ACTIONS_ARRAY.includes(actionType);
};

exports.isNewWindowNeeded = isNewWindowNeeded;