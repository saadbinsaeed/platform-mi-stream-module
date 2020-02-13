"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContactInfoFieldProps = getContactInfoFieldProps;
exports.getContactInfoSubTypes = getContactInfoSubTypes;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _interfaces = require("app/utils/types/interfaces");

var _InfoBlock = _interopRequireDefault(require("../InfoBlock/InfoBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Displays email, mobile, twitter, website and home address
 * for a person.
 */
class ContactDetails extends _react.Component {
  /**
   * Get primary contact info
   * @returns {*|Array}
   */
  getPrimaryContactInfo() {
    return (this.props.contactInfo || []).filter(contactInfo => contactInfo.is_primary);
  }
  /**
   * Lifecycle hook: Executed on component render.
   * @returns {XML}
   */


  render() {
    const primaryContactInfoFieldData = this.getPrimaryContactInfo();

    if (primaryContactInfoFieldData.length === 0) {
      return _react.default.createElement("span", null, " There are no primary contact details available. ");
    }

    const primaryContactInfoFields = primaryContactInfoFieldData.map((contactInfo, i) => _react.default.createElement(ContactInfoField, {
      key: i,
      contactInfo: contactInfo
    }));
    return _react.default.createElement("div", null, " ", primaryContactInfoFields, " ");
  }

}

exports.default = ContactDetails;

_defineProperty(ContactDetails, "propTypes", {
  contactInfo: _propTypes.default.arrayOf(_propTypes.default.shape({
    type: _propTypes.default.string,
    is_primary: _propTypes.default.bool,
    sub_type: _propTypes.default.string,
    identifier: _propTypes.default.string
  }))
});

const ContactInfoField = props => {
  const labelFieldProps = getContactInfoFieldProps(props.contactInfo);
  return _react.default.createElement(_InfoBlock.default, labelFieldProps);
};
/**
 * Make properties for a contact info field.
 * Todo: check if it can be moved to a separate file as it's used in other places.
 * @param type
 * @param identifier
 */


function getContactInfoFieldProps(contactInfo) {
  const labelFieldProps = {
    label: `${contactInfo.sub_type || ''} `,
    icon: '',
    type: 'mdi',
    text: contactInfo.identifier || ''
  };

  switch (contactInfo.type) {
    case 'email':
      labelFieldProps.label += 'Email';
      labelFieldProps.icon = 'email';
      break;

    case 'phone':
      labelFieldProps.label += 'Phone';
      labelFieldProps.icon = 'phone-in-talk';
      break;

    case 'social':
      switch (contactInfo.sub_type) {
        case 'Facebook':
          labelFieldProps.icon = 'facebook';
          break;

        case 'Google+':
          labelFieldProps.icon = 'google-plus';
          break;

        case 'Instagram':
          labelFieldProps.icon = 'instagram';
          break;

        case 'LinkedIn':
          labelFieldProps.icon = 'linkedin';
          break;

        case 'Pinterest':
          labelFieldProps.icon = 'pinterest';
          break;

        case 'Reddit':
          labelFieldProps.icon = 'reddit';
          break;

        case 'Snapchat':
          labelFieldProps.icon = 'snapchat';
          break;

        case 'Tumblr':
          labelFieldProps.icon = 'tumblr';
          break;

        case 'Twitter':
          labelFieldProps.icon = 'twitter';
          break;

        case 'YouTube':
          labelFieldProps.icon = 'youtube';
          break;

        case 'Weibo':
          labelFieldProps.icon = 'sina-weibo';
          break;

        case 'Baidu Tieba':
          labelFieldProps.icon = 'baidu';
          labelFieldProps.type = 'af';
          break;

        case 'Gab':
          labelFieldProps.icon = 'gab';
          labelFieldProps.type = 'af';
          break;

        default:
          break;
      }

      break;

    case 'website':
      labelFieldProps.label = 'Website';
      labelFieldProps.icon = 'web';
      break;

    case 'address':
      labelFieldProps.label = 'Home Address';
      labelFieldProps.icon = 'map-marker';
      labelFieldProps.text = (contactInfo.address || {}).city;
      break;

    default:
  }

  return labelFieldProps;
}
/**
 * Gets sub type for contact info type (because we don't have a dictionary)
 *  Todo: check if it can be moved to a separate file as it's used in other places.
 * @param type
 * @returns {*}
 */


function getContactInfoSubTypes(type) {
  switch (type) {
    case 'email':
      return ['Home', 'Work'];

    case 'phone':
      return ['Mobile', 'Work', 'Home', 'Main', 'Work Fax', 'Home Fax', 'Pager', 'Emergency'];

    case 'chat':
      return ['Google', 'Facebook', 'Skype', 'WhatsApp', 'WeChat', 'Viber', 'AIM', 'Yahoo', 'QQ', 'MSN', 'ICQ', 'Jabber'];

    case 'social':
      return ['Baidu Tieba', 'Facebook', 'Gab', 'Google+', 'Instagram', 'LinkedIn', 'Pinterest', 'Reddit', 'Snapchat', 'Tumblr', 'Twitter', 'Weibo', 'YouTube'];

    case 'website':
      return ['Personal', 'Work'];

    case 'address':
      return ['Home', 'Work'];

    default:
      return [];
  }
}