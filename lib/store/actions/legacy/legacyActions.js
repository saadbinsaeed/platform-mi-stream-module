"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reloadIframe = exports.RELOAD_IFRAME = void 0;
const RELOAD_IFRAME = '@@affectli/legacy/RELOAD_IFRAME';
exports.RELOAD_IFRAME = RELOAD_IFRAME;

const reloadIframe = () => dispatch => {
  dispatch({
    type: RELOAD_IFRAME
  });
};

exports.reloadIframe = reloadIframe;