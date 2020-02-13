"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DrawerDetail = ({
  info
}) => _react.default.createElement(_List.default, null, [] || info.map(item => _react.default.createElement(_ListItem.default, {
  title: item.id
})));

var _default = (0, _recompose.compose)(_recompose.pure, (0, _recompose.setPropTypes)({
  info: _propTypes.default.array.isRequired
}))(DrawerDetail);

exports.default = _default;