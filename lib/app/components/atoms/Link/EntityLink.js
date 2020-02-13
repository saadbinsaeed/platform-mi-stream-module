"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _ThingLink = _interopRequireDefault(require("app/components/atoms/Link/ThingLink"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _OrganisationsLink = _interopRequireDefault(require("app/components/atoms/Link/OrganisationsLink"));

var _CustomEntityLink = _interopRequireDefault(require("app/components/atoms/Link/CustomEntityLink"));

var _TaskLink = _interopRequireDefault(require("app/components/atoms/Link/TaskLink"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EntityLink = props => {
  const {
    type,
    ...restProps
  } = props;

  if (type === 'thing') {
    return _react.default.createElement(_ThingLink.default, restProps);
  } else if (type === 'person') {
    return _react.default.createElement(_PeopleLink.default, restProps);
  } else if (type === 'organisation') {
    return _react.default.createElement(_OrganisationsLink.default, restProps);
  } else if (type === 'custom') {
    return _react.default.createElement(_CustomEntityLink.default, restProps);
  } else if (type === 'task') {
    return _react.default.createElement(_TaskLink.default, restProps);
  } else if (type === 'process') {
    return _react.default.createElement(_ProcessLink.default, restProps);
  }

  return null;
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['id']), (0, _recompose.setPropTypes)({
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  type: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom', 'task', 'process']).isRequired
}))(EntityLink);

exports.default = _default;