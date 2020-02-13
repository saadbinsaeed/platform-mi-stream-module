"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _appActions = require("store/actions/app/appActions");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _transformer = require("app/utils/trasformer/transformer");

var _common = require("app/utils/propTypes/common");

var _stringUtils = require("app/utils/string/string-utils");

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _History = _interopRequireDefault(require("store/History"));

var _KeyValuePairTable = _interopRequireDefault(require("./KeyValuePairTable/KeyValuePairTable"));

var _FieldItem = _interopRequireDefault(require("app/components/Entities/Classifications/FieldItem"));

var _attributeTypes = _interopRequireDefault(require("app/containers/Classifications/attributeTypes"));

var _ClassificationAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ClassificationAutocomplete"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AvailableGridCheckBox = (0, _styledComponents.default)(_reactStyledFlexboxgrid.Col).withConfig({
  displayName: "AttributeDetailModal__AvailableGridCheckBox",
  componentId: "n0ad5a-0"
})(["display:none !important;"]);
const formats = [];

for (const delimiter of [' ', '/', '-', '.']) {
  for (const d of ['D', 'DD']) {
    for (const m of ['M', 'MM']) {
      for (const y of ['Y', 'YY']) {
        formats.push(`${d}${delimiter}${m}${delimiter}${y}`);
        formats.push(`${d}${delimiter}${y}${delimiter}${m}`);
        formats.push(`${m}${delimiter}${d}${delimiter}${y}`);
        formats.push(`${m}${delimiter}${y}${delimiter}${d}`);
        formats.push(`${y}${delimiter}${d}${delimiter}${m}`);
        formats.push(`${y}${delimiter}${m}${delimiter}${d}`);
      }
    }
  }
}
/**
 * Attribute detail modal
 */


