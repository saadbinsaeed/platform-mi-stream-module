"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _moment = _interopRequireDefault(require("moment"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _processActions = require("store/actions/abox/processActions");

var _DataTableClient = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableClient/DataTableClient"));

var _AboxProgressBar = _interopRequireDefault(require("app/components/molecules/ProgressBar/AboxProgressBar"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _PriorityRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Priority/PriorityRenderer"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _ProcessIcon = _interopRequireDefault(require("app/components/atoms/Icon/ProcessIcon"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TaskBarRenderer = props => {
  const {
    data: {
      id,
      name,
      variables,
      endDate,
      processDefinition
    }
  } = props;
  const {
    progress,
    priority
  } = variables || {};
  const iconName = (0, _lo.get)(processDefinition, 'deployedModel.modelData.icon', 'arrange-bring-to-front');
  return _react.default.createElement(_Flex.default, null, _react.default.createElement(_ProcessIcon.default, {
    name: iconName,
    priority: priority,
    disabled: endDate
  }), "\xA0\xA0", _react.default.createElement(_ProcessLink.default, {
    id: id,
    noDecoration: true
  }, "#", id, " - ", name || 'No Name', _react.default.createElement(_AboxProgressBar.default, {
    value: progress || 0,
    priority: priority,
    disabled: !!endDate
  })));
};

const AssigneeAvatarRenderer = props => {
  const {
    image,
    id,
    name
  } = props.value;
  return _react.default.createElement(_PeopleLink.default, {
    title: name,
    id: id
  }, _react.default.createElement(_Avatar.default, {
    size: "lg",
    name: name,
    src: image
  }));
};

const DurationRenderer = props => {
  const {
    data: {
      createDate,
      endDate
    }
  } = props;
  const start_date = createDate ? (0, _moment.default)(createDate) : (0, _moment.default)();
  const end_date = endDate ? (0, _moment.default)(endDate) : (0, _moment.default)();
  const diff = end_date.diff(start_date);

  const duration = _moment.default.utc(diff).format('DDD HH:mm:ss');

  return _react.default.createElement("div", null, duration);
};
/**
 *
 * @example <AboxProcessSubProcessesTab />
 */


class AboxProcessSubProcessesTab extends _react.PureComponent {
  /**
   * constructor - description
   *
   * @param  {type} props: Object description
   * @return {type}               description
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefinitions", void 0);

    this.columnDefinitions = [{
      header: 'ID',
      field: 'id',
      bodyComponent: TaskBarRenderer,
      style: {
        width: '340px'
      }
    }, {
      header: 'Assignee',
      field: 'createdBy',
      bodyComponent: AssigneeAvatarRenderer,
      style: {
        width: '100px',
        textAlign: 'center'
      }
    }, {
      header: 'Priority',
      field: 'variables.priority',
      bodyComponent: _PriorityRenderer.default,
      style: {
        width: '100px',
        textAlign: 'center'
      }
    }, {
      header: 'Modified',
      field: 'status.lastUpdate',
      type: 'date',
      style: {
        width: '160px'
      }
    }, // No specs
    {
      header: 'Created',
      field: 'createDate',
      type: 'date',
      style: {
        width: '160px'
      }
    }, {
      header: 'Closed',
      field: 'endDate',
      type: 'date',
      style: {
        width: '160px'
      }
    }, {
      header: 'Duration',
      field: '__duration__',
      bodyComponent: DurationRenderer,
      style: {
        width: '160px'
      }
    }].map(column => ({ ...column,
      filter: false,
      sortable: false
    }));
  }
  /**
   * componentDidMount - description
   *
   * @return {type}  description
   */


  componentDidMount() {
    const {
      details: {
        id
      },
      children
    } = this.props;

    if (!children || !children.length) {
      this.props.loadSubprocesses(id);
    }
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      childrenLoading,
      children
    } = this.props;

    if (isLoading || childrenLoading) {
      return _react.default.createElement(_Loader.default, {
        absolute: true
      });
    }

    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTableClient.default, {
      columnDefinitions: this.columnDefinitions,
      value: children || [],
      isLoading: childrenLoading,
      disableCountdown: true,
      totalRecords: children && children.length || 0
    }));
  }

}

_defineProperty(AboxProcessSubProcessesTab, "propTypes", {
  details: _propTypes.default.object,
  children: _propTypes.default.array,
  isLoading: _propTypes.default.bool,
  childrenLoading: _propTypes.default.bool
});

_defineProperty(AboxProcessSubProcessesTab, "defaultProps", {
  details: {},
  isLoading: false,
  children: [],
  childrenLoading: false
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.process.details.isLoading,
  details: state.abox.process.details.data,
  children: state.abox.process.children.data,
  childrenLoading: state.abox.process.children.isLoading
}), {
  loadSubprocesses: _processActions.loadSubprocesses
})(AboxProcessSubProcessesTab);

exports.default = _default;