"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RelationshipLinkRenderer = ({
  data = {},
  value,
  redirectTo
}) => {
  if (!(0, _utils.isDefined)(value)) {
    return null;
  }

  const linkTo = {
    thing: `things/${data.id}/relationships`,
    person: `people/${data.id}/relationships`,
    organisation: `organisations/${data.id}/relationships`,
    custom: `custom-entities/${data.id}/relationships`
  }[redirectTo];
  return _react.default.createElement(_reactRouterDom.Link, {
    to: `/${linkTo}`
  }, " ", value, " ");
};

RelationshipLinkRenderer.propTypes = {
  data: _propTypes.default.object,
  value: _propTypes.default.number,
  redirectTo: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom']).isRequired
};
var _default = RelationshipLinkRenderer;
exports.default = _default;