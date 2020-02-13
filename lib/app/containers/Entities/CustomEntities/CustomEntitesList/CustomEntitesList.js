"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactRouterDom = require("react-router-dom");

var _gridActions = require("store/actions/grid/gridActions");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

var _CustomEntityAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/CustomEntityAvatarRenderer"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _LocationRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Location/LocationRenderer"));

var _LocationValue = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Location/LocationValue"));

var _LabelListRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _ClassificationsRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/ClassificationsRenderer/ClassificationsRenderer"));

var _AttachmentLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/AttachmentLinkRenderer"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _dataTableIds = require("app/config/dataTableIds");

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _RelationshipLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/RelationshipLinkRenderer"));

var _lo = require("app/utils/lo/lo");

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "CustomEntitesList__StyledIcon",
  componentId: "diru1e-0"
})(["color:", ";"], ({
  color
}) => color || 'white');
/**
 * Renders the view to display the custom entities grid.
 */

class CustomEntitesList extends _react.PureComponent {
  /**
   *
   */
  constructor(_props) {
    super(_props);

    _defineProperty(this, "gridSettings", {
      sort: [{
        field: 'modifiedDate',
        direction: 'desc'
      }, {
        field: 'createdDate',
        direction: 'desc'
      }],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "buildColumnDefinitions", (0, _memoizeOne.default)(classifications => {
      return [{
        header: 'Entity Name',
        field: 'name',
        bodyComponent: _CustomEntityAvatarRenderer.default,
        imageProperty: 'image',
        nameProperty: 'name'
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
        header: 'Entity ID',
        field: 'id',
        type: 'number',
        bodyComponent: ({
          value
        }) => _react.default.createElement(_reactRouterDom.Link, {
          to: `/custom-entities/${value}`
        }, value),
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
          redirectTo: 'custom'
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
          width: '360px'
        }
      }, {
        header: 'Entity Parent',
        field: 'parent.name',
        bodyComponent: _CustomEntityAvatarRenderer.default,
        bodyComponentProps: {
          idProperty: 'parent.id',
          imageProperty: 'parent.image',
          nameProperty: 'parent.name'
        },
        style: {
          width: '200px'
        }
      }, {
        header: `Children`,
        field: 'children.name',
        filterMatchMode: 'startsWith',
        sortable: false,
        bodyComponent: ({
          data
        }) => _react.default.createElement(_LabelListRenderer.default, {
          value: data && data.children || [],
          label: 'name',
          redirectTo: 'custom'
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
          linkTo: 'custom'
        },
        renderValue: _LocationValue.default,
        style: {
          width: '220px'
        }
      }, {
        header: 'Icon',
        field: 'iconName',
        bodyComponent: ({
          data,
          value
        }) => value && _react.default.createElement(StyledIcon, {
          title: value,
          name: value,
          color: data && data.iconColor
        }),
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
          value: true
        }, {
          label: 'Inactive',
          value: false
        }],
        style: {
          width: '150px',
          textAlign: 'center'
        }
      }, {
        header: 'Attachments',
        field: '_attachmentsCount',
        filter: false,
        sortable: false,
        bodyComponent: props => _react.default.createElement(_AttachmentLinkRenderer.default, _extends({}, props, {
          redirectTo: 'custom'
        })),
        style: {
          width: '100px',
          textAlign: 'center'
        }
      }, {
        header: 'Relationships',
        field: '_relationshipsCount',
        filter: false,
        sortable: false,
        bodyComponent: props => _react.default.createElement(_RelationshipLinkRenderer.default, _extends({}, props, {
          redirectTo: 'custom'
        })),
        style: {
          width: '100px',
          textAlign: 'center'
        }
      }, {
        header: 'Last Modified Date',
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
        header: 'Created by',
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
      }];
    }));

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
  }
  /**
   *
   */


  /**
   * @override
   */
  render() {
    const {
      classificationsLoading,
      isLoading,
      isDownloading,
      loadCustomEntities,
      customEntities,
      count,
      countMax,
      classifications
    } = this.props;
    const {
      gridSettings
    } = this;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Custom Entities"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      dataTableId: _dataTableIds.CUSTOM_ENTITIES_TABLE,
      savePreferences: true,
      gridSettings: gridSettings,
      columnDefinitions: this.buildColumnDefinitions(classifications),
      loadRows: loadCustomEntities,
      isLoading: isLoading || classificationsLoading,
      isDownloading: isDownloading,
      disableCountdown: true,
      name: "custom_entities_list",
      value: customEntities,
      totalRecords: count,
      countMax: countMax,
      dataKey: "id",
      selectionMode: "multiple"
    })));
  }

}

_defineProperty(CustomEntitesList, "propTypes", {
  loadCustomEntities: _propTypes.default.func.isRequired,
  loadClassificationsDropDownForGrid: _propTypes.default.func.isRequired,
  classifications: _propTypes.default.array,
  classificationsLoading: _propTypes.default.bool,
  customEntities: _propTypes.default.array,
  isLoading: _propTypes.default.bool,
  count: _propTypes.default.number,
  countMax: _propTypes.default.number
});

const mapStateToProps = state => ({
  classificationsLoading: state.grid.dropdowns.classifications.isLoading,
  classifications: state.grid.dropdowns.classifications.records,
  customEntities: state.entities.customEntities.list.records,
  count: state.entities.customEntities.list.count,
  countMax: state.entities.customEntities.list.countMax,
  isLoading: state.entities.customEntities.list.isLoading,
  isDownloading: state.entities.customEntities.list.isDownloading
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadCustomEntities: _customEntitiesActions.loadCustomEntities,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(CustomEntitesList);

exports.default = _default;