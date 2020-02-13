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

const TabPanel = ({
  header,
  leftIcon,
  rightIcon,
  disabled,
  headerStyle,
  headerClassName,
  contentStyle,
  contentClassName,
  children
}) => _react.default.createElement(_TabView.TabPanel, {
  header: header,
  leftIcon: leftIcon,
  rightIcon: rightIcon,
  disabled: disabled,
  headerStyle: headerStyle,
  headerClassName: headerClassName,
  contentStyle: contentStyle,
  contentClassName: contentClassName
}, children);

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['header', 'children']), (0, _recompose.setPropTypes)({
  header: _propTypes.default.string,
  leftIcon: _propTypes.default.string,
  rightIcon: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  headerStyle: _propTypes.default.object,
  headerClassName: _propTypes.default.string,
  contentStyle: _propTypes.default.object,
  contentClassName: _propTypes.default.string,
  children: _propTypes.default.any
}))(TabPanel);

exports.default = _default;