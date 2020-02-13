"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextArrow = exports.PrevArrow = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helpers = _interopRequireDefault(require("./mixins/helpers"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ArrowStyle = _styledComponents.default.button.withConfig({
  displayName: "arrows__ArrowStyle",
  componentId: "sc-1od6l0j-0"
})(["font-size:0;line-height:0;position:absolute;top:50%;display:block;width:20px;height:20px;padding:0;transform:translate(0,-50%);cursor:pointer;border:none;outline:none;background:transparent;z-index:5;border-radius:50%;&:before,&:before{font-size:20px;line-height:1;opacity:1;color:#333;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}&.slick-prev{left:3px;}&.slick-next{right:5px;}"]);

class PrevArrow extends _react.default.Component {
  clickHandler(options, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.clickHandler(options, e);
  }

  render() {
    var prevClasses = {
      'slick-arrow': true,
      'slick-prev': true
    };
    var prevHandler = this.clickHandler.bind(this, {
      message: 'previous'
    });

    if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
      prevClasses['slick-disabled'] = true;
      prevHandler = null;
    }

    var prevArrowProps = {
      key: '0',
      'data-role': 'none',
      className: (0, _classnames.default)(prevClasses),
      style: {
        display: 'block'
      },
      onClick: prevHandler
    };
    var customProps = {
      currentSlide: this.props.currentSlide,
      slideCount: this.props.slideCount
    };
    var prevArrow;

    if (this.props.prevArrow) {
      prevArrow = _react.default.cloneElement(this.props.prevArrow, { ...prevArrowProps,
        ...customProps
      });
    } else {
      prevArrow = _react.default.createElement(ArrowStyle, _extends({
        key: "0",
        type: "button"
      }, prevArrowProps), _react.default.createElement(_Icon.default, {
        name: "arrow-left"
      }));
    }

    return prevArrow;
  }

}

exports.PrevArrow = PrevArrow;

class NextArrow extends _react.default.Component {
  clickHandler(options, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.clickHandler(options, e);
  }

  render() {
    var nextClasses = {
      'slick-arrow': true,
      'slick-next': true
    };
    var nextHandler = this.clickHandler.bind(this, {
      message: 'next'
    });

    if (!_helpers.default.canGoNext(this.props)) {
      nextClasses['slick-disabled'] = true;
      nextHandler = null;
    }

    var nextArrowProps = {
      key: '1',
      'data-role': 'none',
      className: (0, _classnames.default)(nextClasses),
      style: {
        display: 'block'
      },
      onClick: nextHandler
    };
    var customProps = {
      currentSlide: this.props.currentSlide,
      slideCount: this.props.slideCount
    };
    var nextArrow;

    if (this.props.nextArrow) {
      nextArrow = _react.default.cloneElement(this.props.nextArrow, { ...nextArrowProps,
        ...customProps
      });
    } else {
      nextArrow = _react.default.createElement(ArrowStyle, _extends({
        key: "1",
        type: "button"
      }, nextArrowProps), " ", _react.default.createElement(_Icon.default, {
        name: "arrow-right"
      }));
    }

    return nextArrow;
  }

}

exports.NextArrow = NextArrow;