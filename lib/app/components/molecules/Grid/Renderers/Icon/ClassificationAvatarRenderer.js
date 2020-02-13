"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _AvatarRenderer = _interopRequireDefault(require("./AvatarRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const linkGenerator = id => `/classifications/${id}`;
/**
 * Renders a entity Icon and it's name.
 */


const ClassificationAvatarRenderer = ({
  data,
  value,
  idProperty,
  nameProperty,
  imageProperty
}) => _react.default.createElement(_AvatarRenderer.default, {
  linkGenerator: linkGenerator,
  data: data,
  value: value,
  nameProperty: nameProperty,
  imageProperty: imageProperty,
  idProperty: idProperty
});

ClassificationAvatarRenderer.propTypes = {
  value: _propTypes.default.any,
  data: _propTypes.default.object,
  idProperty: _propTypes.default.string,
  imageProperty: _propTypes.default.string
};

var _default = (0, _recompose.pure)(ClassificationAvatarRenderer);

exports.default = _default;