class AttributeDetailModal extends _react.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "attributeId", -1);

    _defineProperty(this, "fUri", void 0);

    _defineProperty(this, "onKeyPress", event => {
      if (event.which === 13) {
        event.preventDefault();
      }
    });

    _defineProperty(this, "hideExtensionTypes", ['timestamp', 'enum', 'things', 'people', 'organisations', 'directory', 'custom', 'classification']);

    this.state = this.resetForm(props);
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  /**
   * @override
   */


  componentDidUpdate(prevProps, prevState) {
    if (this.props.classification !== prevProps.classification) {
      this.setState(this.resetForm(this.props));
    }
  }
  /**
   * Handle a form change
   * @param event
   */


  handleChange(event) {
    const {
      name,
      value
    } = event.target;

    if (name === 'f_uri') {
      event.target.setCustomValidity('');
      const parentUri = `${this.state.classificationForm.uri}/`;

      if ((0, _stringUtils.startsWith)(value, parentUri)) {
        const uri = value.replace(parentUri, '').toLowerCase();
        this.setState({
          classificationForm: this.setFieldValue(this.state.classificationForm, name, `${parentUri}${uri}`)
        });
      }
    } else if (name === 'name') {
      const parentUri = `${this.state.classificationForm.uri}/`;
      let classificationForm = this.setFieldValue(this.state.classificationForm, name, value); // update the URI if it is not defined or if it is derived by the name

      const newUri = value.replace(/[^\w\d]+/g, '').toLowerCase();
      const newFullUri = `${parentUri}${newUri}`;
      const uri = this.getFieldValue(this.state.classificationForm, 'f_uri');

      if (!uri || !value || (0, _stringUtils.startsWith)(uri, newFullUri) || (0, _stringUtils.startsWith)(newFullUri, uri)) {
        this.fUri && this.fUri.setCustomValidity('');
        classificationForm = this.setFieldValue(classificationForm, 'f_uri', newFullUri);
      }

      this.setState({
        classificationForm
      });
    } else if (name === 'kind') {
      this.setState({
        classificationForm: this.setFieldValue(this.state.classificationForm, name, value)
      }, () => {
        this.setState({
          classificationForm: this.setFieldValue(this.state.classificationForm, 'default_value', null)
        });
      });
    } else {
      if (this.attributeId === -1) {
        this.setState(this.resetForm(this.props));
      }

      if (name === 'type' && ['things', 'people', 'organisations', 'custom', 'classification'].includes(value)) {
        return this.setState({
          classificationForm: this.setFieldValue(this.setFieldValue(this.state.classificationForm, 'filter_expression', JSON.stringify([{
            field: 'active',
            op: '=',
            value: true
          }])), name, value)
        });
      }

      this.setState({
        classificationForm: this.setFieldValue(this.state.classificationForm, name, value)
      });
    }
  }
  /**
   * Resets form state.
   */


  resetForm({
    classification,
    match
  }) {
    const newState = {
      classificationForm: classification
    };
    let fields = (0, _transformer.safeToJS)((0, _lo.get)(newState, 'classificationForm.formDefinitions.fields'));

    if (fields) {
      fields.forEach((element, index) => {
        if (element.f_uri === decodeURIComponent(match.params.attributeFieldUri)) {
          this.attributeId = index;
        }
      });
    }

    if (this.attributeId === -1 && classification) {
      const emptyAttribute = {
        f_uri: '',
        group_name: classification.name
      };
      fields = (0, _Immutable.default)([...(fields || []), emptyAttribute]);
      newState.classificationForm = (0, _Immutable.set)(newState.classificationForm, 'formDefinitions.fields', fields);
      this.attributeId = fields.length - 1;
    }

    return newState;
  }
  /**
   * prevent form submission on enter key press in input.
   */


  /**
   * Save the form.
   */
  onFormSubmit(event) {
    event.preventDefault();
    const {
      classificationForm
    } = this.state;
    const {
      name: classificationName
    } = this.props.classification; // the attribute URI must be unique

    const fUri = this.getFieldValue(classificationForm, 'f_uri');
    const matches = classificationForm.formDefinitions.fields.filter(field => {
      return field.f_uri === fUri;
    }).length;

    if (matches > 1) {
      this.props.showToastr({
        severity: 'error',
        detail: 'The same URI is used by another attribute: please change the URI of this attribute before saving it.'
      });
      return;
    }

    let update = true;
    let toastrMsg = false;
    const type = this.getFieldValue(classificationForm, 'type');

    if (!type) {
      return this.props.showToastr({
        severity: 'error',
        detail: 'Attribute type is missing.'
      });
    }

    const enumerations = this.getFieldValue(classificationForm, 'enum_values') || [];

    if (type === 'enum' && !enumerations.length) {
      toastrMsg = {
        severity: 'error',
        detail: 'Please enter one key-value pair before submitting form.'
      };
      update = false;
    }

    if (enumerations) {
      enumerations.forEach((kvPair, index) => {
        enumerations.forEach((innerKVpair, innerIndex) => {
          if (index !== innerIndex && (innerKVpair.key === kvPair.key || innerKVpair.value === kvPair.value)) {
            toastrMsg = {
              severity: 'error',
              detail: 'Please fill all the cells with a unique value before submitting form.'
            };
            update = false;
          }
        });

        if (kvPair.value === '' || kvPair.key === '') {
          toastrMsg = {
            severity: 'error',
            detail: 'Please fill all the cell values before submitting form.'
          };
          update = false;
        }

        if (kvPair.value.length > 50) {
          toastrMsg = {
            severity: 'error',
            detail: 'Value should be less then 50 characters.'
          };
          update = false;
        }

        if (kvPair.key.length > 50) {
          toastrMsg = {
            severity: 'error',
            detail: 'Key should be less then 50 characters.'
          };
          update = false;
        }
      });
    }

    const groupName = this.getFieldValue(classificationForm, 'group_name');
    const formData = this.setFieldValue(classificationForm, 'group_name', groupName || classificationName);
    const {
      id,
      formDefinitions
    } = formData || {};

    if (update) {
      return this.setState({
        isLoading: true
      }, () => {
        this.props.updateClassification({
          id,
          formDefinitions
        }).then(() => {
          this.setState(this.resetForm(this.props));
          this.attributeId = -1;

          _History.default.push(`/classifications/${classificationForm.id}/attributes`);
        }).catch(e => {
          this.setState({
            isLoading: false
          });
          this.props.showToastr({
            severity: 'error',
            detail: `Failed to save attribute. ${e}`
          });
        });
      });
    }

    this.props.showToastr(toastrMsg);
  }

  /**
   * @override
   */
  render() {
    const {
      classificationForm,
      isLoading
    } = this.state;

    if (!classificationForm) {
      return null;
    }

    if (isLoading) {
      return _react.default.createElement(_Loader.default, {
        absolute: true,
        backdrop: true
      });
    }

    const parentUri = `${classificationForm.uri}/`;
    const name = this.getFieldValue(this.props.classification, 'name', '');
    const title = name ? `Edit Attribute: ${name}` : 'Add Attribute';
    const type = this.getFieldValue(classificationForm, 'type');
    const text_ext = this.getFieldValue(classificationForm, 'text_ext');
    const readOnlyValue = this.getFieldValue(classificationForm, 'readOnly');
    const requiredValue = this.getFieldValue(classificationForm, 'required');
    const extentions = this.hideExtensionTypes.includes(type) ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Field.default, {
      type: "text",
      name: "text_ext",
      label: "Extension Text",
      placeholder: "$",
      title: "Max 12 characters are allowed",
      value: text_ext,
      maxLength: "12",
      onChange: this.handleChange
    }), _react.default.createElement(_Dropdown.default, {
      label: "Display",
      value: this.getFieldValue(classificationForm, 'text_ext_position'),
      onChange: this.handleChange,
      name: "text_ext_position",
      placeholder: "Display text...",
      fluid: true,
      required: !!text_ext,
      options: [{
        value: 'before',
        label: 'Before Value'
      }, {
        value: 'after',
        label: 'After Value'
      }]
    }));
    const selectedClass = this.getFieldValue(classificationForm, 'class');
    return _react.default.createElement(_Modal.default, {
      title: title,
      closeUrl: `/classifications/${classificationForm.id}/attributes`,
      open: true
    }, _react.default.createElement(_Form.default, {
      onKeyPress: this.onKeyPress,
      onSubmit: this.onFormSubmit
    }, _react.default.createElement("div", null, _react.default.createElement(_Field.default, {
      label: "Name",
      name: "name",
      placeholder: "Name",
      value: this.getFieldValue(classificationForm, 'name'),
      onChange: this.handleChange,
      pattern: ".{3,60}",
      title: "3 to 60 characters",
      required: true,
      minLength: "1"
    }), _react.default.createElement(_Field.default, {
      inputRef: input => {
        this.fUri = input;
      },
      label: "Attribute URI",
      name: "f_uri",
      value: this.getFieldValue(classificationForm, 'f_uri', parentUri),
      onChange: this.handleChange,
      required: true,
      pattern: `.{${parentUri.length + 1},}`,
      onInvalid: event => {
        event.target.setCustomValidity('Please complete the URI');
      }
    }), _react.default.createElement(_Field.default, {
      label: "Group Name",
      name: "group_name",
      placeholder: `Group name (${classificationForm.name})`,
      value: this.getFieldValue(classificationForm, 'group_name'),
      onChange: this.handleChange
    }), _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 3,
      md: 3,
      lg: 3
    }, _react.default.createElement(_CheckBox.default, {
      label: "Summary",
      name: "summary",
      checked: this.getFieldValue(classificationForm, 'summary'),
      onChange: this.handleChange
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 3,
      md: 3,
      lg: 3
    }, _react.default.createElement(_CheckBox.default, {
      label: "Read only",
      name: "readOnly",
      disabled: requiredValue,
      checked: readOnlyValue,
      onChange: this.handleChange
    })), type !== 'bool' && _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 3,
      md: 3,
      lg: 3
    }, _react.default.createElement(_CheckBox.default, {
      label: "Required",
      name: "required",
      disabled: readOnlyValue,
      checked: requiredValue,
      onChange: this.handleChange
    })), _react.default.createElement(AvailableGridCheckBox, {
      xs: 12,
      sm: 9,
      md: 9,
      lg: 9
    }, _react.default.createElement(_CheckBox.default, {
      label: "Available for grid",
      name: "availableForGrid",
      checked: this.getFieldValue(classificationForm, 'availableForGrid'),
      onChange: this.handleChange
    }))), _react.default.createElement(_Dropdown.default, {
      label: "Attribute Type",
      value: type,
      onChange: evt => this.handleChange({
        target: {
          name: 'type',
          value: evt.target.value
        }
      }),
      name: "type",
      placeholder: "Select an attribute type",
      fluid: true,
      required: true,
      options: _attributeTypes.default
    }), type === 'directory' && _react.default.createElement(_Field.default, {
      name: "dir_domain",
      label: "Domain",
      placeholder: "Domain",
      value: this.getFieldValue(classificationForm, 'dir_domain'),
      onChange: this.handleChange
    }), ['things', 'people', 'organisations', 'custom', 'classification'].includes(type) && _react.default.createElement(_Field.default, {
      name: "filter_expression",
      label: "Filter expression",
      placeholder: "Filter expression",
      value: this.getFieldValue(classificationForm, 'filter_expression'),
      onChange: this.handleChange
    }), type === 'enum' && _react.default.createElement(_KeyValuePairTable.default, {
      showToastr: this.props.showToastr,
      gridData: this.getFieldValue(classificationForm, 'enum_values') || [],
      name: "enum_values",
      onChange: this.handleChange
    }), type === 'timestamp' && _react.default.createElement(_Dropdown.default, {
      label: "Type",
      value: this.getFieldValue(classificationForm, 'kind') || 'datetime',
      onChange: this.handleChange,
      name: "kind",
      placeholder: "Select kind",
      fluid: true,
      options: [{
        value: 'date',
        label: 'Date'
      }, {
        value: 'time',
        label: 'Time'
      }, {
        value: 'datetime',
        label: 'Date & Time'
      }]
    }), type === 'timestamp' && this.getFieldValue(classificationForm, 'kind') !== 'time' && _react.default.createElement(_Dropdown.default, {
      label: "Format",
      value: this.getFieldValue(classificationForm, 'format') || 'dd/mm/yy',
      onChange: this.handleChange,
      name: "format",
      placeholder: "Select format",
      fluid: true,
      options: formats.map(f => ({
        value: f,
        label: f
      }))
    }), type === 'custom' && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ClassificationAutocomplete.default, {
      label: "Classification",
      name: "class",
      placeholder: "Select a class...",
      applicableOn: "custom",
      onChange: this.handleChange,
      value: selectedClass
    })), type && _react.default.createElement(_FieldItem.default, _extends({}, this.getValues(classificationForm), {
      name: "Default value",
      f_uri: "default_value",
      readOnly: false,
      required: false,
      updateAttribute: this.handleChange,
      class: selectedClass,
      placeholder: 'Default value'
    })), extentions), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
      color: "primary",
      type: "submit"
    }, "Save"))));
  }
  /**
   * Returns the classificationForm fields values.
   *
   * @param classificationForm the classification form
   * @returns the field value.
   */


  getValues(classificationForm) {
    return (0, _transformer.safeToJS)((0, _lo.get)(classificationForm, `formDefinitions.fields[${this.attributeId}]`)) || {};
  }
  /**
   * Returns the classificationForm field value.
   *
   * @param classificationForm the classification form
   * @param fieldName the field name
   * @param defaultValue the default value (optional)
   * @returns the field value.
   */


  getFieldValue(classificationForm, fieldName, defaultValue) {
    return (0, _transformer.safeToJS)((0, _lo.get)(classificationForm, `formDefinitions.fields[${this.attributeId}].${fieldName}`)) || defaultValue;
  }
  /**
   * Returns the classificationForm with the modified field.
   *
   * @param classificationForm the classification form.
   * @param fieldName the name of the field to modify.
   * @param value the value to set.
   */


  setFieldValue(classificationForm, fieldName, value) {
    return (0, _Immutable.set)(classificationForm, `formDefinitions.fields[${this.attributeId}].${fieldName}`, value);
  }

}

_defineProperty(AttributeDetailModal, "propTypes", {
  classification: _propTypes.default.object,
  updateClassification: _propTypes.default.func,
  showToastr: _propTypes.default.func,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    attributeFieldUri: _propTypes.default.string.isRequired
  })
});

var _default = (0, _reactRedux.connect)(null, {
  showToastr: _appActions.showToastr
})((0, _reactRouter.withRouter)(AttributeDetailModal));

exports.default = _default;