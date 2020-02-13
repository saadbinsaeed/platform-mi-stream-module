"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactGeolocated = require("react-geolocated");

var _reactLeaflet = require("react-leaflet");

var _reactLeafletDraw = require("react-leaflet-draw");

var _reactLeafletMeasure = _interopRequireDefault(require("react-leaflet-measure"));

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

var _DrawerDetail = _interopRequireDefault(require("./DrawerDetail"));

var _ErrorBoundary = _interopRequireDefault(require("app/components/atoms/ErrorBoundary/ErrorBoundary"));

var _MapIcons = require("./MapIcons");

var _LocationsList = _interopRequireDefault(require("./LocationsList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const measureOptions = {
  position: 'topright',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'acres',
  activeColor: '#db4a29',
  completedColor: '#9b2d14'
};

const MapComponent = _styledComponents.default.div.withConfig({
  displayName: "GeoMap__MapComponent",
  componentId: "d7fl8a-0"
})(["width:", ";height:", ";min-width:", ";min-height:", ";"], props => props.width, props => props.height, props => props.width, props => props.height);
/**
 * A map component to show locations on a map, including the location of myself.
 */


class GeoMap extends _react.PureComponent {
  /**
   * Set our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "handleViewport", event => {
      this.loadDataWithParams(event);
    });

    _defineProperty(this, "toggleDetail", id => {
      // console.log('toggleDetail', id);
      id && this.fetchDetailData(id);
      this.setState({
        detailOpen: !this.state.detailOpen
      });
    });

    _defineProperty(this, "fetchDetailData", id => {
      if (this.props.loadDetail) {
        this.props.loadDetail(id);
      }
    });

    _defineProperty(this, "loadDataWithParams", event => {
      event && this.setState({
        positioning: event
      });
      const map = this.refs.map.leafletElement; // console.log('map', map);

      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const params = { ...this.state.positioning,
        filters: this.state.filters,
        bounds: {
          ne,
          sw
        }
      };
      this.props.loadData(params);
    });

    this.state = {
      positioning: {},
      locations: [],
      filters: [],
      detailOpen: false
    };
  }

  /**
   * Update component if passed props change
   */
  componentWillUpdate(nextProps) {
    if (this.state.locations !== nextProps.locations) {
      this.setState({
        locations: nextProps.locations
      });
      this.forceUpdate();
    }

    if (this.props.filters !== nextProps.filters) {
      this.setState({
        filters: nextProps.filters
      });
      this.loadDataWithParams();
    }
  }

  /**
   * Render the map
   */
  render() {
    // console.log('MapProps', this.props);
    // console.log('MapState', this.state);
    const {
      isGeolocationAvailable,
      isGeolocationEnabled,
      coords,
      showMyLocation,
      width,
      height,
      currentUser,
      detail
    } = this.props;
    const position = !isGeolocationAvailable || !isGeolocationEnabled || !coords ? [0, 0] : [this.props.coords.latitude, this.props.coords.longitude];
    return _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_Drawer.default, {
      title: "Detail",
      isOpen: this.state.detailOpen,
      isToggled: this.toggleDetail
    }, _react.default.createElement(_DrawerDetail.default, {
      info: detail
    })), _react.default.createElement(MapComponent, {
      width: width,
      height: height
    }, _react.default.createElement(_reactLeaflet.Map, {
      preferCanvas: true,
      ref: "map",
      center: position,
      zoom: 3,
      style: {
        width,
        height
      },
      onViewportChanged: this.handleViewport
    }, _react.default.createElement(_reactLeafletMeasure.default, measureOptions), _react.default.createElement(_reactLeaflet.FeatureGroup, null, _react.default.createElement(_reactLeafletDraw.EditControl, {
      position: "topright",
      draw: {
        rectangle: false
      }
    }), _react.default.createElement(_reactLeaflet.TileLayer, {
      url: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
    }), _react.default.createElement(_LocationsList.default, {
      locations: this.state.locations,
      toggleDetail: id => this.toggleDetail(id)
    }), ")}", (!isGeolocationAvailable || !isGeolocationEnabled || !coords) && !showMyLocation ? null : _react.default.createElement(_MapIcons.MyMarker, {
      position: position,
      user: currentUser
    })))));
  }

}

_defineProperty(GeoMap, "propTypes", {
  isGeolocationAvailable: _propTypes.default.bool,
  isGeolocationEnabled: _propTypes.default.bool,
  coords: _propTypes.default.object,
  locations: _propTypes.default.array,
  showMyLocation: _propTypes.default.bool,
  width: _propTypes.default.string,
  height: _propTypes.default.string,
  loadData: _propTypes.default.func,
  loadDetail: _propTypes.default.func
});

var _default = (0, _styledComponents.withTheme)((0, _reactGeolocated.geolocated)({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(GeoMap));

exports.default = _default;