"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Accordion = require("primereact/components/accordion/Accordion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AccordionComponent = ({
  children,
  ...props
}) => {
  return _react.default.createElement(_Accordion.Accordion, props, children);
};

AccordionComponent.propTypes = {
  multiple: _propTypes.default.bool
};
var _default = AccordionComponent;
exports.default = _default;