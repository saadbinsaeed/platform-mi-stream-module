"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _DataTableClient = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableClient/DataTableClient"));

var _TaskLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/TaskLinkRenderer"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _PriorityRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Priority/PriorityRenderer"));

var _ProgressRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Progress/ProgressRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TaskStatus = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "AboxExpandedProcessTemplate__TaskStatus",
  componentId: "a84yt8-0"
})(["font-weight:400;text-transform:capitalize;"]);

class AboxExpandedProcessTemplate extends _react.PureComponent {
  /**
   * @const propTypes - describes the properties of the component
   * @const defaultProps - define the defaults values of the properties
   * @const columnDefinitions -definition for columns that we need to display in our grid
   */

  /**
   * @param {Object} props - component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "loaderWrapperStyle", {
      width: '50px',
      paddingTop: '5px'
    });

    this.columnDefinitions = [{
      header: 'Task ID',
      field: 'id',
      bodyComponent: _TaskLinkRenderer.default
    }, {
      header: 'Task Name',
      field: 'name',
      bodyComponent: _TaskLinkRenderer.default
    }, {
      header: 'Description',
      field: 'description'
    }, {
      header: 'Assignee',
      field: 'assignee.name',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'assignee.id',
        imageProperty: 'assignee.image',
        nameProperty: 'assignee.name'
      }
    }, {
      header: 'Progress',
      field: 'variable.completion',
      style: {
        textAlign: 'center',
        width: '100px'
      },
      bodyComponent: _ProgressRenderer.default
    }, {
      header: 'Priority',
      field: 'priority',
      bodyComponent: _PriorityRenderer.default,
      style: {
        textAlign: 'center',
        width: '100px'
      }
    }, {
      header: 'Due',
      field: 'dueDate',
      type: 'date'
    }, {
      header: 'Created',
      field: 'startDate',
      type: 'date'
    }, {
      header: 'Comments',
      field: 'comments',
      renderValue: ({
        value
      }) => value && value.length || 0
    }, {
      header: 'Status',
      field: 'variable.taskStatus.status',
      bodyComponent: ({
        value
      }) => _react.default.createElement(TaskStatus, null, value)
    }].map(column => ({ ...column,
      filter: false
    }));
  }
  /**
   * @override
   */


  render() {
    return this.props.isLoading ? _react.default.createElement("div", {
      style: this.loaderWrapperStyle
    }, " ", _react.default.createElement(_Loader.default, {
      radius: "20"
    }), " ") : _react.default.createElement(_DataTableClient.default, {
      columnDefinitions: this.columnDefinitions,
      value: this.props.data || [],
      loading: this.props.isLoading
    });
  }

}

_defineProperty(AboxExpandedProcessTemplate, "propTypes", {
  data: _propTypes.default.arrayOf(_propTypes.default.object),
  isLoading: _propTypes.default.bool
});

var _default = AboxExpandedProcessTemplate;
exports.default = _default;