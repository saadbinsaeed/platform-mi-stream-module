"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Button used to upload a file
 */
class UploadInput extends _react.Component {
  /**
   * @public
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "input", void 0);

    this.onFileSelect = this.onFileSelect.bind(this);
  }
  /**
   * @override
   */


  render() {
    return this.props.loading ? _react.default.createElement(_Loader.default, {
      radius: "20"
    }) : _react.default.createElement("input", {
      type: "file",
      onChange: this.onFileSelect,
      ref: c => {
        this.input = c;
      }
    });
  }
  /**
   * This function is called every time the user selects a file.
   *
   * @param event SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */


  onFileSelect(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.input && this.input.files && this.input.files[0] && !this.props.loading && this.props.onSelect) {
      this.props.onSelect(this.input.files[0]);
      if (this.input) this.input.value = '';
    }
  }

}

_defineProperty(UploadInput, "propTypes", {
  loading: _propTypes.default.bool,
  onSelect: _propTypes.default.func.isRequired,
  value: _propTypes.default.string
});

_defineProperty(UploadInput, "defaultProps", {
  loading: false
});

var _default = UploadInput;
exports.default = _default;