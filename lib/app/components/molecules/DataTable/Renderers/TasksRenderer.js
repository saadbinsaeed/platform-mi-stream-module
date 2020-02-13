"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Tasks Renderer displays the tasks id
 */
class TasksRenderer extends _react.PureComponent {
  /**
   * Render
   */
  render() {
    const tasks = this.props.value || [];
    return _react.default.createElement("ul", null, tasks.filter(task => !task.endDate).map(task => _react.default.createElement("li", {
      key: task.id
    }, _react.default.createElement(_reactRouterDom.Link, {
      to: `/legacy/task/${task.id}`
    }, _react.default.createElement("span", null, task.id, " - ", task.name)))));
  }

}

var _default = TasksRenderer;
exports.default = _default;