"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ButtonIcon = _interopRequireDefault(require("../../../ButtonIcon/ButtonIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Toggle sub-content for grid
 */
class ToggleSubRenderer extends _react.PureComponent {
  /**
   * Define our prop types for this renderer
   */

  /**
   * Set our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "toggleSubRow", () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
      const rowIndex = this.props.rowIndex; // Hide/Show the row

      let rowData = [];

      if (!this.state.isOpen) {
        rowData = this.props.api.updateRowData({
          add: [{}],
          addIndex: rowIndex + 1
        });
      } else {
        rowData = this.props.api.setRowData(rowIndex);
      } // Return row
      // console.log('props', this.props);
      // console.log('state', this.state);


      return rowData;
    });

    this.state = {
      isOpen: false
    };
  }
  /**
   * Toggle the opening/close of the subPanel
   */


  /**
   * Render our icon with toggle function
   */
  render() {
    const {
      value
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement(_ButtonIcon.default, {
      icon: "arrow-right",
      size: "sm",
      onClick: this.toggleSubRow
    }), value);
  }

}

_defineProperty(ToggleSubRenderer, "propTypes", {
  value: _propTypes.default.string,
  rowIndex: _propTypes.default.number,
  api: _propTypes.default.object,
  isOpen: _propTypes.default.bool
});

var _default = ToggleSubRenderer;
exports.default = _default;