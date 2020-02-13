"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _platformUi = require("@mic3/platform-ui");

var _reactDeviceDetect = require("react-device-detect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe

/**
 * A view to filter data
 */
const FiltersDrawer = ({
  children,
  classes,
  open,
  onClose,
  onApply
}) => _react.default.createElement(_platformUi.SwipeableDrawer, {
  open: open,
  anchor: "right",
  PaperProps: {
    className: classes.root
  },
  onClose: onClose,
  variant: _reactDeviceDetect.isBrowser ? 'persistent' : 'temporary'
}, _react.default.createElement(_platformUi.Grid, {
  className: classes.appBar,
  justify: "flex-start",
  alignItems: "center",
  container: true
}, _react.default.createElement(_platformUi.IconButton, {
  onClick: onClose
}, _react.default.createElement(_platformUi.MdiIcon, {
  name: "chevron-right"
})), _react.default.createElement(_platformUi.Typography, {
  variant: "h6",
  className: classes.grow
}, "Filter"), _react.default.createElement(_platformUi.Button, {
  variant: "text",
  className: classes.applyButton,
  onClick: onApply
}, "Apply"), _react.default.createElement(_platformUi.Divider, null)), _react.default.createElement(_platformUi.Grid, {
  className: classes.content
}, children));

FiltersDrawer.propTypes = {
  children: _propTypes.default.node.isRequired,
  classes: _propTypes.default.object.isRequired,
  onApply: _propTypes.default.func,
  onClose: _propTypes.default.func,
  open: _propTypes.default.bool
};

const styles = theme => ({
  root: {
    width: '290px',
    overflowY: 'auto',
    zIndex: theme.zIndex.drawer,
    WebkitOverflowScrolling: 'touch',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    outline: 'none',
    backgroundColor: '#343A45'
  },
  grow: {
    flexGrow: 1,
    paddingTop: '3px'
  },
  applyButton: {
    marginRight: '8px',
    marginTop: '6px'
  },
  appBar: {
    position: 'sticky',
    top: 0,
    minHeight: '55px',
    zIndex: 3,
    backgroundColor: '#343A45',
    borderBottom: '1px solid #bec1c3'
  },
  content: {
    matginTop: '65px'
  }
});

var _default = (0, _react.memo)((0, _platformUi.withStyles)(styles)(FiltersDrawer));

exports.default = _default;