"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _TasksView = _interopRequireDefault(require("app/components/organisms/TasksView/TasksView"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LayoutStyled = (0, _styledComponents.default)(_TasksView.default).withConfig({
  displayName: "TaskList__LayoutStyled",
  componentId: "wuk8ry-0"
})(["grid-area:pContent;"]);

const TaskList = () => _react.default.createElement(_PageTemplate.default, {
  title: "Tasks",
  overflowHidden: true
}, _react.default.createElement(LayoutStyled, {
  FiltersProps: {
    id: 'TaskListFilters'
  }
}));

var _default = TaskList;
exports.default = _default;