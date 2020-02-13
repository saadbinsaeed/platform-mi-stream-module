"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _lo = require("app/utils/lo/lo");

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _AboxCircularProgressBar = _interopRequireDefault(require("app/components/atoms/CircularProgressBar/AboxCircularProgressBar"));

var _ProcessIcon = _interopRequireDefault(require("app/components/atoms/Icon/ProcessIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EntityAvatar = props => {
  const {
    type,
    data
  } = props;

  if (type === 'task') {
    const {
      priority,
      endDate,
      variable = {}
    } = data;
    const completion = (0, _lo.get)(variable, 'completion', 0);
    return _react.default.createElement(_AboxCircularProgressBar.default, {
      size: 40,
      percentage: completion,
      priority: priority,
      disabled: !!endDate
    });
  } else if (type === 'process') {
    const {
      endDate,
      variables = {},
      processDefinition = {}
    } = data;
    const priority = (0, _lo.get)(variables, 'priority', 3);
    const icon = (0, _lo.get)(processDefinition, 'deployedModel.modelData.icon', 'arrange-bring-to-front');
    return _react.default.createElement(_ProcessIcon.default, {
      name: icon,
      disabled: endDate,
      priority: priority,
      noMargin: true
    });
  }

  const {
    image,
    name,
    iconName,
    iconColor
  } = data;
  return _react.default.createElement(_Avatar.default, {
    src: image,
    name: name,
    alt: name,
    iconName: iconName,
    iconColor: iconColor,
    width: "40px",
    height: "40px",
    lineHeight: "40px"
  });
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['id']), (0, _recompose.setPropTypes)({
  data: _propTypes.default.object.isRequired,
  type: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom', 'task', 'process']).isRequired
}))(EntityAvatar);

exports.default = _default;