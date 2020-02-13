"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _json2mq = _interopRequireDefault(require("json2mq"));

var _canUseDom = _interopRequireDefault(require("can-use-dom"));

var _innerSlider = require("./inner-slider");

var _defaultProps = _interopRequireDefault(require("./default-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const enquire = _canUseDom.default && require('enquire.js');
/**
 *
 */


class Slider extends _react.PureComponent {
  /**
   *
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "innerSlider", null);

    _defineProperty(this, "_responsiveMediaHandlers", []);

    this.state = {
      breakpoint: null
    };
    this.innerSliderRefHandler = this.innerSliderRefHandler.bind(this);
  }
  /**
   *
   */


  innerSliderRefHandler(ref) {
    this.innerSlider = ref;
  }
  /**
   *
   */


  media(query, handler) {
    enquire.register(query, handler);

    this._responsiveMediaHandlers.push({
      query,
      handler
    });
  }
  /**
   *
   */


  componentWillMount() {
    if (this.props.responsive) {
      const breakpoints = this.props.responsive.map(breakpt => breakpt.breakpoint);
      breakpoints.sort((x, y) => x - y);
      breakpoints.forEach((breakpoint, index) => {
        let bQuery;

        if (index === 0) {
          bQuery = (0, _json2mq.default)({
            minWidth: 0,
            maxWidth: breakpoint
          });
        } else {
          bQuery = (0, _json2mq.default)({
            minWidth: breakpoints[index - 1],
            maxWidth: breakpoint
          });
        }

        _canUseDom.default && this.media(bQuery, () => {
          this.setState({
            breakpoint: breakpoint
          });
        });
      }); // Register media query for full screen. Need to support resize from small to large

      const query = (0, _json2mq.default)({
        minWidth: breakpoints.slice(-1)[0]
      });
      _canUseDom.default && this.media(query, () => {
        this.setState({
          breakpoint: null
        });
      });
    }
  }
  /**
   *
   */


  componentWillUnmount() {
    this._responsiveMediaHandlers.forEach(function (obj) {
      enquire.unregister(obj.query, obj.handler);
    });
  }
  /**
   *
   */


  slickPrev() {
    this.innerSlider && this.innerSlider.slickPrev();
  }
  /**
   *
   */


  slickNext() {
    this.innerSlider && this.innerSlider.slickNext();
  }
  /**
   *
   */


  slickGoTo(slide) {
    this.innerSlider && this.innerSlider.slickGoTo(slide);
  }
  /**
   *
   */


  render() {
    let children = this.props.children;

    if (!children) {
      return null;
    }

    if (!Array.isArray(children)) {
      children = [children];
    }

    if (!children.length) {
      return null;
    }

    let settings;
    let newProps;

    if (this.state.breakpoint) {
      newProps = this.props.responsive.filter(resp => resp.breakpoint === this.state.breakpoint);
      settings = newProps[0].settings === 'unslick' ? 'unslick' : Object.assign({}, this.props, newProps[0].settings);
    } else {
      settings = Object.assign({}, _defaultProps.default, this.props);
    } // Children may contain false or null, so we should filter them


    children = children.filter(child => child);

    if (settings === 'unslick') {
      // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
      return _react.default.createElement("div", null, children);
    }

    return _react.default.createElement(_innerSlider.InnerSlider, _extends({
      ref: this.innerSliderRefHandler
    }, settings), children);
  }

}

exports.default = Slider;

_defineProperty(Slider, "propTypes", {
  children: _propTypes.default.array.isRequired
});