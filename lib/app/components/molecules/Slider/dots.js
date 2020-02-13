"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dots = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable */
var getDotCount = function (spec) {
  var dots;
  dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  return dots;
};

class Dots extends _react.default.Component {
  clickHandler(options, e) {
    // In Autoplay the focus stays on clicked button even after transition
    // to next slide. That only goes away by click somewhere outside
    e.preventDefault();
    this.props.clickHandler(options);
  }

  render() {
    var dotCount = getDotCount({
      slideCount: this.props.slideCount,
      slidesToScroll: this.props.slidesToScroll
    }); // Apply join & split to Array to pre-fill it for IE8
    //
    // Credit: http://stackoverflow.com/a/13735425/1849458

    var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map((x, i) => {
      var leftBound = i * this.props.slidesToScroll;
      var rightBound = i * this.props.slidesToScroll + (this.props.slidesToScroll - 1);
      var className = (0, _classnames.default)({
        'slick-active': this.props.currentSlide >= leftBound && this.props.currentSlide <= rightBound
      });
      var dotOptions = {
        message: 'dots',
        index: i,
        slidesToScroll: this.props.slidesToScroll,
        currentSlide: this.props.currentSlide
      };
      var onClick = this.clickHandler.bind(this, dotOptions);
      return _react.default.createElement("li", {
        key: i,
        className: className
      }, _react.default.cloneElement(this.props.customPaging(i), {
        onClick
      }));
    });
    return _react.default.createElement("ul", {
      className: this.props.dotsClass,
      style: {
        display: 'block'
      }
    }, dots);
  }

}

exports.Dots = Dots;