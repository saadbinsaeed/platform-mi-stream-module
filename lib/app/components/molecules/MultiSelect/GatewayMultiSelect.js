"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactRedux = require("react-redux");

var _multiselectActions = require("store/actions/common/multiselectActions");

var _MultiSelect = _interopRequireDefault(require("app/components/atoms/MultiSelect/MultiSelect"));

var _DataMultiSelect = _interopRequireDefault(require("./DataMultiSelect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Multi-select dropdown to select the Gateways
 */
class GatewayMultiSelect extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildOptions", (0, _memoizeOne.default)(list => list.filter(item => item).map(({
      id,
      display_name
    }) => ({
      key: id,
      value: display_name,
      label: display_name
    }))));
  }

  render() {
    return _react.default.createElement(_DataMultiSelect.default, _extends({}, this.props, {
      buildOptions: this.buildOptions
    }));
  }

}

_defineProperty(GatewayMultiSelect, "propTypes", { ..._MultiSelect.default.propTypes
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.common.multiselect.gateway.isLoading,
  records: state.common.multiselect.gateway.data
}), {
  loadOptions: _multiselectActions.loadGateways
})(GatewayMultiSelect);

exports.default = _default;