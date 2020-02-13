"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

var _Image = _interopRequireDefault(require("app/components/atoms/Image/Image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NoImageStyled = _styledComponents.default.p.withConfig({
  displayName: "ProcessDiagramCard__NoImageStyled",
  componentId: "zyrw60-0"
})(["padding:0 1rem 1rem 1rem;"]);

const ImageStyled = (0, _styledComponents.default)(_Image.default).withConfig({
  displayName: "ProcessDiagramCard__ImageStyled",
  componentId: "zyrw60-1"
})(["display:block;max-width:100%;margin:0 auto;padding-bottom:6rem;filter:invert(80%);"]);

const ProcessDiagramCard = ({
  processDefinition
}) => {
  if (!processDefinition) {
    return _react.default.createElement(NoImageStyled, null, "No image found related to this process");
  }

  const src = processDefinition.snapshot && processDefinition.snapshot.bytes;
  return src ? _react.default.createElement(ImageStyled, {
    src: `data:image/png;base64,${src}`
  }) : _react.default.createElement("p", null, "No Process Diagram Available");
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['processDefinition']), (0, _recompose.setPropTypes)({
  processDefinition: _propTypes.default.object
}))(ProcessDiagramCard);

exports.default = _default;