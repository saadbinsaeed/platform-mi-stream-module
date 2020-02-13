"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _ThingAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/ThingAvatarRenderer"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _OrganisationAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/OrganisationAvatarRenderer"));

var _CustomEntityAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/CustomEntityAvatarRenderer"));

var _ProcessAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/ProcessAvatarRenderer"));

var _TaskAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/TaskAvatarRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EntityAvatarRenderer = props => {
  switch (props.data.type || props.type) {
    case 'thing':
      return _react.default.createElement(_ThingAvatarRenderer.default, props);

    case 'person':
      return _react.default.createElement(_PersonAvatarRenderer.default, props);

    case 'organisation':
      return _react.default.createElement(_OrganisationAvatarRenderer.default, props);

    case 'custom':
      return _react.default.createElement(_CustomEntityAvatarRenderer.default, props);

    case 'process':
      return _react.default.createElement(_ProcessAvatarRenderer.default, props);

    case 'task':
      return _react.default.createElement(_TaskAvatarRenderer.default, props);

    default:
      return _react.default.createElement("span", null, props.value);
  }
};

EntityAvatarRenderer.propTypes = {
  value: _propTypes.default.any,
  data: _propTypes.default.object,
  idProperty: _propTypes.default.string,
  imageProperty: _propTypes.default.string
};

var _default = (0, _recompose.pure)(EntityAvatarRenderer);

exports.default = _default;