"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSituationalAwarenessDetail = exports.SITUATIONAL_AWARENESS_DETAIL = exports.SITUATIONAL_AWARENESS_DETAIL_STARTED = void 0;

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SITUATIONAL_AWARENESS_DETAIL_STARTED = '@@affectli/maps/SITUATIONAL_AWARENESS_DETAIL_STARTED';
exports.SITUATIONAL_AWARENESS_DETAIL_STARTED = SITUATIONAL_AWARENESS_DETAIL_STARTED;
const SITUATIONAL_AWARENESS_DETAIL = '@@affectli/maps/SITUATIONAL_AWARENESS_DETAIL';
exports.SITUATIONAL_AWARENESS_DETAIL = SITUATIONAL_AWARENESS_DETAIL;

const loadSituationalAwarenessDetail = id => dispatch => {
  dispatch({
    type: SITUATIONAL_AWARENESS_DETAIL_STARTED
  });

  _HttpFetch.default.getResource(`api/rpc?proc_name=icsite&id=https://affectli.dev.mi-c3.com&proc_name=thing&id=${id}`).then(resp => {
    dispatch({
      type: SITUATIONAL_AWARENESS_DETAIL,
      payload: resp
    });
  }).catch(error => {
    dispatch({
      type: SITUATIONAL_AWARENESS_DETAIL,
      payload: error,
      error: true
    });
  });
};

exports.loadSituationalAwarenessDetail = loadSituationalAwarenessDetail;