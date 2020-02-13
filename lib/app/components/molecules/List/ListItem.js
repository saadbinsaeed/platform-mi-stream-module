"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _ItemColumn = _interopRequireDefault(require("./ItemColumn"));

var _ListItemBase = _interopRequireDefault(require("./ListItemBase"));

var _ItemRow = _interopRequireDefault(require("./ItemRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// UI IMPORTS
// STYLE IMPORTS
const SubTitle = (0, _styledComponents.default)(_Title.default).withConfig({
  displayName: "ListItem__SubTitle",
  componentId: "stjna0-0"
})(["font-size:0.8rem !important;"]);

const ListText = _styledComponents.default.div.withConfig({
  displayName: "ListItem__ListText",
  componentId: "stjna0-1"
})(["font-size:0.8em;overflow:hidden;text-overflow:ellipsis;color:", ";"], ({
  theme
}) => theme.base.textColor || '');

const ListItem = props => {
  const {
    component,
    title,
    subTitle,
    text,
    actions,
    small,
    shadow,
    raised,
    className,
    rowWrap,
    ...rest
  } = props;
  return _react.default.createElement(_ListItemBase.default, _extends({}, rest, {
    small: small,
    raised: shadow || raised,
    className: className
  }), _react.default.createElement(_ItemRow.default, {
    wrap: rowWrap
  }, component && _react.default.createElement(_ItemColumn.default, null, component), _react.default.createElement(_ItemColumn.default, {
    grow: true
  }, _react.default.createElement(_Title.default, {
    as: "h3"
  }, title), _react.default.createElement(SubTitle, {
    as: "h4"
  }, subTitle), _react.default.createElement(ListText, null, text)), actions && _react.default.createElement(_ItemColumn.default, null, actions)));
};

var _default = (0, _recompose.compose)(_recompose.pure, (0, _recompose.setPropTypes)({
  shadow: _propTypes.default.bool,
  raised: _propTypes.default.bool,
  small: _propTypes.default.bool,
  component: _propTypes.default.node,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  login: _propTypes.default.string,
  subTitle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  actions: _propTypes.default.node
}))(ListItem);

exports.default = _default;