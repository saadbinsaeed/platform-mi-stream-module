"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _polished = require("polished");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Editor = _interopRequireDefault(require("app/components/atoms/Editor/Editor"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _UploadButton = _interopRequireDefault(require("app/components/molecules/UploadButton/UploadButton"));

var _Tooltip = _interopRequireDefault(require("app/components/atoms/Tooltip/Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const MessengerFooterStyle = _styledComponents.default.footer.withConfig({
  displayName: "MessengerFooter__MessengerFooterStyle",
  componentId: "sc-1ph7uco-0"
})(["grid-area:chatFoot;position:relative;background:#31343d;.ql-toolbar.ql-snow{border-color:", "37;}& .ui-editor-content{color:", " !important;border-color:", "37 !important;}& .ql-formats .ql-stroke{stroke:#b2b2b2;}& .ql-formats .ql-fill{fill:#b2b2b2;}& .ui-editor-content [data-mode=\"link\"]{background-color:#31343d;color:white;font-size:18px;}& .ui-editor-content a{color:white !important;}& .ui-editor-content [data-mode=\"link\"] input{background-color:#31343d;color:white;font-size:18px;border-color:#4f5361;}& .ui-editor-content [data-mode=\"link\"]{border:0;box-shadow:0px 0px 2px #ddd;}& .ql-snow.ql-toolbar button.ql-active,& .ql-snow.ql-toolbar button:active,& .ql-snow.ql-toolbar button:focus,& .ql-snow.ql-toolbar button:hover{color:white;}& .ql-snow.ql-toolbar button:active .ql-stroke,& .ql-snow.ql-toolbar button:focus .ql-stroke,& .ql-snow.ql-toolbar button:hover .ql-stroke,& .ql-snow.ql-toolbar button.ql-active .ql-stroke{stroke:white;}& .ql-snow.ql-toolbar button:active .ql-fill,& .ql-snow.ql-toolbar button:focus .ql-fill,& .ql-snow.ql-toolbar button.ql-active,& .ql-snow.ql-toolbar button.ql-active .ql-fill,& .ql-snow.ql-toolbar button:hover .ql-fill{fill:white;}"], ({
  theme
}) => theme.color.gray, ({
  theme
}) => theme.color.white, ({
  theme
}) => theme.color.gray);

const SendButton = _styledComponents.default.div.withConfig({
  displayName: "MessengerFooter__SendButton",
  componentId: "sc-1ph7uco-1"
})(["position:absolute;border-radius:50%;padding:0.5rem;width:50px;height:50px;right:10px;top:65px;cursor:pointer;display:flex;align-items:center;justify-content:center;background:#58b1d3;z-index:10;&:hover{background:", ";}"], ({
  theme
}) => (0, _polished.lighten)(0.1, theme.color.secondary)); // eslint-disable-next-line no-unused-expressions


_styledComponents.injectGlobal`
    .ql-editor {
        width: calc(100% - 60px);
        word-break: break-word;
    }
`;

const EditorHeader = ({
  attachMessengerFile
}) => _react.default.createElement(_Tooltip.default, null, _react.default.createElement(_Flex.default, {
  spaceBetween: true
}, _react.default.createElement("span", {
  className: "ql-formats"
}, _react.default.createElement("button", {
  alt: "Bold",
  className: "ql-bold",
  "aria-label": "Bold"
}), _react.default.createElement("button", {
  alt: "Italic",
  className: "ql-italic",
  "aria-label": "Italic"
}), _react.default.createElement("button", {
  alt: "Underline",
  className: "ql-underline",
  "aria-label": "Underline"
}), _react.default.createElement("button", {
  alt: "Strike-through",
  className: "ql-strike",
  "aria-label": "Strike"
}), _react.default.createElement("button", {
  alt: "Numbered List",
  className: "ql-list",
  value: "ordered",
  "aria-label": "Ordered list"
}), _react.default.createElement("button", {
  alt: "Bullet List",
  className: "ql-list",
  value: "bullet",
  "aria-label": "Bullet list"
}), _react.default.createElement("button", {
  alt: "Link",
  className: "ql-link",
  "aria-label": "Insert Link"
})), _react.default.createElement(_Tooltip.default, {
  x: -83
}, _react.default.createElement(_UploadButton.default, {
  multiple: true,
  alt: "Upload Attachment",
  margin: false,
  icon: "upload",
  color: "white",
  onSelect: attachMessengerFile
}))));

const filters = ['backgroundColor', 'background', 'color'];

const MessengerFooter = ({
  messageText,
  onChange,
  onSend,
  attachMessengerFile
}) => {
  const editorHeader = (0, _react.useMemo)(() => _react.default.createElement(EditorHeader, {
    attachMessengerFile: attachMessengerFile
  }), [attachMessengerFile]);
  return _react.default.createElement(MessengerFooterStyle, null, _react.default.createElement(SendButton, {
    onClick: onSend
  }, _react.default.createElement(_Icon.default, {
    name: "send",
    color: "white"
  })), _react.default.createElement(_Editor.default, {
    value: messageText,
    onTextChange: onChange,
    filters: filters,
    headerTemplate: editorHeader
  }));
};

var _default = MessengerFooter;
exports.default = _default;