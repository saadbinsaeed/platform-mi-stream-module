"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _WidgetHeader = _interopRequireDefault(require("app/components/atoms/WidgetHeader/WidgetHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DrawerHeader = (0, _styledComponents.default)(_WidgetHeader.default).withConfig({
  displayName: "DrawerHeader",
  componentId: "uxxpih-0"
})(["grid-area:drawerHeader;"]);
var _default = DrawerHeader;
exports.default = _default;