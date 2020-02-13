"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _SelectEntitiesGrid = _interopRequireDefault(require("app/containers/Common/SelectionGrids/SelectEntitiesGrid"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _common = require("app/utils/propTypes/common");

var _groupsActions = require("store/actions/admin/groupsActions");

var _History = _interopRequireDefault(require("store/History"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _dataTableIds = require("app/config/dataTableIds");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the view to add Groups and Permissions.
 */
let GroupUsersAdd = (_class = (_temp = _class2 = class GroupUsersAdd extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", (0, _Immutable.default)({
      selectedRowsCount: 0,
      selectedRows: []
    }));
  }

  /**
   * Adds an the selected Entities to the group
   */
  addEntities(event) {
    event.preventDefault();
    const {
      type: entityType,
      id: groupId
    } = this.props.match.params;
    this.props.addEntitiesToGroup(groupId, entityType, this.state.selectedRows).then(response => {
      if (!(response instanceof Error)) {
        _History.default.push(`/groups/${groupId}/entities/${entityType}`);
      }
    });
  }

  /**
   * @param selectedRows
   */
  onSelectionChanged(selectedRows) {
    this.setState((0, _Immutable.default)({
      selectedRows,
      selectedRowsCount: selectedRows.length
    }));
  }

  /**
   * @override
   */
  render() {
    const counter = this.state.selectedRowsCount;
    const {
      type,
      id
    } = this.props.match.params;
    let title = null;
    const singular = {
      proc_def: 'Add Process Definition',
      person: 'Add Person',
      organisation: 'Add Organisation',
      thing: 'Add Thing',
      custom: 'Add Custom Entity'
    };
    const singleSelected = {
      proc_def: 'Process Definition selected.',
      person: 'Person selected.',
      organisation: 'Organisation selected.',
      thing: 'Thing selected.',
      custom: 'Custom Entity selected.'
    };
    const multiSelected = {
      proc_def: 'Process Definitions selected.',
      person: 'People selected.',
      organisation: 'Organisations selected.',
      thing: 'Things selected.',
      custom: 'Custom Entities selected.'
    };

    if (type === 'proc_def') {
      title = 'Add Process Definitions';
    }

    if (type === 'person') {
      title = 'Add People';
    }

    if (type === 'organisation') {
      title = 'Add Organisations';
    }

    if (type === 'thing') {
      title = 'Add Things';
    }

    if (type === 'custom') {
      title = 'Add Custom Entities';
    }

    return _react.default.createElement(_PageTemplate.default, {
      title: title
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_SelectEntitiesGrid.default, {
      dataTableId: _dataTableIds.GROUP_ENTITIES_ADD_DATA_TABLE,
      entityType: type,
      onSelectionChanged: this.onSelectionChanged,
      groupId: id
    })), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      disabled: counter === 0 || this.props.addingEntities,
      loading: false,
      type: "submit",
      color: "primary",
      onClick: this.addEntities
    }, counter <= 1 ? singular[type] : title), _react.default.createElement(_Text.default, null, ' ', counter, " ", counter === 1 ? singleSelected[type] : multiSelected[type], ' ')), _react.default.createElement(_Button.default, {
      type: "button",
      onClick: () => _History.default.push(`/groups/${id}/entities/${type}`)
    }, "Cancel")));
  }

}, _defineProperty(_class2, "propTypes", {
  addEntitiesToGroup: _propTypes.default.func.isRequired,
  addingEntities: _propTypes.default.bool,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  })
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "addEntities", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "addEntities"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelectionChanged", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChanged"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  savingGroup: state.admin.groups.group.savingGroup,
  addingEntities: state.admin.groups.addingEntities.isLoading
}), {
  addEntitiesToGroup: _groupsActions.addEntitiesToGroup
})(GroupUsersAdd);

exports.default = _default;