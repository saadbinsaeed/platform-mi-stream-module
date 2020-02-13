"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _taskActions = require("store/actions/abox/taskActions");

var _AddSubtask = _interopRequireDefault(require("app/containers/Abox/TaskView/AddSubtask"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _TasksView = _interopRequireDefault(require("app/components/organisms/TasksView/TasksView"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the view to display the classification.
 */
let TaskSubTasksTab = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class TaskSubTasksTab extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isAddSubtaskOpen: false,
      taskViewKey: 1
    });

    _defineProperty(this, "defaultOrder", [{
      field: 'name',
      direction: 'desc'
    }]);
  }

  loadData(options) {
    return this.props.loadSubtasks({ ...options,
      id: this.props.details.id
    });
  }

  toggleAddSubtask() {
    this.setState({
      isAddSubtaskOpen: !this.state.isAddSubtaskOpen
    });
  }

  resetView() {
    this.setState(state => ({
      taskViewKey: state.taskViewKey + 1
    }));
  }

  buildVirtualListProps(totalRecords, records, isLoading, startIndex) {
    return {
      itemCount: totalRecords || 0,
      list: records,
      isLoading,
      startIndex: startIndex || 0,
      title: `${totalRecords >= 1000 ? '999+' : totalRecords} Sub Tasks`
    };
  }

  buildFiltersProps(id) {
    return {
      id: `TaskSubTasksTab.${id}`,
      defaultOrder: this.defaultOrder,
      defaultFilters: {}
    };
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      records,
      details: {
        id,
        endDate
      },
      totalRecords,
      startIndex,
      addSubtask
    } = this.props;
    const {
      isAddSubtaskOpen,
      taskViewKey
    } = this.state;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Layout.default, {
      noPadding: true
    }, _react.default.createElement(_TasksView.default, {
      key: taskViewKey,
      loadData: this.loadData,
      FiltersProps: this.buildFiltersProps(id),
      VirtualListProps: this.buildVirtualListProps(totalRecords, records, isLoading, startIndex)
    })), !endDate && _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_TextIcon.default, {
      icon: "plus",
      label: "Add Sub-Task",
      onClick: this.toggleAddSubtask
    }), _react.default.createElement(_Modal.default, {
      title: "Add Subtask",
      open: isAddSubtaskOpen,
      onToggle: this.toggleAddSubtask
    }, _react.default.createElement(_AddSubtask.default, {
      taskId: id,
      addSubtask: addSubtask,
      refreshList: this.resetView,
      closeAddSubtask: this.toggleAddSubtask,
      onSubtaskAdded: this.props.onSubtaskAdded
    }))));
  }

}, _defineProperty(_class2, "propTypes", {
  details: _propTypes.default.object,
  loadSubtasks: _propTypes.default.func,
  addSubtask: _propTypes.default.func,
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  onSubtaskAdded: _propTypes.default.func,
  loadMessenger: _propTypes.default.func
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "loadData", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "loadData"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleAddSubtask", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleAddSubtask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetView", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "resetView"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildVirtualListProps", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildVirtualListProps"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildFiltersProps", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "buildFiltersProps"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  details: state.abox.task.details.data,
  records: state.abox.task.subtasks.records,
  isLoading: state.abox.task.subtasks.isLoading,
  totalRecords: state.abox.task.subtasks.count,
  startIndex: state.abox.task.subtasks.startIndex
}), {
  loadSubtasks: _taskActions.loadSubtasks,
  addSubtask: _taskActions.addSubtask,
  loadMessenger: _messengerActions.loadMessenger
})((0, _reactRouterDom.withRouter)(TaskSubTasksTab));

exports.default = _default;