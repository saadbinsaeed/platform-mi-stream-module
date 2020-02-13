"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _platformUi = require("@mic3/platform-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const FiltersOrderToolbar = ({
  classes,
  onChange,
  sortOptions,
  resultCount,
  orderBy
}) => {
  const onChangeField = (0, _react.useCallback)(e => {
    onChange({ ...orderBy,
      field: e.target.value
    });
  }, [onChange, orderBy]);
  const onChangeOrder = (0, _react.useCallback)(() => {
    onChange({ ...orderBy,
      direction: orderBy.direction === 'desc' ? 'asc' : 'desc'
    });
  }, [onChange, orderBy]);
  const options = (0, _react.useMemo)(() => sortOptions.map(option => _react.default.createElement(_platformUi.MenuItem, {
    key: option.value,
    value: option.value
  }, option.label)), [sortOptions]);
  return _react.default.createElement(_platformUi.Grid, {
    className: classes.appBar,
    container: true,
    spacing: 16,
    alignItems: "center"
  }, _react.default.createElement(_platformUi.Grid, {
    item: true
  }, _react.default.createElement(_platformUi.IconButton, {
    onClick: onChangeOrder
  }, _react.default.createElement(_platformUi.MdiIcon, {
    name: orderBy.direction === 'desc' ? 'arrow-down' : 'arrow-up'
  }))), _react.default.createElement(_platformUi.Grid, {
    item: true
  }, _react.default.createElement(_platformUi.TextField, {
    onChange: onChangeField,
    InputProps: {
      endAdornment: null,
      disableUnderline: true
    },
    variant: "standard",
    margin: "none",
    value: orderBy.field,
    select: true
  }, options)), _react.default.createElement(_platformUi.Grid, {
    item: true,
    className: classes.counter
  }, _react.default.createElement(_platformUi.Typography, {
    align: "right"
  }, resultCount > 999 ? '+999' : resultCount)));
};

FiltersOrderToolbar.propTypes = {
  classes: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func.isRequired,
  sortOptions: _propTypes.default.array.isRequired,
  resultCount: _propTypes.default.number.isRequired,
  orderBy: _propTypes.default.object.isRequired
};

const styles = theme => ({
  appBar: {
    backgroundColor: '#343A45',
    margin: 0
  },
  counter: {
    flexGrow: 1,
    paddingRight: '32px !important'
  }
});

var _default = (0, _platformUi.withStyles)(styles)(FiltersOrderToolbar);

exports.default = _default;