"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _InputText = require("primereact/components/inputtext/InputText");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _ReloadCountdown = _interopRequireDefault(require("app/components/molecules/ReloadCountdown/ReloadCountdown"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate the styled for the Header
 */
const DataTableHeaderCss = _styledComponents.default.header.withConfig({
  displayName: "DataTableHeader__DataTableHeaderCss",
  componentId: "sc-1va1at5-0"
})(["display:flex;justify-content:space-between;align-items:center;padding-left:0.5rem;color:#fff;.ui-inputtext{width:100%;}> div{display:flex;}div.search{flex-grow:1;justify-content:center;@media (min-width:1024px){.ui-inputtext{width:50%;}}}div.first{text-align:left;margin-right:auto;}div.last{text-align:right;margin-left:auto;}"]);

const DataTableHeader = props => _react.default.createElement(DataTableHeaderCss, null, _react.default.createElement("div", {
  className: "first"
}, props.toggleSettings && _react.default.createElement(_ButtonIcon.default, {
  icon: "settings",
  iconColor: "white",
  size: "sm",
  onClick: props.toggleSettings
}), !props.disableExpandAll && props.expandChildren && _react.default.createElement(_ButtonIcon.default, {
  title: props.isChildrenExpanded ? 'Collapse groups' : 'Expand groups',
  icon: props.isChildrenExpanded ? 'unfold-less-horizontal' : 'unfold-more-horizontal',
  iconColor: "white",
  size: "sm",
  onClick: props.expandChildren
}), props.exportData && _react.default.createElement(_ButtonIcon.default, {
  loading: props.isDownloading,
  icon: "cloud-download",
  title: props.downloadAll ? 'Exports all records' : 'Exports up to 1000 records',
  iconColor: "white",
  size: "sm",
  onClick: props.exportData
})), _react.default.createElement("div", {
  className: "search"
}, props.onGlobalSearch && _react.default.createElement(_InputText.InputText, {
  type: "search",
  value: props.globalSearchValue,
  onChange: props.onGlobalSearch,
  placeholder: "Global Search",
  size: "50"
})), _react.default.createElement("div", {
  className: "last"
}, props.refreshAction && _react.default.createElement(_ReloadCountdown.default, {
  disableCountdown: props.disableCountdown,
  seconds: props.countdownSeconds,
  format: "minutes",
  action: props.refreshAction
}), props.showMenuButton && _react.default.createElement(_Button.default, {
  onClick: props.toggleMenu,
  icon: "menu",
  iconColor: "white",
  size: "sm"
})));

var _default = (0, _recompose.compose)(_recompose.pure, (0, _recompose.setPropTypes)({
  toggleSettings: _propTypes.default.func,
  expandChildren: _propTypes.default.func,
  toggleMenu: _propTypes.default.func,
  exportData: _propTypes.default.func,
  onGlobalSearch: _propTypes.default.func,
  refreshAction: _propTypes.default.func,
  showMenuButton: _propTypes.default.bool,
  countdownSeconds: _propTypes.default.number,
  disableCountdown: _propTypes.default.bool,
  disableExpandAll: _propTypes.default.bool,
  downloadAll: _propTypes.default.bool,
  noRefresh: _propTypes.default.bool,
  isDownloading: _propTypes.default.bool
}), (0, _recompose.defaultProps)({
  isChildrenExpanded: false,
  disableExpandAll: false
}))(DataTableHeader);

exports.default = _default;