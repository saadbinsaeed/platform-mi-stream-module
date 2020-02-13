"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _DirectoriesDropdown = _interopRequireDefault(require("app/containers/Common/DropDowns/DirectoriesDropdown/DirectoriesDropdown"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Location = _interopRequireDefault(require("app/components/molecules/Map/Location/Location"));

var _Radio = _interopRequireDefault(require("app/components/atoms/Radio/Radio"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _Immutable = require("app/utils/immutable/Immutable");

var _event = require("app/utils/http/event");

var _lo = require("app/utils/lo/lo");

var _interfaces = require("app/utils/types/interfaces");

var _geocodeUtils = _interopRequireDefault(require("app/utils/maps/geocodeUtils"));

var _appActions = require("store/actions/app/appActions");

var _stringUtils = require("app/utils/string/string-utils");

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const WAIT_INTERVAL = 1000;

const Container = _styledComponents.default.div.withConfig({
  displayName: "LocationForm__Container",
  componentId: "sc-1fguatz-0"
})(["display:flex;flex-direction:row;"]);

const LatLongChar = (0, _styledComponents.default)(_Label.default).withConfig({
  displayName: "LocationForm__LatLongChar",
  componentId: "sc-1fguatz-1"
})(["margin-top:3px;margin-left:0;font-size:25px;"]);

const ButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "LocationForm__ButtonContainer",
  componentId: "sc-1fguatz-2"
})(["display:flex;"]);
/**
 * Renders a location form to allow a user to change address and location.
 */


