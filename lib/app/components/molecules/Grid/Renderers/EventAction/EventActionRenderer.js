"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _EventStartProcess = _interopRequireDefault(require("app/containers/Stream/Events/EventActions/EventStartProcess"));

var _EventUpdateStatus = _interopRequireDefault(require("app/containers/Stream/Events/EventActions/EventUpdateStatus"));

var _ProcessRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Process/ProcessRenderer"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @public
 * Renders buttons to update the event status
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const EventActionRenderer = ({
  data,
  color,
  canEdit,
  refresh
}) => {
  if (!data) {
    return null;
  }

  const {
    id,
    processInstances
  } = data;
  const processDefinitions = (0, _lo.get)(data, 'eventType.processDefinitions') || [];

  const element = _react.default.createElement(_react.Fragment, null, canEdit && _react.default.createElement(_EventUpdateStatus.default, {
    eventId: id,
    status: "ACK",
    color: color,
    postAction: refresh
  }), canEdit && _react.default.createElement(_EventUpdateStatus.default, {
    eventId: id,
    status: "DIS",
    color: color,
    postAction: refresh
  }), canEdit && _react.default.createElement(_EventStartProcess.default, {
    eventId: id,
    processDefinitions: processDefinitions,
    color: color,
    postAction: refresh
  }), _react.default.createElement(_ProcessRenderer.default, {
    eventId: id,
    processInstances: processInstances,
    color: color
  }));

  return element;
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['data', 'color', 'canEdit', 'refresh']), (0, _recompose.setPropTypes)({
  data: _propTypes.default.object.isRequired,
  color: _propTypes.default.string,
  canEdit: _propTypes.default.bool,
  refresh: _propTypes.default.func
}))(EventActionRenderer);

exports.default = _default;