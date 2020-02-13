"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _filterConditions = require("app/utils/static/filter-conditions");

var _taskActions = require("store/actions/abox/taskActions");

var _aboxConfig = require("app/config/aboxConfig");

var _lo = require("app/utils/lo/lo");

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

var _TasksViewItem = _interopRequireDefault(require("./TasksViewItem"));

var _VirtualListManaged = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListManaged"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * View to display assigned task list
 */
let TasksView = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class TasksView extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      deleted: {}
    });

    _defineProperty(this, "virtualListRef", _react.default.createRef());

    _defineProperty(this, "searchBar", ['name', 'id']);

    _defineProperty(this, "defaultFilters", {
      status: 'is null',
      involvement: 'assignee'
    });

    _defineProperty(this, "defaultOrder", [{
      field: 'taskStatus.lastUpdate',
      direction: 'desc'
    }]);

    _defineProperty(this, "filterDefinitions", [{
      field: 'assignee.id',
      type: 'userTypeahead',
      properties: {
        label: 'Assignee',
        name: 'assigneeId'
      },
      condition: '='
    }, {
      field: 'involvement',
      type: 'typeahead',
      properties: {
        label: 'My involvement',
        name: 'involvement',
        options: _filterConditions.involvementConditions
      },
      sort: false
    }, {
      field: 'name',
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      }
    }, {
      field: 'id',
      type: 'text',
      properties: {
        label: 'ID',
        name: 'id'
      },
      condition: '='
    }, {
      field: 'endDate',
      type: 'typeahead',
      properties: {
        label: 'Status',
        name: 'status',
        options: [{
          value: 'is null',
          label: 'Open'
        }, {
          value: 'is not null',
          label: 'Closed'
        }]
      },
      sort: false
    }, {
      field: 'priority',
      type: 'typeahead',
      properties: {
        label: 'Priority',
        name: 'priority',
        options: _aboxConfig.PRIORITY_OPTIONS
      },
      condition: '='
    }, {
      field: 'process.processDefinition.name',
      type: 'processTypeTypeahead',
      properties: {
        label: 'Process Type',
        name: 'processDefinitionName'
      },
      condition: '='
    }, {
      field: 'startDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Created date',
        name: 'startDate'
      }
    }, {
      field: 'bpmnVariables.startDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Start date',
        name: 'bpmnVariablesStartDate'
      }
    }, {
      field: 'dueDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Due date',
        name: 'dueDate'
      }
    }, {
      field: 'endDate',
      type: 'dateTimeRange',
      properties: {
        label: 'End date',
        name: 'endDate'
      }
    }, {
      field: 'taskStatus.lastUpdate',
      type: 'dateTimeRange',
      properties: {
        label: 'Last updated date',
        name: 'taskStatusLastUpdate'
      }
    }]);
  }

  handleDelete(id) {
    this.setState({
      deleted: (0, _lo.set)(this.state.deleted, id, true)
    }, this.forceUpdateGrid);
  }

  renderComponent({
    style,
    index,
    data
  }) {
    const {
      deleted
    } = this.state;
    const id = data && data.id;
    return _react.default.createElement("div", {
      style: style,
      key: index
    }, _react.default.createElement(_TasksViewItem.default, {
      data: data,
      resetView: this.resetView,
      isDeleted: id && deleted[id],
      handleDelete: this.handleDelete
    }));
  }

  resetView() {
    this.virtualListRef.current && this.virtualListRef.current.resetView();
  }

  forceUpdateGrid() {
    this.virtualListRef.current && this.virtualListRef.current.forceUpdate();
  }

  loadTasks(options) {
    const {
      activitiId,
      groups
    } = this.props.userProfile;
    const filterBy = [];
    (options.filterBy || []).forEach(filter => {
      const {
        or,
        field,
        op,
        value
      } = filter;

      if (or) {
        filterBy.push(filter);
      } else if (field === 'involvement') {
        switch (value) {
          case 'assignee':
            filterBy.push({
              field: 'assignee.activitiId',
              op: '=',
              value: activitiId
            });
            break;

          case 'owner':
            filterBy.push({
              field: 'owner.activitiId',
              op: '=',
              value: activitiId
            });
            break;

          case 'teamMember':
            filterBy.push({
              or: [{
                field: 'teamMembers.user.activitiId',
                op: '=',
                value: activitiId
              }, {
                field: 'teamMembers.group.id',
                op: 'in',
                value: groups
              }]
            });
            break;

          default:
        }
      } else if (field.startsWith('bpmnVariables')) {
        const name = field.split('.')[1];
        filterBy.push({
          field: 'bpmnVariables.name',
          op: '=',
          value: name
        }, {
          field: 'bpmnVariables.text',
          op,
          value
        });
      } else {
        filterBy.push(filter);
      }
    });

    if (this.props.loadData) {
      return this.props.loadData({ ...options,
        filterBy
      });
    }

    return this.props.loadTasks({ ...options,
      filterBy
    });
  }

  render() {
    const {
      FiltersProps,
      records,
      isLoading,
      totalRecords,
      startIndex,
      VirtualListProps,
      className
    } = this.props;
    const {
      itemCount
    } = VirtualListProps;
    const total = itemCount || totalRecords;
    return _react.default.createElement(_Filters.default, _extends({
      filterDefinitions: this.filterDefinitions,
      searchBar: this.searchBar,
      defaultFilters: this.defaultFilters,
      defaultOrder: this.defaultOrder,
      className: className
    }, FiltersProps), (filterBy, orderBy) => _react.default.createElement(_VirtualListManaged.default, _extends({
      itemCount: totalRecords || 0,
      itemSize: 110,
      isLoading: isLoading,
      startIndex: startIndex || 0,
      list: records,
      maxWidth: "1024",
      title: `${total >= 1000 ? '999+' : total} Tasks`
    }, VirtualListProps, {
      loadData: this.loadTasks,
      filterBy: filterBy,
      orderBy: orderBy,
      renderComponent: this.renderComponent,
      ref: this.virtualListRef
    })));
  }

}, _defineProperty(_class2, "propTypes", {
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  loadTasks: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.object,
  setHeader: _propTypes.default.func
}), _defineProperty(_class2, "defaultProps", {
  isLoading: false,
  VirtualListProps: {},
  FiltersProps: {}
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "handleDelete", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleDelete"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "renderComponent", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "renderComponent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetView", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "resetView"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "forceUpdateGrid", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "forceUpdateGrid"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadTasks", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "loadTasks"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.task.list.isLoading,
  startIndex: state.abox.task.list.startIndex,
  records: state.abox.task.list.records,
  totalRecords: state.abox.task.list.count,
  userProfile: state.user.profile
}), {
  loadTasks: _taskActions.loadTasks
})(TasksView);

exports.default = _default;