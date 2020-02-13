"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Bar = _interopRequireDefault(require("app/components/atoms/Bar/Bar"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ActionBarStyle = (0, _styledComponents.default)(_Bar.default).withConfig({
  displayName: "ActionBar__ActionBarStyle",
  componentId: "sc-1ofrzv5-0"
})(["grid-area:pActions;font-size:inherit;align-items:", ";", ";", ";", ";"], ({
  alignItems
}) => alignItems || 'center', ({
  theme,
  marginBottom
}) => marginBottom ? `margin-bottom: ${theme.base.padding}` : '', ({
  theme,
  borderBottom
}) => borderBottom ? `border-bottom: 1px solid ${theme.base.borderColor}` : '', ({
  wrap
}) => wrap ? 'flex-wrap: wrap' : '');

const ActionBarColumn = _styledComponents.default.div.withConfig({
  displayName: "ActionBar__ActionBarColumn",
  componentId: "sc-1ofrzv5-1"
})(["display:flex;", ";"], ({
  leftStretch
}) => leftStretch ? 'flex-grow: 1' : '');

const ActionBarLeft = (0, _styledComponents.default)(ActionBarColumn).withConfig({
  displayName: "ActionBar__ActionBarLeft",
  componentId: "sc-1ofrzv5-2"
})(["flex-grow:1;justify-content:flex-start;text-align:left;padding-right:.5rem;"]);
const ActionBarCenter = (0, _styledComponents.default)(ActionBarColumn).withConfig({
  displayName: "ActionBar__ActionBarCenter",
  componentId: "sc-1ofrzv5-3"
})(["flex-grow:1;justify-content:center;text-align:center;"]);
const ActionBarRight = (0, _styledComponents.default)(ActionBarColumn).withConfig({
  displayName: "ActionBar__ActionBarRight",
  componentId: "sc-1ofrzv5-4"
})(["", ";justify-content:flex-end;text-align:right;margin-left:0;"], ({
  rightShrink
}) => rightShrink ? 'flex-grow: 0' : 'flex-grow: 1');

const ActionBar = props => {
  const {
    alignItems,
    wrap,
    left,
    center,
    right,
    marginBottom,
    scrollable,
    leftStretch,
    rightShrink,
    borderBottom
  } = props;
  return _react.default.createElement(ActionBarStyle, {
    wrap: wrap,
    alignItems: alignItems,
    marginBottom: marginBottom,
    borderBottom: borderBottom,
    scrollable: scrollable
  }, left && _react.default.createElement(ActionBarLeft, {
    leftStretch: leftStretch
  }, left), center && _react.default.createElement(ActionBarCenter, null, center), right && _react.default.createElement(ActionBarRight, {
    rightShrink: rightShrink
  }, right));
};

ActionBar.propTypes = {
  marginBottom: _propTypes.default.bool,
  borderBottom: _propTypes.default.bool,
  rightShrink: _propTypes.default.bool,
  scrollable: _propTypes.default.bool,
  left: _common.ChildrenProp,
  center: _common.ChildrenProp,
  right: _common.ChildrenProp
};
ActionBar.defaultProps = {
  borderBottom: true
};
var _default = ActionBar;
exports.default = _default;