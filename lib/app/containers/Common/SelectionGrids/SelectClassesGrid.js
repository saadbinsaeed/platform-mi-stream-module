"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _ClassificationLink = _interopRequireDefault(require("app/components/Classifications/ClassificationLink/ClassificationLink"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a grid to select one ore more Classes.
 */
class SelectClassesGrid extends _react.PureComponent {
  /**
   * @param props the Component's properties.
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "gridSettings", void 0);

    _defineProperty(this, "onSelectionChange", event => {
      this.props.onSelectionChange(event.data);
    });

    this.state = {
      lastUpdateDate: Date.now()
    };
    this.gridSettings = {
      pageSize: 10,
      filters: {},
      fields: [],
      globalFilter: {
        value: ''
      }
    };
    this.columnDefinitions = [{
      header: 'Classification URI',
      field: 'uri',
      bodyComponent: ({
        data,
        value
      }) => _react.default.createElement(_ClassificationLink.default, {
        id: data.id,
        label: value
      })
    }, {
      header: 'Classification Name',
      field: 'name'
    }, {
      header: 'Created By',
      field: 'createdBy.name',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'createdBy.id',
        imageProperty: 'createdBy.image',
        nameProperty: 'createdBy.name'
      }
    }, {
      header: 'Created Date',
      field: 'createdDate',
      type: 'date'
    }, {
      header: 'Modified By',
      field: 'modifiedBy.name',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'modifiedBy.id',
        imageProperty: 'modifiedBy.image',
        nameProperty: 'modifiedBy.name'
      }
    }, {
      header: 'Modified Date',
      field: 'modifiedDate',
      type: 'date'
    }, ...this.props.customColumnDefinitions];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addingEntities && !this.props.addingEntities) {
      this.setState({
        lastUpdateDate: Date.now()
      }, () => this.props.onSelectionChange([]));
    }
  }
  /**
   * This function will keep track of the count of selected rows in a grid
   */


  /**
   * @override
   */
  render() {
    const queryParams = {
      id: this.props.match
    };
    const {
      customWhere,
      excludeBy,
      isLoading,
      selectionMode,
      isDownloading,
      classes,
      classesCount,
      classesCountMax,
      selectedRows,
      loadClassifications
    } = this.props;
    const {
      lastUpdateDate
    } = this.state;
    return _react.default.createElement(_DataTable.default, {
      dataKey: 'id',
      dataTableId: this.props.dataTableId,
      key: lastUpdateDate,
      customWhere: customWhere,
      excludeBy: excludeBy,
      gridSettings: this.gridSettings,
      columnDefinitions: this.columnDefinitions,
      loadRows: loadClassifications,
      isLoading: isLoading,
      isDownloading: isDownloading,
      name: "select_classes",
      disableCountdown: true,
      disableExport: true,
      value: classes,
      totalRecords: classesCount,
      countMax: classesCountMax,
      onSelectionChange: this.onSelectionChange,
      selectionMode: selectionMode,
      queryParams: queryParams,
      selection: selectedRows,
      savePreferences: true
    });
  }

}

_defineProperty(SelectClassesGrid, "propTypes", {
  loadClassifications: _propTypes.default.func.isRequired,
  match: _propTypes.default.string.isRequired,
  selectionMode: _propTypes.default.string,
  classes: _propTypes.default.array,
  classesCount: _propTypes.default.number,
  classesCountMax: _propTypes.default.number,
  isLoading: _propTypes.default.bool,
  addingEntities: _propTypes.default.bool,
  onSelectionChange: _propTypes.default.func.isRequired,
  selectedRows: _propTypes.default.any,
  customWhere: _propTypes.default.array,
  excludeBy: _propTypes.default.array,
  customColumnDefinitions: _propTypes.default.array,
  dataTableId: _propTypes.default.string
});

_defineProperty(SelectClassesGrid, "defaultProps", {
  isLoading: false,
  addingEntities: false,
  selectionMode: 'multiple',
  customWhere: [],
  customColumnDefinitions: []
});

var _default = (0, _reactRedux.connect)(state => ({
  classes: state.classifications.list.records,
  classesCount: state.classifications.list.count,
  classesCountMax: state.classifications.list.countMax,
  isLoading: state.classifications.list.isLoading,
  isDownloading: state.classifications.list.isDownloading,
  addingEntities: state.admin.groups.addingEntities.isLoading
}), {
  loadClassifications: _classificationsActions.loadClassifications
})(SelectClassesGrid);

exports.default = _default;