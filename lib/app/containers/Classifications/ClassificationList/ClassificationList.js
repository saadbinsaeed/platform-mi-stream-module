"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _dataTableIds = require("app/config/dataTableIds");

var _LabelListRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _ClassificationAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/ClassificationAvatarRenderer"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the view to display the classification.
 */
class ClassificationList extends _react.Component {
  /**
   * @param {Object} props - component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    this.columnDefinitions = [{
      header: 'Classification URI',
      field: 'uri',
      bodyComponent: _ClassificationAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'id',
        imageProperty: 'image',
        nameProperty: 'name'
      }
    }, {
      header: 'Applies To',
      field: 'applicableOn',
      sortable: false,
      bodyComponent: ({
        value,
        ...rest
      }) => _react.default.createElement(_LabelListRenderer.default, _extends({}, rest, {
        value: value && value.filter(Boolean).map(v => v === 'custom' ? 'Custom Entity' : (0, _utils.capitalizeFirstLetter)(v))
      })),
      options: [{
        label: 'Thing',
        value: 'thing'
      }, {
        label: 'Person',
        value: 'person'
      }, {
        label: 'Organisation',
        value: 'organisation'
      }, {
        label: 'Custom Entity',
        value: 'custom'
      }, {
        label: 'Group',
        value: 'group'
      }, {
        label: 'Process',
        value: 'process'
      }, {
        label: 'Relationship',
        value: 'relationship'
      }],
      renderValue: ({
        value
      }) => value && value.filter(Boolean).map(v => v === 'custom' ? 'Custom Entity' : (0, _utils.capitalizeFirstLetter)(v)).join(','),
      filterMatchMode: '='
    }, {
      header: 'Classification Name',
      field: 'name',
      bodyComponent: _ClassificationAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'id',
        imageProperty: 'image',
        nameProperty: 'name'
      }
    }, {
      header: 'Active',
      field: 'active',
      sortable: false,
      bodyComponent: _BooleanRenderer.default,
      renderValue: ({
        value
      }) => value ? 'Active' : 'Inactive',
      type: 'boolean',
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
    }, {
      header: 'Abstract',
      field: 'abstract',
      bodyComponent: _BooleanRenderer.default,
      renderValue: ({
        value
      }) => value ? 'Abstract' : 'Non-abstract',
      type: 'boolean',
      sortable: false,
      options: [{
        label: 'All',
        value: ''
      }, {
        label: 'Abstract',
        value: true
      }, {
        label: 'Non-abstract',
        value: false
      }],
      style: {
        width: '150px',
        textAlign: 'center'
      }
    }, {
      header: 'Modified Date',
      field: 'modifiedDate',
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
      header: 'Created Date',
      field: 'createdDate',
      type: 'date'
    }, {
      header: 'Created by',
      field: 'createdBy.name',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'createdBy.id',
        imageProperty: 'createdBy.image',
        nameProperty: 'createdBy.name'
      }
    }];
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      isDownloading,
      records,
      recordsCount,
      recordsCountMax
    } = this.props;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Classification Manager"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      dataTableId: _dataTableIds.CLASSIFICATIONS_DATA_TABLE,
      savePreferences: true,
      columnDefinitions: this.columnDefinitions,
      isLoading: isLoading,
      isDownloading: isDownloading,
      disableCountdown: true,
      loadRows: this.props.loadClassifications,
      gridSettings: this.gridSettings,
      name: "classification_list",
      value: records,
      totalRecords: recordsCount,
      countMax: recordsCountMax,
      dataKey: "id",
      selectionMode: "multiple"
    })));
  }

}

_defineProperty(ClassificationList, "propTypes", {
  loadClassifications: _propTypes.default.func.isRequired,
  thingId: _propTypes.default.string,
  records: _propTypes.default.array,
  isLoading: _propTypes.default.bool,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number
});

const mapStateToProps = state => {
  return {
    records: state.classifications.list.records,
    recordsCount: state.classifications.list.count,
    recordsCountMax: state.classifications.list.countMax,
    isLoading: state.classifications.list.isLoading,
    isDownloading: state.classifications.list.isDownloading
  };
};

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, {
  loadClassifications: _classificationsActions.loadClassifications
})(ClassificationList));

exports.default = _default;