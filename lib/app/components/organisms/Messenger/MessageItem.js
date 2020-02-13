"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _Tooltip = _interopRequireDefault(require("app/components/atoms/Tooltip/Tooltip"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _utils = require("app/utils/utils");

var _attachmentsUtils = require("app/utils/attachments/attachmentsUtils");

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const ListItemStyled = (0, _styledComponents.default)(_ListItem.default).withConfig({
  displayName: "MessageItem__ListItemStyled",
  componentId: "sc-5blp9y-0"
})(["margin:0 auto;padding:0;background:", ";border-radius:6px;"], ({
  isSelfMessage,
  theme
}) => isSelfMessage ? '#2762a5' : '#282b32');

const MessageItemStyle = _styledComponents.default.div.withConfig({
  displayName: "MessageItem__MessageItemStyle",
  componentId: "sc-5blp9y-1"
})(["display:flex;", ";clear:both;max-width:95%;"], ({
  isSelfMessage
}) => isSelfMessage ? 'float: right; margin: 0.3rem' : 'float: left; margin: 0.3rem 0.3rem 0.3rem 0rem');

const MessageContent = _styledComponents.default.div.withConfig({
  displayName: "MessageItem__MessageContent",
  componentId: "sc-5blp9y-2"
})(["font-size:.9em;display:block;word-break:break-word;color:white;p{margin:0;}max-width:100%;"]);

const MessageText = _styledComponents.default.div.withConfig({
  displayName: "MessageItem__MessageText",
  componentId: "sc-5blp9y-3"
})(["background:", ";border-radius:6px;", ""], ({
  isSelfMessage,
  theme
}) => isSelfMessage ? '#2762a5' : '#282b32', ({
  padding
}) => padding && `padding: ${padding};`);

const AvatarWrap = (0, _styledComponents.default)(_Tooltip.default).withConfig({
  displayName: "MessageItem__AvatarWrap",
  componentId: "sc-5blp9y-4"
})(["margin:0 .5rem;"]);

const MessageDate = _styledComponents.default.p.withConfig({
  displayName: "MessageItem__MessageDate",
  componentId: "sc-5blp9y-5"
})(["font-size:.7rem;opacity:.5;text-align:", ";margin:0;padding:.1rem .5rem;"], ({
  isSelfMessage,
  theme
}) => isSelfMessage ? 'right' : 'left');

const AttachmentImage = _styledComponents.default.img.withConfig({
  displayName: "MessageItem__AttachmentImage",
  componentId: "sc-5blp9y-6"
})(["max-width:100%;"]);

const AttachmentText = _styledComponents.default.span.withConfig({
  displayName: "MessageItem__AttachmentText",
  componentId: "sc-5blp9y-7"
})(["", ""], ({
  deleted
}) => deleted ? 'text-decoration: line-through;' : '');

const AttachmentIcon = (0, _react.memo)(props => {
  const {
    mimeType,
    id,
    deleted
  } = props.message;
  const iconName = (0, _attachmentsUtils.chooseIcon)(mimeType);
  return deleted ? _react.default.createElement(_Icon.default, {
    name: iconName,
    size: "lg"
  }) : _react.default.createElement(_attachmentsUtils.AttachmentLink, {
    id: id
  }, _react.default.createElement(_Icon.default, {
    name: iconName,
    size: "lg"
  }));
});

const MessageItem = ({
  isSelfMessage,
  message,
  name,
  avatar,
  date
}) => {
  let messageBody = _react.default.createElement(MessageText, {
    isSelfMessage: isSelfMessage,
    padding: ".4rem .5rem"
  }, _react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: `${(0, _utils.getStr)(message, 'message') || ''}`
    }
  }));

  const {
    type,
    id,
    name: filename,
    mimeType,
    size,
    deleted
  } = message;

  if (type === 'attachment') {
    messageBody = !deleted && (mimeType || '').startsWith('image') ? _react.default.createElement(MessageText, {
      isSelfMessage: isSelfMessage,
      padding: ".4rem .5rem"
    }, _react.default.createElement(AttachmentImage, {
      alt: filename,
      src: `/graphql/file/${id}`
    }), _react.default.createElement(_attachmentsUtils.AttachmentLink, {
      id: id
    }, _react.default.createElement(_Flex.default, {
      spaceBetween: true
    }, _react.default.createElement("span", null, filename, _react.default.createElement("br", null), _react.default.createElement("small", null, (0, _attachmentsUtils.getExtension)(mimeType), " - ", (0, _attachmentsUtils.formatBytes)(size))), _react.default.createElement(_Icon.default, {
      name: "download"
    })))) : _react.default.createElement(ListItemStyled, {
      isSelfMessage: isSelfMessage,
      component: _react.default.createElement(AttachmentIcon, {
        message: message
      }),
      title: deleted ? _react.default.createElement(AttachmentText, {
        deleted: deleted
      }, filename) : _react.default.createElement(_attachmentsUtils.AttachmentLink, {
        id: id
      }, filename),
      subTitle: _react.default.createElement(AttachmentText, {
        deleted: deleted
      }, (0, _attachmentsUtils.getExtension)(mimeType), " - ", (0, _attachmentsUtils.formatBytes)(size)),
      raised: true,
      rowWrap: true
    });
  }

  return _react.default.createElement(MessageItemStyle, {
    isSelfMessage: isSelfMessage
  }, !isSelfMessage && _react.default.createElement(AvatarWrap, {
    alt: name,
    x: 10,
    y: -50
  }, _react.default.createElement("span", {
    alt: name
  }, _react.default.createElement(_Avatar.default, {
    src: avatar,
    name: name,
    size: "lg"
  }))), _react.default.createElement(MessageContent, null, messageBody, _react.default.createElement(MessageDate, {
    isSelfMessage: isSelfMessage
  }, (0, _moment.default)(date).format('DD.MM HH:mm'))));
};

var _default = MessageItem;
exports.default = _default;