"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _CardHeader = _interopRequireDefault(require("../Card/CardHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PanelHeader = (0, _styledComponents.default)(_CardHeader.default).withConfig({
  displayName: "PanelHeader",
  componentId: "sc-135ksp7-0"
})(["min-height:80px;"]);
var _default = PanelHeader;
exports.default = _default;