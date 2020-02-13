"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domToImage = void 0;

var _html2canvas = _interopRequireDefault(require("html2canvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const domToImage = (domNode, type, options) => {
  const {
    maxWidth,
    ...rest
  } = options;
  return (0, _html2canvas.default)(domNode, rest).then(canvas => {
    // console.log('$$$ canvas', canvas.width, canvas.height);
    if (maxWidth && canvas.width > maxWidth) {
      const scale = canvas.width / maxWidth;
      const outerCanvas = document.createElement('canvas');
      outerCanvas.setAttribute('width', String(maxWidth));
      outerCanvas.setAttribute('height', String(canvas.height / scale));
      const context = outerCanvas.getContext('2d');
      context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, maxWidth, canvas.height / scale);
      return outerCanvas.toDataURL(type);
    }

    return canvas.toDataURL(type);
  });
};

exports.domToImage = domToImage;