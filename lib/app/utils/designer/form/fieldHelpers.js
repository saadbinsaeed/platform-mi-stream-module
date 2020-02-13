"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _platformUi = require("@mic3/platform-ui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const getHelper = type => ({
  name: _react.default.createElement(_platformUi.Typography, null, "Unique reference used for field (ng-model)"),
  label: _react.default.createElement(_platformUi.Typography, null, "Label for the field."),
  local: _react.default.createElement(_platformUi.Typography, null, "Set variable for as local to the form or global for the process."),
  fieldValue: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_platformUi.Typography, null, "In depend what we need to return from options."), _react.default.createElement(_platformUi.Typography, null, "If we need whole option object leave this field empty."), _react.default.createElement(_platformUi.Typography, null, "If we need return some value, we have to fill this field with full path to the field from option.")),
  expanded: _react.default.createElement(_platformUi.Typography, null, "Set default behaviour of panel: Expanded or Collapsed."),
  help: _react.default.createElement(_platformUi.Typography, null, "Displays custom intructions for the user. "),
  onChange: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_platformUi.Typography, null, 'This function triggers when the value is changed.', _react.default.createElement("br", null), 'The function will receive 2 parameters:'), _react.default.createElement("ul", null, _react.default.createElement("li", null, "a JSON representation of the DOM event."), _react.default.createElement("li", null, "a JSON that contains the form variables.")), _react.default.createElement(_platformUi.Typography, null, 'The function can return an object. The object returned will updates the form variables.', _react.default.createElement("br", null), 'Following an example function to handle the onChange event:'), _react.default.createElement("code", null, `(event, variables) => {
                    const { target: { name, value } } = event;
                    const { b } = variables;
                    return {
                        a: Number(value),
                        sum: Number(value) + (b || 0),
                    };
                }`)),
  staticOptions: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_platformUi.Typography, null, "Enter your options on seperate lines, with key and value (CSV) "), _react.default.createElement(_platformUi.Typography, null, "Example:"), _react.default.createElement(_platformUi.Typography, null, "1,High"), _react.default.createElement(_platformUi.Typography, null, "2,Medium"), _react.default.createElement(_platformUi.Typography, null, "3,Low"))
})[type];

var _default = getHelper;
exports.default = _default;