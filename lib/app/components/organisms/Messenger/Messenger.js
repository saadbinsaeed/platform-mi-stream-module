"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactDeviceDetect = require("react-device-detect");

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _aboxActions = require("store/actions/abox/aboxActions");

var _taskActions = require("store/actions/abox/taskActions");

var _processActions = require("store/actions/abox/processActions");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _attachmentsUtils = require("app/utils/attachments/attachmentsUtils");

var _appActions = require("store/actions/app/appActions");

var _AboxTeam = _interopRequireDefault(require("app/components/ABox/Team/AboxTeam"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _MessageItem = _interopRequireDefault(require("app/components/organisms/Messenger/MessageItem"));

var _MessageBody = _interopRequireDefault(require("app/components/organisms/Messenger/MessageBody"));

var _MessengerFooter = _interopRequireDefault(require("app/components/organisms/Messenger/MessengerFooter"));

var _MessengerHeader = _interopRequireDefault(require("app/components/organisms/Messenger/MessengerHeader"));

var _PasteForm = _interopRequireDefault(require("app/components/organisms/Messenger/PasteForm"));

var _History = _interopRequireDefault(require("store/History"));

var _DropzoneWrapper = _interopRequireDefault(require("app/components/molecules/Dropzone/DropzoneWrapper"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const MessengerContainer = _styledComponents.default.div.withConfig({
  displayName: "Messenger__MessengerContainer",
  componentId: "sc-3akv8o-0"
})(["display:", ";grid-area:gMessenger;position:absolute;bottom:0;right:0;top:0;width:100%;max-height:100%;height:100%;z-index:998;@media(min-width:", "){", "}"], ({
  show
}) => show ? 'grid' : 'none', ({
  theme
}) => theme.media.sm, ({
  fullScreen
}) => !fullScreen && `position: relative; width: 400px; height: 100%;`);

const MessengerGrid = _styledComponents.default.div.withConfig({
  displayName: "Messenger__MessengerGrid",
  componentId: "sc-3akv8o-1"
})(["display:grid;grid-template-areas:\"chatSide chatHead\" \"chatSide chatBody\" \"chatSide chatFoot\";grid-template-rows:auto 1fr auto;grid-template-columns:0;width:100%;max-height:", ";height:", ";"], ({
  height
}) => height ? `${height}px` : '100vh', ({
  height
}) => height ? `${height}px` : '100vh');
/**
 * Messenger
 */


let Messenger = (_dec = (0, _decoratorUtils.debounce)(), _dec2 = (0, _decoratorUtils.debounce)(), _dec3 = (0, _decoratorUtils.debounce)(), _dec4 = (0, _decoratorUtils.memoize)(_utils.deepEquals), _dec5 = (0, _decoratorUtils.memoize)(), _dec6 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class Messenger extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "messageRef", _react.default.createRef());

    _defineProperty(this, "messageBodyRef", _react.default.createRef());

    _defineProperty(this, "reloadInterval", void 0);

    this.state = {
      message: '',
      plainMessage: '',
      showWindowPortal: false,
      sidebarOpen: false,
      showTeamModal: false,
      showPasteForm: false,
      fullScreen: false,
      pasteFile: null,
      height: window.innerHeight
    };
    this.reloadInterval = window.setInterval(this.loadMessages, 5000);
  }

  componentDidMount() {
    this.scrollToBottom();

    if (this.messageRef.current) {
      this.messageRef.current.addEventListener('paste', this.pasteImage, false);
    }

    window.dispatchEvent(new Event('resize'));
    window.addEventListener('resize', this.updateHeight);
  }

  componentDidUpdate(prevProps) {
    if (!(0, _utils.deepEquals)((0, _lo.get)(this.props, 'messages.comments') || {}, (0, _lo.get)(prevProps, 'messages.comments') || {})) {
      this.scrollToBottom();
    }

    if (!this.props.messages && prevProps.messages !== this.props.messages) {
      this.setState(state => ({
        showTeamModal: false
      }), this.reloadDetails);
    }
  }

  componentUnmount() {
    if (this.messageRef.current) {
      this.messageRef.current.removeEventListener('paste', this.pasteImage);
    }

    window.dispatchEvent(new Event('resize'));
    window.removeEventListener('resize', this.updateHeight);
    window.clearInterval(this.reloadInterval);
  }

  updateHeight() {
    if (this.state.height !== window.innerHeight) {
      this.setState({
        height: window.innerHeight
      });
    }
  }

  pasteImage(event) {
    const items = event.clipboardData && event.clipboardData.items;
    const size = items && items.length || 0;

    for (let i = 0; i < size; ++i) {
      const item = items[i];

      if (item.type.startsWith('image')) {
        const pasteFile = item.getAsFile();
        this.setState({
          showPasteForm: true,
          pasteFile
        });
      }
    }
  }

  toggleFullscreen() {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  }

  toggleSidebar() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  toggleTeamModal() {
    this.setState({
      showTeamModal: !this.state.showTeamModal
    });
  }

  goTo(to) {
    const goTo = () => _History.default.push(to);

    if (_reactDeviceDetect.isBrowser) {
      this.setState({
        fullScreen: false
      }, goTo);
    } else {
      goTo();
      this.props.toggleMessenger();
    }
  }

  goToAttachments() {
    this.goTo(`/abox/${this.props.selection.type}/${this.props.selection.id}/attachments`);
  }

  goToSummary() {
    this.goTo(`/abox/${this.props.selection.type}/${this.props.selection.id}`);
  }

  closePasteForm() {
    this.setState({
      showPasteForm: false,
      pasteFile: null
    });
  }

  scrollToBottom() {
    const messageList = this.messageBodyRef && this.messageBodyRef.current;

    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }

  messageChange(event) {
    const {
      htmlValue,
      textValue
    } = event;
    this.setState({
      message: htmlValue,
      plainMessage: textValue.trim()
    });
  }

  sendMessage() {
    const {
      id,
      type
    } = this.props.selection;
    const {
      message,
      plainMessage
    } = this.state;
    plainMessage && this.props.saveMessage(id, type, message, plainMessage);
    this.setState({
      message: '',
      plainMessage: ''
    });
  }

  reloadDetails() {
    const {
      selection,
      showMessenger
    } = this.props;
    const {
      id,
      type
    } = selection || {};

    if (id && type) {
      showMessenger && this.props.loadMessenger(id, type);
      type === 'process' ? this.props.outdateProcessDetails(id) : this.props.outdateTaskDetails(id);
    }
  }

  reloadAttachments() {
    const {
      selection,
      showMessenger
    } = this.props;
    const {
      id,
      type
    } = selection || {};

    if (id && type) {
      showMessenger && this.props.loadMessenger(id, type);
      this.props.outdateAboxAttachments(id, type);
    }
  }

  loadMessages() {
    const {
      selection,
      showMessenger
    } = this.props;
    const {
      id,
      type
    } = selection || {};

    if (showMessenger && id && type) {
      this.props.loadMessenger(id, type);
    }
  }

  attachMessengerFile(files) {
    if (files instanceof File) {
      return this.uploadFile(files).then(this.reloadAttachments);
    }

    const fileArray = Array.isArray(files) ? files : Object.values(files);
    return Promise.all(fileArray.map(file => this.uploadFile(file))).finally(this.reloadAttachments);
  }

  uploadFile(file) {
    // extra check for Flow
    if (!(file instanceof File)) {
      return Promise.resolve(false);
    }

    const {
      attachMessengerFile,
      selection
    } = this.props;

    if ((0, _attachmentsUtils.isInvalidExtension)(file)) {
      this.props.showToastr({
        severity: 'warn',
        detail: 'Invalid file type Please upload a valid file!'
      });
    } else if ((0, _attachmentsUtils.isInvalidSize)(file)) {
      this.props.showToastr({
        severity: 'warn',
        detail: 'Maximum file size limit which is 50MB exceeded!'
      });
    } else {
      return attachMessengerFile(selection.id, selection.type, file);
    }

    return Promise.resolve(false);
  }

  normalizeMessages(userId, messages) {
    return [...(messages || [])].sort((a, b) => {
      return a.id === b.id ? 0 : Number(a.id) > Number(b.id) ? 1 : -1;
    }).map(message => ({
      isSelfMessage: userId === (0, _lo.get)(message, 'createdBy.id'),
      avatar: (0, _lo.get)(message, 'createdBy.image'),
      name: (0, _lo.get)(message, 'createdBy.name'),
      message: (0, _lo.get)(message, 'message'),
      createDate: (0, _lo.get)(message, 'createDate')
    }));
  }

  buildMessages(profileId, messages) {
    return this.normalizeMessages(profileId, messages).map(({
      isSelfMessage,
      createDate,
      message,
      name,
      avatar
    }, index) => _react.default.createElement(_MessageItem.default, {
      key: index,
      name: name,
      avatar: avatar,
      message: message,
      date: createDate,
      isSelfMessage: isSelfMessage
    }));
  }

  buildMessengerFooter(message) {
    return _react.default.createElement(_MessengerFooter.default, {
      attachMessengerFile: this.attachMessengerFile,
      messageText: message,
      onChange: this.messageChange,
      onSend: this.sendMessage
    });
  }

  renderChatWindow(props, state) {
    const {
      selection,
      messages,
      showMessenger,
      toggleMessenger,
      profile
    } = props;
    const {
      id,
      name,
      comments,
      owner,
      createdBy,
      assignee,
      teamMembers
    } = messages || {};
    const {
      message,
      showTeamModal,
      showPasteForm,
      pasteFile,
      fullScreen,
      height
    } = state;
    return this.props.messages && _react.default.createElement(MessengerContainer, {
      fullScreen: fullScreen,
      show: showMessenger,
      innerRef: this.messageRef
    }, _react.default.createElement(_DropzoneWrapper.default, {
      onDropRejected: this.attachMessengerFile,
      onDropAccepted: this.attachMessengerFile
    }, _react.default.createElement(MessengerGrid, {
      height: height
    }, _react.default.createElement(_MessengerHeader.default, {
      openTeamMembers: this.toggleTeamModal,
      goToAttachments: this.goToAttachments,
      goToSummary: this.goToSummary,
      title: name || 'No Name',
      subTitle: `#${id}`,
      onClose: toggleMessenger,
      toggleSidebar: this.toggleSidebar,
      toggleFullscreen: this.toggleFullscreen,
      fullScreen: fullScreen
    }), _react.default.createElement(_MessageBody.default, {
      innerRef: this.messageBodyRef
    }, this.buildMessages(profile.id, comments)), this.buildMessengerFooter(message), showTeamModal && _react.default.createElement(_Modal.default, {
      onToggle: this.toggleTeamModal,
      title: "Team",
      open: showTeamModal,
      disableBack: true
    }, _react.default.createElement(_AboxTeam.default, {
      details: {
        assignee,
        owner,
        createdBy,
        teamMembers,
        id
      },
      type: selection.type,
      reloadDetails: this.reloadDetails
    })), showPasteForm && _react.default.createElement(_Modal.default, {
      onToggle: this.closePasteForm,
      title: "Image form",
      open: showPasteForm,
      disableBack: true
    }, _react.default.createElement(_PasteForm.default, {
      close: this.closePasteForm,
      attachMessengerFile: this.attachMessengerFile,
      file: pasteFile
    })))));
  }

  render() {
    return _react.default.createElement(_react.Fragment, null, this.renderChatWindow(this.props, this.state));
  }

}, _defineProperty(_class2, "propTypes", {
  outdateProcessDetails: _propTypes.default.func.isRequired,
  outdateTaskDetails: _propTypes.default.func.isRequired,
  attachMessengerFile: _propTypes.default.func.isRequired,
  outdateAboxAttachments: _propTypes.default.func.isRequired,
  messages: _propTypes.default.shape({
    id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    name: _propTypes.default.string,
    comments: _propTypes.default.arrayOf(_propTypes.default.shape({
      id: _propTypes.default.number.isRequired,
      createDate: _propTypes.default.string.isRequired,
      createdBy: _propTypes.default.shape({
        id: _propTypes.default.number.isRequired,
        image: _propTypes.default.string,
        login: _propTypes.default.string.isRequired,
        name: _propTypes.default.string.isRequired
      }),
      message: _propTypes.default.shape({
        message: _propTypes.default.string,
        plainMessage: _propTypes.default.string
      })
    }))
  })
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "updateHeight", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "updateHeight"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pasteImage", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "pasteImage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleFullscreen", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleFullscreen"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleSidebar", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleSidebar"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleTeamModal", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleTeamModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "goToAttachments", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "goToAttachments"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "goToSummary", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "goToSummary"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closePasteForm", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "closePasteForm"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "scrollToBottom", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "scrollToBottom"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "messageChange", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "messageChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "sendMessage", [_decoratorUtils.bind, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "sendMessage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "reloadDetails", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "reloadDetails"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "reloadAttachments", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "reloadAttachments"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadMessages", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "loadMessages"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "attachMessengerFile", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "attachMessengerFile"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildMessages", [_decoratorUtils.bind, _dec4], Object.getOwnPropertyDescriptor(_class.prototype, "buildMessages"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildMessengerFooter", [_decoratorUtils.bind, _dec5], Object.getOwnPropertyDescriptor(_class.prototype, "buildMessengerFooter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "renderChatWindow", [_decoratorUtils.bind, _dec6], Object.getOwnPropertyDescriptor(_class.prototype, "renderChatWindow"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  profile: state.user.profile,
  showMessenger: state.chat.showMessenger,
  messages: state.chat.messages,
  selection: state.chat.selection,
  isTask: state.chat.selection.type === 'task'
}), {
  toggleMessenger: _messengerActions.toggleMessenger,
  saveMessage: _messengerActions.saveMessage,
  loadMessenger: _messengerActions.loadMessenger,
  attachMessengerFile: _messengerActions.attachMessengerFile,
  showToastr: _appActions.showToastr,
  outdateProcessDetails: _processActions.outdateProcessDetails,
  outdateTaskDetails: _taskActions.outdateTaskDetails,
  outdateAboxAttachments: _aboxActions.outdateAboxAttachments
})(Messenger);

exports.default = _default;