"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _platformUi = require("@mic3/platform-ui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const WrapperContent = _styledComponents.default.div.withConfig({
  displayName: "DropzoneWrapper__WrapperContent",
  componentId: "sc-174so5h-0"
})(["width:100%;height:100%;"]);

const DropzoneWrapper = ({
  children,
  className,
  ...restProps
}) => {
  const disablePropagation = (0, _react.useCallback)(event => {
    event.stopPropagation();
  }, []);
  return _react.default.createElement(_platformUi.Dropzone, _extends({
    accept: "image/*,video/*,application/*,video/*,audio/*,text/*"
  }, restProps, {
    dropZoneClasses: className,
    showPreviews: false,
    showAlerts: false,
    noClick: true
  }), _react.default.createElement(WrapperContent, {
    onClick: disablePropagation
  }, children));
};

var _default = DropzoneWrapper;
exports.default = _default;