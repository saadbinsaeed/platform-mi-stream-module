"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _lo = require("app/utils/lo/lo");

var _designerActions = require("store/actions/designer/designerActions");

var _hooks = require("app/utils/hook/hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const DeleteForm = ({
  form,
  close,
  deleteFormDefinition,
  onDelete
}) => {
  const [isDeleteDisabled, disableDelete] = (0, _react.useState)(false);
  const onDeleteAction = (0, _hooks.useReduxAction)({
    action: deleteFormDefinition,
    parameters: [form.id],
    disableUI: disableDelete,
    onSuccess: () => {
      close && close();
      onDelete && onDelete();
    }
  });
  return _react.default.createElement(_Modal.default, {
    title: "Delete form",
    open: true,
    onToggle: close
  }, _react.default.createElement("p", null, "Are you sure you want to delete the form \"", (0, _lo.get)(form, 'name'), "\"?"), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
    type: "button",
    onClick: close
  }, "Cancel"), _react.default.createElement(_Button.default, {
    disabled: isDeleteDisabled,
    onClick: onDeleteAction,
    color: "error"
  }, "Delete form")));
};

var _default = (0, _reactRedux.connect)(null, {
  deleteFormDefinition: _designerActions.deleteFormDefinition
})((0, _react.memo)(DeleteForm));

exports.default = _default;