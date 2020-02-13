"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _SelectUsersGrid = _interopRequireDefault(require("app/containers/Common/SelectionGrids/SelectUsersGrid"));

var _common = require("app/utils/propTypes/common");

var _groupsActions = require("store/actions/admin/groupsActions");

var _History = _interopRequireDefault(require("store/History"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

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
let GroupUsersAdd = (_class = (_temp = _class2 = class GroupUsersAdd extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: []
    };
  }
  /**
   * Creates a new group using the form's data
   */


  addUsers(event) {
    event.preventDefault();
    const selectedUsers = this.state.selectedRows;
    const groupId = this.props.match.params.id;

    if (selectedUsers) {
      this.props.addUsersToGroup({
        groupId,
        userIds: selectedUsers.map(({
          id
        }) => id)
      }).then(response => {
        if (!(response instanceof Error)) {
          this.redirectBack();
        }
      });
    }
  }

  /**
   * @param selectedRows
   */
  onSelectionChange(selectedRows) {
    this.setState({
      selectedRows: selectedRows || []
    });
  }

  /**
   * redirect back to users tab
   */
  redirectBack() {
    const id = this.props.match.params.id;

    if (!id) {
      return null;
    }

    _History.default.push(`/groups/${id}/users`);
  }

  /**
   * @override
   */
  render() {
    const counter = this.state.selectedRows.length;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Add users",
      icon: "account-add"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_SelectUsersGrid.default, {
      dataTableId: _dataTableIds.GROUP_USERS_ADD_DATA_TABLE,
      onSelectionChange: this.onSelectionChange,
      selectedItems: this.state.selectedRows,
      groupId: this.props.match.params.id
    })), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      disabled: counter === 0 || this.props.addGroupUserLoading,
      loading: false,
      type: "submit",
      color: "primary",
      onClick: this.addUsers
    }, counter <= 1 ? 'Add user' : 'Add users'), _react.default.createElement(_Text.default, null, ' ', counter, " ", counter === 1 ? 'user selected.' : 'users selected.', ' ')), _react.default.createElement(_Button.default, {
      type: "button",
      onClick: this.redirectBack
    }, "Cancel")));
  }

}, _defineProperty(_class2, "propTypes", {
  addUsersToGroup: _propTypes.default.func.isRequired,
  addGroupUserLoading: _propTypes.default.bool,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  })
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "addUsers", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "addUsers"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelectionChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "redirectBack", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "redirectBack"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  addGroupUserLoading: state.admin.groups.addGroupUser.isLoading
}), {
  addUsersToGroup: _groupsActions.addUsersToGroup
})(GroupUsersAdd);

exports.default = _default;