"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _PopupMenu = _interopRequireDefault(require("app/components/molecules/PopupMenu/PopupMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResponsiveActionsStyled = _styledComponents.default.div.withConfig({
  displayName: "ResponsiveActions__ResponsiveActionsStyled",
  componentId: "r1ep52-0"
})(["& i{margin-left:.6rem;}& .dropdownActions{display:none;}@media(max-width:", " ){& > i,& > a{display:none;}& .dropdownActions{display:inherit;}& .dropdownActions > div{text-align:right;}& .dropdownActions > div > a{width:24px;display:inline-block;}}"], ({
  theme
}) => theme.media.md);

const ResponsiveActions = props => {
  const {
    actions
  } = props;
  return _react.default.createElement(ResponsiveActionsStyled, null, actions, _react.default.createElement(_PopupMenu.default, {
    content: actions,
    className: "dropdownActions"
  }, _react.default.createElement(_Icon.default, {
    name: "dots-vertical"
  })));
};

ResponsiveActions.propTypes = {
  actions: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object])
};
var _default = ResponsiveActions;
exports.default = _default;