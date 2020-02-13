"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _MessageItem = _interopRequireDefault(require("app/components/organisms/Messenger/MessageItem"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FlexColumn = (0, _styledComponents.default)(_Flex.default).withConfig({
  displayName: "AboxCommentsCard__FlexColumn",
  componentId: "sc-1fayzam-0"
})(["flex-direction:column;overflow:hidden;"]);
/**
  *
**/

const AboxCommentsCard = (0, _recompose.onlyUpdateForKeys)(['comments'])(({
  comments,
  loadMessenger,
  profileId
}) => {
  const emptyMessage = 'No comment found on this activity.';
  return _react.default.createElement(_Card.default, {
    title: "Recent Comments",
    headerActions: _react.default.createElement(_Icon.default, {
      type: "af",
      name: "messenger",
      size: "sm",
      onClick: loadMessenger
    }),
    description: _react.default.createElement(FlexColumn, {
      alignItems: "flex-start"
    }, (comments || []).length ? (comments || []).slice(0, 10).map(({
      createDate,
      message,
      createdBy
    }, index) => _react.default.createElement(_MessageItem.default, {
      key: index,
      name: (0, _lo.get)(createdBy, 'name'),
      avatar: (0, _lo.get)(createdBy, 'image'),
      message: message,
      date: createDate,
      isSelfMessage: profileId === (0, _lo.get)(createdBy, 'id')
    })) : emptyMessage)
  });
});
var _default = AboxCommentsCard;
exports.default = _default;