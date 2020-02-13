"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const right = {
  position: 'absolute',
  width: '10px',
  cursor: 'col-resize',
  right: '0px',
  top: '0px',
  bottom: '0px'
};
/**
 * Column header wrapper.
 */

class DataTableColumnHeader extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "element", null);

    _defineProperty(this, "dragStartedAt", 0);

    _defineProperty(this, "onClick", event => {
      event.stopPropagation();
    });

    _defineProperty(this, "onDragStart", e => {
      e.stopPropagation();

      if (!e.nativeEvent || !Number.isFinite(e.nativeEvent.screenX)) {
        return;
      }

      this.dragStartedAt = e.nativeEvent.screenX;
    });

    _defineProperty(this, "onDragEnd", e => {
      e.preventDefault();
      e.stopPropagation();

      if (!this.element || !e.nativeEvent || !Number.isFinite(e.nativeEvent.screenX)) {
        return;
      }

      const th = this.element.closest('th');

      if (!th || !Number.isFinite(th.offsetWidth)) {
        return;
      }

      const dragEndedAt = e.nativeEvent.screenX;
      const resize = dragEndedAt - this.dragStartedAt;
      const width = th.offsetWidth;
      const newWidth = Math.max(20, width + resize); // if less than 20 px I can't resize the column

      this.props.onColumnResize(this.props.columnDef.field, newWidth);
    });
  }

  /**
   * @override
   */
  render() {
    const {
      columnDef
    } = this.props;
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      _react.default.createElement("div", {
        ref: el => {
          this.element = el;
        },
        style: {
          display: 'inline'
        }
      }, columnDef && columnDef.header, _react.default.createElement("div", {
        style: right,
        draggable: "true",
        onClick: this.onClick,
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd
      }))
      /* eslint-enable jsx-a11y/no-static-element-interactions */

    );
  }

}

_defineProperty(DataTableColumnHeader, "propTypes", {
  columnDef: _propTypes.default.object.isRequired,
  onColumnResize: _propTypes.default.func.isRequired
});

var _default = DataTableColumnHeader;
exports.default = _default;