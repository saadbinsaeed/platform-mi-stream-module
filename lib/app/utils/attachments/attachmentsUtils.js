"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachmentLink = exports.isInvalidSize = exports.isInvalidExtension = exports.getExtension = exports.chooseIcon = exports.formatBytes = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatBytes = (a, b = 2) => {
  if (0 === Number(a)) return '0 Bytes';
  const c = 1024,
        d = b,
        e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        f = Math.floor(Math.log(a) / Math.log(c));
  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`;
};

exports.formatBytes = formatBytes;

const chooseIcon = (type = '') => {
  if (type === 'application/octet-stream') return 'svg';
  if (type === 'application/json') return 'file-document';
  if (type.split('/')[0] === 'image') return 'image';
  if (type.split('/')[0] === 'text') return 'file';
  if (type.split('/')[0] === 'audio') return 'audiobook';
  if (type.split('/')[1] === 'pdf') return 'file-pdf';
  return 'file';
};

exports.chooseIcon = chooseIcon;

const getExtension = mimeType => {
  const type = mimeType && mimeType.split('/')[1];
  return type && type.toUpperCase();
};

exports.getExtension = getExtension;

const isInvalidExtension = file => {
  const splited = file.name.split('.');

  if (splited.length > 1) {
    const ext = splited[splited.length - 1].toUpperCase();
    const invalidExt = ['ADE', 'ADP', 'BAT', 'CHM', 'CMD', 'COM', 'CPL', 'EXE', 'HTA', 'INS', 'ISP', 'JAR', 'JS', 'JSE', 'LIB', 'LNK', 'MDE', 'MSC', 'MSI', 'MSP', 'MST', 'NSH', 'PIF', 'SCR', 'SCT', 'SHB', 'SYS', 'VB', 'VBE', 'VBS', 'VXD', 'WSC', 'WSF', 'WSH'];
    return invalidExt.includes(ext);
  }

  return true;
};

exports.isInvalidExtension = isInvalidExtension;

const isInvalidSize = file => {
  return file.size > 52428800;
};

exports.isInvalidSize = isInvalidSize;

const Link = _styledComponents.default.a.withConfig({
  displayName: "attachmentsUtils__Link",
  componentId: "ei1h9g-0"
})(["text-decoration:none;"]);

const AttachmentLink = props => _react.default.createElement(Link, {
  onClick: props.onClick,
  target: "_blank",
  download: true,
  href: `/graphql/file/${props.id}/download?token=${_affectliSso.default.getToken()}`
}, props.children);

exports.AttachmentLink = AttachmentLink;
AttachmentLink.propTypes = {
  id: _propTypes.default.number.isRequired
};