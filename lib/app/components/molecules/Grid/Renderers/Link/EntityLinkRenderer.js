"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lo = require("app/utils/lo/lo");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EntityLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "EntityLinkRenderer__EntityLink",
  componentId: "sc-1uq4qrf-0"
})(["text-decoration:none;"]);
const EntityLinkRenderer = (0, _recompose.onlyUpdateForKeys)(['data'])(props => {
  const {
    data: {
      nodeType2
    },
    data
  } = props;
  const entity = (0, _lo.get)(data, `${nodeType2}2`) || {};
  if (!entity) return null;
  const plural = {
    person: 'people',
    thing: 'things',
    organisation: 'organisations',
    process: 'legacy'
  }[nodeType2];
  const linkTo = plural === 'legacy' ? `/${plural}/process/${entity.id}` : `/${plural}/${entity.id}/summary`;
  return _react.default.createElement(EntityLink, {
    to: linkTo
  }, entity.name);
});
var _default = EntityLinkRenderer;
exports.default = _default;