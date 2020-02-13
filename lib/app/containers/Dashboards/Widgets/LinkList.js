"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LinkList = ({
  list,
  type
}) => (list || []).map(({
  id,
  name
}) => _react.default.createElement(_ListItem.default, {
  key: id,
  title: name || 'No Name',
  actions: _react.default.createElement(_Link.default, {
    to: `/abox/${type}/${id}`
  }, _react.default.createElement(_ButtonIcon.default, {
    icon: "arrow-right",
    size: "sm"
  })),
  small: true
}));

var _default = (0, _recompose.pure)(LinkList);

exports.default = _default;