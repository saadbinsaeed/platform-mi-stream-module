"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _gridActions = require("store/actions/grid/gridActions");

var _dataTableIds = require("app/config/dataTableIds");

var _LabelListRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _TreeDataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableClient/TreeDataTable"));

var _organisationsActions = require("store/actions/entities/organisationsActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _date = require("app/utils/date/date");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _OrganisationsLink = _interopRequireDefault(require("app/components/atoms/Link/OrganisationsLink"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "OrganisationChildrenGrid__StyledIcon",
  componentId: "giye1m-0"
})(["color:", ";"], ({
  color
}) => color || 'white');
/**
 * Shows the Organisation Children grid view.
 */

class OrganisationChildrenGrid extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "columnDefs", void 0);

    _defineProperty(this, "loadParams", void 0);

    _defineProperty(this, "state", {
      list: []
    });

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "buildColumnDefinitions", () => {
      return [{
        header: 'Organisation Name',
        field: 'name',
        sortable: false,
        bodyComponent: ({
          data,
          value
        }) => value ? _react.default.createElement(_OrganisationsLink.default, {
          id: data.id
        }, value) : ''
      }, {
        header: 'Organisation ID',
        field: 'id',
        type: 'number',
        sortable: false,
        bodyComponent: ({
          value
        }) => value ? _react.default.createElement(_OrganisationsLink.default, {
          id: value
        }, value) : '',
        style: {
          width: '150px'
        }
      }, {
        header: 'Icon',
        field: 'iconName',
        bodyComponent: ({
          data,
          value
        }) => value ? _react.default.createElement(StyledIcon, {
          title: value,
          name: value,
          color: data && data.iconColor
        }) : '',
        filter: false,
        sortable: false,
        style: {
          width: '100px',
          textAlign: 'center'
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
          value: 'true'
        }, {
          label: 'Inactive',
          value: 'false'
        }],
        style: {
          width: '180px',
          textAlign: 'center'
        }
      }, {
        header: 'Classifications',
        field: 'classesUris',
        sortable: false,
        bodyComponent: ({
          data
        }) => _react.default.createElement(_LabelListRenderer.default, {
          data: data,
          value: data.classes,
          label: "name",
          redirectTo: 'entity'
        }),
        style: {
          width: '300px'
        },
        options: (this.props.classifications || []).map(({
          uri,
          name
        }) => ({
          value: uri,
          label: name
        }))
      }, {
        header: 'Added By',
        field: 'createdBy.name',
        sortable: false,
        bodyComponent: _PersonAvatarRenderer.default,
        bodyComponentProps: {
          idProperty: 'createdBy.id',
          imageProperty: 'createdBy.image',
          nameProperty: 'createdBy.name'
        }
      }, {
        header: 'Date Added',
        field: 'createdDate',
        type: 'date',
        sortable: false,
        bodyComponent: ({
          value
        }) => (0, _date.formatDate)(value)
      }, {
        header: 'Modified By',
        field: 'modifiedBy.name',
        bodyComponent: _PersonAvatarRenderer.default,
        sortable: false,
        bodyComponentProps: {
          idProperty: 'modifiedBy.id',
          imageProperty: 'modifiedBy.image',
          nameProperty: 'modifiedBy.name'
        }
      }, {
        header: 'Date Modified',
        field: 'modifiedDate',
        type: 'date',
        sortable: false,
        bodyComponent: ({
          value
        }) => (0, _date.formatDate)(value)
      }];
    });

    _defineProperty(this, "loadChildren", id => {
      this.props.loadOrganisationChildren(id);
    });
  }

  /**
   * @override
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
    this.props.loadOrganisationChildren(this.props.id);
  }
  /**
   * @override
   */


  componentDidUpdate(prevProps) {
    const children = this.props.children || [];

    if (prevProps.children !== children) {
      const {
        id
      } = this.props;

      if (children.length && children[0].parent.id) {
        if (children[0].parent.id === Number(id)) {
          this.setState({
            list: (0, _Immutable.default)(this.buildFlatList(children, id, []))
          });
        } else {
          this.setState({
            list: (0, _Immutable.default)(this.buildFlatList(children, children[0].parent.id, [...this.state.list]))
          });
        }
      }
    }
  }
  /**
   *
   */


  buildFlatList(records, parentId, accumulator = []) {
    accumulator.push(...records.map(record => ({ ...record,
      children: undefined,
      parentId,
      classesUris: (record.classes || []).map(cl => cl.uri).join(','),
      createdByName: record.createdBy && record.createdBy.name,
      modifiedByName: record.modifiedBy && record.modifiedBy.name
    })));
    records.filter(record => record.children).forEach(record => this.buildFlatList(record.children, record.id, accumulator));
    return accumulator;
  }
  /**
   * Loads the nephews of the node with the specified id (if any)
   */


  /**
   * @override
   */
  render() {
    const {
      isLoading,
      classificationsLoading
    } = this.props;
    const {
      list
    } = this.state;
    const {
      gridSettings
    } = this;
    return _react.default.createElement(_TreeDataTable.default, {
      dataTableId: _dataTableIds.ORGANISATION_CHILDREN_DATA_TABLE,
      savePreferences: true,
      disableExport: true,
      gridSettings: gridSettings,
      columnDefinitions: this.buildColumnDefinitions(),
      isLoading: isLoading || classificationsLoading,
      data: list,
      selectionMode: "single",
      dataKey: "id",
      metaKeySelection: false,
      loadChildren: this.loadChildren,
      disableExpandAll: true
    });
  }

}

_defineProperty(OrganisationChildrenGrid, "propTypes", {
  id: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  loadOrganisationChildren: _propTypes.default.func.isRequired,
  children: _propTypes.default.array
});

var _default = (0, _reactRedux.connect)(state => ({
  children: state.entities.organisations.children.data,
  isLoading: state.entities.organisations.children.isLoading,
  classificationsLoading: state.grid.dropdowns.classifications.isLoading,
  classifications: state.grid.dropdowns.classifications.records
}), {
  loadOrganisationChildren: _organisationsActions.loadOrganisationChildren,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(OrganisationChildrenGrid);

exports.default = _default;