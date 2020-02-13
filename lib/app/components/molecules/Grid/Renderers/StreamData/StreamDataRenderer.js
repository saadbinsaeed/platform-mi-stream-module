"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * Renders stream id
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const StreamDataRenderer = ({
  value,
  data,
  textOnly = false
}) => {
  const json = value || {};
  const displayExpressions = data && data.eventType.displayExpression || [];
  const filteredValues = displayExpressions.filter(filteredValue => {
    return filteredValue.value !== 'impact' && filteredValue.label !== ' Impact:';
  });
  let key = 1;
  const fields = filteredValues.map(desc => {
    const text = desc.label || json[desc.value];

    if (textOnly) {
      return text;
    }

    switch (desc.style) {
      case 'strong':
        return _react.default.createElement("strong", {
          key: String(key++)
        }, `${text} `);

      default:
        return _react.default.createElement("span", {
          key: String(key++)
        }, `${text} `);
    }
  });
  return textOnly ? fields.join('') : _react.default.createElement("div", null, " ", fields, " ");
};

StreamDataRenderer.propTypes = {
  value: _propTypes.default.object,
  data: _propTypes.default.object,
  textOnly: _propTypes.default.bool
};
StreamDataRenderer.defaultProps = {
  value: {}
};
var _default = StreamDataRenderer;
exports.default = _default;