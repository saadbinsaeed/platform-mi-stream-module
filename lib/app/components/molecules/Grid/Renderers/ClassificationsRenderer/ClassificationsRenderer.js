"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lo = require("app/utils/lo/lo");

var _reactRouterDom = require("react-router-dom");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Tag = _interopRequireDefault(require("app/components/atoms/Tag/Tag"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledTag = (0, _styledComponents.default)(_Tag.default).withConfig({
  displayName: "ClassificationsRenderer__StyledTag",
  componentId: "sc-1qqyb6k-0"
})(["padding:0.1rem 0.7rem;"]);
const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "ClassificationsRenderer__StyledLink",
  componentId: "sc-1qqyb6k-1"
})(["text-decoration:none;"]);

const ClassificationsRenderer = ({
  data = {},
  valueField,
  label,
  redirectTo,
  id,
  idField
}) => {
  const clsData = data[valueField] || (0, _lo.get)(data, valueField) || [];

  if (!clsData && !clsData.length) {
    return null;
  }

  const entityId = String((0, _lo.get)(data, idField));
  const linkTo = {
    thing: `things/${entityId}/classifications`,
    person: `people/${entityId}/classifications`,
    organisation: `organisations/${entityId}/classifications`,
    custom: `custom-entities/${entityId}/classifications`
  }[redirectTo];
  return clsData.filter(cl => cl).map((cl, i) => {
    const text = (0, _lo.get)(cl, label) || (0, _lo.get)(cl, 'uri');
    const uri = (0, _lo.get)(cl, 'uri');
    const identifier = id ? String((0, _lo.get)(cl, id)) : cl.id;
    return _react.default.createElement(StyledTag, {
      key: i,
      color: cl.color
    }, _react.default.createElement(StyledLink, {
      to: {
        pathname: `/${linkTo}`,
        state: {
          classificationId: identifier
        }
      },
      title: uri
    }, text, ' '), _react.default.createElement(StyledLink, {
      to: `/classifications/${identifier}/about`
    }, _react.default.createElement(_Icon.default, {
      name: "pencil",
      size: "sm"
    })));
  });
};

ClassificationsRenderer.propTypes = {
  data: _propTypes.default.object.isRequired,
  valueField: _propTypes.default.oneOf(['classes', 'thing.classes', 'person.classes', 'organisation.classes', 'customEntity.classes']).isRequired,
  redirectTo: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom']).isRequired,
  label: _propTypes.default.string,
  id: _propTypes.default.string,
  idField: _propTypes.default.string
};
ClassificationsRenderer.defaultProps = {
  idField: 'id'
};
var _default = ClassificationsRenderer;
exports.default = _default;