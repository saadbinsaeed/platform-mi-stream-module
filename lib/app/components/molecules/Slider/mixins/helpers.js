"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _trackHelper = require("./trackHelper");

var _objectAssign = _interopRequireDefault(require("object-assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const helpers = {
  initialize: function (props) {
    const slickList = _reactDom.default.findDOMNode(this.list);

    const slideCount = _react.default.Children.count(props.children);

    const listWidth = this.getWidth(slickList);
    const trackWidth = this.getWidth(_reactDom.default.findDOMNode(this.track));
    let slideWidth;

    if (!props.vertical) {
      const centerPaddingAdj = props.centerMode && Number(props.centerPadding) * 2;
      slideWidth = (this.getWidth(_reactDom.default.findDOMNode(this)) - centerPaddingAdj) / props.slidesToShow;
    } else {
      slideWidth = this.getWidth(_reactDom.default.findDOMNode(this));
    }

    const slideHeight = this.getHeight(slickList.querySelector('[data-index="0"]'));
    const listHeight = slideHeight * props.slidesToShow;
    const currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;
    this.setState({
      slideCount,
      slideWidth,
      listWidth,
      trackWidth,
      currentSlide,
      slideHeight,
      listHeight
    }, function () {
      const targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign.default)({
        slideIndex: this.state.currentSlide,
        trackRef: this.track
      }, props, this.state)); // getCSS function needs previously set state

      const trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign.default)({
        left: targetLeft
      }, props, this.state));
      this.setState({
        trackStyle: trackStyle
      });
      this.autoPlay(); // once we're set up, trigger the initial autoplay.
    });
  },
  update: function (props) {
    const slickList = _reactDom.default.findDOMNode(this.list); // This method has mostly same code as initialize method.
    // Refactor it


    const slideCount = _react.default.Children.count(props.children);

    const listWidth = this.getWidth(slickList);
    const trackWidth = this.getWidth(_reactDom.default.findDOMNode(this.track));
    let slideWidth;

    if (!props.vertical) {
      const centerPaddingAdj = props.centerMode && Number(props.centerPadding) * 2;
      slideWidth = (this.getWidth(_reactDom.default.findDOMNode(this)) - centerPaddingAdj) / props.slidesToShow;
    } else {
      slideWidth = this.getWidth(_reactDom.default.findDOMNode(this));
    }

    const slideHeight = this.getHeight(slickList.querySelector('[data-index="0"]'));
    const listHeight = slideHeight * props.slidesToShow; // pause slider if autoplay is set to false

    if (props.autoplay) {
      this.pause();
    } else {
      this.autoPlay();
    }

    this.setState({
      slideCount,
      slideWidth,
      listWidth,
      trackWidth,
      slideHeight,
      listHeight
    }, function () {
      const targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign.default)({
        slideIndex: this.state.currentSlide,
        trackRef: this.track
      }, props, this.state)); // getCSS function needs previously set state

      const trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign.default)({
        left: targetLeft
      }, props, this.state));
      this.setState({
        trackStyle: trackStyle
      });
    });
  },
  getWidth: function getWidth(elem) {
    return elem.getBoundingClientRect().width || elem.offsetWidth || 0;
  },

  getHeight(elem) {
    return elem.getBoundingClientRect().height || elem.offsetHeight || 0;
  },

  adaptHeight: function () {
    if (this.props.adaptiveHeight) {
      const selector = `[data-index="${this.state.currentSlide}"]`;

      if (this.list) {
        const slickList = _reactDom.default.findDOMNode(this.list);

        slickList.style.height = `${slickList.querySelector(selector).offsetHeight}px`;
      }
    }
  },
  canGoNext: function (opts) {
    let canGo = true;

    if (!opts.infinite) {
      if (opts.centerMode) {
        // check if current slide is last slide
        if (opts.currentSlide >= opts.slideCount - 1) {
          canGo = false;
        }
      } else {
        // check if all slides are shown in slider
        if (opts.slideCount <= opts.slidesToShow || opts.currentSlide >= opts.slideCount - opts.slidesToShow) {
          canGo = false;
        }
      }
    }

    return canGo;
  },
  slideHandler: function (index) {
    // Functionality of animateSlide and postSlide is merged into this function
    // console.log('slideHandler', index);
    let targetSlide, currentSlide;
    let targetLeft;
    let callback;

    if (this.props.waitForAnimate && this.state.animating) {
      return;
    }

    if (this.props.fade) {
      currentSlide = this.state.currentSlide; // Don't change slide if it's not infite and current slide is the first or last slide.

      if (this.props.infinite === false && (index < 0 || index >= this.state.slideCount)) {
        return;
      } //  Shifting targetSlide back into the range


      if (index < 0) {
        targetSlide = index + this.state.slideCount;
      } else if (index >= this.state.slideCount) {
        targetSlide = index - this.state.slideCount;
      } else {
        targetSlide = index;
      }

      if (this.props.lazyLoad && this.state.lazyLoadedList.indexOf(targetSlide) < 0) {
        this.setState({
          lazyLoadedList: this.state.lazyLoadedList.concat(targetSlide)
        });
      }

      callback = () => {
        this.setState({
          animating: false
        });

        if (this.props.afterChange) {
          this.props.afterChange(targetSlide);
        }

        delete this.animationEndCallback;
      };

      this.setState({
        animating: true,
        currentSlide: targetSlide
      }, function () {
        this.animationEndCallback = setTimeout(callback, this.props.speed);
      });

      if (this.props.beforeChange) {
        this.props.beforeChange(this.state.currentSlide, targetSlide);
      }

      this.autoPlay();
      return;
    }

    targetSlide = index;

    if (targetSlide < 0) {
      if (this.props.infinite === false) {
        currentSlide = 0;
      } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
        currentSlide = this.state.slideCount - this.state.slideCount % this.props.slidesToScroll;
      } else {
        currentSlide = this.state.slideCount + targetSlide;
      }
    } else if (targetSlide >= this.state.slideCount) {
      if (this.props.infinite === false) {
        currentSlide = this.state.slideCount - this.props.slidesToShow;
      } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
        currentSlide = 0;
      } else {
        currentSlide = targetSlide - this.state.slideCount;
      }
    } else {
      currentSlide = targetSlide;
    }

    targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign.default)({
      slideIndex: targetSlide,
      trackRef: this.track
    }, this.props, this.state));
    const currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign.default)({
      slideIndex: currentSlide,
      trackRef: this.track
    }, this.props, this.state));

    if (this.props.infinite === false) {
      targetLeft = currentLeft;
    }

    if (this.props.beforeChange) {
      this.props.beforeChange(this.state.currentSlide, currentSlide);
    }

    if (this.props.lazyLoad) {
      let loaded = true;
      const slidesToLoad = [];

      for (let i = targetSlide; i < targetSlide + this.props.slidesToShow; i++) {
        loaded = loaded && this.state.lazyLoadedList.indexOf(i) >= 0;

        if (!loaded) {
          slidesToLoad.push(i);
        }
      }

      if (!loaded) {
        this.setState({
          lazyLoadedList: this.state.lazyLoadedList.concat(slidesToLoad)
        });
      }
    } // Slide Transition happens here.
    // animated transition happens to target Slide and
    // non - animated transition happens to current Slide
    // If CSS transitions are false, directly go the current slide.


    if (this.props.useCSS === false) {
      this.setState({
        currentSlide: currentSlide,
        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign.default)({
          left: currentLeft
        }, this.props, this.state))
      }, function () {
        if (this.props.afterChange) {
          this.props.afterChange(currentSlide);
        }
      });
    } else {
      const nextStateChanges = {
        animating: false,
        currentSlide: currentSlide,
        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign.default)({
          left: currentLeft
        }, this.props, this.state)),
        swipeLeft: null
      };

      callback = () => {
        this.setState(nextStateChanges);

        if (this.props.afterChange) {
          this.props.afterChange(currentSlide);
        }

        delete this.animationEndCallback;
      };

      this.setState({
        animating: true,
        currentSlide: currentSlide,
        trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign.default)({
          left: targetLeft
        }, this.props, this.state))
      }, function () {
        this.animationEndCallback = setTimeout(callback, this.props.speed);
      });
    }

    this.autoPlay();
  },
  swipeDirection: function (touchObject) {
    const xDist = touchObject.startX - touchObject.curX;
    const yDist = touchObject.startY - touchObject.curY;
    const r = Math.atan2(yDist, xDist);
    let swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle >= 0 && swipeAngle <= 45 || swipeAngle >= 315 && swipeAngle <= 360) {
      return this.props.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return this.props.rtl === false ? 'right' : 'left';
    }

    if (this.props.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';
  },
  play: function () {
    let nextIndex;

    if (!this.state.mounted) {
      return false;
    }

    if (this.props.rtl) {
      nextIndex = this.state.currentSlide - this.props.slidesToScroll;
    } else {
      if (this.canGoNext(Object.assign({}, this.props, this.state))) {
        nextIndex = this.state.currentSlide + this.props.slidesToScroll;
      } else {
        return false;
      }
    }

    this.slideHandler(nextIndex);
  },
  autoPlay: function () {
    if (this.state.autoPlayTimer) {
      clearTimeout(this.state.autoPlayTimer);
    }

    if (this.props.autoplay) {
      this.setState({
        autoPlayTimer: setTimeout(this.play, this.props.autoplaySpeed)
      });
    }
  },
  pause: function () {
    if (this.state.autoPlayTimer) {
      clearTimeout(this.state.autoPlayTimer);
      this.setState({
        autoPlayTimer: null
      });
    }
  }
};
var _default = helpers;
exports.default = _default;