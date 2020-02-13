"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 */
class StatefulInput extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "onChange", event => {
      const {
        target,
        name,
        value
      } = event;

      if (name) {
        this.setState({
          value
        });
      } else if (target && target.name) {
        this.setState({
          value: target.value
        });
      }

      this.props.onChange(event);
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
      children,
      ...rest
    } = this.props;
    const Component = children;
    return _react.default.createElement(Component, _extends({}, rest, {
      value: this.state.value,
      onChange: this.onChange
    }));
  }

}

var _default = Component => props => _react.default.createElement(StatefulInput, _extends({}, props, {
  children: Component
}));

exports.default = _default;