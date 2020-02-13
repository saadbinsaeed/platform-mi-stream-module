"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _stringUtils = require("app/utils/string/string-utils");

var _attributeTypes = require("app/containers/Classifications/attributeTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Container = _styledComponents.default.div.withConfig({
  displayName: "ListItem__Container",
  componentId: "sc-158988i-0"
})(["cursor:grab;padding:8px;min-height:40px;margin-bottom:8px;user-select:none;transition:background-color 0.1s ease;width:", ";", ";p{padding:0;margin:0;line-height:40px;}a{color:", ";}"], ({
  width
}) => `${width}px`, ({
  isDragging
}) => isDragging ? 'opacity: 0.5; background: green; margin-left: -58px;' : '', ({
  theme
}) => theme.base.textColor);

const StyledButton = (0, _styledComponents.default)(_Button.default).withConfig({
  displayName: "ListItem__StyledButton",
  componentId: "sc-158988i-1"
})(["@media (max-width:", "){.Icon{margin-left:-0.5rem;}}"], ({
  theme
}) => theme.media.sm);
const StyledIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "ListItem__StyledIcon",
  componentId: "sc-158988i-2"
})(["padding-right:1rem;vertical-align:middle;height:40px;"]);
/**
 *
 */

const ListItem = props => {
  const {
    rowData,
    isDragging,
    provided,
    classId,
    canEdit,
    width
  } = props;
  const {
    name,
    type,
    f_uri
  } = rowData;
  const attributeName = (0, _stringUtils.cut)(name, 25, true);
  const fieldEncoded = encodeURIComponent(f_uri);
  return _react.default.createElement(Container, _extends({
    isDragging: isDragging,
    innerRef: provided.innerRef,
    width: width,
    key: name
  }, provided.draggableProps, provided.dragHandleProps), _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6
  }, _react.default.createElement("p", null, _react.default.createElement(StyledIcon, {
    name: "drag-vertical"
  }), !canEdit ? _react.default.createElement("span", {
    title: name
  }, attributeName) : _react.default.createElement(_reactRouterDom.Link, {
    title: name,
    to: `/classifications/${classId}/attributes/${fieldEncoded}`
  }, attributeName))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 5,
    sm: 5,
    md: 5,
    lg: 5
  }, _react.default.createElement("p", null, (0, _attributeTypes.label)(type))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1
  }, !canEdit ? null : _react.default.createElement(StyledButton, {
    icon: "delete",
    onClick: () => props.removeListItem(f_uri)
  }))));
};

ListItem.propTypes = {
  rowData: _propTypes.default.object,
  isDragging: _propTypes.default.bool,
  provided: _propTypes.default.any,
  autoFocus: _propTypes.default.bool,
  classId: _propTypes.default.number,
  removeListItem: _propTypes.default.func,
  canEdit: _propTypes.default.bool
};
var _default = ListItem;
exports.default = _default;