"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Backdrop = _interopRequireDefault(require("app/components/atoms/Backdrop/Backdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const rotate = (0, _styledComponents.keyframes)(["100%{transform:rotate(360deg);}"]);
const dash = (0, _styledComponents.keyframes)(["0%{stroke-dasharray:1,200;stroke-dashoffset:0;}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px;}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px;}"]);
const smallloadercolors = (0, _styledComponents.keyframes)(["100%,0%{stroke:#1b79d1;}40%{stroke:#1bd19a;}66%{stroke:#ff9000;}80%,90%{stroke:#e01616;}"]);

const LoadWrapper = _styledComponents.default.div.withConfig({
  displayName: "Loader__LoadWrapper",
  componentId: "jivfrj-0"
})(["display:block;text-align:center;margin:0 auto;", ";", ";"], ({
  absolute,
  radius
}) => absolute ? `position: absolute; bottom: calc(50% - ${radius / 2 || '25px'}); width: 100%; z-index: 10;` : '', ({
  padding
}) => padding ? `padding: ${padding}` : '');

const Spinner = _styledComponents.default.div.withConfig({
  displayName: "Loader__Spinner",
  componentId: "jivfrj-1"
})(["position:relative;display:inline-block;text-align:center;width:20px;height:20px;&:before{content:'';display:block;padding-top:100%;}"]);

const Circle = _styledComponents.default.svg.withConfig({
  displayName: "Loader__Circle",
  componentId: "jivfrj-2"
})(["animation:", " 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;"], rotate);

const Path = _styledComponents.default.circle.withConfig({
  displayName: "Loader__Path",
  componentId: "jivfrj-3"
})(["stroke-dasharray:1,200;stroke-dashoffset:0;stroke:", ";animation:", " 1.5s ease-in-out infinite,", ";stroke-linecap:round;"], ({
  color,
  theme
}) => theme && color ? theme.color[color] : 'transparent', dash, ({
  color,
  theme
}) => theme && color ? null : `${smallloadercolors} 6s ease-in-out infinite`);
/**
 * Our loader/spinner component to add to places requiring a loading state
 */


class Loader extends _react.Component {
  /**
   * Return the with/height of the Loader by the given radius prop;
   * @returns {{height: string, width: string}}
   */
  getLoaderStyle() {
    const radius = this.props.radius || 50;
    return {
      height: `${radius}px`,
      width: `${radius}px`
    };
  }
  /**
   * Set the outer stroke width via the strokeWidth prop;
   * @returns {String|number}
   */


  getStrokeWidth() {
    const strokeWidth = this.props.strokeWidth || 4;
    return strokeWidth;
  }
  /**
   * Render our loader/spinner in SVG
   */


  render() {
    const {
      absolute,
      padding,
      radius,
      strokeWidth,
      color,
      className,
      style,
      backdrop
    } = this.props;
    const BackdropComponent = backdrop ? _Backdrop.default : _react.Fragment;
    return _react.default.createElement(BackdropComponent, null, _react.default.createElement(LoadWrapper, {
      absolute: absolute,
      padding: padding,
      radius: radius,
      strokeWidth: strokeWidth,
      color: color,
      className: `Loader ${className}`,
      style: style
    }, _react.default.createElement(Spinner, {
      style: this.getLoaderStyle()
    }, _react.default.createElement(Circle, {
      viewBox: "25 25 50 50"
    }, _react.default.createElement(Path, {
      cx: "50",
      cy: "50",
      fill: "none",
      r: "20",
      strokeMiterlimit: "10",
      strokeWidth: this.getStrokeWidth()
    })))));
  }

}

_defineProperty(Loader, "propTypes", {
  absolute: _propTypes.default.bool,
  padding: _propTypes.default.string,
  radius: _propTypes.default.string,
  strokeWidth: _propTypes.default.string,
  color: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object
});

var _default = Loader;
exports.default = _default;