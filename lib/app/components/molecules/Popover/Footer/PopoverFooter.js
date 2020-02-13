"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Bar = _interopRequireDefault(require("app/components/atoms/Bar/Bar"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _PopoverFooterProps = _interopRequireDefault(require("./PopoverFooterProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverFooterStyle = (0, _styledComponents.default)(_Bar.default).withConfig({
  displayName: "PopoverFooter__PopoverFooterStyle",
  componentId: "sc-1fqt76d-0"
})(["padding:.3rem;"]);

const PopoverFooter = props => {
  const {
    footer
  } = props;
  return _react.default.createElement(PopoverFooterStyle, null, _react.default.createElement(_HeaderActions.default, null, footer));
};

PopoverFooter.propTypes = { ..._PopoverFooterProps.default
};
var _default = PopoverFooter;
exports.default = _default;