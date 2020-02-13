"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Label = _interopRequireDefault(require("../Label/Label"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ListGroupName = _styledComponents.default.div.withConfig({
  displayName: "ListGroup__ListGroupName",
  componentId: "sc-1uvvkmi-0"
})(["display:flex;justify-content:space-between;align-items:center;padding:1rem;opacity:0.6;"]);

const ListGroupLabel = (0, _styledComponents.default)(_Label.default).withConfig({
  displayName: "ListGroup__ListGroupLabel",
  componentId: "sc-1uvvkmi-1"
})(["margin:0;"]);
/**
 * If items in a list are grouped. Use this to split by title
 */

const ListGroup = props => {
  const {
    name,
    actions
  } = props;
  return _react.default.createElement(ListGroupName, null, _react.default.createElement(ListGroupLabel, null, name), " ", _react.default.createElement(_HeaderActions.default, null, actions));
};

ListGroup.propTypes = {
  name: _propTypes.default.string,
  actions: _common.ChildrenProp
};
var _default = ListGroup;
exports.default = _default;