"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _History = _interopRequireDefault(require("store/History"));

var _reactRouter = require("react-router");

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _lo = require("app/utils/lo/lo");

var _EntityAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/EntityAvatarRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _ToolBar = _interopRequireDefault(require("app/components/molecules/ToolBar/ToolBar"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _ReloadCountdown = _interopRequireDefault(require("app/components/molecules/ReloadCountdown/ReloadCountdown"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DropdownStyle = (0, _styledComponents.default)(_Dropdown.default).withConfig({
  displayName: "RelationshipsGrid__DropdownStyle",
  componentId: "uctvx1-0"
})(["background:transparent !important;border:none !important;.ui-inputtext{}.ui-dropdown-trigger{background:transparent;border:none;font-size:24px;}.ui-dropdown-label,.ui-dropdown-trigger-icon{min-height:24px;line-height:24px;padding-top:0;padding-bottom:0;background:transparent !important;font-weight:bold !important;color:#4BB9D9;}.ui-dropdown-label:hover{color:#4BB9D9;}.ui-dropdown-items{padding:0 !important;background:#393F4C;}.ui-dropdown-items-wrapper{max-height:none !important;}.ui-dropdown-item{min-height:50px;padding:15px !important;color:#fff;border-radius:0;}.ui-dropdown-item:not(.ui-state-highlight):hover{background:rgba(30,168,207,0.2) !important;}"]);

const IconWrapper = _styledComponents.default.div.withConfig({
  displayName: "RelationshipsGrid__IconWrapper",
  componentId: "uctvx1-1"
})(["display:flex;flex-direction:row;"]);

const InputText = _styledComponents.default.input.withConfig({
  displayName: "RelationshipsGrid__InputText",
  componentId: "uctvx1-2"
})(["height:100%;background:transparent;border:none;font-size:16px;line-height:24px;color:#fff;outline:none;::placeholder{color:gray;}"]);

class DeleteActionRenderer extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "deleteRelation", event => {
      event.stopPropagation();
      this.props.deleteRelation(this.props.data.id);
    });

    _defineProperty(this, "editRelation", event => {
      event.stopPropagation();
      const {
        baseUri,
        data: {
          id
        }
      } = this.props;

      _History.default.push(`${baseUri}/${id}/edit`);
    });
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ButtonIcon.default, {
      icon: "pencil",
      iconColor: "white",
      onClick: this.editRelation
    }), _react.default.createElement(_ButtonIcon.default, {
      icon: "delete",
      iconColor: "white",
      onClick: this.deleteRelation
    }));
  }

}
/**
 * @class
 * Renders the grid that contains the Relations.
 */


