"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactAliceCarousel = _interopRequireDefault(require("react-alice-carousel"));

var _Arrow = _interopRequireDefault(require("./Arrow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CarouselWrapperStyled = _styledComponents.default.div.withConfig({
  displayName: "Carousel__CarouselWrapperStyled",
  componentId: "sc-1mg9fym-0"
})(["position:relative;"]);
/**
 *
 * @example AliceCarousel
 */


class Carousel extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "carouselRef", _react.default.createRef());

    _defineProperty(this, "slideNext", () => this.carouselRef.current && this.carouselRef.current._slideNext());

    _defineProperty(this, "slidePrev", () => this.carouselRef.current && this.carouselRef.current._slidePrev());
  }

  render() {
    const {
      style,
      className,
      ...allProps
    } = this.props;
    return _react.default.createElement(CarouselWrapperStyled, {
      style: style,
      className: className
    }, _react.default.createElement(_reactAliceCarousel.default, _extends({}, allProps, {
      ref: this.carouselRef,
      dotsDisabled: true,
      buttonsDisabled: true
    })), _react.default.createElement(_Arrow.default, {
      onClick: this.slidePrev
    }), _react.default.createElement(_Arrow.default, {
      onClick: this.slideNext,
      right: true
    }));
  }

}

_defineProperty(Carousel, "devProps", {
  items: _propTypes.default.array.isRequired,
  ..._reactAliceCarousel.default.PropTypes
});

var _default = Carousel;
exports.default = _default;