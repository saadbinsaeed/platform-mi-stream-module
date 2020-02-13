"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _recompose = require("recompose");

var _WidgetHeader = _interopRequireDefault(require("app/components/atoms/WidgetHeader/WidgetHeader"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _common = require("app/utils/propTypes/common");

var _ScrollMinStyle = _interopRequireDefault(require("app/utils/styles/ScrollMinStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const WidgetBase = _styledComponents.default.div.withConfig({
  displayName: "Widget__WidgetBase",
  componentId: "sc-12bk1j0-0"
})(["position:relative;border-radius:.2rem;margin:0 0 1rem 0;min-height:260px;background:", ";box-shadow:", ";"], ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.shadow.z1);

const Content = _styledComponents.default.div.withConfig({
  displayName: "Widget__Content",
  componentId: "sc-12bk1j0-1"
})(["font-size:0.8rem;padding:0 1rem;overflow:auto;max-height:300px;", ";"], _ScrollMinStyle.default);

const Children = _styledComponents.default.div.withConfig({
  displayName: "Widget__Children",
  componentId: "sc-12bk1j0-2"
})(["", ";"], _ScrollMinStyle.default);

const SubTitle = (0, _styledComponents.default)(_Title.default).withConfig({
  displayName: "Widget__SubTitle",
  componentId: "sc-12bk1j0-3"
})(["margin-left:.5rem !important;font-size:.7rem !important;color:", " !important;opacity:0.5;"], ({
  theme
}) => theme.base.textColor || 'inherit');

const Widget = ({
  title,
  subTitle,
  content,
  children,
  loading,
  url
}) => _react.default.createElement(WidgetBase, null, loading ? _react.default.createElement(_Loader.default, {
  absolute: true
}) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_WidgetHeader.default, null, _react.default.createElement(_Title.default, {
  as: "h3"
}, title || 'No Name'), _react.default.createElement(SubTitle, {
  as: "h4"
}, subTitle), url && _react.default.createElement(_reactRouterDom.Link, {
  to: url
}, _react.default.createElement(_ButtonIcon.default, {
  icon: "arrow-right-bold",
  size: "sm"
}))), content && _react.default.createElement(Content, null, content), children && _react.default.createElement(Children, null, children)));

Widget.propTypes = {
  title: _propTypes.default.string,
  subTitle: _propTypes.default.string,
  content: _common.ChildrenProp,
  loading: _propTypes.default.bool,
  url: _propTypes.default.string
};

var _default = (0, _recompose.pure)(Widget);

exports.default = _default;