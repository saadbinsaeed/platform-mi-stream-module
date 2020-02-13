"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _DataTable = require("primereact/components/datatable/DataTable");

var _reactDeviceDetect = require("react-device-detect");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _usersActions = require("store/actions/admin/usersActions");

var _gridActions = require("store/actions/grid/gridActions");

var _appActions = require("store/actions/app/appActions");

var _AbstractTable = require("../AbstractTable");

var _DataTableColumnsSidebar = _interopRequireDefault(require("../common/DataTableColumnsSidebar"));

var _DataTableHeader = _interopRequireDefault(require("../common/DataTableHeader"));

var _DataTablePaginator = _interopRequireDefault(require("../common/DataTablePaginator"));

var _DataTableStyle = require("../DataTableStyle");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledPrimeDataTable = (0, _styledComponents.default)(_DataTable.DataTable).withConfig({
  displayName: "DataTable__StyledPrimeDataTable",
  componentId: "sc-1txmlsg-0"
})([".ui-datatable-scrollable-body{max-height:calc(100% - 100px) !important;}"]);
/**
 * Displays data in tabular format.
 */

class DataTable extends _AbstractTable.AbstractTable {
  // $FlowFixMe
  // $FlowFixMe

  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columns", void 0);

    _defineProperty(this, "loadParams", void 0);

