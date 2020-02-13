"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ContentStyle = _styledComponents.default.section.withConfig({
  displayName: "Content__ContentStyle",
  componentId: "sc-5y91jy-0"
})(["grid-area:gContent;display:grid;grid-template-rows:auto 1fr;grid-template-areas:\"header\" \"content\";height:", ";overflow:hidden;color:", ";background:", ";transition:.3s ease-in-out;@media(min-width:", "){", ""], ({
  height
}) => `${height}px`, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.background, ({
  theme
}) => theme.media.md, ({
  theme,
  isLeftOpen
}) => isLeftOpen ? ` width: calc(100% - ${theme.navigation.width}); transform: translateX(${theme.navigation.width})` : `width: calc(100% - ${theme.navigation.apps.width}); transform: translateX(${theme.navigation.apps.width})`);
/**
 * The app content container
 */


class AppContent extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "setHeight", () => {
      this.height = window.document.body.getBoundingClientRect().height;
      this.forceUpdate();
    });
  }

  componentWillMount() {
    this.setHeight();
  }

  componentDidMount() {
    this.setHeight();
    window.addEventListener('resize', this.setHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight);
  }

  render() {
    const {
      children,
      isLeftOpen
    } = this.props;
    return _react.default.createElement(ContentStyle, {
      className: 'app-content',
      isLeftOpen: isLeftOpen,
      height: this.height
    }, children);
  }

}

;
var _default = AppContent;
exports.default = _default;