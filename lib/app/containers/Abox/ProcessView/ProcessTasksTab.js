"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _moment = _interopRequireDefault(require("moment"));

var _reactRouterDom = require("react-router-dom");

var _recompose = require("recompose");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _AboxProgressBar = _interopRequireDefault(require("app/components/molecules/ProgressBar/AboxProgressBar"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _DataTableClient = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableClient/DataTableClient"));

var _PriorityRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Priority/PriorityRenderer"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _taskActions = require("store/actions/abox/taskActions");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TaskLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "ProcessTasksTab__TaskLink",
  componentId: "sc-14owrow-0"
})(["text-decoration:none;"]);
const CustomIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "ProcessTasksTab__CustomIcon",
  componentId: "sc-14owrow-1"
})(["cursor:default;"]);

const AssigneeAvatarStyle = _styledComponents.default.div.withConfig({
  displayName: "ProcessTasksTab__AssigneeAvatarStyle",
  componentId: "sc-14owrow-2"
})(["display:flex;justify-content:center;"]);

const TaskBarRenderer = (0, _recompose.onlyUpdateForKeys)(['data'])(props => {
  const {
    data: {
      id,
      name,
      variable,
      endDate,
      priority
    }
  } = props;
  const {
    completion
  } = variable || {};
  return _react.default.createElement(_Flex.default, null, _react.default.createElement(CustomIcon, {
    name: "task-list",
    type: "af"
  }), "\xA0\xA0", _react.default.createElement(TaskLink, {
    to: `/abox/task/${id}`
  }, "#", id, " - ", name || 'No Name', _react.default.createElement(_AboxProgressBar.default, {
    value: completion || 0,
    priority: priority,
    disabled: !!endDate
  })));
});

const AssigneeAvatarRenderer = props => {
  const {
    value,
    data: {
      assignee
    }
  } = props;
  return _react.default.createElement(AssigneeAvatarStyle, null, assignee && assignee.id ? _react.default.createElement(_PeopleLink.default, {
    title: value,
    id: assignee.id
  }, _react.default.createElement(_Avatar.default, {
    size: "lg",
    src: assignee.image,
    name: assignee.name || 'No Name'
  })) : 'No Assignee');
};

const DurationRenderer = props => {
  const {
    data: {
      startDate,
      endDate
    }
  } = props;
  const start_date = startDate ? (0, _moment.default)(startDate) : (0, _moment.default)();
  const end_date = endDate ? (0, _moment.default)(endDate) : (0, _moment.default)();
  const diff = end_date.diff(start_date);

  const duration = _moment.default.utc(diff).format('HH:mm:ss');

  return _react.default.createElement("div", null, duration);
};
/**
 *
 */


class ProcessTasksTab extends _react.PureComponent {
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
      field: 'assignee.name',
      bodyComponent: AssigneeAvatarRenderer,
      style: {
        width: '100px'
      }
    }, {
      header: 'Priority',
      field: 'priority',
      bodyComponent: _PriorityRenderer.default,
      style: {
        width: '100px',
        textAlign: 'center'
      }
    }, {
      header: 'Created',
      field: 'startDate',
      type: 'date',
      style: {
        width: '160px'
      }
    }, // { header: 'Due', field: 'due', style: { width: '160px' } },  // No specs
    // { header: 'Modified', field: 'modifiedDate', style: { width: '160px' } },// No specs
    {
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

  componentDidMount() {
    if (this.props.details && this.props.details.id) {
      this.props.loadProcessTasks(this.props.details.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.details !== this.props.details && (prevProps.details && prevProps.details.id) !== (this.props.details && this.props.details.id)) {
      if (this.props.details && this.props.details.id) {
        this.props.loadProcessTasks(this.props.details.id);
      }
    }
  }
  /**
   * @override
   */


  render() {
    const {
      details,
      isLoading,
      tasks
    } = this.props;

    if (isLoading) {
      return _react.default.createElement(_Loader.default, {
        absolute: true
      });
    }

    if (!details) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: 'Process Tasks'
      });
    }

    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTableClient.default, {
      columnDefinitions: this.columnDefinitions,
      value: tasks,
      isLoading: isLoading,
      disableCountdown: true,
      totalRecords: tasks && tasks.length || 0
    }));
  }

}

_defineProperty(ProcessTasksTab, "propTypes", {
  details: _propTypes.default.object,
  isLoading: _propTypes.default.bool,
  tasks: _propTypes.default.array,
  loadProcessTasks: _propTypes.default.func.isRequired
});

_defineProperty(ProcessTasksTab, "defaultProps", {
  details: {},
  isLoading: false,
  tasks: []
});

var _default = (0, _reactRedux.connect)((state, props) => {
  const id = (0, _utils.getStr)(state.abox.process.details.data, 'id') || '_';
  const tasks = state.abox.process.tasks[id] || {};
  const isLoading = state.abox.process.details.isLoading || tasks.isLoading;
  return {
    isLoading,
    details: state.abox.process.details.data,
    tasks: tasks.data || []
  };
}, {
  loadProcessTasks: _taskActions.loadProcessTasks
})(ProcessTasksTab);

exports.default = _default;