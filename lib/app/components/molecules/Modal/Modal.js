"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactPortal = require("react-portal");

var _History = _interopRequireDefault(require("store/History"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _ButtonIcon = _interopRequireDefault(require("../ButtonIcon/ButtonIcon"));

var _Backdrop = _interopRequireDefault(require("app/components/atoms/Backdrop/Backdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ModalStyle = _styledComponents.default.div.withConfig({
  displayName: "Modal__ModalStyle",
  componentId: "hd2h3s-0"
})(["display:grid;grid-template-areas:\"ModalHeader ModalContent ModalFooter\" grid-template-rows:auto 1fr auto;width:100%;max-height:100%;height:100%;min-height:", ";display:flex;flex-direction:column;@media(min-width:", "){min-width:240px;max-width:640px;height:auto;}color:", ";background:", ";box-shadow:", ";border-radius:.3rem;a{color:", ";}"], ({
  theme,
  height
}) => theme && height ? `${Number(height)}px` : 'auto', ({
  theme
}) => theme.media.md, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.background, ({
  theme
}) => theme.shadow.z3, ({
  theme
}) => theme.color.primary);

const ModalTitle = _styledComponents.default.header.withConfig({
  displayName: "Modal__ModalTitle",
  componentId: "hd2h3s-1"
})(["grid-area:ModalHeader;display:flex;flex-shrink:0;align-items:center;justify-content:space-between;padding:1rem;color:", ";background:", ";& .Icon:before{color:", ";}"], ({
  theme
}) => theme.widget.header.textColor, ({
  theme
}) => theme.widget.header.background, ({
  theme
}) => theme.widget.header.iconColor);

const ModalContent = _styledComponents.default.main.withConfig({
  displayName: "Modal__ModalContent",
  componentId: "hd2h3s-2"
})(["grid-area:ModalContent;display:flex;flex-direction:column;flex-grow:1;overflow-y:auto;padding:", ";"], ({
  noPadding
}) => noPadding ? '0' : '1rem');

const ModalFooter = _styledComponents.default.footer.withConfig({
  displayName: "Modal__ModalFooter",
  componentId: "hd2h3s-3"
})(["grid-area:ModalFooter;display:flex;align-items:center;justify-content:space-between;padding:1rem;"]);
/**
 * Generate our Modal component
 */


class Modal extends _react.Component {
  /**
   * Define our initial state for the modal
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "toggleModal", e => {
      e.preventDefault();

      if (this.props.onToggle) {
        this.props.onToggle();
      } else if (this.props.closeUrl) {
        this.setState({
          isOpened: false
        });

        _History.default.push(this.props.closeUrl);
      } else if (this.state.isBackDisabled !== true) {
        _History.default.pushBack();
      } else {
        this.setState({
          isOpened: !this.state.isOpened
        });
      }
    });

    this.state = {
      isOpened: this.props.open || false,
      isBackDisabled: this.props.disableBack || false
    };
  }
  /**
   * @override
   * @param nextProps the properties that the Components will receive.
   */


  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({
        isOpened: nextProps.open
      });
    }
  }
  /**
   * Toggle the modal dialog
   */


  /**
   * Render our modal container class
   */
  render() {
    const {
      children,
      title,
      footer,
      noPadding,
      height
    } = this.props;
    return this.state.isOpened && _react.default.createElement(_reactPortal.Portal, {
      isBackDisabled: this.props.disableBack,
      node: document && document.getElementById('modals')
    }, _react.default.createElement(_Backdrop.default, null, _react.default.createElement(ModalStyle, {
      height: height
    }, _react.default.createElement(ModalTitle, null, _react.default.createElement(_Title.default, null, title), _react.default.createElement(_HeaderActions.default, null, _react.default.createElement(_ButtonIcon.default, {
      icon: "close",
      size: "sm",
      onClick: this.toggleModal
    }))), _react.default.createElement(ModalContent, {
      noPadding: noPadding
    }, children), footer && _react.default.createElement(ModalFooter, null, footer))));
  }

}

_defineProperty(Modal, "propTypes", {
  open: _propTypes.default.bool,
  title: _propTypes.default.string,
  footer: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  disableBack: _propTypes.default.bool,
  noPadding: _propTypes.default.bool,
  closeUrl: _propTypes.default.string,
  onToggle: _propTypes.default.func,
  height: _propTypes.default.number
});

var _default = Modal;
exports.default = _default;