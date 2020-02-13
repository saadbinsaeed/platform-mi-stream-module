"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledDiv = _styledComponents.default.div.withConfig({
  displayName: "Courtesy__StyledDiv",
  componentId: "sc-1i8ne37-0"
})(["padding-top:50px;text-align:center;color:#888;h2,i,i:before{color:#888;}i,i:before{line-height:1 !important;font-size:100px !important;}"]);

const Courtesy = ({
  message
}) => {
  return _react.default.createElement(StyledDiv, null, _react.default.createElement(_Icon.default, {
    type: "mdi",
    name: "alert-circle-outline",
    size: "xl"
  }), _react.default.createElement("h2", null, message));
};

var _default = Courtesy;
exports.default = _default;