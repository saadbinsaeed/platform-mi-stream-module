"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CollapsedContentStyle = _styledComponents.default.div.withConfig({
  displayName: "CollapsedContent__CollapsedContentStyle",
  componentId: "v0oys0-0"
})(["transition:max-height .25s linear;max-height:", ";overflow:", ";width:100%;"], ({
  opened
}) => opened ? 'inherit' : '0px', ({
  opened
}) => opened ? 'inherit' : 'hidden');

const CollapsedContent = ({
  children,
  opened
}) => _react.default.createElement(CollapsedContentStyle, {
  opened: opened
}, children);

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['children', 'opened']), (0, _recompose.setPropTypes)({
  opened: _propTypes.default.bool,
  children: _propTypes.default.any
}))(CollapsedContent);

exports.default = _default;