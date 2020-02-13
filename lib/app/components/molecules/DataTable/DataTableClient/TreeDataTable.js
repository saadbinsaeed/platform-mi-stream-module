"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _DataTable = require("primereact/components/datatable/DataTable");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _utils = require("app/utils/utils");

var _CaretRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Caret/CaretRenderer"));

var _lo = require("app/utils/lo/lo");

var _usersActions = require("store/actions/admin/usersActions");

var _gridActions = require("store/actions/grid/gridActions");

var _AbstractTable = require("../AbstractTable");

var _DataTableHeader = _interopRequireDefault(require("../common/DataTableHeader"));

var _DataTableColumnsSidebar = _interopRequireDefault(require("../common/DataTableColumnsSidebar"));

var _DataTableStyle = require("../DataTableStyle");

var _appActions = require("store/actions/app/appActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledPrimeDataTable = (0, _styledComponents.default)(_DataTable.DataTable).withConfig({
  displayName: "TreeDataTable__StyledPrimeDataTable",
  componentId: "sc-13kipxv-0"
})([".ui-datatable-scrollable-body{max-height:calc(100% - 100px) !important;}"]);
/**
 * Displays data in tabular format.
 */

class TreeDataTable extends _AbstractTable.AbstractTable {
  // $FlowFixMe
  // $FlowFixMe

  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "columns", void 0);

    _defineProperty(this, "gridStatus", void 0);

    _defineProperty(this, "loadedChildrenNodes", new Set());

    _defineProperty(this, "isExpandAll", true);

    _defineProperty(this, "tableRef", _react.default.createRef());

    _defineProperty(this, "containerRef", _react.default.createRef());

    _defineProperty(this, "setTableBounds", (0, _utils.debounce)(() => {
      this.setState({
        rect: this.tableRef.current && this.tableRef.current.getBoundingClientRect(),
        gridKey: this.state.gridKey + 1
      });
    }, 300));

    _defineProperty(this, "generateForest", (0, _memoizeOne.default)(data => {
      const itemsMap = (data || []).reduce((map, item) => {
        map[item.id] = { ...item
        }; // eslint-disable-line no-param-reassign

        return map;
      }, {});
      const roots = [];
      const openNodesMap = { ...((0, _lo.get)(this.state, 'settings.openNodesMap') || {})
      };
      Object.entries(itemsMap).forEach(([id, item]) => {
        const parentId = item.parentId;

        if (parentId && itemsMap[parentId]) {
          const parent = itemsMap[parentId];
          parent.children = parent.children || [];
          parent.children.push(item);
          item.parent = parent; // eslint-disable-line no-param-reassign

          openNodesMap[parentId] = !!openNodesMap[parentId];
        } else {
          roots.push(item);
        }
      });
      this.setState({
        settings: (0, _lo.set)(this.state.settings, 'openNodesMap', openNodesMap)
      });
      this.setLevel(roots, 0);
      return roots;
    }));

    _defineProperty(this, "onSelectionChange", ({
      originalEvent,
      data
    }) => {
      const id = data && (data[0] && data[0].id || data.id);
      const openNodesMap = { ...((0, _lo.get)(this.state, 'settings.openNodesMap') || {})
      };
      openNodesMap[id] = !openNodesMap[id];
      this.setState({
        settings: { ...(0, _lo.get)(this.state, 'settings', {}),
          openNodesMap
        },
        selection: this.props.dataKey ? data : []
      });

      if (openNodesMap[id] && this.props.loadChildren && !this.loadedChildrenNodes.has(id)) {
        this.loadedChildrenNodes.add(id);
        this.props.loadChildren(id);
      }
    });

    _defineProperty(this, "addCaret", (0, _memoizeOne.default)(columnsComponents => {
      const FirstColumn = columnsComponents[0];

      if (FirstColumn) {
        const body = FirstColumn.props.body;

        const newBody = (rowData, column) => _react.default.createElement(_CaretRenderer.default, {
          data: rowData
        }, " ", body(rowData, column), " ");

        columnsComponents = (0, _lo.set)(columnsComponents, '[0].props.body', newBody);
      }

      return columnsComponents;
    }, _utils.shallowEquals));

    _defineProperty(this, "expandCollapseAll", () => {
      const open = this.isExpandAll;
      const openNodesMap = { ...((0, _lo.get)(this.state, 'settings.openNodesMap') || {})
      };
      Object.keys(openNodesMap).forEach(key => openNodesMap[key] = open);
      this.setState({
        settings: (0, _lo.set)(this.state.settings, 'openNodesMap', openNodesMap)
      });
      this.isExpandAll = !open;
    });

    _defineProperty(this, "exportTreeData", () => {
      super.exportData();
    });

    _defineProperty(this, "loadData", (0, _utils.debounce)(() => {
      if (!this.state.freezeData && this.props.loadRows) {
        this.props.loadRows(this.buildQueryOptions());
      } else {
        this.setState({
          freezeData: false
        });
      }
    }, 700));

    _defineProperty(this, "filter", options => {
      return super.filter(options).then(() => {
        this.setState({
          page: 1
        }, this.loadData);
      });
    });

    _defineProperty(this, "resetUserPreferences", () => {
      super.resetUserPreferences();
      this.setState({
        page: 1
      }, this.loadData);
    });

    _defineProperty(this, "restoreUserPreferences", () => {
      super.restoreUserPreferences();
      this.setState({
        page: 1
      }, this.loadData);
    });

    Object.entries(this.columns).forEach(([field, column]) => {
      this.columns[field] = { ...column,
        sortable: false
      };
    });
    this.state = (0, _Immutable.default)({ ...this.state,
      data: (0, _lo.get)(props, 'data', []),
      settingsOpen: false,
      gridKey: 0,
      selection: [],
      settings: { ...(this.state.settings || {}),
        openNodesMap: {}
      },
      forest: this.generateForest(this.props.data)
    });
  }
  /**
   * @override
   * @param prevProps the properties that the Component will receive.
   */


  componentDidUpdate(prevProps) {
    const {
      data,
      tablePreferences
    } = this.props;
    let changes = {};

    if (data !== prevProps.data) {
      changes.forest = this.generateForest(data);
    }

    if (tablePreferences !== prevProps.tablePreferences) {
      const pref = this.buildPreferences(this.props);
      changes = { ...changes,
        ...pref
      };
    }

    this.setState(changes);
  }

  /**
   * @override
   */
  componentDidMount() {
    this.loadData();
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
  }
  /**
   *
   */


  setLevel(nodes, level) {
    (nodes || []).forEach(node => {
      node.level = level; // eslint-disable-line no-param-reassign

      this.setLevel(node.children, level + 1);
    });
  }
  /**
   *
   */


  /**
   *
   */
  pushVisibleNodes(data, nodes) {
    (nodes || []).forEach(node => {
      if (node.id && ((0, _lo.get)(this.state, 'settings.openNodesMap') || {})[node.id] && node.children) {
        data.push({ ...node,
          isOpen: true
        });
        this.pushVisibleNodes(data, node.children);
      } else {
        data.push(node);
      }
    });
  }

  buildQueryOptions() {
    const queryOptions = super.buildQueryOptions();
    const {
      settings
    } = this.state;
    const {
      pageSize
    } = settings || {};

    if (pageSize === -1) {
      return { ...queryOptions,
        page: null,
        pageSize: null
      };
    }

    return queryOptions;
  }

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
  render() {
    const {
      dataTableId,
      isLoading,
      height,
      disableExport,
      ...primeDataTableProps
    } = this.props;
    const {
      gridKey,
      forest,
      settings
    } = this.state;
    const filters = settings.filters || {};
    const {
      globalFilter
    } = settings;
    const selection = this.state.selection || [];
    const data = [];
    this.pushVisibleNodes(data, forest);
    const columnsComponents = this.addCaret(this.buildColumnComponents());
    const minWidth = this.calculateMinWidth(columnsComponents);
    const style = {
      height: height || `calc(100% - 40px)`
    };
    const rectHeight = Number((0, _lo.get)(this.state, 'rect.height'));
    const scrollHeight = `${rectHeight - 116}px`;
    return _react.default.createElement("div", {
      className: 'data-table-wrapper',
      style: {
        height: '100%',
        overflow: 'auto',
        maxWidth: '100%'
      },
      ref: this.tableRef
    }, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true
    }), _react.default.createElement(_DataTableHeader.default, {
      toggleSettings: this.toggleSettings,
      expandChildren: this.expandCollapseAll,
      isChildrenExpanded: !this.isExpandAll,
      onGlobalSearch: globalFilter && this.onGlobalSearch,
      globalSearchValue: (0, _lo.get)(globalFilter, 'value'),
      disableCountdown: true,
      disableExpandAll: this.props.disableExpandAll,
      exportData: disableExport ? null : this.exportTreeData
    }), _react.default.createElement(_DataTableStyle.DataTableContainer, {
      className: "data-table-container",
      style: style,
      innerRef: this.containerRef
    }, _react.default.createElement("div", {
      style: {
        minWidth
      }
    }, !!rectHeight && _react.default.createElement(StyledPrimeDataTable, _extends({
      key: gridKey,
      scrollable: true,
      scrollHeight: scrollHeight,
      value: data
    }, primeDataTableProps, {
      filters: { ...filters
      },
      onSelectionChange: this.onSelectionChange,
      globalFilter: (0, _lo.get)(globalFilter, 'value'),
      onFilter: this.onFilter,
      sortMode: "multiple",
      selection: selection
    }), columnsComponents))), _react.default.createElement(_DataTableColumnsSidebar.default, {
      isOpen: this.state.settingsOpen,
      toggle: this.toggleSettings,
      onChange: this.setColumns,
      columns: this.columns,
      columnsState: this.state.settings.columns,
      saveUserPreferences: dataTableId && this.saveUserPreferences,
      resetUserPreferences: dataTableId && this.resetUserPreferences,
      loadUserPreferences: dataTableId && this.restoreUserPreferences
    }));
  }

}

_defineProperty(TreeDataTable, "propTypes", { ..._AbstractTable.AbstractTable.propTypes,
  data: _propTypes.default.arrayOf(_propTypes.default.object),
  loadRows: _propTypes.default.func,
  disableExport: _propTypes.default.bool,
  disableExpandAll: _propTypes.default.bool
});

_defineProperty(TreeDataTable, "defaultProps", {
  disableExpandAll: false
});

var _default = (0, _reactRedux.connect)((state, props) => ({
  tablePreferences: (0, _lo.get)(state, `user.preferences.dataTable.${props.dataTableId}`),
  tableReduxState: (0, _lo.get)(state, `grid.state.${props.dataTableId}`)
}), {
  saveDataTablePreferences: _usersActions.saveDataTablePreferences,
  resetDataTablePreferences: _usersActions.resetDataTablePreferences,
  saveDataTableState: _gridActions.saveDataTableState,
  showToastr: _appActions.showToastr
})(TreeDataTable);

exports.default = _default;