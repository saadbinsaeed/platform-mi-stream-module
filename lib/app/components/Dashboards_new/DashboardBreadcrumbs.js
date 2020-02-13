"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledDiv = _styledComponents.default.div.withConfig({
  displayName: "DashboardBreadcrumbs__StyledDiv",
  componentId: "sc-1un5v9i-0"
})(["border-top:1px solid transparent;border-bottom:1px solid rgba(255,255,255,0.24);align-content:center;align-items:center;color:rgba(255,255,255,0.6);letter-spacing:0.4px;line-height:18px;font-size:12px;font-weight:500;padding:6px 0.4rem;"]);

const DashboardBreadcrumbs = ({
  data
}) => {
  const displayBreadcrumbs = data.length === 0 ? 'All' : data.map(option => `${option.name}: ${option.selectedOption.name}`).join(' / ');
  return _react.default.createElement(StyledDiv, null, displayBreadcrumbs);
};

var _default = DashboardBreadcrumbs;
exports.default = _default;