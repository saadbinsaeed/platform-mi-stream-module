"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Changelog = _interopRequireDefault(require("app/components/organisms/Changelog/Changelog"));

var _lo = require("app/utils/lo/lo");

var _taskActions = require("store/actions/abox/taskActions");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Render the Task's changelog tab.
 */
let TaskTimelineTab = (_class = (_temp = _class2 = class TaskTimelineTab extends _react.PureComponent {
  loadData(options) {
    return this.props.loadTaskChangelog(this.props.id, options);
  }

  render() {
    const {
      isLoading,
      startIndex,
      changelog,
      count
    } = this.props;
    return _react.default.createElement(_Changelog.default, {
      entityType: "task",
      isLoading: isLoading,
      startIndex: startIndex,
      changelog: changelog,
      count: count,
      translations: TaskTimelineTab.translations,
      loadData: this.loadData
    });
  }

}, _defineProperty(_class2, "propTypes", {
  id: _propTypes.default.string.isRequired,
  loadTaskChangelog: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  startIndex: _propTypes.default.number.isRequired,
  changelog: _propTypes.default.arrayOf(_propTypes.default.object),
  count: _propTypes.default.number
}), _defineProperty(_class2, "translations", {
  'children': 'subtask'
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "loadData", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "loadData"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.task.changelog.isLoading || false,
  changelog: (0, _lo.get)(state, 'abox.task.changelog.data.changes'),
  startIndex: (0, _lo.get)(state, 'abox.task.changelog.data.startIndex') || 0,
  count: (0, _lo.get)(state, 'abox.task.changelog.data.count')
}), {
  loadTaskChangelog: _taskActions.loadTaskChangelog
})(TaskTimelineTab);

exports.default = _default;