"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TabView = require("primereact/components/tabview/TabView");

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TabView = ({
  id,
  activeIndex,
  style,
  className,
  children
}) => _react.default.createElement(_TabView.TabView, {
  id: id,
  activeIndex: activeIndex,
  style: style,
  className: className
}, children);

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['children']), (0, _recompose.setPropTypes)({
  id: _propTypes.default.string,
  activeIndex: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  children: _propTypes.default.any
}))(TabView);

exports.default = _default;