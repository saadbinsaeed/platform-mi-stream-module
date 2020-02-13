"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TreeMenuChildren = _styledComponents.default.div.withConfig({
  displayName: "TreeMenuChildren",
  componentId: "sc-18p4ih3-0"
})(["display:", ";margin-left:1rem;"], ({
  show
}) => show ? 'block' : 'none');

var _default = TreeMenuChildren;
exports.default = _default;