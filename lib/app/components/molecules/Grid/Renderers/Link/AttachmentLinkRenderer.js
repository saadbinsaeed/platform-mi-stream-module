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

const AttachmentLinkRenderer = ({
  data = {},
  value,
  redirectTo
}) => {
  if (!(0, _utils.isDefined)(value)) {
    return null;
  }

  const linkTo = {
    thing: `things/${data.id}/attachments`,
    person: `people/${data.id}/attachments`,
    organisation: `organisations/${data.id}/attachments`,
    custom: `custom-entities/${data.id}/attachments`
  }[redirectTo];
  return _react.default.createElement(_reactRouterDom.Link, {
    to: `/${linkTo}`
  }, " ", value, " ");
};

AttachmentLinkRenderer.propTypes = {
  data: _propTypes.default.object,
  value: _propTypes.default.number,
  redirectTo: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom']).isRequired
};
var _default = AttachmentLinkRenderer;
exports.default = _default;