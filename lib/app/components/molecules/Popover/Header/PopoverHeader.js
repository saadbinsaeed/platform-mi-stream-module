"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Bar = _interopRequireDefault(require("app/components/atoms/Bar/Bar"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _PopoverHeaderProps = _interopRequireDefault(require("./PopoverHeaderProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverHeaderStyle = (0, _styledComponents.default)(_Bar.default).withConfig({
  displayName: "PopoverHeader__PopoverHeaderStyle",
  componentId: "sc-1an6ac0-0"
})(["padding:.3rem .3rem 0 .3rem;"]);

const PopoverHeader = props => {
  const {
    headerActions
  } = props;
  return _react.default.createElement(PopoverHeaderStyle, null, _react.default.createElement(_HeaderActions.default, null, headerActions));
};

PopoverHeader.propTypes = { ..._PopoverHeaderProps.default
};
var _default = PopoverHeader;
exports.default = _default;