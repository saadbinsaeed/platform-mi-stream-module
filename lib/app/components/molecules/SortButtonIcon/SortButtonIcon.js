"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component for showing ordering state
 */
class SortButtonIcon extends _react.PureComponent {
  /**
   * Set our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "icon", void 0);

    _defineProperty(this, "componentDidMount", () => {
      this.setIcon();
    });

    _defineProperty(this, "handleClick", () => {
      this.setIcon();
      this.props.onClick && this.props.onClick(this.state.direction);
    });

    _defineProperty(this, "setIcon", () => {
      if (this.state.direction === 'asc') {
        this.icon = 'sort-ascending';
        this.setState({
          direction: 'desc'
        });
      } else if (this.state.direction === 'desc') {
        this.icon = 'sort-descending';
        this.setState({
          direction: 'asc'
        });
      }
    });

    this.state = {
      direction: props.direction || 'asc'
    };
  }

  /**
   * Render our ascending / descending icon
   */
  render() {
    return _react.default.createElement(_ButtonIcon.default, {
      icon: this.icon,
      onClick: this.handleClick
    });
  }

}

_defineProperty(SortButtonIcon, "propTypes", {
  direction: _propTypes.default.string
});

var _default = SortButtonIcon;
exports.default = _default;