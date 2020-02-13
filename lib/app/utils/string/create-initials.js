"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInitials = void 0;

const createInitials = string => {
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
};

exports.createInitials = createInitials;