"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _LocationRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Location/LocationRenderer"));

var _LocationValue = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Location/LocationValue"));

var _dataTableIds = require("app/config/dataTableIds");

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _gridActions = require("store/actions/grid/gridActions");

var _peopleActions = require("store/actions/entities/peopleActions");

var _AttachmentLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/AttachmentLinkRenderer"));

var _ClassificationsRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/ClassificationsRenderer/ClassificationsRenderer"));

var _RelationshipLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/RelationshipLinkRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component that is used to display the grid in the People Manager
 *
 * @example <PeopleGrid />
 */
class PeopleGrid extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "buildColumnDefinitions", () => {
      const {
        classifications
      } = this.props;
      return [{
        header: 'Name',
        field: 'name',
        bodyComponent: _PersonAvatarRenderer.default
      }, {
        header: 'Id',
        field: 'id',
        type: 'number',
        bodyComponent: ({
          value
        }) => value ? _react.default.createElement(_PeopleLink.default, {
          id: value
        }, value) : '',
        style: {
          width: '100px'
        }
      }, {
        header: 'Classifications',
        field: 'classes.uri',
        sortable: false,
        bodyComponent: props => _react.default.createElement(_ClassificationsRenderer.default, _extends({}, props, {
          valueField: "classes",
          label: 'name',
          redirectTo: 'person'
        })),
        renderValue: ({
          data
        }) => data && (data.classes || []).map(({
          name
        }) => name).join(', '),
        filterMatchMode: '=',
        options: (classifications || []).map(({
          name,
          uri
        }) => ({
          value: uri,
          label: name
        })),
        style: {
          width: '360px'
        }
      }, {
        header: 'Location',
        field: 'locationInfo',
        filter: false,
        sortable: false,
        bodyComponent: _LocationRenderer.default,
        renderValue: _LocationValue.default,
        bodyComponentProps: {
          linkTo: 'person'
        },
        style: {
          width: '220px'
        }
      }, {
        header: 'Active',
        field: 'active',
        type: 'boolean',
        sortable: false,
        bodyComponent: _BooleanRenderer.default,
        renderValue: ({
          value
        }) => value ? 'Active' : 'Inactive',
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
        header: 'Last Modified',
        field: 'modifiedDate',
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
      }, {
        header: 'Attachments',
        field: '_attachmentsCount',
        filter: false,
        sortable: false,
        bodyComponent: props => _react.default.createElement(_AttachmentLinkRenderer.default, _extends({}, props, {
          redirectTo: 'person'
        })),
        style: {
          width: '120px',
          textAlign: 'center'
        }
      }, {
        header: 'Relationships',
        field: '_relationshipsCount',
        filter: false,
        sortable: false,
        bodyComponent: props => _react.default.createElement(_RelationshipLinkRenderer.default, _extends({}, props, {
          redirectTo: 'person'
        })),
        style: {
          width: '120px',
          textAlign: 'center'
        }
      }];
    });
  }

  /**
   * componentDidMount - description
   *
   * @return {type}  description
   */
  componentDidMount() {
    this.props.loadClassificationsDropDownForGrid({
      filterBy: [{
        field: 'active',
        op: '=',
        value: true
      }, {
        field: 'applicableOn',
        op: '=',
        value: 'person'
      }]
    });
  }
  /**
   *
   */


  /**
   * @override
   */
  render() {
    const {
      isLoading,
      isDownloading,
      classificationsLoading,
      loadData,
      records,
      recordsCount,
      recordsCountMax
    } = this.props;
    return _react.default.createElement(_DataTable.default, {
      dataTableId: _dataTableIds.PEOPLE_DATA_TABLE,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.buildColumnDefinitions(),
      loadRows: loadData,
      isLoading: isLoading || classificationsLoading,
      isDownloading: isDownloading,
      disableCountdown: true,
      name: "people_list",
      value: records,
      totalRecords: recordsCount,
      countMax: recordsCountMax,
      dataKey: "id",
      selectionMode: "multiple"
    });
  }

}

_defineProperty(PeopleGrid, "propTypes", {
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  loadData: _propTypes.default.func.isRequired,
  classifications: _propTypes.default.array,
  loadClassificationsDropDownForGrid: _propTypes.default.func.isRequired,
  classificationsLoading: _propTypes.default.bool
});

_defineProperty(PeopleGrid, "defaultProps", {
  isLoading: false
});

var _default = (0, _reactRedux.connect)(state => ({
  classificationsLoading: state.grid.dropdowns.classifications.isLoading,
  classifications: state.grid.dropdowns.classifications.records,
  isLoading: state.entities.people.list.isLoading,
  isDownloading: state.entities.people.list.isDownloading,
  records: state.entities.people.list.records,
  recordsCount: state.entities.people.list.count,
  recordsCountMax: state.entities.people.list.countMax
}), {
  loadData: _peopleActions.loadPeopleList,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(PeopleGrid);

exports.default = _default;