    _defineProperty(this, "queryOptions", {
      orderBy: [],
      where: [],
      page: 1,
      pageSize: 10
    });

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "table", void 0);

    _defineProperty(this, "unmounting", false);

    _defineProperty(this, "lastClickedRow", void 0);

    _defineProperty(this, "tableRef", _react.default.createRef());

    _defineProperty(this, "containerRef", _react.default.createRef());

    _defineProperty(this, "exportDataTable", () => {
      super.exportData();
    });

    _defineProperty(this, "setTableBounds", (0, _utils.debounce)(() => {
      // we need to check if the component is mounted because of the debounce delay
      if (this.unmounting) {
        return;
      }

      const rect = this.tableRef.current && this.tableRef.current.getBoundingClientRect();

      if (!(0, _utils.shallowEquals)(this.state.rect, rect || {})) {
        this.setState({
          rect,
          gridKey: this.state.gridKey + 1
        });
      }
    }, 300));

    _defineProperty(this, "loadData", (0, _utils.debounce)(() => {
      if (!this.state.freezeData) {
        this.props.loadRows(this.buildQueryOptions());
      } else {
        this.setState({
          freezeData: false
        });
      }
    }, 700));

    _defineProperty(this, "onRowClick", ({
      data,
      index,
      originalEvent
    }) => {
      if (originalEvent.shiftKey && this.lastClickedRow >= 0) {
        if (this.lastClickedRow < index) {
          const selected = this.props.value.slice(this.lastClickedRow, index + 1);
          this.onSelectionChange({
            originalEvent,
            data: selected
          });
        }
      } else {
        this.lastClickedRow = index;
      }

      if (this.props.onRowClick) {
        this.props.onRowClick({
          data,
          index,
          originalEvent
        });
      }
    });

    _defineProperty(this, "buildDataTableContainerStyle", (0, _memoizeOne.default)(height => ({
      height: height || `calc(100% - 113px)`
    })));

    _defineProperty(this, "buildDataTableSubContainerStyle", (0, _memoizeOne.default)(minWidth => ({
      minWidth
    })));

    _defineProperty(this, "dataTableWrapperStyle", {
      height: '100%',
      overflow: 'auto',
      maxWidth: '100%'
    });

    _defineProperty(this, "getFilters", (0, _memoizeOne.default)(settings => ({ ...(settings.filters || {})
    })));

    _defineProperty(this, "getSort", (0, _memoizeOne.default)(settings => [...(settings.sort || [])]));

    this.changePage = this.changePage.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onLazyLoad = this.onLazyLoad.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.saveUserPreferences = this.saveUserPreferences.bind(this);
    this.toggleRow = this.toggleRow.bind(this);

    if (props.refreshRef) {
      props.refreshRef(this.loadData);
    }

    this.state = { ...this.state,
      gridKey: 1,
      // key used to force the grid render
      page: (0, _lo.get)(props, 'tableReduxState.page') || 1,
      settingsOpen: false,
      selection: []
    };
  }
  /**
   * @override
   */


  getDefaultPreferences() {
    return { ...super.getDefaultPreferences(),
      pageSize: 10
    };
  }
  /**
   * @override
   */


  resetUserPreferences() {
    super.resetUserPreferences();
    this.loadData();
  }
  /**
   * @override
   */


  restoreUserPreferences() {
    super.restoreUserPreferences();
    this.loadData();
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      tablePreferences,
      tableReduxState
    } = prevProps;
    const props = this.props;

    if (props.selection && props.selection.length && this.state.selection !== props.selection) {
      this.setState({
        selection: props.selection
      });
    }

    if (tablePreferences !== props.tablePreferences) {
      this.setState({ ...this.buildPreferences(props),
        gridKey: prevState.gridKey + 1,
        freezeData: false
      });
    } else if (tableReduxState !== props.tableReduxState) {
      this.setState({ ...this.buildPreferences(props)
      });
    }

    super.componentDidUpdate(prevProps, prevState, snapshot);
  }
  /**
   * @override
   */


  componentDidMount() {
    this.props.onMount && this.props.onMount({
      refresh: this.loadData
    });
    this.setTableBounds();
    window.addEventListener('resize', this.setTableBounds);
    const ref = this.containerRef.current;
    ref && ref.addEventListener('scroll', () => {
      ref.focus();
      ref.click();
    });
  }
  /**
   * @override
   */


  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableBounds);
    this.unmounting = true;
  }

  /**
   * Call function for server side filtering
   * @param event
   */
  onLazyLoad(event) {
    const {
      multiSortMeta,
      sortField,
      sortOrder
    } = event;
    let sort = multiSortMeta || this.state.settings.sort || [];

    if (!multiSortMeta && sortField) {
      sort = [{
        field: sortField,
        order: sortOrder
      }];
    }

    this.setState({
      settings: (0, _lo.set)(this.state.settings, 'sort', sort)
    }, this.loadData);
  }
  /**
   *
   */


  onFilter({
    filters
  }) {
    super.onFilter({
      filters
    });
    this.loadData();
  }
  /**
   * @override
   */


  filter(options) {
    return super.filter(options).then(() => {
      this.setState({
        page: 1
      }, this.loadData);
    });
  }
  /**
   * Function call for pagination
   * @param event
   */


  changePage({
    first,
    rows
  }) {
    const page = first / rows + 1;

    if (page !== this.state.page || rows !== this.state.settings.pageSize) {
      this.setState({
        settings: (0, _lo.set)(this.state.settings, 'pageSize', rows),
        page
      }, this.loadData);
    }
  }
  /**
   *
   */


  onGlobalSearch(event) {
    return super.onGlobalSearch(event).then(() => {
      this.setState({
        page: 1
      }, this.loadData);
    });
  }
  /**
   * @override
   */


  onColumnResize(field, width) {
    super.onColumnResize(field, width);
  }
  /**
   * Template for expanded rowsabox/processes-list
   */


  rowExpansionTemplate(data) {
    const Template = this.props.childTemplate;
    const id = data && data[0].id || 0; //  This is a shit way of getting the ID - FIX @Ian

    return _react.default.createElement(Template, {
      id: id
    });
  }
  /**
   *
   */


  toggleRow(event) {
    this.setState({
      expandedRows: event.data
    });
    this.props.onRowToggle && this.props.onRowToggle(event);
  }
  /**
   *
   */


  onSelectionChange({
    originalEvent,
    data
  }) {
    if (this.props.dataKey) {
      // without the data key the Primereact DataGrid is using ObjectUtils.equalsByValue to compare the Object
      // because ObjectUtils.equalsByValue is trying to set the property _$visited during the compare
      // and because our data is Immutable this will produce the error:
      // TypeError: Cannot add property _$visited, object is not extensible
      this.setState({
        selection: data
      });

      if (this.props.onSelectionChange) {
        this.props.onSelectionChange({
          originalEvent,
          data
        });
      }
    }
  }

  renderDataTableHeader() {
    const {
      settings
    } = this.state;
    const {
      globalFilter
    } = settings || {};
    const {
      SubDataTable,
      renderDataTableHeader,
      disableGlobalFilter,
      disableCountdown,
      isLoading,
      noRefresh,
      disableExport,
      downloadAll,
      isDownloading,
      showMenuButton,
      toggleMenu
    } = this.props;
    const props = {
      onGlobalSearch: disableGlobalFilter ? null : globalFilter && this.onGlobalSearch,
      globalSearchValue: (0, _lo.get)(globalFilter, 'value'),
      toggleSettings: this.toggleSettings,
      disableCountdown: disableCountdown || isLoading,
      countdownSeconds: 180,
      refreshAction: !noRefresh && this.loadData,
      exportData: disableExport ? null : this.exportDataTable,
      downloadAll: downloadAll,
      isDownloading: isDownloading,
      showMenuButton: showMenuButton,
      toggleMenu: toggleMenu
    };

    if (renderDataTableHeader) {
      return renderDataTableHeader(props);
    }

    if (!SubDataTable) {
      return _react.default.createElement(_DataTableHeader.default, props);
    }

    return null;
  }
  /**
   * @override
   */


  render() {
    const {
      savePreferences,
      isLoading,
      height,
      columnDefinitions,
      // eslint-disable-line no-unused-vars
      loadRows,
      // eslint-disable-line no-unused-vars
      totalRecords,
      noRefresh,
      SubDataTable,
      disableGlobalFilter,
      disableCountdown,
      disableExport,
      onSelectionChange,
      // eslint-disable-line no-unused-vars
      countMax,
      renderDataTableHeader,
      ...primeDataTableProps
    } = this.props;

    if (onSelectionChange && !this.props.dataKey) {
      throw new Error('You need to specify the property "dataKey" to enable the "onSelectionChange" listener');
    }

    if (this.props.selectionMode && !this.props.dataKey) {
      throw new Error(`You need to specify the property "dataKey" to enable the "selectionMode" "${this.props.selectionMode}"`);
    }

    const {
      selection,
      settings,
      page
    } = this.state;
    const columnComponents = this.buildColumnComponents();
    const minWidth = this.calculateMinWidth(columnComponents);
    const rectHeight = Number((0, _lo.get)(this.state, 'rect.height'));
    const scrollHeight = `${rectHeight - (_reactDeviceDetect.isBrowser ? 180 : 160)}px`;
    const sortField = (0, _lo.get)(this.state, 'settings.sort[0].field', 'null');
    const sortOrder = (0, _lo.get)(this.state, 'settings.sort[0].order', null);
    return _react.default.createElement("div", {
      className: 'data-table-wrapper',
      style: this.dataTableWrapperStyle,
      ref: this.tableRef
    }, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true
    }), this.renderDataTableHeader(), _react.default.createElement(_DataTableStyle.DataTableContainer, {
      className: "data-table-container",
      style: this.buildDataTableContainerStyle(height),
      innerRef: this.containerRef
    }, _react.default.createElement("div", {
      style: this.buildDataTableSubContainerStyle(minWidth)
    }, !!rectHeight && _react.default.createElement(StyledPrimeDataTable, _extends({
      sortField: sortField,
      sortOrder: sortOrder,
      scrollable: true,
      scrollHeight: scrollHeight
    }, primeDataTableProps, {
      filters: this.getFilters(settings),
      multiSortMeta: this.getSort(settings),
      rows: settings.pageSize,
      totalRecords: totalRecords,
      key: this.state.gridKey,
      onFilter: this.onFilter,
      lazy: true,
      onLazyLoad: this.onLazyLoad,
      sortMode: "multiple",
      chldTemplate: this.rowExpansionTemplate,
      expandedRows: this.state.expandedRows,
      onRowToggle: this.toggleRow,
      onSelectionChange: this.onSelectionChange,
      selection: selection,
      onRowClick: this.onRowClick
    }), columnComponents))), !SubDataTable && _react.default.createElement(_react.Fragment, null, Number.isFinite(totalRecords) && _react.default.createElement(_DataTablePaginator.default, {
      page: page,
      pageSize: settings.pageSize,
      totalRecords: totalRecords,
      countMax: countMax,
      onPageChange: this.changePage
    }), _react.default.createElement(_DataTableColumnsSidebar.default, {
      isOpen: this.state.settingsOpen,
      toggle: this.toggleSettings,
      onChange: this.setColumns,
      columns: this.columns,
      columnsState: this.state.settings.columns,
      loadUserPreferences: savePreferences && this.restoreUserPreferences,
      saveUserPreferences: savePreferences && this.saveUserPreferences,
      resetUserPreferences: savePreferences && this.resetUserPreferences
    })));
  }

}

