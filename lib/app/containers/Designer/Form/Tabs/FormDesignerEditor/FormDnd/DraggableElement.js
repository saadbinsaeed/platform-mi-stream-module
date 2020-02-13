"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const elementHandler = {
  beginDrag(props) {
    props.onDragStart && props.onDragStart({ ...props
    });
    return { ...props.element
    };
  },

  endDrag(props) {
    props.onDragEnd && props.onDragEnd({ ...props
    });
  }

};

const elementCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const Element = ({
  connectDragSource,
  isDragging,
  children,
  element,
  style
}) => connectDragSource(_react.default.createElement("div", {
  style: {
    opacity: isDragging ? .2 : 1,
    position: 'relative',
    fontSize: 22,
    fontWeight: 'bold',
    cursor: 'move',
    ...style
  }
}, children));

const DraggableElement = (0, _reactDnd.DragSource)('ELEMENT', elementHandler, elementCollect)(Element);
var _default = DraggableElement;
exports.default = _default;