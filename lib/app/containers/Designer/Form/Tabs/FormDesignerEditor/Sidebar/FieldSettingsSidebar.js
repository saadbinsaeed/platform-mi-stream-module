"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledGrid = (0, _styledComponents.default)(_platformUi.Grid).withConfig({
  displayName: "FieldSettingsSidebar__StyledGrid",
  componentId: "sc-1r46qqe-0"
})(["height:100%;"]);

const FieldSettingsSidebar = ({
  updateSettings,
  settingsDefinition,
  settingsValues
}) => {
  if (!settingsDefinition) {
    return _react.default.createElement(StyledGrid, {
      container: true,
      alignItems: "center",
      justify: "center"
    }, _react.default.createElement(_platformUi.Typography, {
      variant: "title"
    }, "Click on an element."));
  }

  return _react.default.createElement(StyledGrid, null, _react.default.createElement(_FormGenerator.default, {
    onChange: updateSettings,
    components: settingsDefinition,
    data: settingsValues
  }));
};

FieldSettingsSidebar.propTypes = {
  settingsDefinition: _propTypes.default.arrayOf(_propTypes.default.object),
  settingsValues: _propTypes.default.object,
  updateSettings: _propTypes.default.func.isRequired
};
var _default = FieldSettingsSidebar;
exports.default = _default;