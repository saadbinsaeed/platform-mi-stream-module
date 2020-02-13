"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.priorityColor = priorityColor;

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIXME: this is not correct, we should use withTheme in the Component or a styled-component to access to the curent theme

/**
 * @deprecated
 *
 * Set the correct color from a priority number passed
 * @param priority
 * @returns {string}
 */
function priorityColor(priority) {
  // console.log('colorPassed', priority);
  let priorityColor = '';

  switch (priority) {
    case 1:
      priorityColor = _theme.default.color.success;
      break;

    case 2:
      priorityColor = _theme.default.color.info;
      break;

    case 3:
      priorityColor = _theme.default.color.alert;
      break;

    case 4:
      priorityColor = _theme.default.color.danger;
      break;

    case 5:
      priorityColor = _theme.default.color.error;
      break;

    default:
      priorityColor = _theme.default.color.success;
  } // console.log('colorPassedReturns', priorityColor);


  return priorityColor;
}