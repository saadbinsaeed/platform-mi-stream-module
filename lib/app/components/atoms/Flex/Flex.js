"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FlexStyle = _styledComponents.default.div.withConfig({
  displayName: "Flex__FlexStyle",
  componentId: "j8h42v-0"
})(["display:flex;align-items:", ";", ";", ";", ";", ";", ";"], ({
  alignItems
}) => alignItems || 'center', ({
  spaceBetween
}) => spaceBetween ? 'justify-content: space-between' : '', ({
  spaceAround
}) => spaceAround ? 'justify-content: space-around' : '', ({
  center
}) => center ? 'justify-content: center' : '', ({
  grow
}) => grow ? 'flex-grow: 1' : '', ({
  wrap
}) => wrap ? 'flex-wrap: wrap' : '');

const Flex = ({
  grow,
  wrap,
  center,
  spaceBetween,
  spaceAround,
  ...restProps
}) => _react.default.createElement(FlexStyle, _extends({}, restProps, {
  wrap: wrap ? 1 : 0,
  grow: grow ? 1 : 0,
  spaceBetween: spaceBetween ? 1 : 0,
  spaceAround: spaceAround ? 1 : 0,
  center: center ? 1 : 0
}));

Flex.propTypes = {
  spaceBetween: _propTypes.default.bool,
  spaceAround: _propTypes.default.bool,
  grow: _propTypes.default.bool,
  center: _propTypes.default.bool,
  wrap: _propTypes.default.bool,
  alignItems: _propTypes.default.string
};

var _default = (0, _react.memo)(Flex);

exports.default = _default;