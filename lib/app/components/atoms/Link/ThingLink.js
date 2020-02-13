"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ThingLink = props => {
  const {
    id,
    children,
    ...restProps
  } = props;
  return _react.default.createElement(_Link.default, _extends({
    to: `/things/${id}`
  }, restProps), children);
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['id']), (0, _recompose.setPropTypes)({
  id: _propTypes.default.number.isRequired
}))(ThingLink);

exports.default = _default;