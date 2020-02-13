"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _Paginator = require("primereact/components/paginator/Paginator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Paginator = (0, _styledComponents.default)(_Paginator.Paginator).withConfig({
  displayName: "DataTablePaginator__Paginator",
  componentId: "xjnnu1-0"
})([".ui-dropdown-label{margin:0;min-height:25px !important;}.ui-inputtext{min-height:20px;}> .ui-paginator-pages a{width:auto;padding:0px 4px}.ui-paginator-right-content{float:none !important;}border:0 none !important;"]);
/**
 * Extends the prime react paginator component for themeing and custom grid pagination
 */

class DataTablePaginator extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildOptions", (0, _fastMemoize.default)(pageSize => [pageSize, ...[10, 20, 30, 50, 100].filter(v => v !== pageSize)]));
  }

  /**
   * Render the Pagination
   */
  render() {
    const {
      page,
      pageSize,
      totalRecords,
      countMax,
      onPageChange
    } = this.props;
    let rightContent = '';

    if (countMax && totalRecords === countMax) {
      rightContent = `more than ${countMax} rows`;
    } else if (Number.isInteger(totalRecords)) {
      rightContent = `${totalRecords} rows`;
    }

    return _react.default.createElement(Paginator, {
      rows: pageSize,
      totalRecords: totalRecords,
      rowsPerPageOptions: this.buildOptions(pageSize),
      first: (page - 1) * pageSize,
      onPageChange: onPageChange,
      rightContent: rightContent
    });
  }

}

_defineProperty(DataTablePaginator, "propTypes", {
  totalRecords: _propTypes.default.number,
  countMax: _propTypes.default.number,
  page: _propTypes.default.number,
  pageSize: _propTypes.default.number,
  onPageChange: _propTypes.default.func
});

var _default = DataTablePaginator;
exports.default = _default;