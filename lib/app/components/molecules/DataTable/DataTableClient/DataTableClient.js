"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _DataTable = require("primereact/components/datatable/DataTable");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _lo = require("app/utils/lo/lo");

var _usersActions = require("store/actions/admin/usersActions");

var _gridActions = require("store/actions/grid/gridActions");

var _DataTableStyle = require("../DataTableStyle");

var _AbstractTable = require("../AbstractTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Class for rendering client side data table;
 */
class DataTableClient extends _AbstractTable.AbstractTable {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildStyle", (0, _memoizeOne.default)(columnComponents => {
      const minWidth = this.calculateMinWidth(columnComponents);
      return {
        minWidth,
        overflowX: 'hidden'
      };
    }));
  }

  /**
   * @override
   */
  render() {
    const columnComponents = this.buildColumnComponents();
    const {
      filters
    } = this.state;
    return _react.default.createElement(_DataTableStyle.DataTableContainer, {
      style: this.buildStyle(columnComponents)
    }, _react.default.createElement(_DataTable.DataTable, _extends({}, this.props, {
      filters: { ...filters
      }
    }), columnComponents));
  }

}

_defineProperty(DataTableClient, "propTypes", { ..._AbstractTable.AbstractTable.propTypes
});

var _default = (0, _reactRedux.connect)((state, props) => ({
  tablePreferences: (0, _lo.get)(state, `user.preferences.dataTable.${props.dataTableId}`),
  tableReduxState: (0, _lo.get)(state, `grid.state.${props.dataTableId}`)
}), {
  saveDataTablePreferences: _usersActions.saveDataTablePreferences,
  resetDataTablePreferences: _usersActions.resetDataTablePreferences,
  saveDataTableState: _gridActions.saveDataTableState
})(DataTableClient);

exports.default = _default;