"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _PopoverHeader = _interopRequireDefault(require("../Header/PopoverHeader"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _PopoverFooter = _interopRequireDefault(require("../Footer/PopoverFooter"));

var _PopoverContainerProps = _interopRequireDefault(require("./PopoverContainerProps"));

var _PopoverContent = _interopRequireDefault(require("../Content/PopoverContent"));

var _PopoverFooterProps = _interopRequireDefault(require("../Footer/PopoverFooterProps"));

var _PopoverContentProps = _interopRequireDefault(require("../Content/PopoverContentProps"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Animations
const animateInFromRight = (0, _styledComponents.keyframes)(["from{transform:translateX(-20px);opacity:0;}to{transform:translateX(0px);opacity:1;}"]);
const animateInFromLeft = (0, _styledComponents.keyframes)(["from{transform:translateX(20px);opacity:0;}to{transform:translateX(0px);opacity:1;}"]);
const animateInFromTop = (0, _styledComponents.keyframes)(["from{transform:translateY(-20px);opacity:0;}to{transform:translateY(0px);opacity:1;}"]);
const animateInFromBottom = (0, _styledComponents.keyframes)(["from{transform:translateY(20px);opacity:0;}to{transform:translateY(0px);opacity:1;}"]);

const PopoverContainerStyle = _styledComponents.default.aside.withConfig({
  displayName: "PopoverContainer__PopoverContainerStyle",
  componentId: "rd17uf-0"
})(["position:relative;", ";", ";", ";", ";", ";animation-duration:.3s;animation-timing-function:ease;color:", ";background:", ";box-shadow:", ";min-width:", ";"], ({
  isOpen
}) => isOpen ? '' : 'display: none', ({
  isOpen,
  placement
}) => isOpen && placement.includes('right') ? `animation-name:  ${animateInFromRight}` : '', ({
  isOpen,
  placement
}) => isOpen && placement.includes('left') ? `animation-name:  ${animateInFromLeft}` : '', ({
  isOpen,
  placement
}) => isOpen && placement.includes('top' || 'center' || 'middle') ? `animation-name:  ${animateInFromTop}` : '', ({
  isOpen,
  placement
}) => isOpen && placement.includes('bottom') ? `animation-name:  ${animateInFromBottom}` : '', ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.shadow.z1, ({
  width
}) => width || '');

const PopoverContainer = props => {
  const {
    isOpen,
    placement,
    title,
    headerActions,
    content,
    footer,
    width
  } = props;
  return _react.default.createElement(PopoverContainerStyle, {
    isOpen: isOpen,
    placement: placement,
    width: width
  }, headerActions && _react.default.createElement(_PopoverHeader.default, {
    headerActions: headerActions
  }), _react.default.createElement(_PopoverContent.default, null, _react.default.createElement("div", null, _react.default.createElement(_Title.default, {
    as: "h3"
  }, title), content)), footer && _react.default.createElement(_PopoverFooter.default, null, footer));
};

PopoverContainer.propTypes = { ..._PopoverContainerProps.default,
  ..._PopoverContentProps.default,
  ..._PopoverFooterProps.default
};
var _default = PopoverContainer;
exports.default = _default;