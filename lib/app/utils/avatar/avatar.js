"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInitials = exports.generateColor = void 0;

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateColor = (0, _fastMemoize.default)((colors, name) => {
  if (name && name[0]) {
    const sum = name.split('').reduce((accumulator, value) => accumulator + value.charCodeAt(0), 0);
    return colors[sum % colors.length];
  } else {
    return colors[0];
  }
});
exports.generateColor = generateColor;
const createInitials = (0, _fastMemoize.default)(name => {
  const cleanName = (name || '').trim();
  const namesSpace = cleanName.split(' ');
  const namesSlash = cleanName.split('_');
  const names = namesSpace.length > 1 ? namesSpace : namesSlash;

  if (!names[0].length) {
    return 'NN';
  }

  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
});
exports.createInitials = createInitials;