"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the form to a add a Thing
 */
class AddForm extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      name: '',
      description: ''
    });

    _defineProperty(this, "onSubmit", e => {
      e.preventDefault();
      const formData = { ...this.state
      };
      const {
        addForm,
        onFormAdded
      } = this.props;
      addForm(formData).then(response => {
        if (response instanceof Error) return;
        const {
          id
        } = response;
        onFormAdded(id);
      });
    });

    _defineProperty(this, "onChange", event => {
      const {
        name,
        value
      } = event.target || event;
      this.setState({
        [name]: value
      });
    });
  }

  /**
   * @override
   */
  render() {
    const {
      isLoading,
      onClose,
      open
    } = this.props;
    const {
      name,
      description
    } = this.state;
    return _react.default.createElement(_Modal.default, {
      title: "Add Form",
      open: open,
      onToggle: onClose
    }, _react.default.createElement(_Form.default, {
      loading: isLoading,
      onSubmit: this.onSubmit
    }, _react.default.createElement(_Field.default, {
      label: "Name",
      name: "name",
      value: name,
      placeholder: "Enter the name",
      onChange: this.onChange,
      required: true
    }), _react.default.createElement(_Field.default, {
      label: "Description",
      name: "description",
      value: description,
      placeholder: "Enter the description",
      onChange: this.onChange
    }), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
      type: "button",
      onClick: onClose
    }, "Cancel"), _react.default.createElement(_Button.default, {
      type: "submit",
      color: "primary"
    }, "Submit"))));
  }

}

_defineProperty(AddForm, "propTypes", {
  addForm: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  onSubtaskAdded: _propTypes.default.func
});

var _default = AddForm;
exports.default = _default;