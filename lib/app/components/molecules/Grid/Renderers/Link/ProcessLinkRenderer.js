"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("app/utils/utils");

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders a link to navigate to the specified Thing
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const ProcessLinkRenderer = props => {
  const {
    value,
    data,
    field
  } = props;

  if (!value) {
    return null;
  }

  if (field) {
    const id = (0, _utils.getStr)(data, field) || '';
    return _react.default.createElement(_Link.default, {
      to: `/abox/process/${id}`
    }, value);
  }

  return _react.default.createElement(_Link.default, {
    to: `/abox/process/${data.id}`
  }, value);
};

ProcessLinkRenderer.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};
var _default = ProcessLinkRenderer;
exports.default = _default;