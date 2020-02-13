"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _organisationsActions = require("store/actions/entities/organisationsActions");

var _AbstractEntityTypeahead = _interopRequireDefault(require("./AbstractEntityTypeahead"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more groups using lazy loading.
 */
class OrganisationTypeahead extends _react.PureComponent {
  render() {
    // remove the properties that we do not have to pass to the AbstractEntityAutocomplete
    const {
      loadOrganisationAutocomplete,
      ...abstractEntityAutocompleteProps
    } = this.props;
    return _react.default.createElement(_AbstractEntityTypeahead.default, _extends({
      placeholder: "Search for an organisation..."
    }, abstractEntityAutocompleteProps, {
      loadOptions: loadOrganisationAutocomplete
    }));
  }

}

_defineProperty(OrganisationTypeahead, "propTypes", {
  loadOrganisationAutocomplete: _propTypes.default.func.isRequired,
  options: _propTypes.default.arrayOf(_propTypes.default.object),
  isLoading: _propTypes.default.bool,
  filterBy: _propTypes.default.arrayOf(_propTypes.default.object)
});

;

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.common.autocomplete.organisation.isLoading,
  options: state.common.autocomplete.organisation.data
}), {
  loadOrganisationAutocomplete: _organisationsActions.loadOrganisationAutocomplete
})(OrganisationTypeahead);

exports.default = _default;