"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _lo = require("app/utils/lo/lo");

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AvatarContainer = _styledComponents.default.div.withConfig({
  displayName: "AvatarRenderer__AvatarContainer",
  componentId: "sy3cg7-0"
})(["white-space:nowrap;display:flex;flex-direction:row;align-content:center;align-items:center;"]);

const CustomLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "AvatarRenderer__CustomLink",
  componentId: "sy3cg7-1"
})(["margin-left:10px;&:first-child{margin-left:0;}"]);
/**
 * Renders a entity Icon and it's name.
 */

const AvatarRenderer = ({
  data,
  value,
  idProperty,
  imageProperty,
  linkGenerator,
  nameProperty,
  showAvatar = true
}) => {
  if (!data || !value || !linkGenerator) {
    return null;
  }

  const id = (0, _lo.get)(data, idProperty || 'id');
  const name = (0, _lo.get)(data, nameProperty || 'name');
  const image = (0, _lo.get)(data, imageProperty || 'image');
  const displayName = (0, _stringUtils.cut)(value, 25, true);
  return _react.default.createElement(AvatarContainer, null, showAvatar && _react.default.createElement(_Avatar.default, {
    size: "lg",
    src: image,
    name: name
  }), id ? _react.default.createElement(CustomLink, {
    to: linkGenerator(id),
    title: value
  }, displayName) : displayName);
};

AvatarRenderer.propTypes = {
  value: _propTypes.default.any,
  linkGenerator: _propTypes.default.func.isRequired,
  data: _propTypes.default.object,
  idProperty: _propTypes.default.string,
  imageProperty: _propTypes.default.string
};

var _default = (0, _recompose.pure)(AvatarRenderer);

exports.default = _default;