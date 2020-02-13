"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactInfoForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _FreeTextSelect = _interopRequireDefault(require("app/components/molecules/Autocomplete/FreeTextSelect"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _event = require("app/utils/http/event");

var _Immutable = require("app/utils/immutable/Immutable");

var _lo = require("app/utils/lo/lo");

var _interfaces = require("app/utils/types/interfaces");

var _ContactDetails = require("app/components/molecules/ContactDetails/ContactDetails");

var _Radio = _interopRequireDefault(require("app/components/atoms/Radio/Radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const floatRight = {
  float: 'right'
};

/**
 * Renders a contactInfo form to allow a user to change a single contact info form.
 */
class ContactInfoForm extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "remove", e => {
      e.preventDefault();
      this.props.removeContactInfo(this.props.contactInfoIndex);
    });

    _defineProperty(this, "onChangeSubType", event => this.handleChange({
      target: {
        name: 'sub_type',
        value: (0, _lo.get)(event, 'target.value')
      }
    }));

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
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
    const updatedContactInfo = (0, _Immutable.set)(this.props.value, name, value);
    this.onChange(updatedContactInfo);
  }
  /**
   * Emit a change to parent.
   * @param contactInfo
   */


  onChange(contactInfo) {
    if (this.props.onChange) {
      // Set default values for the event (not present or visible in the form or ever changed,
      // so no need to represent these within the state).
      const value = {
        type: 'contactInfo',
        ...(contactInfo || {})
      };
      this.props.onChange((0, _event.createEvent)('change', {
        name: this.props.name || '',
        value
      }));
    }
  }

  /**
   * Lifecycle hook.
   * @returns {XML}
   */
  render() {
    const contactInfo = this.props.value;
    const contactProps = (0, _ContactDetails.getContactInfoFieldProps)(this.props.value);
    let sub_types = (0, _ContactDetails.getContactInfoSubTypes)(contactInfo.type);

    if (contactInfo.sub_type && !sub_types.find(sub_type => sub_type === contactInfo.sub_type)) {
      // This is a custom type. Add it so it's rendered:
      sub_types = [...sub_types, contactInfo.sub_type];
    }

    const selectOptions = sub_types.map(value => ({
      value,
      label: value
    }));
    return _react.default.createElement("div", {
      key: this.props.contactInfoIndex
    }, _react.default.createElement(_ButtonIcon.default, {
      icon: "delete",
      iconColor: "white",
      style: floatRight,
      onClick: this.remove
    }), !contactInfo.sub_type && this.props.value.type === 'social' ? '' : _react.default.createElement(_Field.default, {
      label: contactProps.label,
      name: "identifier",
      icon: contactProps.icon,
      iconType: contactProps.type,
      value: contactProps.text,
      onChange: this.handleChange,
      type: contactInfo.type
    }), _react.default.createElement(_FreeTextSelect.default, {
      creatable: true,
      label: "Type",
      placeholder: "Select or type to create a custom value.",
      name: "sub_type",
      value: contactInfo.sub_type,
      options: selectOptions,
      onChange: this.onChangeSubType
    }), _react.default.createElement(_Radio.default, {
      label: "Primary",
      name: "is_primary",
      checked: !!contactInfo.is_primary,
      onChange: () => {
        this.handleChange((0, _event.createEvent)('change', {
          name: 'is_primary',
          value: true
        }));
      }
    }));
  }

}

exports.ContactInfoForm = ContactInfoForm;

_defineProperty(ContactInfoForm, "propTypes", {
  name: _propTypes.default.string,
  value: _propTypes.default.object,
  onChange: _propTypes.default.func,
  contactInfoIndex: _propTypes.default.number,
  removeContactInfo: _propTypes.default.func
});