"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _lo = require("app/utils/lo/lo");

var _Tag = _interopRequireDefault(require("app/components/atoms/Tag/Tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "LabelListRenderer__StyledLink",
  componentId: "sc-1qry71d-0"
})(["text-decoration:none;"]);

const LabelListRenderer = ({
  value,
  label,
  redirectTo,
  id
}) => {
  if (!value || !value.length) {
    return null;
  }

  if (label) {
    return value.filter(cl => cl).map((cl, i) => {
      const text = (0, _lo.get)(cl, label) || (0, _lo.get)(cl, 'uri');
      const identifier = id ? String((0, _lo.get)(cl, id)) : cl.id;
      const linkTo = {
        entity: `classifications/${identifier}/about`,
        thing: `things/${identifier}/about`,
        group: `groups/${identifier}/general`,
        organisation: `organisations/${identifier}/about`,
        custom: `custom-entities/${identifier}/about`
      }[redirectTo];
      return text && (redirectTo ? _react.default.createElement(_Tag.default, {
        key: i,
        color: cl.color
      }, _react.default.createElement(StyledLink, {
        to: `/${linkTo}`
      }, " ", text, " ")) : _react.default.createElement(_Tag.default, {
        key: i,
        color: cl.color
      }, ' ', text, ' '));
    });
  }

  return value.filter(cl => cl).map((cl, i) => {
    return _react.default.createElement(_Tag.default, {
      key: i
    }, " ", cl, " ");
  });
};

LabelListRenderer.propTypes = {
  value: _propTypes.default.any,
  label: _propTypes.default.string,
  id: _propTypes.default.string
};
var _default = LabelListRenderer;
exports.default = _default;