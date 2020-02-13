"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactInfoListForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _PopupMenu = _interopRequireDefault(require("app/components/molecules/PopupMenu/PopupMenu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _interfaces = require("app/utils/types/interfaces");

var _event = require("app/utils/http/event");

var _lo = require("app/utils/lo/lo");

var _ContactInfoForm = require("../ContactInfoForm/ContactInfoForm");

var _CollapsableAddressForm = require("../CollapsableAddressForm/CollapsableAddressForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a ContactInfo form to allow a user to change a single contact info form.
 */
class ContactInfoListForm extends _react.PureComponent {
  /**
   * Get contactinfo
   */
  get contactInfo() {
    return this.props.value || (0, _Immutable.default)([]);
  }
  /**
   * Handles a contact info change
   * @param index
   * @param event
   */


  handleContactInfoChange(index, event) {
    const value = event.target.value;
    this.onChange(this.contactInfo.map((contactInfo, i) => {
      if (index === i) {
        return (0, _Immutable.default)({ ...value,
          is_primary: true
        });
      }

      if (contactInfo.type === value.type) {
        return (0, _Immutable.default)({ ...contactInfo,
          is_primary: false
        });
      }

      return contactInfo;
    }));
  }
  /**
   * Emit a change to parent.
   * @param locationInfo
   */


  onChange(contactInfoList) {
    if (!this.props.onChange || !this.props.name) {
      return;
    }

    const name = this.props.name;
    const value = contactInfoList;
    const event = (0, _event.createEvent)('change', {
      name,
      value
    });
    this.props.onChange(event);
  }
  /**
   * Add a contact info field.
   * @param type
   */


  addContactInfo(type) {
    let contactInfoArr = this.contactInfo;

    if (!Array.isArray(contactInfoArr)) {
      contactInfoArr = [];
    }

    const newContactInfo = {
      address: undefined,
      type,
      is_primary: false,
      sub_type: '',
      identifier: ''
    };
    const newContactInfoArr = (0, _Immutable.default)([...contactInfoArr, newContactInfo]);
    this.onChange(newContactInfoArr);
  }
  /**
   * Renders a contact info field that can update the state when a value is changed.
   *
   * @param contactInfoIndex
   */


  renderContactInfoField(contactInfoIndex) {
    const contactInformation = this.contactInfo[contactInfoIndex];

    if (!contactInformation) {
      return null;
    }

    const handleContactInfoChangeFn = value => this.handleContactInfoChange(contactInfoIndex, value);

    const formProps = {
      contactInfoIndex: contactInfoIndex,
      value: contactInformation,
      name: undefined,
      // not sure why we need this - it's marked as optional in ContactInfoFormPropTypes
      onChange: handleContactInfoChangeFn,
      removeContactInfo: this.removeContactInfo
    };

    switch (formProps.value.type) {
      case 'address':
        return _react.default.createElement(_CollapsableAddressForm.CollapsableAddressForm, _extends({
          key: contactInfoIndex
        }, formProps));

      default:
        return _react.default.createElement(_ContactInfoForm.ContactInfoForm, _extends({
          key: contactInfoIndex
        }, formProps));
    }
  }
  /**
   * @param props the Component's properties
   */


  constructor(props) {
    super(props);

    _defineProperty(this, "removeContactInfo", key => {
      const contactInformation = this.contactInfo;
      const newContactInfoArr = contactInformation.filter((item, index) => index !== key);
      this.onChange(newContactInfoArr);
    });

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * Handle a form change
   * @param event
   */


  handleChange(event) {
    event.preventDefault();
    const {
      name,
      value
    } = event.target;
    const updatedContactInfo = (0, _Immutable.set)(this.props.value, name, value);
    this.onChangeContactInfo(updatedContactInfo);
  }
  /**
   * Emit a change to parent.
   * @param contactInfo
   */


  onChangeContactInfo(contactInfo) {
    if ((0, _lo.isFunction)(this.props.onChange)) {
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
    //console.log('contactInfo', this.contactInfo);
    const contactInformation = this.contactInfo;
    const contactInfoFields = contactInformation.map( // We ignore the value of contactInfo, because we need array index to update the value anyway
    // within the contactInfoField.
    (contactInfo, i) => ({
      value: contactInfo,
      elem: this.renderContactInfoField(i)
    }));
    const groupedContactInformation = (0, _lo.groupBy)(contactInformation, 'type');
    const contactInfoCards = (0, _lo.map)(groupedContactInformation, (group, groupName) => _react.default.createElement(_Card.default, {
      key: groupName,
      collapsible: true,
      collapsed: true,
      title: `Contact Details - ${groupName}`,
      description: contactInfoFields.filter(cInfo => cInfo.value.type === groupName).map(cInfo => cInfo.elem)
    }));
    return _react.default.createElement(_react.Fragment, null, contactInfoCards, _react.default.createElement(_PopupMenu.default, {
      width: "100%",
      placement: "top left",
      inline: true,
      right: true,
      fluid: true,
      padding: true,
      content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_MenuItem.default, {
        name: "Email",
        onClick: event => this.addContactInfo('email')
      }), _react.default.createElement(_MenuItem.default, {
        name: "Phone Number",
        onClick: event => this.addContactInfo('phone')
      }), _react.default.createElement(_MenuItem.default, {
        name: "Social Media Profile",
        onClick: event => this.addContactInfo('social')
      }), _react.default.createElement(_MenuItem.default, {
        name: "Website",
        onClick: event => this.addContactInfo('website')
      }), _react.default.createElement(_MenuItem.default, {
        name: "Address",
        onClick: event => this.addContactInfo('address')
      }))
    }, _react.default.createElement(_Button.default, {
      fluid: true,
      rounded: false,
      color: "primary",
      text: "Add Contact Info"
    })));
  }

}

exports.ContactInfoListForm = ContactInfoListForm;

_defineProperty(ContactInfoListForm, "propTypes", {
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.array,
  onChange: _propTypes.default.func
});