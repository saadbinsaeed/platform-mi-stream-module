"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EmptyRowTarget = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const renderOverlay = color => {
  return _react.default.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 1,
      opacity: 0.5,
      backgroundColor: color
    }
  });
};

const Row = ({
  x,
  y,
  connectDropTarget,
  isOver,
  canDrop,
  children,
  onDrop,
  element,
  isOverCurrent,
  index,
  ...rest
}) => {
  return connectDropTarget(_react.default.createElement("div", _extends({}, rest, {
    key: index,
    style: {
      position: 'relative',
      width: '100%',
      textAlign: 'center'
    }
  }), children, !isOver && canDrop && renderOverlay('rgba(0, 0, 0, .2)')
  /* the color of the area */
  , isOver && !canDrop && renderOverlay('red')
  /* the color of the row when we can drop */
  , isOver && canDrop && renderOverlay('#1a6eaf')
  /* the color of the row when we cannot drop */
  ));
};

const EmptyRow = ({
  x,
  y,
  connectDropTarget,
  isOver,
  canDrop,
  children,
  onDrop,
  element,
  isOverCurrent,
  ...rest
}) => {
  return _react.default.createElement("div", null, children, connectDropTarget(_react.default.createElement("div", _extends({}, rest, {
    style: {
      position: 'relative',
      width: '100%',
      textAlign: 'center'
    }
  }), isOverCurrent && canDrop ? _react.default.createElement("div", {
    style: {
      height: '60px',
      width: '100%'
    }
  }) : _react.default.createElement("div", {
    style: {
      height: '20px',
      width: '100%'
    }
  }), !isOver && canDrop && renderOverlay('rgba(0, 0, 0, .2)')
  /* the color of the area */
  , isOver && canDrop && renderOverlay('#1a6eaf')
  /* the color of the row when we cannot drop */
  )));
};

const rowHandler = {
  canDrop(props, monitor, component) {
    return props.canDrop ? props.canDrop(props, monitor, component) : true;
  },

  drop(props, monitor, component) {
    props.onDrop && props.onDrop(props, monitor, component);
  },

  hover(props, monitor, component) {
    props.onHover && props.onHover(props, monitor, component);
  }

};

const rowCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  isOverCurrent: monitor.isOver({
    shallow: true
  })
});

const RowTarget = (0, _reactDnd.DropTarget)(['ELEMENT', 'CONTAINER'], rowHandler, rowCollect)(Row);
const EmptyRowTarget = (0, _reactDnd.DropTarget)(['ELEMENT', 'CONTAINER'], rowHandler, rowCollect)(EmptyRow);
exports.EmptyRowTarget = EmptyRowTarget;
var _default = RowTarget;
exports.default = _default;