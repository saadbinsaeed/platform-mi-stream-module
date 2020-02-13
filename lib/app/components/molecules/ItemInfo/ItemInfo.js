"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Icon = _styledComponents.default.div.withConfig({
  displayName: "ItemInfo__Icon",
  componentId: "c8uw40-0"
})(["margin-right:0.6rem;"]);

const Subtitle = _styledComponents.default.div.withConfig({
  displayName: "ItemInfo__Subtitle",
  componentId: "c8uw40-1"
})(["font-size:0.8rem;"]);
/**
 * Renders the image of an avatar.
 */


const ItemInfo = props => {
  const {
    icon,
    title,
    subtitle
  } = props;
  return _react.default.createElement(_Flex.default, null, _react.default.createElement(Icon, null, icon), _react.default.createElement(_Text.default, null, _react.default.createElement(_Title.default, null, title), _react.default.createElement(Subtitle, null, subtitle)));
};

var _default = ItemInfo;
exports.default = _default;