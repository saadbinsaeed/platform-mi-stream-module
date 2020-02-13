"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _googleMapReact = _interopRequireDefault(require("google-map-react"));

var _SimpleMarker = require("./SimpleMarker/SimpleMarker");

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Map configuration */
const mapOptions = maps => {
  return {
    mapTypeId: maps.MapTypeId.HYBRID,
    mapTypeControl: true,
    zoomControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
      style: maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: [maps.MapTypeId.SATELLITE, maps.MapTypeId.HYBRID, maps.MapTypeId.TERRAIN]
    }
  };
};
/**
 * A map component
 */


class Location extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "mapClicked", mapProps => {
      this.props.onClick(mapProps.lat, mapProps.lng);
    });
  }

  /**
   * Lifecycle hook: Executed on component render.
   * @returns {XML}
   */
  render() {
    const {
      latitude,
      longitude,
      iconInfo
    } = this.props;
    const noLocation = !(0, _utils.isDefined)(latitude) || !(0, _utils.isDefined)(longitude) || latitude === '' || longitude === '';

    if (noLocation) {
      return _react.default.createElement("span", null, " No location is available. ");
    }

    const marker = !this.props.writeMode ? _react.default.createElement(_SimpleMarker.SimpleMarker, {
      lat: latitude,
      lng: longitude,
      text: 'Thing Location',
      iconInfo: iconInfo
    }) : null;
    return _react.default.createElement("div", {
      style: {
        height: '300px'
      }
    }, _react.default.createElement(_googleMapReact.default, _extends({
      bootstrapURLKeys: {
        key: 'AIzaSyBn4zixY8-GRFxLxifzO2jyrrqCRW4qn7Q',
        libraries: 'places'
      },
      center: {
        lat: latitude,
        lng: longitude
      },
      defaultZoom: 11,
      options: mapOptions
    }, this.props, {
      onClick: this.mapClicked
    }), marker));
  }

}

exports.default = Location;

_defineProperty(Location, "propTypes", {
  latitude: _propTypes.default.number,
  longitude: _propTypes.default.number,
  centerKey: _propTypes.default.number,
  writeMode: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  iconInfo: _propTypes.default.object
});

_defineProperty(Location, "defaultProps", {
  iconInfo: {}
});

_defineProperty(Location, "defaultProps", {
  color: ''
  /**
   * onclick map will change the coordinates
   */

});