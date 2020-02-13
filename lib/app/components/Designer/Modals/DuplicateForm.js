"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _lo = require("app/utils/lo/lo");

var _hooks = require("app/utils/hook/hooks");

var _designerActions = require("store/actions/designer/designerActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const DuplicateForm = ({
  form,
  close,
  cloneFormDefinition,
  onDuplicate
}) => {
  const [name, onNameChange] = (0, _hooks.useOnChange)((0, _lo.get)(form, 'name', ''));
  const [description, onDescriptionChange] = (0, _hooks.useOnChange)((0, _lo.get)(form, 'description', ''));
  const [isDuplicateDisabled, disableDuplicate] = (0, _react.useState)(false);
  const duplicate = (0, _hooks.useReduxAction)({
    action: cloneFormDefinition,
    parameters: [form.id, {
      name,
      description
    }],
    disableUI: disableDuplicate,
    onSuccess: () => {
      close && close();
      onDuplicate && onDuplicate();
    }
  });
  return _react.default.createElement(_Modal.default, {
    title: "Duplicate form",
    open: true,
    onToggle: close
  }, _react.default.createElement("p", null, "You need to give a name for the new form and you may want to add a description at the same time."), _react.default.createElement(_Form.default, null, _react.default.createElement(_Field.default, {
    label: "Name",
    name: "name",
    value: name,
    placeholder: "Enter the name",
    onChange: onNameChange,
    required: true
  }), _react.default.createElement(_Field.default, {
    label: "Description",
    name: "description",
    value: description,
    placeholder: "Enter the description",
    onChange: onDescriptionChange
  }), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
    type: "button",
    onClick: close
  }, "Cancel"), _react.default.createElement(_Button.default, {
    disabled: isDuplicateDisabled,
    onClick: duplicate,
    color: "primary"
  }, "Duplicate form"))));
};

var _default = (0, _reactRedux.connect)(null, {
  cloneFormDefinition: _designerActions.cloneFormDefinition
})((0, _react.memo)(DuplicateForm));

exports.default = _default;