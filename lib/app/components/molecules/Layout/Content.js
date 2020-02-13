"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// UI IMPORTS
// STYLE IMPORTS
const ContentWrapper = _styledComponents.default.article.withConfig({
  displayName: "Content__ContentWrapper",
  componentId: "sc-14b33ge-0"
})(["grid-area:content;display:grid;grid-template-areas:\"actions\" \"main\";grid-template-rows:auto 1fr;"]);

const ContentActions = _styledComponents.default.div.withConfig({
  displayName: "Content__ContentActions",
  componentId: "sc-14b33ge-1"
})(["grid-area:actions;"]);

const ContentInner = _styledComponents.default.div.withConfig({
  displayName: "Content__ContentInner",
  componentId: "sc-14b33ge-2"
})(["padding:", ";overflow:auto;grid-area:main;"], ({
  noPadding
}) => noPadding ? 0 : '0 1rem 1rem 1rem;');

const Content = props => {
  return _react.default.createElement(ContentWrapper, _extends({}, props, {
    className: "LayoutContent"
  }), props.header && props.showToggle && _react.default.createElement(ContentActions, null, " ", props.header, " "), _react.default.createElement(ContentInner, _extends({}, props, {
    className: "ContentInner"
  }), props.children));
};

Content.propTypes = {
  children: _common.ChildrenProp,
  header: _common.ChildrenProp,
  showToggle: _propTypes.default.bool
};
var _default = Content;
exports.default = _default;