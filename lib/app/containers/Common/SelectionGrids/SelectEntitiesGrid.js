"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactRedux = require("react-redux");

var _groupsActions = require("store/actions/admin/groupsActions");

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _gridActions = require("store/actions/grid/gridActions");

var _ClassificationsRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/ClassificationsRenderer/ClassificationsRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a grid to select one ore more Users.
 */
class SelectEntitiesGrid extends _react.PureComponent {
  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(_props) {
    super(_props);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "gridSettings", void 0);

    _defineProperty(this, "onSelectionChanged", event => {
      this.props.onSelectionChanged(event.data);
    });

    _defineProperty(this, "loadRows", options => {
      return this.props.loadAvailableEntities(this.props.groupId, this.props.entityType, this.props.userProfile.isAdmin, options);
    });

    _defineProperty(this, "buildColumnDefinitions", (0, _memoizeOne.default)((classifications, entityType, isAdmin) => {
      const columns = [{
        header: 'ID',
        field: 'id',
        type: entityType === 'proc_def' ? 'text' : 'number',
        style: {
          width: '320px'
        }
      }, {
        header: 'Name',
        field: 'name',
        style: {
          width: '320px'
        }
      }];

      if (isAdmin && entityType !== 'proc_def') {
        columns.push({
          header: 'Active',
          field: 'active',
          type: 'boolean',
          sortable: false,
          bodyComponent: _BooleanRenderer.default,
          bodyComponentProps: {
            isTrue: value => value === true
          },
          renderValue: ({
            value
          }) => value === true ? 'Active' : 'Inactive',
          options: [{
            label: 'All',
            value: ''
          }, {
            label: 'Active',
            value: true
          }, {
            label: 'Inactive',
            value: false
          }],
          style: {
            width: '100px',
            textAlign: 'center'
          }
        });
      }

      if (entityType !== 'proc_def') {
        columns.push({
          header: 'Classification',
          field: 'classes.uri',
          sortable: false,
          filterMatchMode: '=',
          bodyComponent: props => _react.default.createElement(_ClassificationsRenderer.default, _extends({}, props, {
            valueField: "classes",
            label: 'name',
            redirectTo: entityType
          })),
          renderValue: ({
            value
          }) => (value || []).map(classification => classification).join(', '),
          options: (classifications || []).map(({
            name,
            uri
          }) => ({
            value: uri,
            label: name
          })),
          style: {
            width: '320px'
          }
        });
      }

      return columns;
    }));

    this.state = {
      lastUpdateDate: Date.now()
    };
    this.gridSettings = {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    };

    if (_props.entityType && _props.entityType !== 'proc_def') {
      this.props.loadClassificationsDropDownForGrid({
        filterBy: [{
          field: 'active',
          op: '=',
          value: true
        }, {
          field: 'applicableOn',
          op: '=',
          value: this.props.entityType
        }]
      });
    }
  }
  /**
   * componentDidUpdate - description
   *
   * @param  {type} prevProps: Object description
   * @return {type}                   description
   */


  componentDidUpdate(prevProps) {
    const {
      lastActionType,
      lastActionError
    } = this.props;

    if (this.props.entityType !== prevProps.entityType || !lastActionError && lastActionType === _groupsActions.ADD_ENTITIES_TO_GROUP && lastActionType !== prevProps.lastActionType) {
      this.setState({
        lastUpdateDate: Date.now()
      });
    }
  }
  /**
   * onSelectionChanged - description
   *
   * @param  {type} event: Object description
   * @return {type}               description
   */


  /**
   * @override
   */
  render() {
    const {
      isLoading,
      classificationsLoading,
      classifications
    } = this.props;
    return _react.default.createElement(_DataTable.default, {
      key: this.state.lastUpdateDate,
      dataTableId: `${this.props.dataTableId}/${this.props.entityType}`,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.buildColumnDefinitions(classifications, this.props.entityType, this.props.userProfile.isAdmin),
      loadRows: this.loadRows,
      isLoading: isLoading || classificationsLoading,
      name: "select_entities",
      disableCountdown: true,
      disableExport: true,
      value: this.props.records,
      totalRecords: this.props.recordsCount,
      countMax: this.props.recordsCountMax,
      dataKey: 'id',
      selectionMode: "multiple",
      onSelectionChange: this.onSelectionChanged
    });
  }

}

_defineProperty(SelectEntitiesGrid, "propTypes", {
  loadAvailableEntities: _propTypes.default.func.isRequired,
  onSelectionChanged: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  isDownloading: _propTypes.default.bool,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  entityType: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom', 'proc_def']).isRequired,
  groupId: _propTypes.default.string.isRequired,
  loadClassificationsDropDownForGrid: _propTypes.default.func.isRequired,
  classifications: _propTypes.default.array,
  classificationsLoading: _propTypes.default.bool,
  lastActionType: _propTypes.default.string,
  lastActionError: _propTypes.default.bool,
  dataTableId: _propTypes.default.string,
  userProfile: _propTypes.default.object
});

_defineProperty(SelectEntitiesGrid, "defaultProps", {
  isLoading: false,
  classificationsLoading: false
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.admin.groups.addEntitiesList.isLoading,
  records: state.admin.groups.addEntitiesList.records,
  recordsCount: state.admin.groups.addEntitiesList.count,
  recordsCountMax: state.admin.groups.addEntitiesList.countMax,
  classificationsLoading: state.grid.dropdowns.classifications.isLoading,
  classifications: state.grid.dropdowns.classifications.records,
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  userProfile: state.user.profile
}), {
  loadAvailableEntities: _groupsActions.loadAvailableEntities,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(SelectEntitiesGrid);

exports.default = _default;