"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _date = require("app/utils/date/date");

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Attachment = _styledComponents.default.div.withConfig({
  displayName: "AboxAttachmentsCard__Attachment",
  componentId: "sc-1gp1byx-0"
})(["display:flex;justify-content:space-between;"]);

const FileSize = _styledComponents.default.div.withConfig({
  displayName: "AboxAttachmentsCard__FileSize",
  componentId: "sc-1gp1byx-1"
})(["position:relative;top:1.5rem;"]);

const AttachmentsLabel = _styledComponents.default.a.withConfig({
  displayName: "AboxAttachmentsCard__AttachmentsLabel",
  componentId: "sc-1gp1byx-2"
})(["display:inline-block;width:7rem;font-size:0.9rem;text-decoration:none;font-weight:500;text-transform:capitalize;color:", ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"], ({
  theme
}) => theme.base.textColor);

const chooseIcon = type => {
  if (type === 'application/octet-stream') return 'svg';
  if (type === 'application/json') return 'file-document';
  if (type.split('/')[0] === 'image') return 'image';
  if (type.split('/')[0] === 'text') return 'file';
  if (type.split('/')[0] === 'audio') return 'audiobook';
  if (type.split('/')[1] === 'pdf') return 'file-pdf';
  return 'file';
};

const formatBytes = (a, b) => {
  if (0 === a) return '0 Bytes';
  const c = 1024,
        d = b || 2,
        e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        f = Math.floor(Math.log(a) / Math.log(c));
  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`;
};

const AboxAttachmentsCard = (0, _recompose.onlyUpdateForKeys)(['attachments'])(({
  attachments
}) => {
  const emptyMessage = 'No attachment found on this activity.';
  return _react.default.createElement(_Card.default, {
    title: "Recent Attachments",
    headerActions: _react.default.createElement(_reactRouterDom.Link, {
      to: "attachments"
    }, _react.default.createElement(_Icon.default, {
      name: "window-maximize",
      size: "sm"
    })),
    description: (attachments || []).length ? attachments.slice(0, 10).map(({
      id,
      name,
      modifiedDate,
      mimeType,
      size
    }) => _react.default.createElement(Attachment, {
      key: id
    }, _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_Icon.default, {
        name: chooseIcon(mimeType)
      }),
      title: _react.default.createElement("div", {
        title: `${name} Modified on ${(0, _date.formatDate)(modifiedDate)}`
      }, _react.default.createElement(AttachmentsLabel, {
        target: "_blank",
        download: true,
        href: `/graphql/file/${id}/download?token=${_affectliSso.default.getToken()}`
      }, name))
    }), _react.default.createElement(FileSize, null, formatBytes(size)))) : emptyMessage
  });
});
var _default = AboxAttachmentsCard;
exports.default = _default;