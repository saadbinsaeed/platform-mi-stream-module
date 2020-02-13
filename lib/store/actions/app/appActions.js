"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleNav = toggleNav;
exports.openNav = openNav;
exports.setChat = setChat;
exports.toggleChat = toggleChat;
exports.setNotifications = setNotifications;
exports.toggleNotifications = toggleNotifications;
exports.loadAutocomplete = exports.showToastr = exports.loadNotifications = exports.loadAppOrganisation = exports.showStepperSave = exports.hideStepperSave = exports.toggleAppHeader = exports.setHeader = exports.SHOW_STEPPER_SAVE_BUTTON = exports.HIDE_STEPPER_SAVE_BUTTON = exports.TOGGLE_APP_HEADERS = exports.LOAD_AUTOCOMPLETE = exports.LOAD_AUTOCOMPLETE_STARTED = exports.LOAD_NOTIFICATIONS = exports.LOAD_NOTIFICATIONS_STARTED = exports.ERROR_ALERT_MESSAGE = exports.SHOW_TOASTR = exports.LOAD_APP_ORGANISATION = exports.LOAD_APP_ORGANISATION_STARTED = exports.SET_HEADERS = exports.SELECT_THEME = exports.TOGGLE_SEARCH = exports.TOGGLE_CHAT = exports.TOGGLE_NOTIFICATIONS = exports.OPEN_NAV = exports.TOGGLE_NAV = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _notifyBroadcast = require("app/utils/notification/notify-broadcast");

var _utils = require("app/utils/utils");

var _client = require("graphql/client");

var _notification = require("app/utils/notification/notification");

var _actionUtils = require("app/utils/redux/action-utils");

var _organisationProfileQuery = _interopRequireDefault(require("graphql/app/organisationProfileQuery"));

var _notificationsQuery = _interopRequireDefault(require("graphql/app/notificationsQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TOGGLE_NAV = '@@affectli/app/TOGGLE_NAV';
exports.TOGGLE_NAV = TOGGLE_NAV;
const OPEN_NAV = '@@affectli/app/OPEN_NAV';
exports.OPEN_NAV = OPEN_NAV;
const TOGGLE_NOTIFICATIONS = '@@affectli/app/TOGGLE_NOTIFICATIONS';
exports.TOGGLE_NOTIFICATIONS = TOGGLE_NOTIFICATIONS;
const TOGGLE_CHAT = '@@affectli/app/TOGGLE_CHAT';
exports.TOGGLE_CHAT = TOGGLE_CHAT;
const TOGGLE_SEARCH = '@@affectli/app/TOGGLE_SEARCH';
exports.TOGGLE_SEARCH = TOGGLE_SEARCH;
const SELECT_THEME = '@@affectli/app/SELECT_THEME';
exports.SELECT_THEME = SELECT_THEME;
const SET_HEADERS = '@@affectli/app/SET_HEADERS';
exports.SET_HEADERS = SET_HEADERS;
const LOAD_APP_ORGANISATION_STARTED = '@@affectli/app/LOAD_APP_ORGANISATION_IMAGE_STARTED';
exports.LOAD_APP_ORGANISATION_STARTED = LOAD_APP_ORGANISATION_STARTED;
const LOAD_APP_ORGANISATION = '@@affectli/app/LOAD_APP_ORGANISATION_IMAGE';
exports.LOAD_APP_ORGANISATION = LOAD_APP_ORGANISATION;
const SHOW_TOASTR = '@@affectli/app/SHOW_TOASTR';
exports.SHOW_TOASTR = SHOW_TOASTR;
const ERROR_ALERT_MESSAGE = '@@affectli/app/ERROR_ALERT_MESSAGE';
exports.ERROR_ALERT_MESSAGE = ERROR_ALERT_MESSAGE;
const LOAD_NOTIFICATIONS_STARTED = '@@affectli/app/LOAD_NOTIFICATIONS_STARTED';
exports.LOAD_NOTIFICATIONS_STARTED = LOAD_NOTIFICATIONS_STARTED;
const LOAD_NOTIFICATIONS = '@@affectli/app/LOAD_NOTIFICATIONS';
exports.LOAD_NOTIFICATIONS = LOAD_NOTIFICATIONS;
const LOAD_AUTOCOMPLETE_STARTED = '@@affectli/app/LOAD_AUTOCOMPLETE_STARTED';
exports.LOAD_AUTOCOMPLETE_STARTED = LOAD_AUTOCOMPLETE_STARTED;
const LOAD_AUTOCOMPLETE = '@@affectli/app/LOAD_AUTOCOMPLETE';
exports.LOAD_AUTOCOMPLETE = LOAD_AUTOCOMPLETE;
const TOGGLE_APP_HEADERS = '@@affectli/app/TOGGLE_APP_HEADERS';
exports.TOGGLE_APP_HEADERS = TOGGLE_APP_HEADERS;
const HIDE_STEPPER_SAVE_BUTTON = '@@affectli/app/stepper/HIDE_STEPPER_SAVE_BUTTON';
exports.HIDE_STEPPER_SAVE_BUTTON = HIDE_STEPPER_SAVE_BUTTON;
const SHOW_STEPPER_SAVE_BUTTON = '@@affectli/app/stepper/SHOW_STEPPER_SAVE_BUTTON';
/**
 * TOGGLE_NAV Action
 */

exports.SHOW_STEPPER_SAVE_BUTTON = SHOW_STEPPER_SAVE_BUTTON;

function toggleNav() {
  return dispatch => {
    dispatch({
      type: TOGGLE_NAV
    });
  };
}
/**
 * Set NAV to open
 */


function openNav() {
  return dispatch => {
    dispatch({
      type: OPEN_NAV
    });
  };
}
/**
 * Set CHAT to true or false
 */


function setChat() {
  return {
    type: TOGGLE_CHAT
  };
}
/**
 * TOGGLE_CHAT Action
 */


function toggleChat() {
  return async dispatch => {
    dispatch(setChat());
  };
}
/**
 * Set CHAT to true or false
 */


function setNotifications() {
  return {
    type: TOGGLE_NOTIFICATIONS
  };
}
/**
 * TOGGLE_CHAT Action
 */


function toggleNotifications() {
  return async dispatch => {
    dispatch(setNotifications());
  };
}
/**
 * Send header object to app headers
 */


const setHeader = (headers = []) => dispatch => {
  dispatch({
    type: SET_HEADERS,
    payload: (0, _Immutable.default)(headers)
  });
};

exports.setHeader = setHeader;

const toggleAppHeader = instruction => dispatch => dispatch({
  type: TOGGLE_APP_HEADERS,
  payload: instruction
});

exports.toggleAppHeader = toggleAppHeader;

const hideStepperSave = () => dispatch => dispatch({
  type: HIDE_STEPPER_SAVE_BUTTON
});

exports.hideStepperSave = hideStepperSave;

const showStepperSave = () => dispatch => dispatch({
  type: SHOW_STEPPER_SAVE_BUTTON
});

exports.showStepperSave = showStepperSave;

const loadAppOrganisation = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_APP_ORGANISATION_STARTED
  });

  _client.graphql.query({
    query: _organisationProfileQuery.default,
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: LOAD_APP_ORGANISATION,
      payload: (0, _Immutable.default)((0, _lo.get)(response, 'data.organisationProfile'))
    });
  }).catch(error => {
    dispatch({
      type: LOAD_APP_ORGANISATION,
      payload: error,
      error: true
    });
  });
};
/**
 * Loads the notifications about the tasks and the active broadcasts.
 */


