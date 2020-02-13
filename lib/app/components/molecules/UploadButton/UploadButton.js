"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _TextIcon = _interopRequireDefault(require("../TextIcon/TextIcon"));

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const UploadButtonStyle = _styledComponents.default.span.withConfig({
  displayName: "UploadButton__UploadButtonStyle",
  componentId: "w1o13r-0"
})(["display:inline-block;"]);

const InputStyled = _styledComponents.default.input.withConfig({
  displayName: "UploadButton__InputStyled",
  componentId: "w1o13r-1"
})(["display:none;"]);
/**
 * Button used to upload a file
 */


let UploadButton = (_class = (_temp = _class2 = class UploadButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "inputRef", _react.default.createRef());
  }

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.props.loading && this.inputRef.current) {
      this.inputRef.current.click(); // this opens the browser popup to select the file
    }
  }

  onClickInput(event) {
    event.stopPropagation();
  }

  onFileSelect(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      multiple
    } = this.props;
    const {
      files
    } = this.inputRef.current || {};

    if (files && files[0] && !this.props.loading && this.props.onSelect) {
      this.props.onSelect(multiple ? files : files[0]);
      if (this.inputRef.current) this.inputRef.current.value = '';
    }
  }

  render() {
    const {
      icon,
      label,
      loading,
      margin,
      alt,
      multiple
    } = this.props;
    return _react.default.createElement(UploadButtonStyle, {
      alt: alt
    }, _react.default.createElement(InputStyled, {
      onClick: this.onClickInput,
      type: "file",
      name: "file",
      onChange: this.onFileSelect,
      innerRef: this.inputRef,
      multiple: multiple
    }), _react.default.createElement(_TextIcon.default, {
      type: 'button',
      margin: margin,
      loading: loading,
      icon: icon || 'cloud-upload',
      label: label,
      size: "md",
      onClick: this.onClick
    }));
  }

}, _defineProperty(_class2, "propTypes", {
  loading: _propTypes.default.bool,
  icon: _propTypes.default.string,
  label: _propTypes.default.string,
  onSelect: _propTypes.default.func.isRequired
}), _defineProperty(_class2, "defaultProps", {
  loading: false,
  multiple: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "onClick", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClickInput", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onClickInput"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFileSelect", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onFileSelect"), _class.prototype)), _class);
var _default = UploadButton;
exports.default = _default;