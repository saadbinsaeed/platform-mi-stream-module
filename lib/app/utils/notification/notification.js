"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = void 0;

var _reactDeviceDetect = require("react-device-detect");

var _lo = require("app/utils/lo/lo");

var _notification = _interopRequireDefault(require("media/sounds/notification.mp3"));

var _low = _interopRequireDefault(require("media/sounds/low.mp3"));

var _lowest = _interopRequireDefault(require("media/sounds/lowest.mp3"));

var _medium = _interopRequireDefault(require("media/sounds/medium.mp3"));

var _high = _interopRequireDefault(require("media/sounds/high.mp3"));

var _highest = _interopRequireDefault(require("media/sounds/highest.mp3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $FlowFixMe
// $FlowFixMe
// $FlowFixMe
// $FlowFixMe
// $FlowFixMe
// $FlowFixMe
// $FlowFixMe
const defaultAudio = new Audio(_notification.default); // $FlowFixMe

const low = new Audio(_low.default); // $FlowFixMe

const lowest = new Audio(_lowest.default); // $FlowFixMe

const medium = new Audio(_medium.default); // $FlowFixMe

const high = new Audio(_high.default); // $FlowFixMe

const highest = new Audio(_highest.default);
const audioMap = {
  default: defaultAudio,
  low,
  lowest,
  medium,
  high,
  highest
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    window.navigator.serviceWorker.register('sw.js').then(registration => {// Registration was successful
    }, error => {
      // registration failed :(
      console.error('serviceWorker registration failed: ', error); // eslint-disable-line no-console
    });
  });
}

const tags = new Set();

const showNotification = async (worker, title, options) => {
  if (!window.Notification || window.Notification.permission === 'denied') {
    return Promise.resolve({
      permission: 'denied'
    });
  }

  if (window.Notification.permission === 'granted') {
    const tag = (0, _lo.get)(options, 'tag');

    if (!tag || !tags.has(tag)) {
      tags.add(tag);
      return worker.showNotification(title, options);
    } else {
      return Promise.resolve({
        duplicate: true
      });
    }
  } else {
    await window.Notification.requestPermission();
    return showNotification(worker, title, options);
  }
};
/**
 * Notifies the user using a service worker registration (https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification).
 *
 * @param title the title of the notification.
 * @param options the notification options (https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
 */


const notify = async (title, options) => {
  const worker = await window.navigator.serviceWorker.register('sw.js');
  await window.navigator.serviceWorker.ready;
  const {
    sound,
    ...notificationOptions
  } = options;
  const nofiticationOptions = {
    icon: './notifications/icon-default.png',
    badge: './notifications/badge.png',
    requireInteraction: false,
    ...notificationOptions
  };
  const response = await showNotification(worker, title, nofiticationOptions);

  if (_reactDeviceDetect.isBrowser && (0, _lo.get)(response, 'permission') !== 'denied' && !(0, _lo.get)(response, 'duplicate')) {
    audioMap[sound || 'default'].play().catch();
  }
};

exports.notify = notify;