let RelationshipsGrid = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), _dec3 = (0, _decoratorUtils.memoize)(), _dec4 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class RelationshipsGrid extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dataTableApi", null);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: '',
        fields: ['entityName', 'entityId', 'relation', 'createdBy.name'],
        filterBuild: value => this.globalFilterBuilder(value)
      }
    });
  }

  //
  buildColumnDefinitions(canEdit, type1, type2, entityId, deleteRelationship, isAdmin) {
    const nType2 = type2 === 'custom' ? 'customEntity' : type2;
    const columns = [{
      header: 'Relationship',
      field: 'relation',
      queryFields: ['relationDefinition.relation', 'relationDefinition.reverseRelation'],
      bodyComponent: _EntityAvatarRenderer.default,
      bodyComponentProps: {
        type: 'custom',
        nameProperty: 'relation',
        idProperty: 'relationDefinition.id'
      },
      filterBuild: value => ({
        or: [[{
          field: 'relationDefinition.reverseRelation',
          op: '=',
          value
        }, {
          field: `${nType2}1.id`,
          op: '<>',
          value: entityId
        }], [{
          field: 'relationDefinition.relation',
          op: '=',
          value
        }, {
          field: `${nType2}2.id`,
          op: '<>',
          value: entityId
        }]]
      }),
      orderBuild: asc => ({
        asc: asc,
        where: [{
          field: `${nType2}1.id`,
          op: '=',
          value: entityId,
          then: 'relationDefinition.reverseRelation'
        }, {
          field: `${nType2}2.id`,
          op: '=',
          value: entityId,
          then: 'relationDefinition.relation'
        }]
      })
    }, {
      header: 'Entity ID',
      field: 'entityId',
      queryFields: [`${nType2}1.id`, `${nType2}2.id`],
      type: 'number',
      bodyComponent: _EntityAvatarRenderer.default,
      bodyComponentProps: {
        showAvatar: false,
        type: type2,
        nameProperty: 'entityId',
        idProperty: 'entityId'
      },
      filterMatchMode: '=',
      filterBuild: value => ({
        or: [[{
          field: `${nType2}1.id`,
          op: '=',
          value
        }, {
          field: `${nType2}1.id`,
          op: '<>',
          value: entityId
        }], [{
          field: `${nType2}2.id`,
          op: '=',
          value
        }, {
          field: `${nType2}2.id`,
          op: '<>',
          value: entityId
        }]]
      }),
      orderBuild: asc => ({
        asc: asc,
        where: [{
          field: `${nType2}1.id`,
          op: '=',
          value: entityId,
          then: `${nType2}2.id`
        }, {
          field: `${nType2}2.id`,
          op: '=',
          value: entityId,
          then: `${nType2}1.id`
        }]
      })
    }, {
      header: 'Entity Name',
      field: 'entityName',
      queryFields: [`${nType2}1.name`, `${nType2}2.name`],
      bodyComponent: _EntityAvatarRenderer.default,
      bodyComponentProps: {
        type: type2,
        nameProperty: 'entityName',
        idProperty: 'entityId',
        imageProperty: 'entityImage'
      },
      filterBuild: value => ({
        or: [[{
          field: `${nType2}1.name`,
          op: 'startsWith',
          value
        }, {
          field: `${nType2}1.id`,
          op: '<>',
          value: entityId
        }], [{
          field: `${nType2}2.name`,
          op: 'startsWith',
          value
        }, {
          field: `${nType2}2.id`,
          op: '<>',
          value: entityId
        }]]
      }),
      orderBuild: asc => ({
        asc: asc,
        where: [{
          field: `${nType2}1.id`,
          op: '=',
          value: entityId,
          then: `${nType2}2.name`
        }, {
          field: `${nType2}2.id`,
          op: '=',
          value: entityId,
          then: `${nType2}1.name`
        }]
      })
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
      header: 'Modified Date',
      field: 'modifiedDate',
      type: 'date'
    }];

    if (isAdmin) {
      columns.splice(1, 0, {
        header: 'Relationship Active',
        field: 'relationDefinition.customEntity.active',
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
      });
    }

    if (nType2 !== 'process' && nType2 !== 'task') {
      columns.splice(3, 0, {
        header: 'Entity Active',
        field: 'entityActive',
        queryFields: [`${nType2}1.active`, `${nType2}2.active`],
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
        },
        filterMatchMode: '=',
        filterBuild: value => ({
          or: [[{
            field: `${nType2}1.active`,
            op: '=',
            value
          }, {
            field: `${nType2}1.id`,
            op: '<>',
            value: entityId
          }], [{
            field: `${nType2}2.active`,
            op: '=',
            value
          }, {
            field: `${nType2}2.id`,
            op: '<>',
            value: entityId
          }]]
        })
      });
    }

    if (canEdit) {
      columns.push({
        header: 'Action',
        field: '__action__',
        bodyComponent: DeleteActionRenderer,
        bodyComponentProps: {
          deleteRelation: deleteRelationship,
          baseUri: `${this.props.baseUri}/${type2}`
        },
        style: {
          textAlign: 'center',
          width: '120px'
        },
        sortable: false,
        filter: false,
        exportable: false
      });
    }

    return columns;
  }

  globalFilterBuilder(value) {
    const {
      type1,
      type2,
      entityId,
      isAdmin,
      canEdit
    } = this.props;
    const colDef = this.buildColumnDefinitions(canEdit, type1, type2, entityId, this.deleteRelationship, isAdmin);
    const globalFilterQuery = [];
    this.gridSettings.globalFilter.fields.forEach(globalField => {
      (colDef || []).forEach(col => {
        if (col.field === globalField && col.filterBuild) {
          if (globalField === 'entityId') {
            globalFilterQuery.push(col.filterBuild(Number(value)));
          } else {
            globalFilterQuery.push(col.filterBuild(value));
          }
        } else if (col.field === globalField) {
          globalFilterQuery.push({
            or: [[{
              field: `${globalField}`,
              op: 'startsWith',
              value
            }, {
              field: `${type1}1.id`,
              op: '<>',
              value: entityId
            }], [{
              field: `${globalField}`,
              op: 'startsWith',
              value
            }, {
              field: `${type2}2.id`,
              op: '<>',
              value: entityId
            }]]
          });
        }
      });
    });
    return {
      or: globalFilterQuery
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type2 !== this.props.type2) {
      this.dataTableApi && this.dataTableApi.refresh();
    }
  }

  onDataTableMount(dataTableApi) {
    this.dataTableApi = dataTableApi;
  }

  normalizeRecords(records, entityId, type1, type2) {
    return records.map(record => {
      const relationType1 = (0, _lo.get)(record, 'relationDefinition.entityType1') || '';
      const isStraight = relationType1 === type1 && String((0, _lo.get)(record, `${type2}2.id`)) !== entityId;
      return { ...record,
        relation: isStraight ? (0, _lo.get)(record, 'relationDefinition.relation') : (0, _lo.get)(record, 'relationDefinition.reverseRelation'),
        entityName: isStraight ? (0, _lo.get)(record, `${type2}2.name`) : (0, _lo.get)(record, `${type2}1.name`),
        entityImage: isStraight ? (0, _lo.get)(record, `${type2}2.image`) : (0, _lo.get)(record, `${type2}1.image`),
        entityId: isStraight ? (0, _lo.get)(record, `${type2}2.id`) : (0, _lo.get)(record, `${type2}1.id`),
        entityActive: isStraight ? (0, _lo.get)(record, `${type2}2.active`) : (0, _lo.get)(record, `${type2}1.active`)
      };
    });
  }

  deleteRelationship(id) {
    return this.props.deleteRelationship(id).then(mbError => {
      if (!(mbError instanceof Error)) {
        this.dataTableApi && this.dataTableApi.refresh();
      }
    });
  }

  onDropdownChange(event) {
    const {
      value
    } = event.target;
    const {
      baseUri
    } = this.props;

    _History.default.push(`${baseUri}/${value}`);
  }

  /**
   * @override
   */
  render() {
    const {
      isAdmin,
      canEdit,
      type2,
      dataTableId,
      loadRows,
      isLoading,
      isDownloading,
      records,
      entityId,
      type1
    } = this.props;
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      onMount: this.onDataTableMount,
      dataTableId: dataTableId,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.buildColumnDefinitions(canEdit, type1, type2, entityId, this.deleteRelationship, isAdmin),
      loadRows: loadRows,
      isLoading: isLoading,
      isDownloading: isDownloading,
      disableCountdown: true,
      value: this.normalizeRecords(records, entityId, type1, type2),
      totalRecords: this.props.totalRecords,
      countMax: this.props.countMax,
      showMenuButton: true,
      toggleMenu: this.props.toggleMenu,
      dataKey: "id",
      selectionMode: "multiple",
      key: dataTableId,
      renderDataTableHeader: this.renderToolBar
    }));
  }

  navigateToAdd(event) {
    event.preventDefault();
    const {
      baseUri
    } = this.props;

    _History.default.push(`${baseUri}/add`);
  }

  renderToolBar({
    onGlobalSearch,
    globalSearchValue,
    toggleSettings,
    disableCountdown,
    countdownSeconds,
    refreshAction,
    exportData,
    downloadAll,
    isDownloading
  }) {
    const {
      type2
    } = this.props;
    const icons = [_react.default.createElement(_ButtonIcon.default, {
      key: "plus",
      icon: "plus",
      onClick: this.navigateToAdd,
      iconColor: "white",
      size: "md"
    })];

    if (refreshAction) {
      icons.push(_react.default.createElement(_ReloadCountdown.default, {
        key: "refresh",
        disableCountdown: disableCountdown,
        seconds: countdownSeconds,
        format: "minutes",
        action: refreshAction
      }));
    }

    icons.push(_react.default.createElement(_ButtonIcon.default, {
      key: "settings",
      icon: "settings",
      onClick: toggleSettings,
      iconColor: "white",
      size: "md"
    }));

    if (exportData) {
      icons.push(_react.default.createElement(_ButtonIcon.default, {
        key: "download",
        loading: isDownloading,
        icon: "download",
        title: downloadAll ? 'Exports all records' : 'Exports up to 1000 records',
        iconColor: "white",
        size: "md",
        onClick: exportData
      }));
    }

    return _react.default.createElement(_ToolBar.default, {
      leftSide: _react.default.createElement(DropdownStyle, {
        name: 'entityType',
        value: type2,
        options: [{
          value: 'thing',
          label: 'THINGS'
        }, {
          value: 'person',
          label: 'PEOPLE'
        }, {
          value: 'organisation',
          label: 'ORGANISATIONS'
        }, {
          value: 'custom',
          label: 'CUSTOM ENTITIES'
        }, {
          value: 'process',
          label: 'PROCESSES'
        }, {
          value: 'task',
          label: 'TASKS'
        }],
        onChange: this.onDropdownChange
      }),
      rightSide: icons && icons.length && _react.default.createElement(IconWrapper, null, icons)
    }, onGlobalSearch && _react.default.createElement(InputText, {
      value: globalSearchValue,
      onChange: onGlobalSearch,
      type: "search",
      placeholder: "Search..."
    }));
  }

}, _defineProperty(_class2, "propTypes", {
  entityId: _propTypes.default.string.isRequired,
  loadRows: _propTypes.default.func.isRequired,
  deleteRelationship: _propTypes.default.func.isRequired,
  dataTableId: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  isDownloading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array,
  totalRecords: _propTypes.default.number,
  countMax: _propTypes.default.number,
  canEdit: _propTypes.default.bool.isRequired,
  isAdmin: _propTypes.default.bool.isRequired
}), _defineProperty(_class2, "defaultProps", {
  loadParams: {},
  isLoading: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "buildColumnDefinitions", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildColumnDefinitions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "globalFilterBuilder", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "globalFilterBuilder"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onDataTableMount", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onDataTableMount"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "normalizeRecords", [_decoratorUtils.bind, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "normalizeRecords"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deleteRelationship", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "deleteRelationship"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onDropdownChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onDropdownChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "navigateToAdd", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "navigateToAdd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "renderToolBar", [_decoratorUtils.bind, _dec4], Object.getOwnPropertyDescriptor(_class.prototype, "renderToolBar"), _class.prototype)), _class));

var _default = (0, _reactRouter.withRouter)(RelationshipsGrid);

exports.default = _default;