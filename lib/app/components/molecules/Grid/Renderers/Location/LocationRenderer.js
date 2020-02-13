"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _Tag = _interopRequireDefault(require("app/components/atoms/Tag/Tag"));

var _LocationValue = _interopRequireDefault(require("./LocationValue"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "LocationRenderer__StyledLink",
  componentId: "sc-1xe00tk-0"
})(["text-decoration:none;"]);
/**
 * Renders the location info inside of an ag-grid.
 *
 * @param props the Component's properties
 */

const LocationRenderer = ({
  data,
  value,
  linkTo
}) => {
  const adrs = (0, _LocationValue.default)({
    value
  });

  if (!adrs) {
    return null;
  }

  const adrsStr = String(adrs);
  const location = (0, _stringUtils.cut)(adrsStr, 25, true);
  const redirectTo = {
    thing: `things/${data.id}/about`,
    person: `people/${data.id}/about`,
    organisation: `organisations/${data.id}/about`,
    custom: `custom-entities/${data.id}/about`
  }[linkTo];
  return _react.default.createElement(StyledLink, {
    to: {
      pathname: `/${redirectTo}`,
      state: {
        scrollIntoView: true
      }
    }
  }, _react.default.createElement(_Tag.default, {
    title: adrsStr
  }, location));
};

LocationRenderer.propTypes = {
  value: _propTypes.default.object,
  linkTo: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom']).isRequired
};
var _default = LocationRenderer;
exports.default = _default;