exports.loadAppOrganisation = loadAppOrganisation;

const loadNotifications = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_NOTIFICATIONS_STARTED
  });
  const state = getState();
  const {
    login
  } = state.user.profile || {};

  _client.graphql.query({
    query: _notificationsQuery.default,
    fetchPolicy: 'no-cache'
  }).then(response => {
    // show the broadcast notifications
    const broadcasts = (0, _utils.getArray)(response, 'data.broadcasts') || [];
    (0, _notifyBroadcast.notifyBroadcasts)(broadcasts); // show the task notifications

    const tasks = (0, _lo.get)(response, 'data.tasks') || [];
    tasks.forEach(({
      assignee,
      owner,
      description,
      id,
      name
    }) => {
      let title;

      if (login === (assignee || {}).login) {
        title = 'You have a new task assigned to you.';
      } else if (login === (owner || {}).login) {
        title = 'You are the owner of a task.';
      } else {
        title = 'You are a member of a task.';
      }

      (0, _notification.notify)(title, {
        tag: `task#${id}`,
        body: `${name} \n ${description || ''}`,
        data: {
          link: `/#/abox/task/${id}`
        }
      });
    });
    dispatch({
      type: LOAD_NOTIFICATIONS,
      payload: (0, _Immutable.default)(response.data) || (0, _Immutable.default)([])
    });
  }).catch(error => {
    dispatch({
      type: LOAD_NOTIFICATIONS,
      payload: (0, _Immutable.default)(error),
      error: true
    });
  });
};

exports.loadNotifications = loadNotifications;

const showToastr = options => dispatch => {
  dispatch({
    type: SHOW_TOASTR,
    payload: options
  });
};

exports.showToastr = showToastr;

const loadAutocomplete = (query, queryOptions) => (0, _actionUtils.loadData)(LOAD_AUTOCOMPLETE_STARTED, LOAD_AUTOCOMPLETE, query)(queryOptions);

exports.loadAutocomplete = loadAutocomplete;