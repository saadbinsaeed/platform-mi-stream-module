"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _form = require("app/utils/http/form");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Edit the permissions of the selected Group's classes.
 */
class GroupPermissionsEdit extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      form: (0, _Immutable.default)({})
    });

    this.onFormSubmit = this.onFormSubmit.bind(this);

    if (this.props.selectedItems.length === 1) {
      if (this.props.selectedItems[0].permissions) {
        this.state = {
          updatingEntities: false,
          form: {
            read: this.props.selectedItems[0].permissions.indexOf('read') !== -1,
            assign: this.props.selectedItems[0].permissions.indexOf('assign') !== -1,
            edit: this.props.selectedItems[0].permissions.indexOf('edit') !== -1
          }
        };
      }
    }
  }
  /**
   * @param event SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */


  onFormSubmit(event) {
    event.preventDefault();
    const {
      groupId,
      selectedItems,
      savePermissions
    } = this.props;

    if (!selectedItems || !selectedItems.length) {
      return;
    }

    const form = this.state.form;
    const permissions = Object.keys(form).filter(k => form[k]);
    const groupEntityIds = selectedItems.map(({
      id
    }) => id);
    this.setState({
      updatingEntities: true
    });
    savePermissions({
      groupId,
      groupEntityIds,
      permissions: permissions.length ? permissions : null
    }).then(() => this.props.closeDialog()).catch(() => this.setState({
      updatingEntities: false
    }));
  }
  /**
   * @override
   */


  render() {
    const {
      selectedItems,
      closeDialog
    } = this.props;
    const {
      updatingEntities = false
    } = this.state;

    if (!selectedItems || selectedItems.length === 0) {
      return _react.default.createElement("h1", null, "Please select the items to edit");
    }

    const count = selectedItems.length;
    return _react.default.createElement(_Form.default, {
      onSubmit: this.onFormSubmit
    }, _react.default.createElement("div", null, _react.default.createElement(_CheckBox.default, _extends({
      label: "Edit"
    }, (0, _form.handleChange)(this, 'edit', 'form', 'checked'))), _react.default.createElement(_CheckBox.default, _extends({
      label: "Read"
    }, (0, _form.handleChange)(this, 'read', 'form', 'checked'))), _react.default.createElement(_CheckBox.default, _extends({
      label: "Assign"
    }, (0, _form.handleChange)(this, 'assign', 'form', 'checked')))), _react.default.createElement("br", null), _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      type: "button",
      onClick: closeDialog
    }, "Cancel"), _react.default.createElement(_Button.default, {
      type: "submit",
      color: "primary",
      disabled: updatingEntities
    }, "Save"), _react.default.createElement("span", null, "  You are about to edit permissions for ", count, " ", count === 1 ? 'item' : 'items', " ")));
  }

}

_defineProperty(GroupPermissionsEdit, "propTypes", {
  groupId: _propTypes.default.string.isRequired,
  selectedItems: _propTypes.default.array.isRequired,
  savePermissions: _propTypes.default.func.isRequired,
  closeDialog: _propTypes.default.func.isRequired
});

var _default = GroupPermissionsEdit;
exports.default = _default;