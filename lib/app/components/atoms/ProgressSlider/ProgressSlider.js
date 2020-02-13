"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.trackPosition = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _event = require("app/utils/http/event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const trackPosition = ({
  thumbSize,
  height
}) => ({
  top: (thumbSize - Math.min(height, thumbSize)) / 2,
  height
});

exports.trackPosition = trackPosition;

const Container = _styledComponents.default.div.withConfig({
  displayName: "ProgressSlider__Container",
  componentId: "sc-1iub7qp-0"
})(["input[type='range']::-moz-focus-outer{border:0;}input[type=range]::-ms-track{width:100%;height:100%;-webkit-appearance:none;margin:0px;padding:0px;border:0 none;background:transparent;color:transparent;overflow:visible;}input[type=range]::-moz-range-track{width:100%;height:100%;-moz-appearance:none;margin:0px;padding:0px;border:0 none;background:transparent;color:transparent;overflow:visible;}input[type=range]{cursor:", ";-webkit-appearance:none;padding:0px;border:0 none;background:transparent;color:transparent;overflow:visible;}input[type=range]:focus::-webkit-slider-runnable-track{background:transparent;border:transparent;}input[type=range]:focus{outline:none;}input[type=range]::-ms-thumb{width:12px;height:12px;border-radius:0px;border:0 none;background:transparent;}input[type=range]::-moz-range-thumb{width:12px;height:12px;border-radius:0px;border:0 none;background:transparent;}input[type=range]::-webkit-slider-thumb{width:12px;height:12px;border-radius:0px;border:0 none;background:transparent;-webkit-appearance:none;}input[type=range]::-ms-fill-lower{background:transparent;border:0 none;}input[type=range]::-ms-fill-upper{background:transparent;border:0 none;}input[type=range]::-ms-tooltip{display:none;}"], ({
  disabled
}) => disabled ? 'default' : 'pointer');

const baseStyles = {
  baseDiv: {
    border: '0 none',
    position: 'relative',
    left: 0,
    top: 0,
    overflow: 'visible'
  },
  track: {
    border: 0,
    position: 'absolute',
    width: `100%`
  },
  fill: {
    border: 0,
    position: 'absolute',
    pointerEvents: 'none'
  },
  thumb: {
    position: 'absolute',
    top: 0,
    border: '0 none',
    padding: 0,
    margin: 0,
    textAlign: 'center',
    pointerEvents: 'none',
    boxShadow: '0 0 3px black'
  },
  input: {
    top: 0,
    WebkitAppearance: 'none',
    background: 'transparent',
    position: 'absolute',
    left: 0,
    overflow: 'visible'
  }
};
/**
 *
 */

class ProgressSlider extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "propagateOnChange", (0, _utils.debounce)(() => {
      const {
        name
      } = this.props;
      const {
        value
      } = this.state;
      this.props.onChange && this.props.onChange((0, _event.createEvent)('change', {
        name,
        value
      }));
    }, 300));

    _defineProperty(this, "onChange", event => {
      const {
        disabled
      } = this.props;

      if (disabled) {
        return;
      }

      const value = Number((0, _lo.get)(event, 'nativeEvent.target.value') || 0);
      this.setState({
        value
      }, this.propagateOnChange);
    });

    this.state = {
      value: props.value
    };
  }

  componentDidUpdate(prevProps) {
    const {
      value
    } = this.props;

    if (value !== prevProps.value && value !== this.state.value) {
      this.setState({
        value
      });
    }
  }

  render() {
    const {
      min,
      max,
      thumbSize,
      width,
      trackColor,
      height,
      fillColor,
      thumbColor,
      alt,
      disabled
    } = this.props;
    const val = Math.min(max, this.state.value);
    const percentProgress = val / (max - min);
    const componentHeight = Math.max(height, thumbSize);
    const newTrackColor = fillColor && !trackColor ? `${fillColor}44` : trackColor || '#c4c2c2';
    return _react.default.createElement("div", {
      style: {
        width: width
      }
    }, _react.default.createElement("div", {
      id: "rrp-baseDiv",
      style: { ...baseStyles.baseDiv,
        height: componentHeight
      }
    }, _react.default.createElement(Container, {
      disabled: disabled
    }, _react.default.createElement("div", {
      id: "rrp-track",
      style: { ...baseStyles.track,
        borderRadius: height,
        background: newTrackColor,
        ...trackPosition(this.props)
      }
    }), _react.default.createElement("div", {
      id: "rrp-fill",
      style: { ...baseStyles.fill,
        borderRadius: height,
        background: fillColor,
        width: `calc(100% * ${percentProgress} + ${(1 - percentProgress) * componentHeight}px)`,
        ...trackPosition(this.props)
      }
    }), disabled ? null : _react.default.createElement("div", {
      id: "rrp-thumb",
      style: { ...baseStyles.thumb,
        width: componentHeight,
        height: componentHeight,
        borderRadius: componentHeight,
        background: thumbColor,
        left: `calc((100% - ${componentHeight}px) * ${percentProgress})`
      },
      alt: alt
    }), _react.default.createElement("input", {
      style: { ...trackPosition(this.props),
        width: `calc(100% - ${componentHeight}px)`,
        marginLeft: componentHeight / 2,
        marginRight: componentHeight / 2,
        height: componentHeight,
        ...baseStyles.input
      },
      type: "range",
      onChange: this.onChange,
      onMouseUp: this.props.onMouseUp,
      min: min,
      max: max,
      alt: alt
    }))));
  }

}

_defineProperty(ProgressSlider, "propTypes", {
  fillColor: _propTypes.default.string,
  trackColor: _propTypes.default.string,
  thumbColor: _propTypes.default.string,
  height: _propTypes.default.number,
  thumbSize: _propTypes.default.number,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  onChange: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  disabled: _propTypes.default.bool
});

_defineProperty(ProgressSlider, "defaultProps", {
  thumbColor: 'white',
  thumbSize: 12,
  height: 6,
  min: 0,
  max: 100,
  width: '100%',
  value: 0,
  priority: 0
});

var _default = ProgressSlider;
exports.default = _default;