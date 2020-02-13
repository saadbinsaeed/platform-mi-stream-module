"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _recompose = require("recompose");

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _lo = require("app/utils/lo/lo");

var _date = require("app/utils/date/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildItems = (0, _fastMemoize.default)(comments => (comments || []).map((comment, i) => {
  let text = String((0, _lo.get)(comment, 'author.name') || '');
  const createDate = (0, _lo.get)(comment, 'createDate');

  if (createDate) {
    text += `, ${(0, _date.formatDate)(createDate)}`;
  }

  return _react.default.createElement(_ListItem.default, {
    key: i,
    title: _react.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: (0, _lo.get)(comment, 'message')
      }
    }),
    text: text
  });
}));

const Comments = ({
  comments
}) => comments && comments.length ? _react.default.createElement(_List.default, null, buildItems(comments)) : 'No comments are available.';

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['comments']), (0, _recompose.setPropTypes)({
  comments: _propTypes.default.arrayOf(_propTypes.default.object)
}))(Comments);

exports.default = _default;