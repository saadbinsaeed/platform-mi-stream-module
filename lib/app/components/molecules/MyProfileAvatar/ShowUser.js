"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _reactAvatarEditor = _interopRequireDefault(require("react-avatar-editor"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _userManagementAction = require("store/actions/admin/userManagementAction");

var _usersActions = require("store/actions/admin/usersActions");

var _appActions = require("store/actions/app/appActions");

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _event = _interopRequireDefault(require("app/utils/layout/event"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _lo = require("app/utils/lo/lo");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AvatarEditorStyled = (0, _styledComponents.default)(_reactAvatarEditor.default).withConfig({
  displayName: "ShowUser__AvatarEditorStyled",
  componentId: "sc-1p2r7bf-0"
})(["background-color:", ";border-radius:100rem;"], ({
  theme
}) => theme.color.white);
const center = (0, _styledComponents.css)(["text-align:center;display:block;font-size:4rem;"]);

const AvatarWrapper = _styledComponents.default.div.withConfig({
  displayName: "ShowUser__AvatarWrapper",
  componentId: "sc-1p2r7bf-1"
})(["", ""], center);

const ButtonStyled = (0, _styledComponents.default)(_Button.default).withConfig({
  displayName: "ShowUser__ButtonStyled",
  componentId: "sc-1p2r7bf-2"
})(["padding:.3rem;"]);

const EditorWapper = _styledComponents.default.div.withConfig({
  displayName: "ShowUser__EditorWapper",
  componentId: "sc-1p2r7bf-3"
})(["", ";font-size:1rem;max-width:400px;margin:0 auto 1rem auto;& > div > div > *{margin:0 .7rem;}"], center);

const AvatarStyled = (0, _styledComponents.default)(_Avatar.default).withConfig({
  displayName: "ShowUser__AvatarStyled",
  componentId: "sc-1p2r7bf-4"
})(["cursor:pointer;margin:auto;"]);

const HiddenInput = _styledComponents.default.input.withConfig({
  displayName: "ShowUser__HiddenInput",
  componentId: "sc-1p2r7bf-5"
})(["display:none;"]);

const styleColor = [255, 255, 255, 1];
const borderStyle = 0;

const defaultState = key => ({
  showAvatarEditor: false,
  scale: 1,
  rotate: 0,
  inputKey: key + 1
});

const FlexStyled = (0, _styledComponents.default)(_Flex.default).withConfig({
  displayName: "ShowUser__FlexStyled",
  componentId: "sc-1p2r7bf-6"
})(["min-height:1.9rem;"]);
/**
 * Renders the view to show user profile.
 */

class ShowUser extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "editorRef", _react.default.createRef());

    _defineProperty(this, "inputRef", _react.default.createRef());

    _defineProperty(this, "state", defaultState(0));

    _defineProperty(this, "onClick", event => {
      if (!this.props.isLoading && this.inputRef.current) {
        this.inputRef.current.click();
      }
    });

    _defineProperty(this, "onImageSelect", event => {
      event.preventDefault();
      event.stopPropagation();
      const file = (0, _lo.get)(this, 'inputRef.current.files[0]');

      if (file && !this.props.isLoading) {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          this.setState({
            showAvatarEditor: true
          });
        } else {
          this.props.showToastr({
            severity: 'error',
            detail: 'Incorrect format. Accepted formats are png or jpg.'
          });
        }
      }
    });

    _defineProperty(this, "cancelUpload", event => this.setState(defaultState(this.state.inputKey)));

    _defineProperty(this, "uploadCroppedImage", event => {
      if (this.editorRef.current) {
        const canvas = this.editorRef.current.getImage();
        const context = canvas.getContext('2d');
        context.globalCompositeOperation = 'destination-over';
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (canvas) {
          canvas.toBlob(blob => {
            const image = new File([blob], 'profile.jpg', {
              type: 'image/jpeg'
            });
            this.props.uploadProfileImage(image).then(() => {
              this.props.loadUserProfile();
              this.setState(defaultState(this.state.inputKey));
            });
          }, 'image/jpeg', 1);
        }
      }

      this.setState(defaultState(this.state.inputKey));
    });

    _defineProperty(this, "handleChange", event => {
      const {
        name
      } = event.target;
      const value = parseFloat(event.target.value);
      this.setState({
        [name]: value
      });
    });

    _defineProperty(this, "handleRotateLeft", event => {
      const {
        rotate
      } = this.state;
      this.setState({
        rotate: parseFloat(rotate - 90)
      });
    });

    _defineProperty(this, "handleRotateRight", event => {
      const {
        rotate
      } = this.state;
      this.setState({
        rotate: parseFloat(rotate + 90)
      });
    });

    props.loadUser(props.name);
  }

  render() {
    const {
      name,
      id,
      email,
      domain,
      createdDate,
      imageURL
    } = this.props;
    const {
      showAvatarEditor
    } = this.state;
    return _react.default.createElement(_Modal.default, {
      title: `${name || ''} (${id}) Profile`,
      footer: _react.default.createElement(_Flex.default, {
        spaceBetween: true,
        grow: true
      }),
      open: true
    }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(HiddenInput, {
      key: this.state.inputKey,
      type: "file",
      name: "file",
      onChange: this.onImageSelect,
      innerRef: this.inputRef
    }), !showAvatarEditor ? _react.default.createElement(AvatarWrapper, null, _react.default.createElement(AvatarStyled, {
      src: imageURL,
      name: name,
      alt: name,
      width: "200px",
      height: "200px",
      onClick: this.onClick
    })) : _react.default.createElement(EditorWapper, null, _react.default.createElement(AvatarEditorStyled, {
      image: (0, _lo.get)(this, 'inputRef.current.files[0]', ''),
      scale: this.state.scale,
      rotate: this.state.rotate,
      innerRef: this.editorRef,
      border: borderStyle,
      color: styleColor
    }), _react.default.createElement(_Flex.default, {
      spaceAround: true,
      wrap: true,
      grow: true
    }, _react.default.createElement("div", null, "Zoom: ", _react.default.createElement("input", {
      type: "range",
      max: "4",
      min: "1",
      name: "scale",
      step: "0.1",
      value: this.state.scale,
      onChange: this.handleChange
    })), _react.default.createElement("div", null, "Rotate: ", _react.default.createElement(_Icon.default, {
      "rotate-left": true,
      name: "rotate-left",
      onClick: this.handleRotateLeft
    }), _react.default.createElement(_Icon.default, {
      name: "rotate-right",
      onClick: this.handleRotateRight
    }))), _react.default.createElement(_Flex.default, {
      spaceAround: true,
      wrap: true,
      grow: true
    }, _react.default.createElement(ButtonStyled, {
      color: "primary",
      onClick: this.uploadCroppedImage
    }, "Crop and Upload"), _react.default.createElement(ButtonStyled, {
      color: "danger",
      onClick: this.cancelUpload
    }, "Cancel"))), _react.default.createElement("h2", null, name), _react.default.createElement(FlexStyled, null, _react.default.createElement(_Icon.default, {
      name: "affectli",
      type: "af"
    }), name), _react.default.createElement(FlexStyled, null, _react.default.createElement(_Icon.default, {
      name: "email"
    }), email), _react.default.createElement(FlexStyled, null, _react.default.createElement(_Icon.default, {
      name: "web"
    }), domain), _react.default.createElement("h4", null, "About:"), _react.default.createElement("div", null, "Created: ", (0, _moment.default)(createdDate).format('LLL'))));
  }

}

_defineProperty(ShowUser, "propTypes", {
  loadUser: _propTypes.default.func.isRequired,
  loadUserProfile: _propTypes.default.func.isRequired,
  uploadProfileImage: _propTypes.default.func.isRequired,
  showToastr: _propTypes.default.func.isRequired,
  name: _propTypes.default.string,
  id: _propTypes.default.number,
  email: _propTypes.default.string,
  createdDate: _propTypes.default.string,
  domain: _propTypes.default.string,
  imageURL: _propTypes.default.string,
  isLoading: _propTypes.default.bool
});

_defineProperty(ShowUser, "defaultProps", {
  isLoading: false
});

var _default = (0, _reactRedux.connect)(state => ({
  user: state.admin.users.details.data,
  name: state.user.profile.name,
  id: state.user.profile.id,
  email: state.user.profile.email,
  createdDate: state.user.profile.createdDate,
  domain: state.user.profile.domain,
  imageURL: state.user.profile.image
}), {
  loadUser: _userManagementAction.loadUser,
  uploadProfileImage: _usersActions.uploadProfileImage,
  loadUserProfile: _usersActions.loadUserProfile,
  showToastr: _appActions.showToastr
})(ShowUser);

exports.default = _default;