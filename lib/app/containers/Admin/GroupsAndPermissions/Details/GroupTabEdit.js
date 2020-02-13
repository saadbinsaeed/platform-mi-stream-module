"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _groupsActions = require("store/actions/admin/groupsActions");

var _GroupPermissionsEdit = _interopRequireDefault(require("app/components/Admin/GroupsAndPermissions/GroupPermissionsEdit"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Edit the permissions of the selected Group's entities.
 */
class GroupTabEdit extends _react.Component {
  /**
   * @override
   */
  render() {
    const {
      groupId,
      selectedRow,
      updatePermissions,
      closeDialog,
      open
    } = this.props;
    return _react.default.createElement(_Modal.default, {
      title: "Edit Permissions",
      disableBack: true,
      open: open,
      onToggle: closeDialog
    }, _react.default.createElement(_GroupPermissionsEdit.default, {
      groupId: groupId,
      selectedItems: selectedRow,
      savePermissions: updatePermissions,
      closeDialog: closeDialog
    }));
  }

}

_defineProperty(GroupTabEdit, "propTypes", {
  groupId: _propTypes.default.string.isRequired,
  selectedRow: _propTypes.default.array.isRequired,
  updatePermissions: _propTypes.default.func.isRequired,
  closeDialog: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool.isRequired
});

var _default = (0, _reactRedux.connect)(null, {
  updatePermissions: _groupsActions.updatePermissions
})(GroupTabEdit);

exports.default = _default;