"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Autocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/Autocomplete"));

var _ThingAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ThingAutocomplete"));

var _thingAutocompleteQuery = _interopRequireDefault(require("graphql/entities/things/thingAutocompleteQuery"));

var _AutocompleteWrapper = _interopRequireDefault(require("./AutocompleteWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @deprecated use ThingAutocomplete instead.
 */
class ThingsDropdownDeprecated extends _react.PureComponent {
  render() {
    return _react.default.createElement(_AutocompleteWrapper.default, _extends({
      valueProperty: "id"
    }, this.props, {
      Autocomplete: _ThingAutocomplete.default,
      graphqlQuery: _thingAutocompleteQuery.default
    }));
  }

}

_defineProperty(ThingsDropdownDeprecated, "propTypes", { ..._Autocomplete.default.propTypes
});

;
var _default = ThingsDropdownDeprecated;
exports.default = _default;