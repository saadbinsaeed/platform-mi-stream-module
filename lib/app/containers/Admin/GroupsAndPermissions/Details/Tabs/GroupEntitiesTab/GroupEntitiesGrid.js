"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _LabelListRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _dataTableIds = require("app/config/dataTableIds");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _lo = require("app/utils/lo/lo");

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _gridActions = require("store/actions/grid/gridActions");

var _ClassificationsRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/ClassificationsRenderer/ClassificationsRenderer"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const ButtonStyle = _styledComponents.default.div.withConfig({
  displayName: "GroupEntitiesGrid__ButtonStyle",
  componentId: "sc-97xz2n-0"
})(["display:flex;justify-content:center;"]);
/**
 * Container that is used to display the the grid of selected entity.
 */


let GroupEntitiesGrid = (_class = (_temp = _class2 = class GroupEntitiesGrid extends _react.PureComponent {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "key", 0);

    _defineProperty(this, "canEdit", false);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "loadClassificationDropDown", () => {
      if (this.props.entityType !== 'proc_def') {
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
    });

    _defineProperty(this, "buildColumnDefinitions", (0, _fastMemoize.default)((entityType, isAdmin, classifications) => {
      const nameField = {
        thing: 'thing.name',
        person: 'person.name',
        organisation: 'organisation.name',
        custom: 'customEntity.name',
        proc_def: 'processDefinitionEntity.name'
      }[entityType];
      const activeField = {
        thing: 'thing.active',
        person: 'person.active',
        organisation: 'organisation.active',
        custom: 'customEntity.active'
      }[entityType];
      const idField = {
        thing: 'thing.id',
        person: 'person.id',
        organisation: 'organisation.id',
        custom: 'customEntity.id',
        proc_def: 'processDefinitionEntity.id'
      }[entityType];
      const classificationField = {
        thing: 'thing.classes.uri',
        person: 'person.classes.uri',
        organisation: 'organisation.classes.uri',
        custom: 'customEntity.classes.uri'
      }[entityType];
      const classesField = {
        thing: 'thing.classes',
        person: 'person.classes',
        organisation: 'organisation.classes',
        custom: 'customEntity.classes'
      }[entityType];
      const columnDefinitions = [{
        header: 'ID',
        field: idField,
        type: entityType === 'proc_def' ? 'text' : 'number'
      }, {
        header: 'Name',
        field: nameField,
        style: {
          width: '220px'
        }
      }, {
        header: 'Permissions',
        field: 'permissions',
        bodyComponent: _LabelListRenderer.default,
        renderValue: ({
          data
        }) => ((0, _lo.get)(data, 'permissions') || []).map(permission => permission).join(', '),
        filter: false,
        sortable: false
      }];

      if (classificationField) {
        columnDefinitions.push({
          header: 'Classifications',
          field: classificationField,
          filterMatchMode: '=',
          sortable: false,
          bodyComponent: props => _react.default.createElement(_ClassificationsRenderer.default, _extends({}, props, {
            valueField: classesField,
            label: 'name',
            redirectTo: entityType,
            idField: idField
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
        });
      }

      if (isAdmin && activeField) {
        columnDefinitions.push({
          header: 'Active',
          field: activeField,
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

      if (this.canEdit) {
        columnDefinitions.push({
          header: 'Action',
          field: '__action__',
          bodyComponent: params => _react.default.createElement(ButtonStyle, null, _react.default.createElement(_ButtonIcon.default, {
            style: {
              color: 'white'
            },
            icon: "delete",
            onClick: () => {
              this.removeEntity(params.data);
            }
          })),
          style: {
            width: '80px'
          },
          filter: false,
          sortable: false,
          exportable: false
        });
      }

      return columnDefinitions;
    }));

    const {
      permissions,
      isAdmin: _isAdmin
    } = _props.userProfile;
    const permissionsSet = new Set(permissions || []);
    this.canEdit = this.props.groupId !== 1 && (_isAdmin || permissionsSet.has('admin.group.edit'));
    this.loadClassificationDropDown();
  }
  /**
   * @override
   */


  componentDidMount() {
    this.props.selectEntities([]);
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
      entityType
    } = this.props;

    if (entityType !== prevProps.entityType) {
      this.resetSelectedRow();
      this.loadClassificationDropDown();
    }

    if (_groupsActions.UPDATE_PERMISSIONS === lastActionType) {
      this.resetSelectedRow();
    }
  }

  resetSelectedRow() {
    ++this.key;
    this.props.selectEntities([]);
  }
  /**
   * @param selectedRows the selected rows.
   */


  onSelectionChange(selectedRows) {
    this.props.selectEntities(selectedRows.data);
  }

  /**
   * Remove the specified entity from the group.
   *
   * @param data entity data.
   */
  removeEntity({
    id
  } = {}) {
    this.props.removeGroupEntity(id).then(() => {
      ++this.key;
      this.props.selectEntities([]);
    });
  }

  /**
   *
   */
  loadRows(options) {
    const {
      groupId,
      entityType,
      userProfile: {
        isAdmin
      }
    } = this.props;
    return this.props.loadGroupEntities(groupId, entityType, options, isAdmin);
  }

  /**
   * @override
   */
  render() {
    if (!this.props.groupId || !this.props.entityType) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Groups and Permissions"
      });
    }

    return _react.default.createElement(_DataTable.default, {
      key: this.key,
      dataTableId: `${_dataTableIds.GROUP_ENTITIES_DATA_TABLE}/${this.props.entityType}`,
      savePreferences: true,
      columnDefinitions: this.buildColumnDefinitions(this.props.entityType, this.props.userProfile.isAdmin, this.props.classifications),
      loadRows: this.loadRows,
      gridSettings: this.gridSettings,
      isLoading: this.props.isLoading || this.props.entityType !== 'proc_def' && this.props.classificationsLoading,
      isDownloading: this.props.isDownloading,
      disableCountdown: true,
      value: this.props.records,
      name: `group_${this.props.entityType}`,
      totalRecords: this.props.recordsCount,
      countMax: this.props.recordsCountMax,
      selection: this.props.selectEntities,
      dataKey: 'id',
      selectionMode: "multiple",
      onSelectionChange: this.onSelectionChange,
      showMenuButton: this.props.showMenuButton,
      toggleMenu: this.props.toggleMenu
    });
  }

}, _defineProperty(_class2, "propTypes", {
  groupId: _propTypes.default.string.isRequired,
  toggleMenu: _propTypes.default.func.isRequired,
  showMenuButton: _propTypes.default.bool.isRequired,
  selectEntities: _propTypes.default.func.isRequired,
  selectedEntities: _propTypes.default.array,
  entityType: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom', 'proc_def']).isRequired,
  removeGroupEntity: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  isDownloading: _propTypes.default.bool,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  userProfile: _propTypes.default.object
}), _defineProperty(_class2, "defaultProps", {
  selectedEntities: [],
  isLoading: false,
  isDownloading: false,
  records: [],
  recordsCount: 0,
  recordsCountMax: 0
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "resetSelectedRow", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "resetSelectedRow"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelectionChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeEntity", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "removeEntity"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadRows", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "loadRows"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  const entity = {
    thing: 'things',
    person: 'people',
    organisation: 'organisations',
    custom: 'customEntities',
    proc_def: 'processDefinitions'
  }[ownProps.entityType];
  const mustHave = {
    selectedEntities: state.admin.groups.group.selectedEntities,
    userProfile: state.user.profile,
    lastActionType: state.global.lastActionType
  };

  if (entity) {
    const entityData = (0, _lo.get)(state.admin.groups, entity) || {};
    return {
      classificationsLoading: state.grid.dropdowns.classifications.isLoading,
      classifications: state.grid.dropdowns.classifications.records,
      isLoading: entityData.isLoading,
      isDownloading: entityData.isDownloading,
      records: entityData.records,
      recordsCount: entityData.count,
      recordsCountMax: entityData.countMax,
      ...mustHave
    };
  }

  return mustHave;
}, {
  loadGroupEntities: _groupsActions.loadGroupEntities,
  removeGroupEntity: _groupsActions.removeGroupEntity,
  selectEntities: _groupsActions.selectEntities,
  loadClassificationsDropDownForGrid: _gridActions.loadClassificationsDropDownForGrid
})(GroupEntitiesGrid);

exports.default = _default;