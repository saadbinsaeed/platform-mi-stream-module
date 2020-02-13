"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _DirectoriesActions = require("store/actions/common/DirectoriesActions");

var _Select = _interopRequireDefault(require("app/components/molecules/Autocomplete/Select"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Dropdown for a list of directories.
 */
class DirectoriesDropdown extends _react.Component {
  static get directoriesCache() {
    if (!this._directoriesCache) {
      this._directoriesCache = new Map();
    }

    return this._directoriesCache;
  }

  static clearFilters() {
    this.directoriesCache.clear();
  }

  static setTimeout() {
    this.timeout = setTimeout(() => {
      this.clearFilters();
      this.timeout = null;
    }, 1000 * 60 * 10);
  }

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "normalizeOptions", (0, _memoizeOne.default)((data = []) => (0, _lo.sortBy)(data.map(item => ({
      value: item[this.props.valueField],
      label: item.label
    })), 'label')));

    this.state = {
      data: this.constructor.directoriesCache.get(this.props.directoryType)
    };
  }
  /**
   *
   */


  componentDidMount() {
    if (!this.constructor.timeout) {
      this.constructor.setTimeout();
    }

    if (!this.constructor.directoriesCache.has(`loading(${this.props.directoryType})`)) {
      this.constructor.directoriesCache.set(`loading(${this.props.directoryType})`, true);
      this.props.loadDirectories(this.props.directoryType);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.directoryType !== this.props.directoryType) {
      this.props.loadDirectories(this.props.directoryType);
    }

    if (!(0, _utils.deepEquals)(prevProps.directories, this.props.directories)) {
      const data = this.props.directories[this.props.directoryType];

      if (data) {
        this.constructor.directoriesCache.set(this.props.directoryType, data);
        this.constructor.directoriesCache.delete(`loading(${this.props.directoryType})`);
        this.setState({
          data
        });
      }
    }
  }

  /**
   * @override
   * @returns {XML}
   */
  render() {
    const {
      valueField,
      value,
      placeholder,
      directoryType,
      directories: unused,
      onChange,
      loadDirectories,
      ...restProps
    } = this.props; // eslint-disable-line no-unused-vars

    const {
      data
    } = this.state;
    const options = this.normalizeOptions(data);

    if (options.length === 0 && this.constructor.directoriesCache.has(`loading(${this.props.directoryType})`)) {
      return _react.default.createElement(_Loader.default, {
        radius: "20"
      });
    }

    return _react.default.createElement(_Select.default, _extends({}, restProps, {
      value: value,
      onChange: onChange,
      placeholder: placeholder || 'Select a country',
      options: options,
      valueField: valueField
    }));
  }

}

_defineProperty(DirectoriesDropdown, "_directoriesCache", void 0);

_defineProperty(DirectoriesDropdown, "timeout", null);

_defineProperty(DirectoriesDropdown, "propTypes", {
  onChange: _propTypes.default.func,
  loadDirectories: _propTypes.default.func,
  value: _propTypes.default.any,
  valueField: _propTypes.default.any,
  directoryType: _propTypes.default.string.isRequired,
  name: _propTypes.default.string,
  label: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  directories: _propTypes.default.object,
  disabled: _propTypes.default.bool
});

_defineProperty(DirectoriesDropdown, "defaultProps", {
  valueField: 'label'
});

var _default = (0, _reactRedux.connect)(state => ({
  directories: state.entities.directories
}), {
  loadDirectories: _DirectoriesActions.loadDirectories
})(DirectoriesDropdown);

exports.default = _default;