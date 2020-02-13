"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _hooks = require("app/utils/hook/hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const Image = _styledComponents.default.img.withConfig({
  displayName: "PasteForm__Image",
  componentId: "sc-1mvuek7-0"
})(["max-width:100%;"]);

const PasteForm = ({
  close,
  attachMessengerFile,
  file
}) => {
  const [filename, onChangeFilename] = (0, _hooks.useOnChange)('');
  const [imgSrc, setImgSrc] = (0, _react.useState)(null);
  const attachFile = (0, _react.useCallback)(event => {
    event.preventDefault();
    const newFile = new File([file], `${filename}.jpg`);
    ;
    attachMessengerFile(newFile).then(close);
  }, [filename, file, attachMessengerFile, close]);
  (0, _react.useEffect)(() => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgSrc(reader.result);
    };

    return reader.readAsDataURL(file);
  }, [file]);
  return _react.default.createElement(_Form.default, null, _react.default.createElement(Image, {
    alt: filename,
    src: imgSrc
  }), _react.default.createElement(_Field.default, {
    label: "File Name",
    name: "name",
    value: filename,
    placeholder: "Enter the filename",
    onChange: onChangeFilename,
    required: true
  }), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
    type: "button",
    onClick: close
  }, "Cancel"), _react.default.createElement(_Button.default, {
    disabled: !filename,
    onClick: attachFile,
    color: "primary"
  }, "Attach file")));
};

var _default = PasteForm;
exports.default = _default;