"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _usersActions = require("store/actions/admin/usersActions");

var _AbstractUserAutocomplete = _interopRequireDefault(require("./AbstractUserAutocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more users using lazy loading.
 */
class UserAutocomplete extends _AbstractUserAutocomplete.default {}

_defineProperty(UserAutocomplete, "propTypes", { ..._AbstractUserAutocomplete.default.propTypes
});

;

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.common.autocomplete.user.isLoading,
  options: state.common.autocomplete.user.data
}), {
  loadOptions: _usersActions.loadUserAutocomplete
})(UserAutocomplete);

exports.default = _default;