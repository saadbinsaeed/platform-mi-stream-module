"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;

var _react = _interopRequireDefault(require("react"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable */
const SlickTrackStyle = _styledComponents.default.div.withConfig({
  displayName: "track__SlickTrackStyle",
  componentId: "sc-3xd3qr-0"
})(["position:relative;left:0;top:0;display:block;&:before,&:after{content:\"\";display:table;}&:after{clear:both;}.slick-loading &{visibility:hidden;}"]);

var getSlideClasses = spec => {
  var slickActive, slickCenter, slickCloned;
  var centerOffset, index;

  if (spec.rtl) {
    index = spec.slideCount - 1 - spec.index;
  } else {
    index = spec.index;
  }

  slickCloned = index < 0 || index >= spec.slideCount;

  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2);
    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;

    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
      slickActive = true;
    }
  } else {
    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
  }

  return (0, _classnames.default)({
    'slick-slide': true,
    'slick-active': slickActive,
    'slick-center': slickCenter,
    'slick-cloned': slickCloned
  });
};

var getSlideStyle = function (spec) {
  var style = {};

  if (spec.variableWidth === undefined || spec.variableWidth === false) {
    style.width = spec.slideWidth;
  }

  if (spec.fade) {
    style.position = 'relative';
    style.left = -spec.index * spec.slideWidth;
    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
  }

  return style;
};

var getKey = (child, fallbackKey) => {
  // key could be a zero
  return child.key === null || child.key === undefined ? fallbackKey : child.key;
};

var renderSlides = function (spec) {
  var key;
  var slides = [];
  var preCloneSlides = [];
  var postCloneSlides = [];

  var count = _react.default.Children.count(spec.children);

  _react.default.Children.forEach(spec.children, (elem, index) => {
    let child;
    var childOnClickOptions = {
      message: 'children',
      index: index,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide
    };

    if (!spec.lazyLoad | (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)) {
      child = elem;
    } else {
      child = _react.default.createElement("div", null);
    }

    var childStyle = getSlideStyle((0, _objectAssign.default)({}, spec, {
      index: index
    }));
    var slickClasses = getSlideClasses((0, _objectAssign.default)({
      index: index
    }, spec));
    var cssClasses;

    if (child.props.className) {
      cssClasses = (0, _classnames.default)(slickClasses, child.props.className);
    } else {
      cssClasses = slickClasses;
    }

    const onClick = function (e) {
      child.props && child.props.onClick && child.props.onClick(e);

      if (spec.focusOnSelect) {
        spec.focusOnSelect(childOnClickOptions);
      }
    };

    slides.push(_react.default.cloneElement(child, {
      key: 'original' + getKey(child, index),
      'data-index': index,
      className: cssClasses,
      tabIndex: '-1',
      style: (0, _objectAssign.default)({
        outline: 'none'
      }, child.props.style || {}, childStyle),
      onClick
    })); // variableWidth doesn't wrap properly.

    if (spec.infinite && spec.fade === false) {
      var infiniteCount = spec.variableWidth ? spec.slidesToShow + 1 : spec.slidesToShow;

      if (index >= count - infiniteCount) {
        key = -(count - index);
        preCloneSlides.push(_react.default.cloneElement(child, {
          key: 'precloned' + getKey(child, key),
          'data-index': key,
          className: cssClasses,
          style: (0, _objectAssign.default)({}, child.props.style || {}, childStyle),
          onClick
        }));
      }

      if (index < infiniteCount) {
        key = count + index;
        postCloneSlides.push(_react.default.cloneElement(child, {
          key: 'postcloned' + getKey(child, key),
          'data-index': key,
          className: cssClasses,
          style: (0, _objectAssign.default)({}, child.props.style || {}, childStyle),
          onClick
        }));
      }
    }
  });

  if (spec.rtl) {
    return preCloneSlides.concat(slides, postCloneSlides).reverse();
  } else {
    return preCloneSlides.concat(slides, postCloneSlides);
  }
};

class Track extends _react.default.Component {
  render() {
    var slides = renderSlides.call(this, this.props);
    return _react.default.createElement(SlickTrackStyle, {
      className: "slick-track",
      style: this.props.trackStyle
    }, slides);
  }

}

exports.Track = Track;