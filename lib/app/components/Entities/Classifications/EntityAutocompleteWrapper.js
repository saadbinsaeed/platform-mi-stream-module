"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _debouncePromise = _interopRequireDefault(require("debounce-promise"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _entityAutocompleteQuery = _interopRequireDefault(require("graphql/entities/entities/entityAutocompleteQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @deprecated Instead of using this component we should get all the id and name of the selected options when we init the autocomplete.
 *
 * Wrapper for the entity Autocomplete family components.
 */
class EntityAutocompleteWrapper extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "fetchEntity", (0, _debouncePromise.default)(id => {
      if (!id || !Number.isInteger(id)) return Promise.resolve(null);
      return _client.graphql.query({
        query: _entityAutocompleteQuery.default,
        variables: {
          filterBy: [{
            field: 'id',
            op: '=',
            value: id
          }]
        },
        fetchPolicy: 'no-cache'
      }).then(response => {
        const entity = (0, _lo.get)(response, 'data.result[0]');
        return entity || {
          id,
          name: 'Data not available'
        };
      });
    }, 300));

    _defineProperty(this, "onChange", event => {
      this.setState({
        value: event.value
      }, () => {
        const value = event.value && event.value.id;
        this.props.onChange({ ...event,
          value,
          target: { ...event.target,
            value
          }
        });
      });
    });

    this.state = {};
    const _value = props.value;
    this.fetchEntity(_value).then(entity => this.setState({
      value: entity
    }));
  }

  componentDidUpdate(prevProps) {
    const value = this.props.value;

    if ((0, _lo.get)(this.state, 'value.id') !== value) {
      this.fetchEntity(value).then(entity => this.setState({
        value: entity
      }));
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
      key: value && value.id,
      value: value,
      onChange: this.onChange
    }));
  }

}

var _default = EntityAutocompleteWrapper;
exports.default = _default;