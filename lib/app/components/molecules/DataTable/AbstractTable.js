"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultCellBody = exports.Filter = exports.AbstractTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uuidValidate = _interopRequireDefault(require("uuid-validate"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Column = require("primereact/components/column/Column");

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _MultiSelect = _interopRequireDefault(require("app/components/atoms/MultiSelect/MultiSelect"));

var _InputText = _interopRequireDefault(require("app/components/atoms/Input/InputText"));

var _ObjectUtils = _interopRequireDefault(require("primereact/components/utils/ObjectUtils"));

var _DateRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Date/DateRenderer"));

var _CalendarRange = _interopRequireDefault(require("app/components/molecules/CalendarRange/CalendarRange"));

var _utils = require("app/utils/utils");

var _date = require("app/utils/date/date");

var _datatableUtils = require("app/utils/datatable/datatableUtils");

var _lo = require("app/utils/lo/lo");

var _DataTableColumnHeader = _interopRequireDefault(require("./common/DataTableColumnHeader"));

var _TextFilter = _interopRequireDefault(require("./Renderers/TextFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DropdownStyled = (0, _styledComponents.default)(_Dropdown.default).withConfig({
  displayName: "AbstractTable__DropdownStyled",
  componentId: "xwymzw-0"
})(["width:100% !important;margin:0;max-height:25px;overflow:hidden;font-size:1rem !important;line-height:1rem;& .ui-dropdown-trigger.ui-corner-right{width:1.5em !important;}"]);
const MultiSelectStyled = (0, _styledComponents.default)(_MultiSelect.default).withConfig({
  displayName: "AbstractTable__MultiSelectStyled",
  componentId: "xwymzw-1"
})(["min-height:25px;line-height:1.3rem;"]);

const filterOnClick = e => (e.originalEvent || e).stopPropagation();

const Filter = props => _react.default.createElement("div", {
  onClick: filterOnClick
}, props.children);

exports.Filter = Filter;
Filter.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.arrayOf(_propTypes.default.element)])
};

const DefaultCellBody = (rowData, column) => {
  if (!column || !column.field) {
    return _react.default.createElement("span", null);
  }

  return _react.default.createElement("span", null, (0, _lo.get)(rowData, column.field));
};
/**
 * Displays data in tabular format.
 */


exports.DefaultCellBody = DefaultCellBody;

class AbstractTable extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(_props) {
    super(_props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "columns", void 0);

    _defineProperty(this, "getGlobalFilterFields", (0, _memoizeOne.default)((gridSettings, columnDefinitions) => {
      const fields = (0, _lo.get)(gridSettings, 'globalFilter.fields');

      if (fields) {
        return fields;
      }

      return columnDefinitions // remove the items that have the filter property set to false or that have a type that is not 'text' or 'number' (if the type is not specified we consider the item of type 'text')
      .filter(col => col.filter !== false && (!col.type || col.type === 'text' || col.type === 'number' || col.type === 'uuid')).map(col => col.field);
    }));

