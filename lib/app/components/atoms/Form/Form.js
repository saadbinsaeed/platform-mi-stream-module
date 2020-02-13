"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const FormStyle = _styledComponents.default.form.withConfig({
  displayName: "Form__FormStyle",
  componentId: "sc-1sw3ts6-0"
})(["position:relative;display:block;"]);

const Form = ({
  children,
  loading,
  ...rest
}) => _react.default.createElement(_react.Fragment, null, loading && _react.default.createElement(_Loader.default, {
  absolute: true,
  backdrop: true
}), _react.default.createElement(FormStyle, rest, children));

Form.propTypes = {
  children: _common.ChildrenProp,
  loading: _propTypes.default.bool
};

var _default = (0, _react.memo)(Form);

exports.default = _default;