class LocationForm extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      locationKey: 0
    });

    _defineProperty(this, "timer", void 0);

    _defineProperty(this, "locationRef", _react.default.createRef());

    _defineProperty(this, "handleChange", event => {
      const {
        name,
        type
      } = event.target;
      let {
        value
      } = event.target;
      const is_manual = (0, _lo.get)(this.props.value, 'is_manual');

      if (type === 'number') {
        if ((name === 'latitude' || name === 'lat.degrees') && value.length > 1) {
          if (!_geocodeUtils.default.isValidLatitute(value)) {
            return;
          }
        }

        if ((name === 'longitude' || name === 'long.degrees') && value.length > 1) {
          if (!_geocodeUtils.default.isValidLongitute(value)) {
            return;
          }
        }

        value = value && parseFloat(value);

        if (name === 'latitude' || name === 'longitude') {
          const updatedLocationInfo = (0, _Immutable.set)(this.props.value, name, value);
          this.onChange(updatedLocationInfo);
          !is_manual && this.handleLatLongChange(updatedLocationInfo);
          return;
        }
      } else {
        value = (0, _stringUtils.stripUnwanted)(value);
      }

      let updatedLocationInfo = (0, _Immutable.set)(this.props.value, name, value);
      const {
        lat = {},
        long = {}
      } = updatedLocationInfo;

      if (name.includes('lat')) {
        if (!this.isValidValues(lat.seconds)) return;
        if (!this.isValidValues(lat.minutes)) return;

        const latitude = _geocodeUtils.default.convertDMSToDD(lat.degrees, lat.minutes, lat.seconds, lat.direction);

        updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'latitude', latitude);
        !is_manual && this.handleLatLongChange(updatedLocationInfo);
      }

      if (name.includes('long')) {
        if (!this.isValidValues(long.seconds)) return;
        if (!this.isValidValues(long.minutes)) return;

        const longitude = _geocodeUtils.default.convertDMSToDD(long.degrees, long.minutes, long.seconds, long.direction);

        updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'longitude', longitude);
        !is_manual && this.handleLatLongChange(updatedLocationInfo);
      }

      this.onChange(updatedLocationInfo); // if any address field changed we will change the coordinates

      if (name.includes('address')) {
        this.handleAddressChange(updatedLocationInfo); // To minimize the call on name change however it wont have any impact
      }
    });

    _defineProperty(this, "isValidValues", value => {
      if (value < 0 || value >= 59.9999) {
        this.props.showToastr({
          severity: 'warn',
          detail: 'Please enter the valid value (0-60) in seconds'
        });
        return false;
      }

      return true;
    });

    _defineProperty(this, "setDDToDMS", updatedLocationInfo => {
      const {
        latitude,
        longitude
      } = updatedLocationInfo;

      const lat = _geocodeUtils.default.convertDDtoDMS('latitude', latitude);

      const long = _geocodeUtils.default.convertDDtoDMS('longitude', longitude);

      updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'lat', lat);
      updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'long', long);
      return updatedLocationInfo;
    });

    _defineProperty(this, "onChange", locationInfo => {
      if (this.props.onChange) {
        const name = this.props.name;
        const value = locationInfo;
        const event = (0, _event.createEvent)('change', {
          name,
          value
        });
        this.props.onChange(event);
      }
    });

    _defineProperty(this, "handleLatLongChange", updatedLocationInfo => {
      clearTimeout(this.timer);
      const lat = Number((0, _lo.get)(updatedLocationInfo, 'latitude'));
      const long = Number((0, _lo.get)(updatedLocationInfo, 'longitude'));
      this.timer = setTimeout(() => {
        _geocodeUtils.default.fromLatLong(lat, long).then(response => {
          // const adrs = response.results[0].formatted_address;
          const address = _geocodeUtils.default.getAddress(response.results[0].address_components);

          updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'address', {
            add_type: 'Physical',
            ...address
          });
          this.onChange(updatedLocationInfo);
        }, error => {
          const address = _geocodeUtils.default.getAddress();

          updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'address', {
            add_type: 'Physical',
            ...address
          });
          this.onChange(updatedLocationInfo);
        });
      }, WAIT_INTERVAL);
    });

    _defineProperty(this, "handleAddressChange", updatedLocationInfo => {
      const is_manual = (0, _lo.get)(this.props.value, 'is_manual');
      clearTimeout(this.timer);
      const adresString = this.getAddressInput(updatedLocationInfo);
      this.timer = setTimeout(() => {
        _geocodeUtils.default.fromAddress(adresString).then(response => {
          const {
            lat,
            lng
          } = response.results[0].geometry.location;
          updatedLocationInfo = (0, _Immutable.set)(this.props.value, 'latitude', lat);
          updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'longitude', lng);
          !is_manual && this.onChange(updatedLocationInfo);
          this.centerMap();
        }, error => {// console.log(error);
        });
      }, WAIT_INTERVAL);
    });

    _defineProperty(this, "getAddressInput", updatedLocationInfo => {
      const line1 = updatedLocationInfo.address['line1'];
      const line2 = updatedLocationInfo.address['line2'];
      const code = updatedLocationInfo.address['code'];
      const city = updatedLocationInfo.address['city'];
      const province = updatedLocationInfo.address['province'];
      const country = updatedLocationInfo.address['country'];
      return `${line1} ${line2} ${code} ${city} ${province} ${country}`;
    });

    _defineProperty(this, "centerMap", () => {
      this.setState({
        locationKey: this.state.locationKey + 1
      });
    });

    _defineProperty(this, "myLocation", () => {
      _geocodeUtils.default.getCurrentLocation(this.myCurrentLocation, this.myCurrentlocationError);
    });

    _defineProperty(this, "myCurrentLocation", position => {
      let updatedLocationInfo = (0, _Immutable.set)(this.props.value, 'latitude', position.coords.latitude);
      updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'longitude', position.coords.longitude);
      this.onChange(updatedLocationInfo);
      this.handleLatLongChange(updatedLocationInfo);
    });

    _defineProperty(this, "onMapClick", (lat, lng) => {
      const is_manual = (0, _lo.get)(this.props.value, 'is_manual');
      let updatedLocationInfo = (0, _Immutable.set)(this.props.value, 'latitude', lat);
      updatedLocationInfo = (0, _Immutable.set)(updatedLocationInfo, 'longitude', lng);
      this.onChange(updatedLocationInfo);
      !is_manual && this.handleLatLongChange(updatedLocationInfo);
    });

    _defineProperty(this, "myCurrentlocationError", () => {
      this.props.showToastr({
        severity: 'error',
        detail: 'Could not get your location, please allow location tracking in your browser'
      });
    });
  }

  /**
   * componentDidMount - description
   *
   * @return {type}  description
   */
  componentDidMount() {
    const {
      location
    } = this.props;

    if (location && location.state && location.state.scrollIntoView) {
      this.locationRef.current && this.locationRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }

  /**
   * Lifecycle hook.
   * @returns {XML}
   */
  render() {
    const locationInfo = this.props.value || {};
    const {
      lat = {},
      long = {}
    } = this.setDDToDMS(locationInfo);
    const latitude = (0, _lo.get)(locationInfo, 'latitude');
    const longitude = (0, _lo.get)(locationInfo, 'longitude');
    const name = (0, _lo.get)(locationInfo, 'name');
    const {
      field = 'DegDec'
    } = locationInfo;
    const isMinDec = field === 'MinDec';
    const colSize = !isMinDec ? 3 : 4;
    return _react.default.createElement("div", null, !this.props.addressOnlyFields && _react.default.createElement("div", {
      ref: this.locationRef
    }, _react.default.createElement(_Location.default, {
      latitude: latitude,
      longitude: longitude,
      onClick: this.onMapClick,
      key: this.state.locationKey,
      iconInfo: this.props.iconInfo
    }), _react.default.createElement(_Field.default, {
      label: "Name",
      name: "name",
      value: name,
      onChange: this.handleChange,
      type: "text",
      placeholder: "Name"
    }), field === 'DegDec' ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Field.default, {
      label: "Latitude",
      placeholder: "Latitude",
      name: "latitude",
      value: latitude,
      onChange: this.handleChange,
      type: "number",
      title: "Numbers only"
    }), _react.default.createElement(_Field.default, {
      label: "Longitude",
      placeholder: "Longitude",
      name: "longitude",
      value: longitude,
      onChange: this.handleChange,
      type: "number",
      title: "Numbers only"
    })) : null, field === 'DMS' || field === 'MinDec' ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Label.default, null, "Latitude"), _react.default.createElement("div", null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 11,
      md: 11,
      sm: 11,
      xs: 11
    }, _react.default.createElement(_Field.default, {
      name: "lat.degrees",
      value: lat.degrees,
      onChange: this.handleChange,
      type: "number",
      placeholder: "D",
      min: "0",
      title: "Numbers only"
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 1,
      md: 1,
      sm: 1,
      xs: 1
    }, _react.default.createElement(LatLongChar, null, "\xB0")))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 11,
      md: 11,
      sm: 11,
      xs: 11
    }, isMinDec ? _react.default.createElement(_Field.default, {
      name: "lat.minutes",
      value: lat.minutes + lat.seconds / 100,
      onChange: this.handleChange,
      type: "number",
      placeholder: "M",
      min: "0",
      max: "60",
      step: "any",
      title: "Numbers only"
    }) : _react.default.createElement(_Field.default, {
      name: "lat.minutes",
      value: Math.round(lat.minutes),
      onChange: this.handleChange,
      type: "number",
      placeholder: "M",
      min: "0",
      max: "59",
      title: "Numbers only"
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 1,
      md: 1,
      sm: 1,
      xs: 1
    }, _react.default.createElement(LatLongChar, null, `'`)))), !isMinDec ? _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 11,
      md: 11,
      sm: 11,
      xs: 11
    }, _react.default.createElement(_Field.default, {
      name: "lat.seconds",
      value: lat.seconds,
      onChange: this.handleChange,
      type: "number",
      placeholder: "S",
      title: "Numbers only"
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 1,
      md: 1,
      sm: 1,
      xs: 1
    }, _react.default.createElement(LatLongChar, null, `''`)))) : null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_Dropdown.default, {
      name: "lat.direction",
      placeholder: "Select..",
      onChange: this.handleChange,
      closeOnChange: true,
      value: lat.direction,
      clearable: false,
      options: [{
        label: 'N',
        value: 'N'
      }, {
        label: 'S',
        value: 'S'
      }]
    })))), _react.default.createElement(_Label.default, null, "Longitude"), _react.default.createElement("div", null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 11,
      md: 11,
      sm: 11,
      xs: 11
    }, _react.default.createElement(_Field.default, {
      name: "long.degrees",
      value: long.degrees,
      onChange: this.handleChange,
      type: "number",
      placeholder: "D",
      min: "0",
      title: "Numbers only"
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 1,
      md: 1,
      sm: 1,
      xs: 1
    }, _react.default.createElement(LatLongChar, null, "\xB0")))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 11,
      md: 11,
      sm: 11,
      xs: 11
    }, isMinDec ? _react.default.createElement(_Field.default, {
      name: "long.minutes",
      value: long.minutes + long.seconds / 100,
      onChange: this.handleChange,
      type: "number",
      placeholder: "M",
      min: "0",
      max: "60",
      step: "any",
      title: "Numbers only"
    }) : _react.default.createElement(_Field.default, {
      name: "long.minutes",
      value: Math.round(long.minutes),
      onChange: this.handleChange,
      type: "number",
      placeholder: "M",
      min: "0",
      max: "59",
      title: "Numbers only"
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 1,
      md: 1,
      sm: 1,
      xs: 1
    }, _react.default.createElement(LatLongChar, null, `'`)))), !isMinDec ? _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 11,
      md: 11,
      sm: 11,
      xs: 11
    }, _react.default.createElement(_Field.default, {
      name: "long.seconds",
      value: long.seconds,
      onChange: this.handleChange,
      type: "number",
      placeholder: "S",
      title: "Numbers only"
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: 1,
      md: 1,
      sm: 1,
      xs: 1
    }, _react.default.createElement(LatLongChar, null, `''`)))) : null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      lg: colSize,
      md: colSize,
      sm: 12,
      xs: 12
    }, _react.default.createElement(_Dropdown.default, {
      name: "long.direction",
      placeholder: "Select..",
      onChange: this.handleChange,
      closeOnChange: true,
      value: long.direction,
      fluid: true,
      selection: true,
      clearable: false,
      options: [{
        label: 'E',
        value: 'E'
      }, {
        label: 'W',
        value: 'W'
      }]
    }))))) : null, _react.default.createElement(Container, null, _react.default.createElement(_Radio.default, {
      label: "DegDec",
      name: "DegDec",
      checked: field === 'DegDec' || false,
      onChange: () => this.handleChange((0, _event.createEvent)('change', {
        name: 'field',
        value: 'DegDec'
      }))
    }), "\xA0\xA0 ", _react.default.createElement(_Radio.default, {
      label: "DMS",
      name: "DMS",
      checked: field === 'DMS' || false,
      onChange: () => this.handleChange((0, _event.createEvent)('change', {
        name: 'field',
        value: 'DMS'
      }))
    }), "\xA0\xA0", _react.default.createElement(_Radio.default, {
      label: "MinDec",
      name: "MinDec",
      checked: field === 'MinDec' || false,
      onChange: () => this.handleChange((0, _event.createEvent)('change', {
        name: 'field',
        value: 'MinDec'
      }))
    })), _react.default.createElement(ButtonContainer, null, _react.default.createElement(_CheckBox.default, {
      label: "Custom Address",
      name: "is_manual",
      title: "Enter your custom address details on the fields below",
      checked: (0, _lo.get)(locationInfo, 'is_manual'),
      onChange: this.handleChange
    }), _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: this.centerMap,
      type: "button"
    }, ' ', "Center map"), _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: this.myLocation,
      type: "button"
    }, ' ', "My location"))), _react.default.createElement(_Field.default, {
      label: "Address Line 1",
      placeholder: "Address Line 1",
      type: "text",
      name: "address.line1",
      value: (0, _lo.get)(locationInfo, 'address.line1'),
      onChange: this.handleChange
    }), _react.default.createElement(_Field.default, {
      label: "Address Line 2",
      placeholder: "Address Line 2",
      type: "text",
      name: "address.line2",
      value: (0, _lo.get)(locationInfo, 'address.line2'),
      onChange: this.handleChange
    }), _react.default.createElement(_Field.default, {
      label: "City",
      name: "address.city",
      placeholder: "City",
      value: (0, _lo.get)(locationInfo, 'address.city'),
      onChange: this.handleChange
    }), _react.default.createElement(_Field.default, {
      label: "State/Province",
      name: "address.province",
      placeholder: "State/Province",
      value: (0, _lo.get)(locationInfo, 'address.province'),
      onChange: this.handleChange
    }), _react.default.createElement(_Field.default, {
      label: "Post/Zip Code",
      name: "address.code",
      placeholder: "Post/Zip Code",
      value: (0, _lo.get)(locationInfo, 'address.code'),
      onChange: this.handleChange
    }), _react.default.createElement(_DirectoriesDropdown.default, {
      label: "Country",
      name: "address.country",
      directoryType: "country",
      valueField: "label",
      value: (0, _lo.get)(locationInfo, 'address.country'),
      onChange: this.handleChange
    }));
  }

}

_defineProperty(LocationForm, "propTypes", {
  value: _propTypes.default.object,
  iconInfo: _propTypes.default.object,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func,
  addressOnlyFields: _propTypes.default.bool,
  showToastr: _propTypes.default.func
});

_defineProperty(LocationForm, "defaultProps", {
  addressOnlyFields: false,
  value: {}
});

var _default = (0, _reactRedux.connect)(null, {
  showToastr: _appActions.showToastr
})(LocationForm);

exports.default = _default;