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

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _date = require("app/utils/date/date");

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a link to navigate to the specified Custom Entity
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const ChildLinkRenderer = ({
  data,
  value
}) => {
  if (!value) {
    return null;
  }

  return _react.default.createElement(_Link.default, {
    to: `/custom-entities/${data.id}/summary`
  }, value);
};

const StyledIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "CustomEntityChildrenGrid__StyledIcon",
  componentId: "sc-1xyqult-0"
})(["color:", ";"], ({
  color
}) => color || 'white');
/**
 * Shows the Custom Entity Children grid view.
 */

class CustomEntityChildrenGrid extends _react.Component {
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
        header: 'Entity Name',
        field: 'name',
        sortable: false,
        bodyComponent: ({
          data,
          value
        }) => _react.default.createElement(ChildLinkRenderer, {
          data: data,
          value: value
        })
      }, {
        header: 'Entity ID',
        field: 'id',
        type: 'number',
        sortable: false,
        bodyComponent: ({
          value
        }) => _react.default.createElement(_Link.default, {
          to: `/custom-entities/${value}`
        }, value),
        style: {
          width: '120px'
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
        }) : _react.default.createElement("div", null),
        filter: false,
        sortable: false,
        style: {
          width: '100px',
          textAlign: 'center'
        }
      }, {
        header: 'Entity Status',
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
        bodyComponent: _LabelListRenderer.default,
        bodyComponentProps: {
          label: 'name',
          redirectTo: 'entity'
        },
        bodyComponentDataMap: {
          value: 'classes'
        },
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
        field: 'createdByName',
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
        renderValue: ({
          value
        }) => (0, _date.formatDate)(value)
      }, {
        header: 'Modified By',
        field: 'modifiedByName',
        sortable: false,
        bodyComponent: _PersonAvatarRenderer.default,
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
        renderValue: ({
          value
        }) => (0, _date.formatDate)(value)
      }];
    });

    _defineProperty(this, "loadChildren", id => {
      this.props.loadCustomEntityChildren(id);
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
        value: 'custom'
      }]
    });
    this.props.loadCustomEntityChildren(this.props.match.params.id);
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

    const TreeDataTableElement = _react.default.createElement(_TreeDataTable.default, {
      dataTableId: _dataTableIds.CUSTOM_ENTITIES_CHILDREN_DATA_TABLE,
      savePreferences: true,
      gridSettings: gridSettings,
      columnDefinitions: this.buildColumnDefinitions(),
      isLoading: isLoading || classificationsLoading,
      data: list,
      disableExport: true,
      selectionMode: "single",
      dataKey: "id",
      metaKeySelection: false,
      loadChildren: this.loadChildren,
      disableExpandAll: true
    });

    return _react.default.createElement(_Layout.default, {
      content: TreeDataTableElement,
      noPadding: true
    });
  }

}

_defineProperty(CustomEntityChildrenGrid, "propTypes", {
  isLoading: _propTypes.default.bool.isRequired,
  loadCustomEntityChildren: _propTypes.default.func.isRequired,
  children: _propTypes.default.array
});

var _default = (0, _reactRedux.connect)((state, ownProps) => ({
  id: ownProps.match.params.id,
  children: state.entities.customEntities.children.data,
  isLoading: state.entities.customEntities.children.isLoading,
  classificationsLoading: state.grid.dropdowns.classifications.isLoading,
  classifications: state.grid.dropdowns.classifications.records
}), {
  loadCustomEntityChildren: _customEntitiesActions.loadCustomEntityChildren,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(CustomEntityChildrenGrid);

exports.default = _default;