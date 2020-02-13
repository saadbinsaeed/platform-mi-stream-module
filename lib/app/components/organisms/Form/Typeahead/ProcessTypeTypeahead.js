"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _platformUi = require("@mic3/platform-ui");

var _myAppsActions = require("store/actions/abox/myAppsActions");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _lo = require("app/utils/lo/lo");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Select one or more groups using lazy loading.
 */
let ProcessTypeTypeahead = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class ProcessTypeTypeahead extends _react.PureComponent {
  constructor(props) {
    super(props);
    props.loadTypeaheadProcessDefinitions();
  }

  normalizeOptions(processDefinitions) {
    return (processDefinitions || []).map(({
      name
    }) => ({
      label: name
    }));
  }

  render() {
    // remove the properties that we do not have to pass to the AbstractEntityAutocomplete
    const {
      loadTypeaheadProcessDefinitions,
      processDefinitions,
      isLoading,
      ...abstractProcessTypeTypeaheadProps
    } = this.props;
    return _react.default.createElement(_platformUi.Autocomplete, _extends({
      placeholder: "Search for a process type..."
    }, abstractProcessTypeTypeaheadProps, {
      options: this.normalizeOptions(processDefinitions),
      valueField: "label"
    }));
  }

}, _defineProperty(_class2, "propTypes", {
  loadTypeaheadProcessDefinitions: _propTypes.default.func.isRequired,
  processDefinitions: _propTypes.default.arrayOf(_propTypes.default.object),
  isLoading: _propTypes.default.bool,
  filterBy: _propTypes.default.arrayOf(_propTypes.default.object)
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "normalizeOptions", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "normalizeOptions"), _class.prototype)), _class));
;

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.app.typeaheadProcessDefinitions.isLoading,
  processDefinitions: (0, _lo.get)(state.abox.app.typeaheadProcessDefinitions.data, 'records', [])
}), {
  loadTypeaheadProcessDefinitions: _myAppsActions.loadTypeaheadProcessDefinitions
})(ProcessTypeTypeahead);

exports.default = _default;