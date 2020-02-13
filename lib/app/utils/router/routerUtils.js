"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = exports.isModal = void 0;

const isModal = (location, previousLocation) => {
  return !!(location.state && location.state.modal && previousLocation !== location);
};

exports.isModal = isModal;

const getLocation = (location, previousLocation) => {
  if (!isModal(location, previousLocation)) {
    return location;
  }

  if (!previousLocation && location.pathname.endsWith('/add')) {
    //FIXME if we don't have a previous location when we close the popup we need to avoid to go back
    return { ...location,
      pathname: location.pathname.replace(/\/add/, '')
    };
  }

  return previousLocation;
};

exports.getLocation = getLocation;