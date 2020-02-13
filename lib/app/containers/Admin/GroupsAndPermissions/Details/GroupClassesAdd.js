"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _SelectClassesGrid = _interopRequireDefault(require("app/containers/Common/SelectionGrids/SelectClassesGrid"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _common = require("app/utils/propTypes/common");

var _History = _interopRequireDefault(require("store/History"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _LabelListRenderer = _interopRequireDefault(require("../../../../components/molecules/Grid/Renderers/LabelListRenderer/LabelListRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _utils = require("app/utils/utils");

var _dataTableIds = require("app/config/dataTableIds");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the view to add Groups and Permissions.
 */
let GroupClassesAdd = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class GroupClassesAdd extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", (0, _Immutable.default)({
      selectedRows: [],
      selectedRowsCount: 0
    }));
  }

  /**
   * Adds an the selected Entities to the group
   */
  addClasses(event) {
    event.preventDefault();
    const {
      id: groupId
    } = this.props.match.params;
    this.props.addEntitiesToGroup(groupId, 'classification', this.state.selectedRows).then(response => {
      if (!(response instanceof Error)) {
        this.redirectBack();
      }
    });
  }

  /**
   * @param selectedRows
   */
  onSelectionChange(selectedRows) {
    this.setState((0, _Immutable.default)({
      selectedRows,
      selectedRowsCount: selectedRows.length
    }));
  }

  /**
   * redirect back to classification tab
   */
  redirectBack() {
    const id = this.props.match.params.id;

    if (!id) {
      return null;
    }

    _History.default.push(`/groups/${id}/classifications`);
  }

  buildCustomWhere(id, isAdmin) {
    const customWhere = [{
      field: 'abstract',
      op: '<>',
      value: true
    }];

    if (!isAdmin) {
      customWhere.push({
        field: 'active',
        op: '=',
        value: true
      });
    }

    return customWhere;
  }

  buildExcludeBy(id) {
    return [{
      field: 'entityGroups.group.id',
      op: '=',
      value: id
    }];
  }
  /**
   * @override
   */


  render() {
    const {
      userProfile: {
        isAdmin
      }
    } = this.props;
    const counter = this.state.selectedRowsCount;
    const customWhere = this.buildCustomWhere(this.props.match.params.id, isAdmin);
    const excludeBy = this.buildExcludeBy(this.props.match.params.id);
    const customColumnDefinitions = [{
      header: 'Abstract',
      field: 'abstract',
      sortable: false,
      bodyComponent: _BooleanRenderer.default,
      renderValue: ({
        value
      }) => value ? 'Abstract' : 'Non-abstract',
      type: 'boolean',
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
    }];

    if (isAdmin) {
      customColumnDefinitions.unshift({
        header: 'Active',
        field: 'active',
        bodyComponent: _BooleanRenderer.default,
        sortable: false,
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
      });
    }

    return _react.default.createElement(_PageTemplate.default, {
      title: "Add Classes"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_SelectClassesGrid.default, {
      dataTableId: _dataTableIds.GROUP_CLASSIFICATIONS_ADD_DATA_TABLE,
      onSelectionChange: this.onSelectionChange,
      match: this.props.match.params.id,
      selectedRows: this.state.selectedRows,
      selectionMode: 'multiple',
      customWhere: customWhere,
      excludeBy: excludeBy,
      customColumnDefinitions: customColumnDefinitions
    })), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      disabled: counter === 0 || this.props.addingEntities,
      loading: false,
      type: "submit",
      color: "primary",
      onClick: this.addClasses
    }, counter <= 1 ? 'Add Class' : 'Add Classes'), _react.default.createElement(_Text.default, null, ' ', counter, " ", counter === 1 ? 'class selected.' : 'classes selected.', ' ')), _react.default.createElement(_Button.default, {
      type: "button",
      onClick: this.redirectBack
    }, "Cancel")));
  }

}, _defineProperty(_class2, "propTypes", {
  addEntitiesToGroup: _propTypes.default.func.isRequired,
  addingEntities: _propTypes.default.bool,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  })
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "addClasses", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "addClasses"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelectionChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "redirectBack", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "redirectBack"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildCustomWhere", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildCustomWhere"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildExcludeBy", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "buildExcludeBy"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  savingGroup: state.admin.groups.group.savingGroup,
  addingEntities: state.admin.groups.addingEntities.isLoading,
  userProfile: state.user.profile
}), {
  addEntitiesToGroup: _groupsActions.addEntitiesToGroup
})(GroupClassesAdd);

exports.default = _default;