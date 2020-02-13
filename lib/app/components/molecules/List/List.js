"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// LIBRARY IMPORTS
// UI IMPORTS
// STYLE IMPORTS
const ListStyle = _styledComponents.default.div.withConfig({
  displayName: "List__ListStyle",
  componentId: "vz4tzw-0"
})(["display:block;order-collapse:separate;width:100%;margin:0;padding:0;background:transparent;"]);

const List = props => {
  return _react.default.createElement(ListStyle, props, props.children);
};

List.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};
var _default = List;
exports.default = _default;