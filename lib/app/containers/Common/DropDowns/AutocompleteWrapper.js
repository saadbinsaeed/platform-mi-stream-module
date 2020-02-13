"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debouncePromise = _interopRequireDefault(require("debounce-promise"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Autocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/Autocomplete"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @deprecated when we use the Autocomplete family components we should pass the selected objects as value to avoid the usage of this wrapper.
 *
 * Wrapper for the Autocomplete family components to get the labels for the selected values when the component is initialized.
 */
class AutocompleteWrapper extends _react.PureComponent {
  // We checked value second time because with slow internet async function can override the correct state;
  constructor(props) {
    super(props);

    _defineProperty(this, "unmounted", false);

    _defineProperty(this, "updateState", value => records => !this.unmounted && value === this.props.value && this.setState({
      value: records
    }));

    _defineProperty(this, "valueChanged", (0, _memoizeOne.default)((prevPropsValue, propsValue, stateValue, valueProperty) => {
      if (prevPropsValue === propsValue) {
        return false;
      }

      if (!propsValue) {
        return !!stateValue;
      }

      if (!stateValue) {
        return true;
      }

      const propsValueArray = Array.isArray(propsValue) ? propsValue : [propsValue];
      const stateValueArray = Array.isArray(stateValue) ? stateValue : [stateValue];

      if (propsValueArray.length !== stateValueArray.length) {
        return true;
      }

      return !propsValueArray.map(value => stateValueArray.some(record => record[valueProperty] === value)).every(r => r);
    }));

    _defineProperty(this, "fetchRecords", (0, _debouncePromise.default)((value, valueProperty, graphqlQuery) => {
      if (!value) {
        return null;
      }

      const identifiers = Array.isArray(value) ? value : [value];
      return _client.graphql.query({
        query: graphqlQuery,
        variables: {
          filterBy: [{
            field: valueProperty,
            op: 'in',
            value: identifiers
          }]
        },
        fetchPolicy: 'no-cache'
      }).then(response => {
        const records = (0, _lo.get)(response, 'data.result') || []; // even if the user cannot see some value we have to keep the id in the selected options

        const options = identifiers.map(id => records.find(record => record[valueProperty] === id) || {
          [valueProperty]: id
        });
        return Array.isArray(value) ? options : options[0];
      });
    }, 300));

    _defineProperty(this, "onChange", event => {
      const {
        valueProperty = 'id'
      } = this.props;
      this.setState({
        value: event.value
      }, () => {
        let value = null;

        if (event.value) {
          if (Array.isArray(event.value)) {
            value = event.value.map(option => option[valueProperty]);
          } else {
            value = event.value[valueProperty];
          }
        }

        this.props.onChange({ ...event,
          value,
          target: { ...event.target,
            value
          }
        });
      });
    });

    _defineProperty(this, "buildKey", (0, _memoizeOne.default)(value => JSON.stringify(value)));

    this.state = {
      value: null
    };
    const {
      value: _value,
      valueProperty: _valueProperty = 'id',
      graphqlQuery: _graphqlQuery
    } = props;
    this.fetchRecords(this.normalizeValue(_value), _valueProperty, _graphqlQuery).then(this.updateState(_value));
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  normalizeValue(value) {
    return !value || Array.isArray(value) && value.length === 0 ? null : value;
  }

  componentDidUpdate(prevProps) {
    const {
      value,
      valueProperty = 'id',
      graphqlQuery
    } = this.props;

    if (this.valueChanged(prevProps.value, value, this.state.value, valueProperty)) {
      this.fetchRecords(this.normalizeValue(value), valueProperty, graphqlQuery).then(this.updateState(value));
    }
  }

  render() {
    const {
      Autocomplete,
      ...autocompleteProps
    } = this.props;
    const {
      value
    } = this.state || {};
    return _react.default.createElement(Autocomplete, _extends({}, autocompleteProps, {
      key: this.buildKey(value),
      value: value,
      onChange: this.onChange
    }));
  }

}

_defineProperty(AutocompleteWrapper, "propTypes", { ..._Autocomplete.default.propTypes,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]))]),
  graphqlQuery: _propTypes.default.object.isRequired,
  valueProperty: _propTypes.default.string
});

var _default = AutocompleteWrapper;
exports.default = _default;