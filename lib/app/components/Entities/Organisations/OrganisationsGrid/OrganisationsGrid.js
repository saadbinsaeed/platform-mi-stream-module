"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _OrganisationAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/OrganisationAvatarRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _LocationRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Location/LocationRenderer"));

var _LocationValue = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Location/LocationValue"));

var _LabelListRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _OrganisationsLink = _interopRequireDefault(require("app/components/atoms/Link/OrganisationsLink"));

var _dataTableIds = require("app/config/dataTableIds");

var _organisationsActions = require("store/actions/entities/organisationsActions");

var _gridActions = require("store/actions/grid/gridActions");

var _AttachmentLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/AttachmentLinkRenderer"));

var _RelationshipLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/RelationshipLinkRenderer"));

var _ClassificationsRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/ClassificationsRenderer/ClassificationsRenderer"));

var _lo = require("app/utils/lo/lo");

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component that is used to display the grid in the Organisations Manager
 *
 * @example <OrganisationsGrid />
 */
class OrganisationsGrid extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "buildColumnDefinitions", (0, _memoizeOne.default)(classifications => {
      return [{
        header: 'Name',
        field: 'name',
        bodyComponent: _OrganisationAvatarRenderer.default,
        bodyComponentProps: {
          idProperty: 'id',
          imageProperty: 'image',
          nameProperty: 'name'
        }
      }, {
        header: 'Description',
        field: 'description',
        style: {
          width: '220px'
        },
        renderValue: ({
          data
        }) => (0, _stringUtils.cut)(String((0, _lo.get)(data, 'description') || ''), 25)
      }, {
        header: 'Id',
        field: 'id',
        type: 'number',
        bodyComponent: ({
          value
        }) => value ? _react.default.createElement(_OrganisationsLink.default, {
          id: value
        }, value) : '',
        style: {
          width: '100px'
        }
      }, {
        header: 'Classifications',
        field: 'classes.uri',
        filterMatchMode: '=',
        sortable: false,
        bodyComponent: props => _react.default.createElement(_ClassificationsRenderer.default, _extends({}, props, {
          valueField: "classes",
          label: 'name',
          redirectTo: 'organisation'
        })),
        options: (classifications || []).map(({
          name,
          uri
        }) => ({
          value: uri,
          label: name
        })),
        renderValue: ({
          data
        }) => data && (data.classes || []).map(({
          name
        }) => name).join(', '),
        style: {
          width: '360px'
        }
      }, {
        header: 'Parent',
        field: 'parent.name',
        bodyComponent: _OrganisationAvatarRenderer.default,
        bodyComponentProps: {
          idProperty: 'parent.id',
          imageProperty: 'parent.image',
          nameProperty: 'parent.name'
        }
      }, {
        header: 'Children',
        field: 'children.name',
        filterMatchMode: 'startsWith',
        sortable: false,
        bodyComponent: ({
          data
        }) => _react.default.createElement(_LabelListRenderer.default, {
          value: data && data.children || [],
          label: 'name',
          redirectTo: 'organisation'
        }),
        renderValue: ({
          data
        }) => data && (data.children || []).map(({
          name
        }) => name).join(', '),
        style: {
          width: '300px'
        }
      }, {
        header: 'Location',
        field: 'locationInfo',
        filter: false,
        sortable: false,
        bodyComponent: _LocationRenderer.default,
        bodyComponentProps: {
          linkTo: 'organisation'
        },
        renderValue: _LocationValue.default,
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
        header: 'Created Date',
        field: 'createdDate',
        type: 'date'
      }, {
        header: 'Last Modified Date',
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
        header: 'Modified by',
        field: 'modifiedBy.name',
        bodyComponent: _PersonAvatarRenderer.default,
        bodyComponentProps: {
          idProperty: 'modifiedBy.id',
          imageProperty: 'modifiedBy.image',
          nameProperty: 'modifiedBy.name'
        }
      }, {
        header: 'Relationships',
        field: '_relationshipsCount',
        filter: false,
        sortable: false,
        bodyComponent: props => _react.default.createElement(_RelationshipLinkRenderer.default, _extends({}, props, {
          redirectTo: 'organisation'
        })),
        style: {
          width: '120px',
          textAlign: 'center'
        }
      }, {
        header: 'Attachments',
        field: '_attachmentsCount',
        filter: false,
        sortable: false,
        bodyComponent: props => _react.default.createElement(_AttachmentLinkRenderer.default, _extends({}, props, {
          redirectTo: 'organisation'
        })),
        style: {
          width: '120px',
          textAlign: 'center'
        }
      }];
    }));
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
        value: 'organisation'
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
      classifications,
      classificationsLoading
    } = this.props;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Organisations"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      dataTableId: _dataTableIds.ORGANISATIONS_DATA_TABLE,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.buildColumnDefinitions(classifications),
      loadRows: this.props.loadOrganisationsList,
      isLoading: this.props.isLoading || classificationsLoading,
      disableCountdown: true,
      name: "organisation_list",
      value: this.props.records,
      totalRecords: this.props.recordsCount,
      countMax: this.props.recordsCountMax,
      dataKey: "id",
      selectionMode: "multiple"
    })));
  }

}

_defineProperty(OrganisationsGrid, "propTypes", {
  loadOrganisationsList: _propTypes.default.func,
  isLoading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array,
  classifications: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  loadClassificationsDropDownForGrid: _propTypes.default.func.isRequired,
  classificationsLoading: _propTypes.default.bool
});

_defineProperty(OrganisationsGrid, "defaultProps", {
  isLoading: true
});

var _default = (0, _reactRedux.connect)(state => ({
  classificationsLoading: state.grid.dropdowns.classifications.isLoading,
  classifications: state.grid.dropdowns.classifications.records,
  isLoading: state.entities.organisations.list.isLoading,
  records: state.entities.organisations.list.records,
  recordsCount: state.entities.organisations.list.count,
  recordsCountMax: state.entities.organisations.list.countMax
}), {
  loadOrganisationsList: _organisationsActions.loadOrganisationsList,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(OrganisationsGrid);

exports.default = _default;