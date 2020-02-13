"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _AvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/AvatarRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const linkGenerator = id => `/custom-entities/${id}`;

const CustomEntityAvatarRenderer = props => {
  return _react.default.createElement(_AvatarRenderer.default, _extends({}, props, {
    linkGenerator: linkGenerator
  }));
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['value']), (0, _recompose.setPropTypes)({
  value: _propTypes.default.string,
  data: _propTypes.default.object,
  idProperty: _propTypes.default.string,
  imageProperty: _propTypes.default.string,
  nameProperty: _propTypes.default.string
}))(CustomEntityAvatarRenderer);

exports.default = _default;