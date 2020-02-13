"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Autocomplete = _interopRequireDefault(require("./Autocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more options using lazy loading.
 */
class AbstractLazyAutocomplete extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      value: null,
      filteredOptions: []
    });

    _defineProperty(this, "normalizeOptions", (0, _memoizeOne.default)(options => (options || []).map(option => ({ ...option
    }))));

    this.itemTemplate = this.itemTemplate.bind(this);
    this.suggest = this.suggest.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isLoading && prevProps.options !== this.props.options) {
      this.setState({
        filteredOptions: this.normalizeOptions(this.props.options)
      });
    }
  }
  /**
   * Returns a set of modifiable options (the PrimeReact Autocomplete will throw an exception if the options are not modifiable).
   */


  itemTemplate(item) {
    throw new Error(`You need to implement the "itemTemplate" method when you extend the AbstractLazyAutocomplete (${this.constructor.name}).`);
  }

  suggest(item) {
    throw new Error(`You need to implement the "suggest" method when you extend the AbstractLazyAutocomplete (${this.constructor.name}).`);
  }

  render() {
    // remove the properties that we do not have to pass to the prime Autocomplete
    const {
      isLoading,
      // eslint-disable-line no-unused-vars
      options,
      // eslint-disable-line no-unused-vars
      loadOptions,
      // eslint-disable-line no-unused-vars
      filterBy,
      // eslint-disable-line no-unused-vars
      ...autocompleteProps
    } = this.props;
    const {
      filteredOptions
    } = this.state;
    return _react.default.createElement(_Autocomplete.default, _extends({
      placeholder: "Search..."
    }, autocompleteProps, {
      completeMethod: this.suggest,
      itemTemplate: this.itemTemplate,
      selectedItemTemplate: this.itemTemplate,
      field: "_label_",
      suggestions: filteredOptions
    }));
  }

}

_defineProperty(AbstractLazyAutocomplete, "propTypes", { ..._Autocomplete.default.propTypes,
  loadOptions: _propTypes.default.func.isRequired,
  options: _propTypes.default.arrayOf(_propTypes.default.object),
  isLoading: _propTypes.default.bool,
  filterBy: _propTypes.default.arrayOf(_propTypes.default.object),
  orderBy: _propTypes.default.arrayOf(_propTypes.default.object)
});

;
var _default = AbstractLazyAutocomplete;
exports.default = _default;