"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _usersActions = require("store/actions/admin/usersActions");

var _filterUtils = require("app/utils/filter/filterUtils");

var _Autocomplete = _interopRequireDefault(require("./Autocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more users using client side search.
 */
class UserSelect extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      filteredOptions: []
    });

    _defineProperty(this, "buildOptions", (0, _memoizeOne.default)(options => (options || []).map(({
      id,
      login,
      name
    }) => ({
      id,
      name: `${name} (${login})`
    }))));

    _defineProperty(this, "suggest", event => {
      this.setState({
        filteredOptions: (0, _filterUtils.includes)(this.buildOptions(this.props.options), event.query, {
          property: 'name'
        }).map(item => ({ ...item
        }))
      });
    });

    _defineProperty(this, "onChange", event => {
      const {
        onChange,
        name
      } = this.props;
      onChange && onChange({ ...event,
        target: {
          name,
          value: event.value
        }
      });
    });
  }

  componentDidMount() {
    this.props.loadUsersSelect();
  }

  render() {
    // remove the properties that we do not have to pass to the prime Autocomplete
    const {
      options,
      loadUsersSelect,
      ...autocompleteProps
    } = this.props; // eslint-disable-line no-unused-vars

    const {
      filteredOptions
    } = this.state;
    return _react.default.createElement(_Autocomplete.default, _extends({
      placeholder: "Search for a user..."
    }, autocompleteProps, {
      field: "name",
      onChange: this.onChange,
      completeMethod: this.suggest,
      suggestions: filteredOptions
    }));
  }

}

_defineProperty(UserSelect, "propTypes", { ..._Autocomplete.default.propTypes,
  loadUsersSelect: _propTypes.default.func.isRequired,
  options: _propTypes.default.arrayOf(_propTypes.default.object)
});

;

var _default = (0, _reactRedux.connect)(state => ({
  options: state.common.select.user.data
}), {
  loadUserSelect: _usersActions.loadUserSelect
})(UserSelect);

exports.default = _default;