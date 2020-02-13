"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerSlider = void 0;

var _react = _interopRequireDefault(require("react"));

var _eventHandlers = _interopRequireDefault(require("./mixins/event-handlers"));

var _helpers = _interopRequireDefault(require("./mixins/helpers"));

var _initialState = _interopRequireDefault(require("./initial-state"));

var _defaultProps = _interopRequireDefault(require("./default-props"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _classnames = _interopRequireDefault(require("classnames"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _track = require("./track");

var _dots = require("./dots");

var _arrows = require("./arrows");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const InnerSliderStyle = _styledComponents.default.div.withConfig({
  displayName: "inner-slider__InnerSliderStyle",
  componentId: "uxck1w-0"
})(["z-index:0;position:relative;display:block;box-sizing:border-box;-webkit-touch-callout:none;user-select:none;touch-action:pan-y;-webkit-tap-highlight-color:transparent;& .slick-track,& .slick-list{transform:translate3d(0,0,0);}.slick-slide{float:left;height:100%;min-height:1px;[dir=\"rtl\"] &{float:right;}img{display:block;}&.slick-loading img{display:none;}&.dragging img{pointer-events:none;}.slick-initialized &{display:block;}.slick-loading &{visibility:hidden;}.slick-vertical &{display:block;height:auto;border:1px solid transparent;}}.slick-arrow.slick-hidden{display:none;}"]);

const SlickListStyle = _styledComponents.default.div.withConfig({
  displayName: "inner-slider__SlickListStyle",
  componentId: "uxck1w-1"
})(["position:relative;overflow:hidden;display:block;margin:0;padding:0;&:focus{outline:none;}&.dragging{cursor:pointer;cursor:hand;}"]);

const InnerSlider = (0, _createReactClass.default)({
  displayName: "InnerSlider",
  mixins: [_helpers.default, _eventHandlers.default],
  list: null,
  track: null,
  resized: 0,
  listRefHandler: function (ref) {
    this.list = ref;
  },
  trackRefHandler: function (ref) {
    this.track = ref;
  },
  getInitialState: function () {
    return Object.assign({}, _initialState.default, {
      currentSlide: this.props.initialSlide
    });
  },
  getDefaultProps: function () {
    return _defaultProps.default;
  },
  componentWillMount: function () {
    if (this.props.init) {
      this.props.init();
    }

    this.setState({
      mounted: true
    });
    const lazyLoadedList = [];

    for (let i = 0; i < _react.default.Children.count(this.props.children); i++) {
      if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToShow) {
        lazyLoadedList.push(i);
      }
    }

    if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
      this.setState({
        lazyLoadedList: lazyLoadedList
      });
    }
  },
  componentDidMount: function componentDidMount() {
    // Hack for autoplay -- Inspect Later
    this.initialize(this.props);
    this.adaptHeight(); // To support server-side rendering

    if (!window) {
      return;
    }

    if (window.addEventListener) {
      window.addEventListener('resize', this.onWindowResized);
    } else {
      window.attachEvent('onresize', this.onWindowResized);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.animationEndCallback) {
      clearTimeout(this.animationEndCallback);
    }

    if (window.addEventListener) {
      window.removeEventListener('resize', this.onWindowResized);
    } else {
      window.detachEvent('onresize', this.onWindowResized);
    }

    if (this.state.autoPlayTimer) {
      clearInterval(this.state.autoPlayTimer);
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.props.slickGoTo !== nextProps.slickGoTo) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('react-slick deprecation warning: slickGoTo prop is deprecated and it will be removed in next release. Use slickGoTo method instead');
      }

      this.changeSlide({
        message: 'index',
        index: nextProps.slickGoTo,
        currentSlide: this.state.currentSlide
      });
    } else if (this.state.currentSlide >= nextProps.children.length) {
      this.update(nextProps);
      this.changeSlide({
        message: 'index',
        index: nextProps.children.length - nextProps.slidesToShow,
        currentSlide: this.state.currentSlide
      });
    } else {
      this.update(nextProps);
    }
  },
  componentDidUpdate: function () {
    this.adaptHeight();
  },
  onWindowResized: function () {
    this.update(this.props); // animating state should be cleared while resizing, otherwise autoplay stops working

    this.setState({
      animating: false
    });
    clearTimeout(this.animationEndCallback);
    delete this.animationEndCallback;
  },
  slickPrev: function () {
    this.changeSlide({
      message: 'previous'
    });
  },
  slickNext: function () {
    this.changeSlide({
      message: 'next'
    });
  },
  slickGoTo: function (slide) {
    typeof slide === 'number' && this.changeSlide({
      message: 'index',
      index: slide,
      currentSlide: this.state.currentSlide
    });
  },
  render: function () {
    const className = (0, _classnames.default)('slick-initialized', 'slick-slider', this.props.className, {
      'slick-vertical': this.props.vertical
    });
    const trackProps = {
      fade: this.props.fade,
      cssEase: this.props.cssEase,
      speed: this.props.speed,
      infinite: this.props.infinite,
      centerMode: this.props.centerMode,
      focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null,
      currentSlide: this.state.currentSlide,
      lazyLoad: this.props.lazyLoad,
      lazyLoadedList: this.state.lazyLoadedList,
      rtl: this.props.rtl,
      slideWidth: this.state.slideWidth,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: this.props.slidesToScroll,
      slideCount: this.state.slideCount,
      trackStyle: this.state.trackStyle,
      variableWidth: this.props.variableWidth
    };
    let dots;

    if (this.props.dots === true && this.state.slideCount >= this.props.slidesToShow) {
      const dotProps = {
        dotsClass: this.props.dotsClass,
        slideCount: this.state.slideCount,
        slidesToShow: this.props.slidesToShow,
        currentSlide: this.state.currentSlide,
        slidesToScroll: this.props.slidesToScroll,
        clickHandler: this.changeSlide,
        children: this.props.children,
        customPaging: this.props.customPaging
      };
      dots = _react.default.createElement(_dots.Dots, dotProps);
    }

    let prevArrow, nextArrow;
    const arrowProps = {
      infinite: this.props.infinite,
      centerMode: this.props.centerMode,
      currentSlide: this.state.currentSlide,
      slideCount: this.state.slideCount,
      slidesToShow: this.props.slidesToShow,
      prevArrow: this.props.prevArrow,
      nextArrow: this.props.nextArrow,
      clickHandler: this.changeSlide
    };

    if (this.props.arrows) {
      prevArrow = _react.default.createElement(_arrows.PrevArrow, arrowProps);
      nextArrow = _react.default.createElement(_arrows.NextArrow, arrowProps);
    }

    let verticalHeightStyle = null;

    if (this.props.vertical) {
      verticalHeightStyle = {
        height: this.state.listHeight
      };
    }

    let centerPaddingStyle = null;

    if (this.props.vertical === false) {
      if (this.props.centerMode === true) {
        centerPaddingStyle = {
          padding: `0px ${this.props.centerPadding}`
        };
      }
    } else {
      if (this.props.centerMode === true) {
        centerPaddingStyle = {
          padding: `${this.props.centerPadding} 0px`
        };
      }
    }

    const listStyle = (0, _objectAssign.default)({}, verticalHeightStyle, centerPaddingStyle);
    return (// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      _react.default.createElement(InnerSliderStyle, {
        className: className,
        onMouseEnter: this.onInnerSliderEnter,
        onMouseLeave: this.onInnerSliderLeave,
        onMouseOver: this.onInnerSliderOver
      }, prevArrow, _react.default.createElement(SlickListStyle, {
        ref: this.listRefHandler,
        className: "slick-list",
        style: listStyle,
        onMouseDown: this.swipeStart,
        onMouseMove: this.state.dragging ? this.swipeMove : null,
        onMouseUp: this.swipeEnd,
        onMouseLeave: this.state.dragging ? this.swipeEnd : null,
        onTouchStart: this.swipeStart,
        onTouchMove: this.state.dragging ? this.swipeMove : null,
        onTouchEnd: this.swipeEnd,
        onTouchCancel: this.state.dragging ? this.swipeEnd : null,
        onKeyDown: this.props.accessibility ? this.keyHandler : null
      }, _react.default.createElement(_track.Track, _extends({
        ref: this.trackRefHandler
      }, trackProps), this.props.children)), nextArrow, dots)
    );
  }
});
exports.InnerSlider = InnerSlider;