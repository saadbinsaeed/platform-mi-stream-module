"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _ThingLink = _interopRequireDefault(require("app/components/atoms/Link/ThingLink"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _OrganisationsLink = _interopRequireDefault(require("app/components/atoms/Link/OrganisationsLink"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _gridActions = require("store/actions/grid/gridActions");

var _ClassificationsRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/ClassificationsRenderer/ClassificationsRenderer"));

var _EntityAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/EntityAvatarRenderer"));

var _dataTableIds = require("app/config/dataTableIds");

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const EntityLinkRenderer = props => {
  switch (props.data.type) {
    case 'thing':
      return _react.default.createElement(_ThingLink.default, _extends({}, props, {
        id: props.value
      }), props.value);

    case 'person':
      return _react.default.createElement(_PeopleLink.default, _extends({}, props, {
        id: props.value
      }), props.value);

    case 'organisation':
      return _react.default.createElement(_OrganisationsLink.default, _extends({}, props, {
        id: props.value
      }), props.value);

    default:
      return _react.default.createElement("span", null, props.value);
  }
};
/**
 * Container that is used to display the Entities tab of the Groups & Permissions details view.
 */


class ClassificationEntitiesTab extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(_props) {
    super(_props);

    _defineProperty(this, "buildColumnDefinitions", (0, _memoizeOne.default)((classifications, isAdmin) => {
      const columns = [{
        header: 'Name',
        field: 'name',
        bodyComponent: _EntityAvatarRenderer.default,
        imageProperty: 'image',
        nameProperty: 'name'
      }, {
        header: 'Classifications',
        field: 'classificationUris',
        filterMatchMode: '=',
        sortable: false,
        bodyComponent: props => _react.default.createElement(_ClassificationsRenderer.default, _extends({}, props, {
          valueField: "classes",
          label: 'name',
          redirectTo: props.data.type
        })),
        renderValue: ({
          data
        }) => data && (data.classes || []).map(({
          name
        }) => name).join(', '),
        options: (classifications || []).map(({
          name,
          uri
        }) => ({
          value: uri,
          label: name
        })),
        style: {
          minWidth: '450px'
        }
      }, {
        header: 'Id',
        field: 'id',
        type: 'number',
        bodyComponent: EntityLinkRenderer,
        filterMatchMode: '=',
        style: {
          width: '100px'
        }
      }, {
        header: 'Type',
        field: 'type',
        style: {
          width: '200px'
        }
      }];

      if (isAdmin) {
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

      return columns;
    }));

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "loadClassificationDropdown", () => {
      const cls = this.props.classification || {};

      if (cls.uri) {
        const filterBy = [{
          field: 'entities.classes.uri',
          op: '=',
          value: cls.uri
        }];

        if (!this.props.userProfile.isAdmin) {
          filterBy.push({
            field: 'entities.active',
            op: '=',
            value: true
          });
          filterBy.push({
            field: 'active',
            op: '=',
            value: true
          });
        }

        this.props.loadClassificationsDropDownForGrid({
          page: 1,
          itemsPerPage: 1000,
          filterBy
        });
      }
    });

    this.state = {
      selectedRowsCount: 0,
      selectedRows: []
    };
    this.loadClassificationDropdown();
  }

  /**
   * componentDidUpdate - description
   *
   * @return {type}  description
   */
  componentDidUpdate(prevProps) {
    const prevCls = prevProps.classification || {};
    const newCls = this.props.classification || {};

    if (prevCls.uri !== newCls.uri) {
      this.loadClassificationDropdown();
    }
  }
  /**
   * load filter option for dropdown
   */


  /**
   * @override
   */
  render() {
    const {
      classification,
      classifications,
      userProfile: {
        isAdmin
      }
    } = this.props;

    if (!classification.uri) {
      return null;
    }

    const customWhere = [{
      field: 'classes.uri',
      op: '=',
      value: classification.uri
    }];

    if (!isAdmin) {
      customWhere.push({
        field: 'active',
        op: '=',
        value: true
      });
    }

    const records = this.props.records || [];
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      dataTableId: _dataTableIds.CLASSIFICATION_ENTITIES_DATA_TABLE,
      savePreferences: true,
      customWhere: customWhere,
      columnDefinitions: this.buildColumnDefinitions(classifications, isAdmin),
      loadRows: this.props.loadClassificationEntities,
      gridSettings: this.gridSettings,
      isLoading: this.props.isLoading,
      isDownloading: this.props.isDownloading,
      totalRecords: this.props.count,
      countMax: this.props.countMax,
      name: "classification_entities_list",
      disableCountdown: true,
      value: records,
      dataKey: 'id',
      selectionMode: "multiple"
    }));
  }

}

_defineProperty(ClassificationEntitiesTab, "propTypes", {
  loadClassificationEntities: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  count: _propTypes.default.number,
  countMax: _propTypes.default.number,
  classification: _propTypes.default.object.isRequired,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.classifications.entities.isLoading || state.grid.dropdowns.classifications.isLoading,
  isDownloading: state.classifications.entities.isDownloading,
  records: state.classifications.entities.records,
  count: state.classifications.entities.count,
  countMax: state.classifications.entities.countMax,
  classification: state.classifications.details.data || {},
  classifications: state.grid.dropdowns.classifications.records,
  userProfile: state.user.profile
}), {
  loadClassificationEntities: _classificationsActions.loadClassificationEntities,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(ClassificationEntitiesTab);

exports.default = _default;