    _defineProperty(this, "_buildColumnComponents", (0, _memoizeOne.default)(({
      columns,
      onColumnResize,
      filter,
      stateColumns,
      stateFilters,
      filterParentDomNode
    }) => {
      return stateColumns.filter(column => column.visible).map(({
        field,
        width
      }, index) => {
        const columnDef = columns[field];
        const filterState = stateFilters[field] || {};

        if (!columnDef) {
          throw new Error(`The column definition of the field "${field}" is missing.`);
        }

        let col = { ...columnDef,
          filterMatchMode: filterState.modality || columnDef.filterMatchMode,
          header: _react.default.createElement(_DataTableColumnHeader.default, {
            columnDef: columnDef,
            onColumnResize: onColumnResize
          })
        };

        if (width) {
          col = (0, _lo.set)(col, 'style.width', width);
        }

        let {
          filterElement,
          style = {},
          body,
          bodyComponent
        } = col;

        if (col.renderValue && !bodyComponent) {
          bodyComponent = ({
            data,
            value
          }) => _react.default.createElement("span", null, col.renderValue({
            data,
            value
          }));
        }

        if (bodyComponent) {
          const BodyComponent = bodyComponent;
          const props = col.bodyComponentProps || {};

          body = (rowData, column) => {
            const propsResolver = col.bodyComponentDataMap || {};
            const propsResolved = {};
            Object.entries(propsResolver).forEach(([key, value]) => propsResolved[key] = (0, _lo.get)(rowData, String(value)));
            return _react.default.createElement(BodyComponent, _extends({
              data: rowData,
              value: (0, _lo.get)(rowData, column.field)
            }, props, propsResolved));
          };
        }

        if (!filterElement) {
          if (col.selectFilterComponent) {
            const SelectFilterComponent = col.selectFilterComponent;
            filterElement = _react.default.createElement(Filter, null, _react.default.createElement(SelectFilterComponent, {
              appendTo: filterParentDomNode,
              style: {
                width: '100%'
              },
              initialValue: filterState.value,
              className: "ui-column-filter",
              onClick: e => (e.originalEvent || e).stopPropagation(),
              onChange: ({
                originalEvent,
                value
              }) => filter({
                field,
                value
              })
            }));
          } else if (col.options) {
            if (col.filterMatchMode === 'isNull' || col.type === 'boolean') {
              filterElement = _react.default.createElement(Filter, null, _react.default.createElement(DropdownStyled, {
                appendTo: filterParentDomNode,
                value: filterState.value,
                options: col.options,
                className: "ui-column-filter",
                onChange: ({
                  originalEvent,
                  value
                }) => filter({
                  field,
                  value
                }),
                onClick: e => (e.originalEvent || e).stopPropagation()
              }));
            } else {
              filterElement = _react.default.createElement(Filter, null, _react.default.createElement(MultiSelectStyled, {
                appendTo: filterParentDomNode,
                initialValue: filterState.value,
                options: col.options,
                className: "ui-column-filter",
                onChange: ({
                  originalEvent,
                  value
                }) => filter({
                  field,
                  value
                }),
                onClick: e => (e.originalEvent || e).stopPropagation()
              }));
            }
          } else if (col.type === 'date') {
            if (col.filterMatchMode === 'between') {
              // normalize value
              const dateValue = (0, _utils.arrayfy)(filterState.value) || null;
              filterElement = _react.default.createElement(Filter, null, _react.default.createElement(_CalendarRange.default, {
                onChange: ({
                  target: {
                    value
                  }
                }) => filter({
                  field,
                  value
                }),
                value: dateValue,
                maxDate: new Date(),
                tiny: true
              }));
              style = {
                minWidth: '180px',
                width: '180px',
                'textAlign': 'center',
                ...style
              };
            } else if (!style.width) {
              style = { ...style,
                width: '160px'
              };
            }

            body = (rowData, column) => _react.default.createElement(_DateRenderer.default, {
              data: rowData,
              value: (0, _lo.get)(rowData, column.field)
            });
          } else if (col.type === 'number') {
            filterElement = _react.default.createElement(_InputText.default, {
              validationRegEx: /^[\d,]*$/,
              initialValue: filterState.value,
              onChange: ({
                originalEvent,
                value
              }) => filter({
                field,
                value
              }),
              className: "ui-column-filter"
            });
          } else if (col.type === 'uuid') {
            filterElement = _react.default.createElement(_InputText.default, {
              initialValue: filterState.value,
              onChange: ({
                originalEvent,
                value
              }) => filter({
                field,
                value
              }),
              className: "ui-column-filter"
            });
          } else {
            // We are assuming that if there is no column type it will be a text field
            filterElement = _react.default.createElement(_TextFilter.default, {
              value: filterState.value || '',
              option: filterState.modality || columnDef.filterMatchMode,
              onChange: ({
                value,
                option
              }) => filter({
                field,
                value,
                modality: option
              }),
              appendTo: filterParentDomNode,
              filterOptionsDisabled: columnDef.filterOptionsDisabled
            });
          }

          if (!body) {
            body = DefaultCellBody;
          }
        }

        const filterValueToArray = filterValue => {
          let values = [];

          if (!filterValue) {
            return [];
          } else if (Array.isArray(filterValue)) {
            values = filterValue;
          } else if (typeof filterValue === 'string') {
            values = filterValue.split(',');
          } else {
            values = [filterValue];
          }

          return values.filter(_utils.isDefined).filter(v => v !== '');
        }; // normalize the customized filerMatchMode


        switch (col.filterMatchMode) {
          case 'between':
            col.filterFunction = (dataFieldValue, filterValue) => {
              if (!Array.isArray(filterValue) || filterValue.length < 2) {
                return true;
              }

              const [start, end] = filterValue;
              const value = start instanceof Date ? new Date(dataFieldValue) : dataFieldValue;
              return start <= value && value <= end;
            };

            break;

          case '=':
            col.filterFunction = (dataFieldValue, filterValue) => {
              const values = filterValueToArray(filterValue);

              if (values.length === 0) {
                return true;
              }

              const filterConstraint = _ObjectUtils.default.filterConstraints['equals'];
              let localMatch;

              for (let k = 0; k < values.length; k++) {
                localMatch = filterConstraint(dataFieldValue, values[k]);

                if (localMatch) {
                  break;
                }
              }

              return localMatch;
            };

            break;

          default:
            col.filterFunction = (dataFieldValue, filterValue) => {
              const values = filterValueToArray(filterValue);

              if (values.length === 0) {
                return true;
              }

              const filterConstraint = col.filterMatchMode === 'custom' ? col.filterFunction : _ObjectUtils.default.filterConstraints[col.filterMatchMode];
              let localMatch;

              for (let k = 0; k < values.length; k++) {
                localMatch = filterConstraint(dataFieldValue, values[k]);

                if (localMatch) {
                  break;
                }
              }

              return localMatch;
            };

        }

        return _react.default.createElement(_Column.Column, _extends({
          key: col.field,
          columnKey: col.field
        }, col, {
          filterMatchMode: 'custom',
          filterFunction: col.filterFunction,
          filterElement: filterElement,
          style: style,
          body: body,
          filter: col.filter !== false,
          sortable: col.sortable !== false
        }));
      });
    }, _utils.shallowEquals));

