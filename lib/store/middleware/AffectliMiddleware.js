"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = require("app/utils/immutable/Immutable");

var _utils = require("app/utils/utils");

var _appActions = require("store/actions/app/appActions");

/**
 * Defines our custom application middleware
 */
const affectliMiddleware = store => next => action => {
  const showToastr = payload => store.dispatch({
    type: _appActions.SHOW_TOASTR,
    payload
  });

  const errorAlert = payload => store.dispatch({
    type: _appActions.ERROR_ALERT_MESSAGE,
    payload
  });

  if (action.meta) {
    const meta = action.meta;

    if (meta.infoTitle || meta.infoMessage) {
      showToastr({
        severity: 'info',
        summary: meta.infoTitle || '',
        detail: meta.infoMessage || ''
      });
    }

    if (meta.successTitle || meta.successMessage) {
      showToastr({
        severity: 'success',
        summary: meta.successTitle || '',
        detail: meta.successMessage || ''
      });
    }

    if (meta.warnTitle || meta.warnMessage) {
      showToastr({
        severity: 'warn',
        summary: meta.warnTitle || '',
        detail: meta.warnMessage || ''
      });
    }

    if (meta.errorTitle || meta.errorMessage) {
      showToastr({
        severity: 'error',
        summary: meta.errorTitle || '',
        detail: meta.errorMessage || ''
      });
    }
  } // if there is an error and the errorMessage is not specified toast the error itself


  if (action.error && (!action.meta || !action.meta.errorMessage)) {
    // if it is a GraphQL error we receive action.payload.errors = [{ message: '...', location: ... }, { ... }]
    let message = action.payload.errors && action.payload.errors[0] && action.payload.errors[0].message;

    if (!message) {
      // this is not a GraphQL error

      /*
       * Sometime we receive a message in the action.payload.message,
       * sometime we receive a message in the action.payload,
       * sometime we receive an HTML page that describe the error in the action.payload
       */
      message = String(action.payload && action.payload.message ? action.payload.message : action.payload);

      if (message.indexOf('<!DOCTYPE html>') >= 0 || message.indexOf('<html>') >= 0) {
        if (action.payload && action.payload.status === 401) {
          message = 'You are not authorized to access the data.';
        } else {
          message = 'The server encountered an internal error that prevented it from fulfilling this request.';
        }
      }
    }

    showToastr({
      severity: 'error',
      detail: message
    });
    errorAlert({
      isError: action.error,
      detail: message
    });
  } else if (action.error === false && action.type !== _appActions.ERROR_ALERT_MESSAGE) {
    errorAlert({
      isError: false,
      detail: ''
    });
  }

  const toastrApplicationError = (0, _utils.debounce)(() => {
    showToastr({
      severity: 'error',
      detail: 'Application Error'
    });
  }, 700);

  try {
    /* eslint-disable no-console */
    const result = next(action);

    if (action.type.startsWith('@@affectli')) {
      const invalidProperties = Object.keys(action).filter(key => ['type', 'payload', 'meta', 'error'].indexOf(key) === -1);

      if (invalidProperties && invalidProperties.length > 0) {
        console.warn(`${action.type.match('[A-Z_]+$')[0]} contains invalid properties`, invalidProperties);
      } //console.log('test', action.payload, !isImmutable(action.payload));


      if (action.payload && !(0, _Immutable.isImmutable)(action.payload)) {
        console.warn(`${action.type.match('[A-Z_]+$')[0]} the payload is not Immutable.`);
      }

      if (action.meta && !(0, _Immutable.isImmutable)(action.meta)) {
        console.warn(`${action.type.match('[A-Z_]+$')[0]} the meta is not Immutable.`);
      }

      if (action.error !== undefined && action.error !== false && action.error !== true) {
        console.warn(`${action.type.match('[A-Z_]+$')[0]} the error is not a valid value:`, action.error);
      }
    } // console.groupCollapsed(`[dev] REDUX ${action.type}`);
    // console.log('action', action);
    // console.log('store', store.getState());
    // console.groupEnd(`[dev] REDUX ${action.type}`);
    // window.state = store.getState(); // warning: do not commit this line uncommented!


    return result;
    /* eslint-enable no-console */
  } catch (e) {
    toastrApplicationError();
    console.error('Error', e); // eslint-disable-line no-console

    throw e;
  }
};

var _default = affectliMiddleware;
exports.default = _default;