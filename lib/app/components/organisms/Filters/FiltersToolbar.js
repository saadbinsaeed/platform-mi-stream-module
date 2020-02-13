"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _platformUi = require("@mic3/platform-ui");

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const inputProps = {
  disableUnderline: true
};

const FiltersToolbar = ({
  children,
  classes,
  toggleDrawer,
  onSearch,
  searchValue,
  leftToolbar,
  rightToolbar,
  isAnyDefinitions
}) => {
  inputProps.className = classes.searchInput;
  const [search, setSearch] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    setSearch(searchValue || '');
  }, [searchValue]);
  const onChangeSearch = (0, _react.useCallback)(event => {
    if (event.persist) {
      event.persist();
    }

    setSearch(event.target.value);
    onSearch(event.target.value);
  }, [onSearch]);
  return _react.default.createElement(_platformUi.Grid, {
    container: true,
    spacing: 16,
    alignItems: "center",
    className: classes.searchBar
  }, leftToolbar, _react.default.createElement(_platformUi.Grid, {
    item: true,
    xs: true
  }, _react.default.createElement(_platformUi.TextField, {
    onChange: onChangeSearch,
    value: search,
    fullWidth: true,
    variant: "standard",
    margin: "none",
    placeholder: "Search...",
    InputProps: inputProps
  })), rightToolbar, isAnyDefinitions && _react.default.createElement(_platformUi.Tooltip, {
    title: "Filters"
  }, _react.default.createElement(_platformUi.IconButton, {
    onClick: toggleDrawer
  }, _react.default.createElement(_platformUi.MdiIcon, {
    name: "filter-variant",
    color: "inherit"
  }))));
};

FiltersToolbar.propTypes = {
  children: _propTypes.default.node.isRequired,
  classes: _propTypes.default.object.isRequired,
  toggleDrawer: _propTypes.default.func.isRequired,
  onSearch: _propTypes.default.func.isRequired,
  isAnyDefinitions: _propTypes.default.bool.isRequired,
  leftToolbar: _propTypes.default.node,
  rightToolbar: _propTypes.default.node
};

const styles = theme => ({
  searchBar: {
    background: _theme.default.filters.toolbarBackground,
    fontSize: theme.typography.fontSize,
    padding: '8px 16px 0px'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  }
});

var _default = (0, _react.memo)((0, _platformUi.withStyles)(styles)(FiltersToolbar));

exports.default = _default;