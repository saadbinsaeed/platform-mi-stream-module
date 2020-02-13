"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _VirtualListManaged = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListManaged"));

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _appActions = require("store/actions/app/appActions");

var _DashboardProcessListItem = _interopRequireDefault(require("app/components/Dashboard/DashboardProcessListItem"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * View to display assigned task list
 */
let DashboardProcessList = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class DashboardProcessList extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "filterDefinitions", [{
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
      field: 'createdBy.id',
      type: 'userTypeahead',
      properties: {
        label: 'Created by',
        name: 'createdById'
      },
      condition: '='
    }, {
      field: 'createDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Created date',
        name: 'createDate'
      }
    }, {
      field: 'status.lastUpdate',
      type: 'dateTimeRange',
      properties: {
        label: 'Last updated date',
        name: 'statusLastUpdate'
      }
    }]);

    _defineProperty(this, "searchBar", ['name', 'id']);

    _defineProperty(this, "defaultOrder", [{
      field: 'createDate',
      direction: 'desc'
    }]);

    _defineProperty(this, "renderComponent", props => _react.default.createElement(_DashboardProcessListItem.default, _extends({
      key: props.index
    }, props)));
  }

  componentDidMount() {
    this.props.setHeader({
      title: this.props.title
    });
  }

  buildId(title) {
    return `DashboardProcessList_${(title || '').replace(/\W/g, '') || 'default'}`;
  }
  /**
   * @override
   */


  render() {
    const {
      records,
      isLoading,
      totalRecords,
      startIndex,
      loadData,
      title,
      orderBy
    } = this.props;
    return _react.default.createElement(_Filters.default, {
      id: this.buildId(title),
      filterDefinitions: this.filterDefinitions,
      searchBar: this.searchBar,
      defaultOrder: orderBy || this.defaultOrder
    }, (filterBy, orderBy) => _react.default.createElement(_VirtualListManaged.default, {
      renderComponent: this.renderComponent,
      itemSize: 167,
      itemCount: totalRecords || 0,
      loadData: loadData,
      isLoading: isLoading,
      startIndex: startIndex || 0,
      filterBy: filterBy,
      orderBy: orderBy,
      list: records,
      maxWidth: "1024",
      title: `${totalRecords >= 1000 ? '999+' : totalRecords} Processes`
    }));
  }

}, _defineProperty(_class2, "propTypes", {
  loadData: _propTypes.default.func.isRequired,
  title: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  userProfile: _propTypes.default.object,
  setHeader: _propTypes.default.func.isRequired
}), _defineProperty(_class2, "defaultProps", {
  isLoading: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "buildId", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildId"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(null, {
  setHeader: _appActions.setHeader
})(DashboardProcessList);

exports.default = _default;