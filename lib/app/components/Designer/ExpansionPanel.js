"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ExpansionPanelStyled = (0, _styledComponents.default)(_platformUi.ExpansionPanel).withConfig({
  displayName: "ExpansionPanel__ExpansionPanelStyled",
  componentId: "sc-18fwiwi-0"
})(["max-height:inherit;width:100%;margin:.5rem 0 !important;"]);
const ExpansionPanelDetailsColumn = (0, _styledComponents.default)(_platformUi.ExpansionPanelDetails).withConfig({
  displayName: "ExpansionPanel__ExpansionPanelDetailsColumn",
  componentId: "sc-18fwiwi-1"
})(["flex-direction:column;"]);

const ExpansionPanelHOC = props => {
  const [expanded, toggleExpanded] = (0, _react.useState)(props.expanded);
  const onChange = (0, _react.useCallback)(event => {
    toggleExpanded(!expanded);
  }, [expanded]);
  return _react.default.createElement(ExpansionPanelStyled, _extends({}, props, {
    expanded: expanded,
    onChange: onChange
  }));
};

const ExpansionPanel = ({
  expanded,
  header,
  children
}) => _react.default.createElement(ExpansionPanelHOC, {
  expanded: expanded
}, _react.default.createElement(_platformUi.ExpansionPanelSummary, {
  expandIcon: _react.default.createElement(_platformUi.MdiIcon, {
    name: "chevron-down"
  })
}, _react.default.createElement(_platformUi.Typography, {
  variant: "title"
}, header)), _react.default.createElement(ExpansionPanelDetailsColumn, null, children));

var _default = ExpansionPanel;
exports.default = _default;