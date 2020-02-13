"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _UploadButton = _interopRequireDefault(require("../UploadButton/UploadButton"));

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ImageLoaderStyle = _styledComponents.default.aside.withConfig({
  displayName: "ImageUploader__ImageLoaderStyle",
  componentId: "sc-1hxpjt1-0"
})(["display:inline-block;border:solid 1px ", ";border-radius:.2rem;margin:0 0 1rem 0;background:", ";box-shadow:", ";"], ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.shadow.z1);

const ImageUploadTitle = _styledComponents.default.header.withConfig({
  displayName: "ImageUploader__ImageUploadTitle",
  componentId: "sc-1hxpjt1-1"
})(["font-size:0.7rem;padding:0.2rem .5rem;border-bottom:solid 1px ", ";"], ({
  theme
}) => theme.base.borderColor);

const UploadWrapper = _styledComponents.default.div.withConfig({
  displayName: "ImageUploader__UploadWrapper",
  componentId: "sc-1hxpjt1-2"
})(["display:flex;"]);

const ImageCol = _styledComponents.default.div.withConfig({
  displayName: "ImageUploader__ImageCol",
  componentId: "sc-1hxpjt1-3"
})(["display:flex;align-items:center;justify-content:center;padding:1rem;"]);

const UploadCol = _styledComponents.default.div.withConfig({
  displayName: "ImageUploader__UploadCol",
  componentId: "sc-1hxpjt1-4"
})(["display:flex;align-items:center;justify-content:center;padding:1rem;border-left:solid 1px ", ";& button{margin-left:0;}"], ({
  theme
}) => theme.base.borderColor);
/**
 * Component to show a image upload box
 */


class ImageUploader extends _react.PureComponent {
  render() {
    const {
      image,
      error,
      uploadFunction,
      isUploading,
      canEdit,
      title,
      name
    } = this.props;
    return _react.default.createElement(ImageLoaderStyle, null, title && _react.default.createElement(ImageUploadTitle, null, title), _react.default.createElement(UploadWrapper, null, _react.default.createElement(ImageCol, null, error ? '' : _react.default.createElement(_Avatar.default, {
      src: image,
      name: name || 'NA',
      size: "lg"
    })), _react.default.createElement(UploadCol, null, !canEdit ? null : _react.default.createElement(_UploadButton.default, {
      label: "Upload",
      loading: isUploading,
      onSelect: uploadFunction,
      id: "img",
      icon: "image",
      placeholder: "Upload an image"
    }))));
  }

}

_defineProperty(ImageUploader, "propTypes", {
  image: _propTypes.default.string,
  error: _propTypes.default.string,
  uploadFunction: _propTypes.default.func,
  isUploading: _propTypes.default.bool,
  canEdit: _propTypes.default.bool,
  title: _propTypes.default.string,
  name: _propTypes.default.string
});

var _default = ImageUploader;
exports.default = _default;