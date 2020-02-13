"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _dataTableIds = require("app/config/dataTableIds");

var _groupsActions = require("store/actions/admin/groupsActions");

var _LabelListRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _lo = require("app/utils/lo/lo");

var _common = require("app/utils/propTypes/common");

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _GroupTabEdit = _interopRequireDefault(require("app/containers/Admin/GroupsAndPermissions/Details/GroupTabEdit"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const ButtonStyle = _styledComponents.default.div.withConfig({
  displayName: "GroupClassificationsTab__ButtonStyle",
  componentId: "sc-1p8xop9-0"
})(["display:flex;justify-content:center;"]);
/**
 * Container that is used to display the Classification tab of the Groups & Permissions details view.
 */


let GroupClassificationsTab = (_class = (_temp = _class2 = class GroupClassificationsTab extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "gridSettings", void 0);

    _defineProperty(this, "key", 0);

    _defineProperty(this, "columnDefs", void 0);

    _defineProperty(this, "canEdit", void 0);

    this.state = {
      visible: false
    };
    this.gridSettings = {
      pageSize: 10,
      filters: {},
      fields: [],
      globalFilter: {
        value: ''
      }
    };
    const {
      permissions,
      isAdmin
    } = props.userProfile;
    const permissionsSet = new Set(permissions || []);
    this.canEdit = isAdmin || permissionsSet.has('admin.group.edit');
    this.columnDefs = [{
      header: 'Classification Name',
      field: 'classification.name',
      renderValue: ({
        value,
        data
      }) => `${value} (${String((0, _lo.get)(data, 'classification.name') || '')})`
    }, {
      header: 'Classification URL',
      field: 'classification.uri',
      renderValue: ({
        data
      }) => (0, _lo.get)(data, 'classification.uri')
    }, {
      header: 'Permissions',
      field: 'permissions',
      filter: false,
      sortable: false,
      bodyComponent: _LabelListRenderer.default,
      renderValue: ({
        value
      }) => (value || []).join(', ')
    }, {
      header: 'Parent',
      field: 'classification.parents.name',
      filter: false,
      sortable: false,
      bodyComponent: ({
        data
      }) => _react.default.createElement(_LabelListRenderer.default, {
        data: data,
        value: ((0, _lo.get)(data, 'classification.parents') || []).map(({
          name
        }) => name)
      }),
      renderValue: ({
        data
      }) => ((0, _lo.get)(data, 'classification.parents') || []).map(({
        name
      }) => name).join(', ')
    }, {
      header: 'Applies To',
      field: 'classification.applicableOn',
      filter: false,
      sortable: false,
      bodyComponent: _LabelListRenderer.default,
      renderValue: ({
        value
      }) => (value || []).join(', ')
    }];

    if (isAdmin) {
      this.columnDefs.push({
        header: 'Active',
        field: 'classification.active',
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
      this.columnDefs.push({
        header: 'Action',
        field: '__action__',
        bodyComponent: ({
          data
        }) => _react.default.createElement(ButtonStyle, null, _react.default.createElement(_ButtonIcon.default, {
          style: {
            color: 'white'
          },
          icon: "delete",
          onClick: () => {
            this.removeClassification(data);
          }
        })),
        style: {
          width: '80px'
        },
        filter: false,
        exportable: false,
        sortable: false
      });
    }

    this.resetSelectedClasses();
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
      selectClasses
    } = this.props;

    if (lastActionType === _groupsActions.UPDATE_PERMISSIONS) {
      ++this.key;
      selectClasses([]);
    }
  }
  /**
   * This function will keep track of the count of selected rows in a grid
   */


  onSelectionChanged(event) {
    const selectedRows = event.data;
    this.props.selectClasses(selectedRows);
  }

  /**
   * This function will reset the selected classes
   */
  resetSelectedClasses() {
    this.props.selectClasses([]);
  }

  /**
   * Remove the specified entity from the group.
   *
   * @param data the Class URI.
   */
  removeClassification({
    id
  } = {}) {
    this.props.removeGroupEntity(id, 'classification').then(() => {
      ++this.key;
      this.resetSelectedClasses();
    });
  }

  loadRows(options) {
    const groupId = this.props.match.params.id;

    if (groupId) {
      return this.props.loadGroupClasses(groupId, options, this.props.userProfile.isAdmin);
    }
  }

  showDialog() {
    this.setState({
      visible: true
    });
  }

  closeDialog() {
    this.setState({
      visible: false
    });
  }

  /**
   * @override
   */
  render() {
    const groupId = (0, _lo.get)(this.props.match.params, 'id');
    const group = this.props.group || {};
    const {
      selectedClasses
    } = this.props;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      key: this.key,
      dataTableId: _dataTableIds.GROUP_CLASSIFICATIONS_DATA_TABLE,
      savePreferences: true,
      gridSettings: this.gridSettings,
      loadRows: this.loadRows,
      columnDefinitions: this.columnDefs,
      isLoading: this.props.isLoading,
      disableCountdown: true,
      value: this.props.groupClasses,
      totalRecords: this.props.groupClassesCount,
      countMax: this.props.groupClassesCountMax,
      selection: this.props.selectedClasses,
      dataKey: 'classification.id',
      selectionMode: "multiple",
      onSelectionChange: this.onSelectionChanged
    })), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, group.id !== 1 && this.canEdit && _react.default.createElement(_TextIcon.default, {
      label: "Add",
      icon: "plus",
      color: "primary",
      to: `${this.props.match.url}/add`
    }), group.id !== 1 && this.canEdit && selectedClasses && selectedClasses.length > 0 && _react.default.createElement(_TextIcon.default, {
      label: "Edit",
      count: selectedClasses.length,
      icon: "pencil",
      color: "secondary",
      onClick: this.showDialog
    })), _react.default.createElement(_GroupTabEdit.default, {
      groupId: groupId,
      selectedRow: selectedClasses,
      open: this.state.visible,
      closeDialog: this.closeDialog
    })));
  }

}, _defineProperty(_class2, "propTypes", {
  lastActionType: _propTypes.default.string,
  lastActionError: _propTypes.default.bool,
  loadGroupClasses: _propTypes.default.func.isRequired,
  group: _propTypes.default.object,
  selectedClasses: _propTypes.default.array,
  removeGroupEntity: _propTypes.default.func.isRequired,
  selectClasses: _propTypes.default.func.isRequired,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  }),
  groupClasses: _propTypes.default.array,
  groupClassesCount: _propTypes.default.number,
  groupClassesCountMax: _propTypes.default.number,
  isLoading: _propTypes.default.bool,
  userProfile: _propTypes.default.object.isRequired
}), _defineProperty(_class2, "defaultProps", {
  isLoading: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "onSelectionChanged", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChanged"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetSelectedClasses", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "resetSelectedClasses"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeClassification", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "removeClassification"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadRows", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "loadRows"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showDialog", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "showDialog"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeDialog", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "closeDialog"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  group: state.admin.groups.group.details,
  userProfile: state.user.profile,
  isLoading: state.admin.groups.group.isLoading,
  groupClasses: state.admin.groups.group.classes.records,
  groupClassesCount: state.admin.groups.group.classes.count,
  groupClassesCountMax: state.admin.groups.group.classes.countMax,
  selectedClasses: state.admin.groups.group.selectedClasses
}), {
  loadGroupClasses: _groupsActions.loadGroupClasses,
  removeGroupEntity: _groupsActions.removeGroupEntity,
  selectClasses: _groupsActions.selectClasses
})(GroupClassificationsTab);

exports.default = _default;