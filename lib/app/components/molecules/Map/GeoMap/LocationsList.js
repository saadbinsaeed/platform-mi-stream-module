"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _leaflet = _interopRequireDefault(require("leaflet"));

var _MapIcons = require("./MapIcons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocationsList = ({
  locations,
  toggleDetail
}) => {
  // console.log('locations', locations);
  return locations.map((location, i) => {
    const point = new _leaflet.default.Point(location.latitude, location.longitude);

    const coord = _leaflet.default.Projection.SphericalMercator.unproject(point);

    const id = 16329;
    const {
      properties
    } = location; // So we have fucked up data for showing marker status, so now bs to fix

    const priorityLevels = [{
      priority_1_sitecount: properties.proc_inst_priority_1_sitecount
    }, {
      priority_2_sitecount: properties.proc_inst_priority_2_sitecount
    }, {
      priority_3_sitecount: properties.proc_inst_priority_3_sitecount
    }, {
      priority_4_sitecount: properties.proc_inst_priority_4_sitecount
    }];
    let clusterType = 0;
    const levels = []; // eslint-disable-next-line array-callback-return

    priorityLevels.map(level => {
      if (Number(Object.values(level)) > 0) {
        clusterType++;
        levels.push(level);
      }
    });

    if (properties.status_id === 'CLUSTER') {
      if (clusterType === 1) {
        return _react.default.createElement(_MapIcons.Cluster1, {
          name: location.title,
          position: coord,
          key: coord + i,
          priorityLevels: levels,
          onClick: () => toggleDetail(id)
        });
      }

      if (clusterType === 2) {
        return _react.default.createElement(_MapIcons.Cluster2, {
          name: location.title,
          position: coord,
          key: coord + i,
          priorityLevels: levels,
          onClick: () => toggleDetail(id)
        });
      }

      if (clusterType === 3) {
        return _react.default.createElement(_MapIcons.Cluster3, {
          name: location.title,
          position: coord,
          key: coord + i,
          priorityLevels: levels,
          onClick: () => toggleDetail(id)
        });
      }

      if (clusterType === 4) {
        return _react.default.createElement(_MapIcons.Cluster4, {
          name: location.title,
          position: coord,
          key: coord + i,
          priorityLevels: levels,
          onClick: () => toggleDetail(id)
        });
      }
    }

    if (properties.status_id !== 'CLUSTER') {
      // We should load correct icons depending on type
      return _react.default.createElement(_MapIcons.DefaultSvgMarker, {
        name: location.title,
        priority: location.priority,
        position: coord,
        key: coord + i,
        onClick: () => toggleDetail(id)
      });
    }

    return null;
  });
};

var _default = (0, _recompose.compose)(_recompose.pure, (0, _recompose.setPropTypes)({
  locations: _propTypes.default.array.isRequired,
  toggleDetail: _propTypes.default.func
}))(LocationsList);

exports.default = _default;