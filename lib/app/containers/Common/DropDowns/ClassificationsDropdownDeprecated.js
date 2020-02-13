"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Autocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/Autocomplete"));

var _ClassificationAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ClassificationAutocomplete"));

var _classificationAutocompleteQuery = _interopRequireDefault(require("graphql/entities/classifications/classificationAutocompleteQuery"));

var _AutocompleteWrapper = _interopRequireDefault(require("./AutocompleteWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @deprecated use ClassificationAutocomplete instead.
 */
class ClassificationsDropdownDeprecated extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "normalizeValue", (0, _memoizeOne.default)((value, valueProperty) => {
      if (valueProperty === 'id') {
        if (Array.isArray(value)) {
          return value.map(id => Number(id)).filter(id => Number.isInteger(id) && id > 0);
        }

        const id = value && Number(value);
        return id && Number.isInteger(value) && id > 0 ? id : null;
      }

      return value;
    }));
  }

  render() {
    return _react.default.createElement(_AutocompleteWrapper.default, _extends({
      valueProperty: "id"
    }, this.props, {
      value: this.normalizeValue(this.props.value, this.props.valueProperty || 'id'),
      Autocomplete: _ClassificationAutocomplete.default,
      graphqlQuery: _classificationAutocompleteQuery.default
    }));
  }

}

_defineProperty(ClassificationsDropdownDeprecated, "propTypes", { ..._Autocomplete.default.propTypes
});

;
var _default = ClassificationsDropdownDeprecated;
exports.default = _default;