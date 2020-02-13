"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsableAddressForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Immutable = require("app/utils/immutable/Immutable");

var _lo = require("app/utils/lo/lo");

var _interfaces = require("app/utils/types/interfaces");

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _event = require("app/utils/http/event");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _LocationForm = _interopRequireDefault(require("../LocationForm/LocationForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const floatRight = {
  float: 'right'
};
/**
 * Collapsable address form
 */

class CollapsableAddressForm extends _react.Component {
  /**
   * @override
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "remove", e => {
      e.preventDefault();
      this.props.removeContactInfo(this.props.contactInfoIndex);
    });

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @override
   * @returns {XML}
   */
  render() {
    const contactInfo = this.props.value;
    const city = String((0, _lo.get)(contactInfo, 'address.city') || '');
    const shortAddressName = city ? ` - ${city}` : ''; // This is a hack because API gives us address not location info - this needs to be changed
    // from backend side because mockups show a map (so we need location_info not address)

    const locationInfo = {
      address: contactInfo.address
    };
    /**
     * Render our page with all the bits and pieces in place
     */

    const iconInfo = {
      name: 'pin',
      color: '#c62828'
    };
    return _react.default.createElement(_Card.default, {
      collapsible: true,
      title: `${contactInfo.sub_type || ''} Address${shortAddressName}`,
      titleActions: _react.default.createElement(_Field.default, {
        style: {
          float: 'right'
        },
        label: "",
        checked: !!contactInfo.is_primary,
        onChange: evt => this.handleChange({
          target: {
            name: 'is_primary',
            value: (0, _lo.get)(evt, 'target.checked')
          }
        }),
        type: "radio"
      }),
      description: _react.default.createElement("div", null, _react.default.createElement(_ButtonIcon.default, {
        icon: "delete",
        iconColor: "white",
        style: floatRight,
        onClick: this.remove
      }), _react.default.createElement(_LocationForm.default, {
        name: "address",
        value: locationInfo,
        onChange: this.handleChange,
        addressOnlyFields: true,
        iconInfo: iconInfo
      }))
    });
  }
  /**
   * @param evt
   */


  handleChange(evt) {
    if (typeof this.props.onChange === 'function') {
      const name = this.props.name;
      let srcValue = evt.target.value;

      if (evt.target.name === 'address') {
        // This is a hack because API gives us address not location info - this needs to be changed
        // from backend side because mockups show a map (so we need location_info not address)
        srcValue = evt.target.value.address;
      }

      const value = (0, _Immutable.set)(this.props.value, evt.target.name, srcValue);
      const event = (0, _event.createEvent)('change', {
        name,
        value
      });
      this.props.onChange(event);
    }
  }

}

exports.CollapsableAddressForm = CollapsableAddressForm;

_defineProperty(CollapsableAddressForm, "propTypes", {
  value: _propTypes.default.object,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  contactInfoIndex: _propTypes.default.number
});