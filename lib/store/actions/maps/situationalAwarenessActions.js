"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSituationalAwareness = exports.SITUATIONAL_AWARENESS = exports.SITUATIONAL_AWARENESS_STARTED = void 0;

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Just WOW!
 * This has to be one of the worst endpoints I've seen.
 * http://localhost:3000/api/rpc?proc_name=wfs_incsites&root_cause=Not%20yet%20identified,OTHERS,ENVIRONMENTAL,ACTIVE,PLANNED%20ACTIVITY,ERROR,POWER,ACCESS,ACCESSS,Cascaded,WARNING&priority=p1,p2,p3,p4&mttr=0,1,2,3,4,5&id&srsname=3857&bbox=-562576.5281788972,-44027.72829226157,1418671.2449728712,1602120.1128572943,EPSG:3857&resolution=244400
 * */
const SITUATIONAL_AWARENESS_STARTED = '@@affectli/maps/SITUATIONAL_AWARENESS_STARTED';
exports.SITUATIONAL_AWARENESS_STARTED = SITUATIONAL_AWARENESS_STARTED;
const SITUATIONAL_AWARENESS = '@@affectli/maps/SITUATIONAL_AWARENESS';
exports.SITUATIONAL_AWARENESS = SITUATIONAL_AWARENESS;

const loadSituationalAwareness = (params = {
  zoom: 3,
  center: [0, 0],
  filters: {
    mttr: {},
    cause: {},
    priority: {},
    process: {},
    entities: {},
    filterText: ''
  },
  bounds: {
    n: 0,
    s: 0,
    e: 0,
    w: 0
  }
}) => {
  // console.log('loadSituationalAwareness', params);
  const {
    ne,
    sw
  } = params.bounds;

  const latLogBounds = _leaflet.default.latLngBounds(ne, sw);

  const pointNE = _leaflet.default.Projection.SphericalMercator.project(latLogBounds._northEast);

  const pointSW = _leaflet.default.Projection.SphericalMercator.project(latLogBounds._southWest);

  const s = pointSW.x;
  const w = pointSW.y;
  const n = pointNE.x;
  const e = pointNE.y;
  const bbox = `${s},${w},${n},${e}`;
  return dispatch => {
    dispatch({
      type: SITUATIONAL_AWARENESS_STARTED
    });

    const Ihs = _HttpFetch.default.getResource(`api/rpc?proc_name=wfs_incsites&root_cause=Not%20yet%20identified,OTHERS,ENVIRONMENTAL,ACTIVE,PLANNED%20ACTIVITY,ERROR,POWER,ACCESS,ACCESSS,Cascaded,WARNING&priority=p1,p2,p3,p4&mttr=0,1,2,3,4,5&id&srsname=3857&bbox=${bbox},EPSG:3857&resolution=122200`).then(data => {
      return data;
    });

    const General = _HttpFetch.default.getResource(`api/rpc?proc_name=wfs_sites&id&entity_type=thing&srsname=3857&bbox=${bbox},EPSG:3857&resolution=122200`).then(data => {
      return data; //data
    });

    Promise.all([Ihs, General]).then(data => {
      const d1 = data[0] && data[0].features || [];
      const d2 = data[1] && data[1].features || [];
      const d = d2 ? d1.concat(d2) : d1; // console.log('Data', d);

      dispatch({
        type: SITUATIONAL_AWARENESS,
        payload: d
      });
    }).catch(error => {
      dispatch({
        type: SITUATIONAL_AWARENESS,
        payload: error,
        error: true
      });
    });
  };
};

exports.loadSituationalAwareness = loadSituationalAwareness;