_defineProperty(DataTable, "propTypes", { ..._AbstractTable.AbstractTable.propTypes,
  name: _propTypes.default.string,
  loadRows: _propTypes.default.func.isRequired,
  savePreferences: _propTypes.default.bool,
  isDownloading: _propTypes.default.bool,
  disableGlobalFilter: _propTypes.default.bool,
  disableCountdown: _propTypes.default.bool,
  disableExport: _propTypes.default.bool,
  records: _propTypes.default.array,
  SubDataTable: _propTypes.default.bool,
  totalRecords: _propTypes.default.number,
  countMax: _propTypes.default.number,
  queryParams: _propTypes.default.any,
  noRefresh: _propTypes.default.bool,
  dataKey: _propTypes.default.string,
  dataTableId: _propTypes.default.string,
  downloadAll: _propTypes.default.bool,
  customWhere: _propTypes.default.array,
  excludeBy: _propTypes.default.array,
  renderDataTableHeader: _propTypes.default.func
});

var _default = (0, _reactRedux.connect)((state, props) => ({
  tablePreferences: (0, _lo.get)(state, `user.preferences.dataTable.${props.dataTableId}`),
  tableReduxState: (0, _lo.get)(state, `grid.state.${props.dataTableId}`)
}), {
  saveDataTablePreferences: _usersActions.saveDataTablePreferences,
  resetDataTablePreferences: _usersActions.resetDataTablePreferences,
  saveDataTableState: _gridActions.saveDataTableState,
  showToastr: _appActions.showToastr
})(DataTable);

exports.default = _default;