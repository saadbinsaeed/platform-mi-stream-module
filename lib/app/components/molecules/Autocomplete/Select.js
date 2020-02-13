"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _filterUtils = require("app/utils/filter/filterUtils");

var _Autocomplete = _interopRequireDefault(require("./Autocomplete"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select
 */
class Select extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "filterOptions", (0, _memoizeOne.default)((options, value, query) => {
      let filteredOptions = query ? (0, _filterUtils.includes)(options, query, {
        property: 'label'
      }) : options;

      if (Number.isFinite(Number(value))) {
        filteredOptions = filteredOptions.filter(op => op.value !== value);
      } else {
        const values = new Set(value);
        filteredOptions = filteredOptions.filter(({
          value
        }) => !values.has(value));
      }

      return filteredOptions;
    }));

    _defineProperty(this, "suggest", (0, _utils.debounce)(({
      query
    }) => {
      const {
        options,
        value
      } = this.props;
      this.setState({
        filteredOptions: this.filterOptions(options, value, query)
      });
    }, 300));

    _defineProperty(this, "onChange", event => {
      const {
        onChange,
        name,
        multiple,
        valueField
      } = this.props;
      const value = multiple ? event.value.map(val => val[valueField]) : event.value[valueField];
      onChange && onChange({ ...event,
        target: {
          name,
          value
        }
      });
    });

    _defineProperty(this, "normalizeValue", (0, _memoizeOne.default)((value, options) => {
      if (this.props.multiple) {
        const values = new Set(value);
        return options.filter(({
          value
        }) => values.has(value));
      } else {
        return options.find(op => op.value === value);
      }
    }));

    _defineProperty(this, "itemTemplate", option => this.props.itemTemplate ? this.props.itemTemplate(option) : option.label);

    const {
      options: _options,
      value: _value
    } = props;
    this.state = {
      filteredOptions: this.filterOptions(_options, _value)
    };
  }

  render() {
    const {
      value,
      options,
      multiple,
      ...autocompleteProps
    } = this.props;
    const {
      filteredOptions
    } = this.state;
    return _react.default.createElement(_Autocomplete.default, _extends({
      field: "label",
      placeholder: "Search..."
    }, autocompleteProps, {
      value: this.normalizeValue(value, options),
      onChange: this.onChange,
      completeMethod: this.suggest,
      suggestions: filteredOptions,
      multiple: multiple,
      itemTemplate: this.itemTemplate
    }));
  }

}

_defineProperty(Select, "propTypes", { ..._Autocomplete.default.propTypes
});

_defineProperty(Select, "defaultProps", {
  valueField: 'value'
});

;
var _default = Select;
exports.default = _default;