    this.buildConditions = this.buildConditions.bind(this);
    this.buildQueryOptions = this.buildQueryOptions.bind(this);
    this.buildColumnComponents = this.buildColumnComponents.bind(this);
    this.buildPreferences = this.buildPreferences.bind(this);
    this.filter = this.filter.bind(this);
    this.getDefaultPreferences = this.getDefaultPreferences.bind(this);
    this.onColumnResize = this.onColumnResize.bind(this);
    this.onGlobalSearch = this.onGlobalSearch.bind(this);
    this.resetUserPreferences = this.resetUserPreferences.bind(this);
    this.saveUserPreferences = this.saveUserPreferences.bind(this);
    this.restoreUserPreferences = this.restoreUserPreferences.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.parseColumnDefinitions(_props.columnDefinitions); // eslint-disable-next-line no-unused-vars

    const {
      filters,
      sort,
      ..._gridSettings
    } = this.props.gridSettings || {};
    this.state = {
      settings: this.buildPreferences(_props)
    };
  }

  /**
   *
   */
  parseColumnDefinitions(columnDefinitions) {
    this.columns = columnDefinitions.reduce((map, column) => {
      if (!column.field) {
        throw new Error('Wrong column definition: the "field" property is required.');
      }

      if (map[column.field]) {
        throw new Error(`Wrong column definition: the field "${column.field}" cannot be used twice.`);
      }

      const type = column.type || 'text';
      let filterMatchMode = column.filterMatchMode;

      if (!filterMatchMode) {
        switch (type) {
          case 'text':
            filterMatchMode = 'startsWith';
            break;

          case 'number':
          case 'boolean':
          case 'uuid':
            filterMatchMode = '=';
            break;

          case 'date':
            filterMatchMode = 'between';
            break;

          default:
            throw new Error(`You need to specify the filterMatchMode for the type "${type}".`);
        }
      }

      map[column.field] = { ...column,
        filterMatchMode
      }; // eslint-disable-line no-param-reassign

      return map;
    }, {});
  }
  /**
   * @override
   */


  componentDidUpdate(prevProps, prevState, snapshot) {
    // check length of arrays to fail fast or use json.stringify to compare 2 arrays
    if (this.props.columnDefinitions.length !== prevProps.columnDefinitions.length || JSON.stringify(this.props.columnDefinitions) !== JSON.stringify(prevProps.columnDefinitions)) {
      this.parseColumnDefinitions(this.props.columnDefinitions); // we need to reload preferences as columns changed

      this.setState({
        settings: this.buildPreferences(this.props),
        gridKey: prevState.gridKey + 1,
        freezeData: false
      });
    }
  }
  /**
   * @override
   */


  setState(stateChange, callback) {
    const prevSettings = this.state.settings;
    const prevPage = this.state.page;
    super.setState(stateChange, (...args) => {
      callback && callback(...args);
      const {
        dataTableId
      } = this.props;
      const {
        settings,
        page
      } = this.state;
      const sameSettings = (0, _utils.shallowEquals)(prevSettings, settings);

      if (!sameSettings || prevPage !== page) {
        this.props.saveDataTableState(dataTableId, {
          settings,
          page
        });
      }
    });
  }
  /**
   *
   */


  getDefaultPreferences() {
    const {
      columnDefinitions,
      gridSettings
    } = this.props;
    return { ...(gridSettings || {}),
      columns: columnDefinitions.map(({
        field
      }) => ({
        field,
        visible: true
      }))
    };
  }
  /**
   *
   */


  buildPreferences(props) {
    const defaults = this.getDefaultPreferences();
    const {
      tablePreferences,
      tableReduxState
    } = props || {};
    let preferences = (0, _lo.get)(tableReduxState, 'settings');

    if (!preferences) {
      preferences = (0, _lo.get)(tablePreferences, 'settings');
    }

    if (!preferences) {
      return defaults;
    }

    if ((0, _lo.get)(preferences, 'columns')) {
      // add/remove new/old columns respecting the state order
      // get all the columns that are not deprecated
      const defaultsColumnsSet = new Set(defaults.columns.map(({
        field
      }) => field));
      const columns = preferences.columns.filter(({
        field
      }) => defaultsColumnsSet.has(field)); // add the new columns that are not in the preferences

      const columnsSet = new Set(columns.map(({
        field
      }) => field));
      defaults.columns.forEach(column => {
        if (!columnsSet.has(column.field)) columns.push(column);
      });
      preferences = { ...preferences,
        columns
      };
    }

    return preferences;
  }
  /**
   *
   */


  saveUserPreferences() {
    const {
      dataTableId
    } = this.props;

    if (!dataTableId) {
      return;
    }

    this.props.saveDataTablePreferences(dataTableId, {
      settings: this.state.settings
    });
  }
  /**
   *
   */


  resetUserPreferences() {
    const {
      dataTableId
    } = this.props;

    if (!dataTableId) {
      return;
    }

    this.props.resetDataTablePreferences(dataTableId);
    this.props.saveDataTableState(dataTableId, null);
    this.setState({
      settings: this.getDefaultPreferences(),
      page: 1
    });
  }

  restoreUserPreferences() {
    const {
      settings
    } = this.props.tablePreferences || {};

    if (settings) {
      this.setState({
        settings,
        page: 1
      });
    } else {
      this.setState({
        settings: this.getDefaultPreferences(),
        page: 1
      });
    }

    this.props.showToastr && this.props.showToastr({
      severity: 'success',
      detail: 'Data table preferences successfully reloaded.'
    });
  }
  /**
   * Builds the where conditions to match the give values.
   */


  buildConditions(field, values, op) {
    let vals = values.filter(value => value !== '');

    switch (op) {
      case 'between':
        {
          if (values.length === 1) {
            return {
              field,
              op: '=',
              value: values[0]
            };
          }

          return {
            field,
            op,
            values
          };
        }

      default:
        break;
    }

    const type = this.columns[field].type;

    switch (type) {
      case 'number':
        {
          vals = vals.filter(value => /^\d+$/.test(value));
          break;
        }

      case 'uuid':
        {
          vals = vals.filter(value => (0, _uuidValidate.default)(value));
          break;
        }

      default:
        break;
    }

    const queryFields = this.columns[field].queryFields;

    if (queryFields) {
      switch (vals.length) {
        case 0:
          return null;

        case 1:
          return {
            or: queryFields.map(node => ({
              field: node,
              op,
              value: vals[0]
            }))
          };

        default:
          const conditions = [];
          vals.forEach(value => queryFields.forEach(node => conditions.push({
            field: node,
            op,
            value
          })));
          return {
            or: conditions
          };
      }
    }

    switch (vals.length) {
      case 0:
        return null;

      case 1:
        return {
          field,
          op,
          value: vals[0]
        };

      default:
        return {
          or: vals.map(value => ({
            field,
            op,
            value
          }))
        };
    }
  }

  buildOrdering(sort, columns) {
    const list = [];
    (sort || []).filter(({
      field
    }) => columns[field]).forEach(({
      field,
      order
    }) => {
      if (columns[field].orderBuild) {
        list.push(columns[field].orderBuild(order === 1));
      } else if (columns[field].sortField) {
        list.push({
          field: columns[field].sortField,
          asc: order === 1
        });
      } else if (columns[field].queryFields) {
        columns[field].queryFields.forEach(node => list.push({
          field: node,
          asc: order === 1
        }));
      } else {
        list.push({
          field,
          asc: order === 1
        });
      }
    });
    return list;
  }

  /**
   * Builds and returns the query options.
   *
   * @return the query options.
   */
  buildQueryOptions() {
    const {
      customWhere = [],
      excludeBy,
      queryParams,
      gridSettings,
      columnDefinitions
    } = this.props;
    const {
      settings
    } = this.state;
    const page = this.state.page || 1;
    const {
      filters,
      sort,
      pageSize,
      globalFilter
    } = settings || {};
    const orderBy = this.buildOrdering(sort, this.columns);
    const where = Object.entries(filters || {}).filter(([key, obj]) => (0, _utils.isDefined)(obj.value)).map(([field, obj]) => {
      const filterOption = (0, _utils.stringify)((0, _lo.get)(filters[field], 'modality'));
      const filterBuild = this.columns[field].filterBuild;

      if (filterBuild && obj.value) {
        return filterBuild(obj.value);
      }

      const columnMatchMode = this.columns[field].filterMatchMode;
      const op = filterOption || columnMatchMode;
      const value = obj.value;
      let values = [value];

      if (Array.isArray(value)) {
        values = value;
      }

      if (op === 'isNull') {
        if (values && values.length) {
          return {
            field,
            op: values[0]
          };
        }

        return null;
      }

      if (typeof value === 'string') {
        values = (obj.value || '').split(',').map(v => v.trim()).filter(v => v);
      }

      return this.buildConditions(field, values, op);
    }).filter(condition => condition);

    if (globalFilter && globalFilter.value) {
      const filterBuild = gridSettings.globalFilter.filterBuild;
      const values = (globalFilter.value || '').split(',').map(v => v.trim()).filter(v => v);

      if (values.length > 0) {
        const conditions = this.getGlobalFilterFields(gridSettings, columnDefinitions).map(field => this.buildConditions(field, values, globalFilter.filterMatchMode || this.columns[field].filterMatchMode)).filter(condition => condition);

        if (conditions.length === 1) {
          where.push(conditions[0]);
        } else if (conditions.length > 1) {
          where.push({
            or: conditions
          });
        }

        if (filterBuild) {
          where.push(filterBuild(values[0]));
        }
      }
    }

    return {
      where: [...customWhere, ...where],
      excludeBy,
      orderBy,
      page,
      pageSize,
      queryParams
    };
  }
  /**
   *
   */


  exportData() {
    let options = { ...this.buildQueryOptions(),
      download: true
    };

    if (!this.props.downloadAll) {
      options = { ...options,
        page: 1,
        pageSize: 1000
      };
    } else {
      options = { ...options,
        page: null,
        pageSize: null
      };
    }

    this.props.loadRows(options).then(data => {
      const {
        records
      } = data || {};
      const downloadData = records && records.map(item => {
        const columnDefs = this.props.columnDefinitions.map(column => {
          const columnName = column.header;

          if (column.exportable === false) {
            return null;
          }

          if (column.renderValue) {
            return {
              [columnName]: column.renderValue({
                data: item,
                value: (0, _lo.get)(item, column.field)
              })
            };
          }

          if (column.type === 'date') {
            return {
              [columnName]: (0, _date.formatDate)((0, _lo.get)(item, column.field))
            };
          }

          if (column.queryFields) {
            const value = column.queryFields.map(field => (0, _lo.get)(item, field)).filter(value => value).join(', ');
            return {
              [columnName]: value
            };
          }

          return {
            [columnName]: (0, _lo.get)(item, column.field)
          };
        });
        const formatData = {};
        columnDefs.forEach(col => {
          if (col) {
            const key = Object.keys(col)[0];
            formatData[key] = col[key];
          }
        });
        return formatData;
      });
      (0, _datatableUtils.saveCsv)(this.props.name || 'list', downloadData);
    });
  }
  /**
   *
   */


  filter({
    field,
    value,
    modality
  }) {
    return new Promise((resolve, reject) => {
      const filters = { ...this.state.settings.filters
      };

      if (modality) {
        filters[field] = (0, _lo.set)(filters[field], 'modality', modality);
      }

      if (this.columns[field].type === 'uuid' && !(0, _uuidValidate.default)(value)) {
        delete filters[field];
      } else {
        filters[field] = (0, _lo.set)(filters[field], 'value', value);
      }

      this.setState({
        settings: (0, _lo.set)(this.state.settings, 'filters', filters)
      }, resolve);
    });
  }
  /**
   * Toggle the grid settings drawer.
   */


  toggleSettings() {
    this.setState({
      settingsOpen: !this.state.settingsOpen
    });
  }
  /**
   * Sets the columns state.
   */


  setColumns(columns) {
    this.setState({
      settings: (0, _lo.set)(this.state.settings, 'columns', columns)
    });
  }
  /**
   *
   */


  onColumnResize(field, width) {
    const columns = this.state.settings.columns.map(column => {
      const columnDef = this.columns[field];
      const minWidth = Number((0, _lo.get)(columnDef, 'style.minWidth'));
      const min = !Number.isNaN(minWidth) ? minWidth : 40;

      if (column.field === field) {
        return { ...column,
          width: Math.max(min, width)
        };
      }

      return column;
    });
    this.setState({
      settings: (0, _lo.set)(this.state.settings, 'columns', columns)
    });
  }
  /**
   * Builds and returns the column components.
   */


  /**
   * Builds and returns the column components.
   */
  buildColumnComponents() {
    const {
      columns,
      onColumnResize,
      filter
    } = this;
    const filterParentDomNode = window.document.getElementById('datatable-filters');

    if (!filterParentDomNode) {
      return [];
    }

    return this._buildColumnComponents({
      columns,
      onColumnResize,
      filter,
      stateColumns: this.state.settings.columns || this.props.columnDefinitions.map(({
        field
      }) => ({
        field,
        visible: true
      })),
      stateFilters: this.state.settings.filters || {},
      filterParentDomNode
    });
  }
  /**
   *
   */


  onFilter({
    filters
  }) {
    this.setState({
      settings: (0, _lo.set)(this.state.settings, 'filters', filters)
    });
  }
  /**
   *
   */


  onGlobalSearch(event) {
    return new Promise((resolve, reject) => {
      this.setState({
        settings: (0, _lo.set)(this.state.settings, 'globalFilter.value', event.target.value)
      }, resolve);
    });
  }
  /**
   *
   */


  calculateMinWidth(columnComponents) {
    return columnComponents.reduce((total, col) => {
      let width = (0, _lo.get)(col, 'props.style.width');

      if (!width) {
        width = (0, _lo.get)(col, 'props.style.minWidth');
      }

      if (!width) {
        // use default
        return total + 180;
      }

      if (Number.isFinite(width)) {
        return total + Number(width);
      }

      if (!width.endsWith('px')) {
        // eslint-disable-next-line no-console
        console.warn(`the column width must be defined in px (${this.constructor.name} column ${col.field})`);
        return total + 180;
      }

      return total + Number(width.replace(/\D/g, ''));
    }, 0);
  }

}

exports.AbstractTable = AbstractTable;

_defineProperty(AbstractTable, "propTypes", {
  dataTableId: _propTypes.default.string,
  columnDefinitions: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  isLoading: _propTypes.default.bool,
  tablePreferences: _propTypes.default.object,
  tableReduxState: _propTypes.default.object,
  data: _propTypes.default.any
});