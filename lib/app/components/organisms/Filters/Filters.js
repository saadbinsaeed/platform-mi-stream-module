"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Content = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _platformUi = require("@mic3/platform-ui");

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _filterUtils = require("app/utils/filter/filterUtils");

var _componentActions = require("store/actions/component/componentActions");

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _FiltersDrawer = _interopRequireDefault(require("./FiltersDrawer"));

var _FiltersToolbar = _interopRequireDefault(require("./FiltersToolbar"));

var _FiltersChips = _interopRequireDefault(require("./FiltersChips"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const Content = _styledComponents.default.div.withConfig({
  displayName: "Filters__Content",
  componentId: "sc-1fu7a5i-0"
})(["flex-grow:1;max-height:calc(100vh - 200px);"]);

exports.Content = Content;
const Title = (0, _styledComponents.default)(_platformUi.ListItem).withConfig({
  displayName: "Filters__Title",
  componentId: "sc-1fu7a5i-1"
})(["padding-bottom:0 !important;margin-bottom:-5px;"]);
const GridWrapper = (0, _styledComponents.default)(_platformUi.Grid).withConfig({
  displayName: "Filters__GridWrapper",
  componentId: "sc-1fu7a5i-2"
})(["flex-wrap:nowrap !important;height:100% !important;"]);
const classesToolbar = {
  searchBar: 'filter-toolbar'
};
const classesChips = {
  appBar: 'filter-chips'
};
let Filters = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.debounce)(), _dec3 = (0, _decoratorUtils.debounce)(), _dec4 = (0, _decoratorUtils.memoize)(), _dec5 = (0, _decoratorUtils.memoize)(), _dec6 = (0, _decoratorUtils.memoize)(), _dec7 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class Filters extends _react.PureComponent {
  constructor(props) {
    super(props);
    const {
      filters,
      orderBy
    } = this.getFilterViewState(props.filterViewState, props.defaultFilters, props.defaultOrder);
    this.state = {
      isFiltersOpen: false,
      editedFilterBy: filters,
      editedOrderBy: orderBy[0]
    };
  }

  getFilterViewState(filterViewState, defaultFilters, defaultOrder) {
    const {
      filters,
      orderBy
    } = filterViewState || {};
    return {
      filters: filters || defaultFilters || {},
      orderBy: orderBy || defaultOrder || []
    };
  }

  toggleDrawer() {
    this.setState(state => ({
      isFiltersOpen: !state.isFiltersOpen
    }));
  }

  setEditedFilterBy(data) {
    this.setState({
      editedFilterBy: data
    });
  }

  setEditedFilterByWithUpdate(data) {
    this.setState({
      editedFilterBy: data
    }, this.applyFilter);
  }

  applyFilter() {
    const {
      editedFilterBy,
      editedOrderBy
    } = this.state;
    const isValidOrderBy = typeof editedOrderBy === 'object' && editedOrderBy.field !== undefined && (editedOrderBy.direction !== undefined || editedOrderBy.asc !== undefined);
    this.props.saveComponentState(this.props.id, {
      filters: editedFilterBy,
      orderBy: isValidOrderBy ? [editedOrderBy] : []
    });
  }

  updateSearchBarFilter(value) {
    const {
      filterViewState,
      defaultFilters,
      defaultOrder
    } = this.props;
    const state = this.getFilterViewState(filterViewState, defaultFilters, defaultOrder);
    this.props.saveComponentState(this.props.id, (0, _lo.set)(state, 'filters.searchBar', value));
  }

  buildFilter(field, condition, value, type) {
    // if we are using the autocomplete of an entity we need to filter by id
    if (new Set(['thingTypeahead', 'organisationTypeahead', 'personTypeahead', 'userTypeahead', 'groupTypeahead']).has(type) && typeof value === 'object') {
      value = value && value.id;
    }

    if (!(0, _utils.isDefined)(value) || Array.isArray(value) && (0, _utils.isEmptyArray)(value)) {
      return null;
    }

    if (type === 'number' && Number.isNaN(Number(value))) {
      return null;
    }

    if (value === 'is null' || value === 'is not null') {
      return {
        field,
        op: value
      };
    }

    return {
      field,
      op: condition,
      value
    };
  }

  getConditionByType(type) {
    switch (type) {
      case 'number':
        return '=';

      case 'dateTimeRange':
        return 'between';

      default:
        return 'contains';
    }
  }

  formatFilterBy(filters) {
    const {
      filterDefinitions,
      searchBar
    } = this.props;
    const filterBy = [];
    filterDefinitions.filter(def => def.filter !== false).forEach(definition => {
      const {
        field,
        properties,
        type,
        condition
      } = definition;
      const fields = Array.isArray(field) ? field : [field];
      const statements = fields.filter(fieldName => (0, _lo.get)(filters, (0, _utils.getStr)(properties, 'name') || fieldName)).map(fieldName => {
        const value = (0, _lo.get)(filters, (0, _utils.getStr)(properties, 'name') || fieldName) || {};
        return this.buildFilter(fieldName, condition || this.getConditionByType(type), value, type);
      }).filter(filter => filter);
      filterBy.push(...statements);
    });

    if (!filters.searchBar) {
      return filterBy;
    }

    const statements = searchBar.map(fieldName => {
      const definition = (0, _filterUtils.includes)(filterDefinitions, fieldName, {
        property: 'field'
      })[0];

      if (!definition) {
        console.error(`Search field ${fieldName} is not a part of filter difinitions`); // eslint-disable-line no-console

        return null;
      }

      const {
        condition,
        type
      } = definition;
      return this.buildFilter(fieldName, condition || this.getConditionByType(type), filters.searchBar, type);
    }).filter(filter => filter);

    if (statements.length === 1) {
      filterBy.push(statements[0]);
    } else if (statements.length > 1) {
      filterBy.push({
        or: statements
      });
    }

    return filterBy;
  }

  setEditedOrderBy(data) {
    this.setState({
      editedOrderBy: data
    });
  }

  getSortOptions(filterDefinitions) {
    return filterDefinitions.filter(def => def.sort !== false).map(definition => {
      return {
        label: (0, _lo.get)(definition, 'properties.label'),
        value: (0, _lo.get)(definition, 'field')
      };
    });
  }

  getFilterDefinitions(filterDefinitions) {
    return filterDefinitions.filter(def => def.filters !== false);
  }

  buildOrderComponents(filterDefinitions) {
    const sortOptions = this.getSortOptions(filterDefinitions);
    return sortOptions.length !== 0 ? [{
      type: 'typeahead',
      properties: {
        label: 'Sort by',
        name: 'field',
        options: sortOptions
      }
    }, {
      type: 'typeahead',
      properties: {
        label: 'Order by',
        name: 'direction',
        options: [{
          label: 'Descending',
          value: 'desc'
        }, {
          label: 'Ascending',
          value: 'asc'
        }]
      }
    }] : null;
  }

  render() {
    const {
      isFiltersOpen,
      editedOrderBy
    } = this.state;
    const {
      filterDefinitions,
      children,
      filterViewState,
      defaultFilters,
      defaultOrder,
      className,
      leftToolbar,
      rightToolbar
    } = this.props;
    const {
      filters,
      orderBy
    } = this.getFilterViewState(filterViewState, defaultFilters, defaultOrder);
    const orderComponents = this.buildOrderComponents(filterDefinitions);
    const filterComponents = this.getFilterDefinitions(filterDefinitions);
    const isAnyDefinitions = (orderComponents || []).length > 0 || (filterComponents || []).length > 0;
    return _react.default.createElement(GridWrapper, {
      className: className,
      container: true,
      direction: "column"
    }, _react.default.createElement(_FiltersToolbar.default, {
      isAnyDefinitions: isAnyDefinitions,
      searchValue: (0, _lo.get)(filters, 'searchBar'),
      onSearch: this.updateSearchBarFilter,
      toggleDrawer: this.toggleDrawer,
      classes: classesToolbar,
      leftToolbar: leftToolbar,
      rightToolbar: rightToolbar
    }), _react.default.createElement(_FiltersChips.default, {
      filters: filters,
      filterDefinitions: filterDefinitions,
      onChange: this.setEditedFilterByWithUpdate,
      classes: classesChips
    }), _react.default.createElement(Content, null, children(this.formatFilterBy(filters), orderBy)), isAnyDefinitions && _react.default.createElement(_FiltersDrawer.default, {
      onApply: this.applyFilter,
      open: isFiltersOpen,
      onClose: this.toggleDrawer
    }, orderComponents && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Title, null, _react.default.createElement(_platformUi.Typography, {
      component: "span",
      variant: "caption"
    }, "Sort")), _react.default.createElement(_FormGenerator.default, {
      onChange: this.setEditedOrderBy,
      components: this.buildOrderComponents(filterDefinitions),
      data: editedOrderBy
    })), _react.default.createElement(Title, null, _react.default.createElement(_platformUi.Typography, {
      component: "span",
      variant: "caption"
    }, "Filter")), _react.default.createElement(_FormGenerator.default, {
      onChange: this.setEditedFilterBy,
      components: filterComponents,
      data: filters
    })));
  }

}, _defineProperty(_class2, "propTypes", {
  id: _propTypes.default.string.isRequired,
  filterViewState: _propTypes.default.object,
  filterDefinitions: _propTypes.default.arrayOf(_propTypes.default.shape({
    properties: _propTypes.default.shape({
      label: _propTypes.default.string,
      name: _propTypes.default.string.isRequired
    }).isRequired,
    field: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]).isRequired,
    type: _propTypes.default.string.isRequired,
    defaultCondition: _propTypes.default.string,
    searchBar: _propTypes.default.bool,
    filter: _propTypes.default.bool,
    sort: _propTypes.default.bool
  })),
  children: _propTypes.default.func,
  searchBar: _propTypes.default.array,
  defaultFilters: _propTypes.default.object,
  defaultOrder: _propTypes.default.array,
  onlySearchBar: _propTypes.default.bool,
  leftToolbar: _propTypes.default.node,
  rightToolbar: _propTypes.default.node
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "getFilterViewState", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "getFilterViewState"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleDrawer", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleDrawer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setEditedFilterBy", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "setEditedFilterBy"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setEditedFilterByWithUpdate", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "setEditedFilterByWithUpdate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "applyFilter", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "applyFilter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateSearchBarFilter", [_decoratorUtils.bind, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "updateSearchBarFilter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildFilter", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "buildFilter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getConditionByType", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "getConditionByType"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "formatFilterBy", [_decoratorUtils.bind, _dec4], Object.getOwnPropertyDescriptor(_class.prototype, "formatFilterBy"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setEditedOrderBy", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "setEditedOrderBy"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getSortOptions", [_decoratorUtils.bind, _dec5], Object.getOwnPropertyDescriptor(_class.prototype, "getSortOptions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getFilterDefinitions", [_decoratorUtils.bind, _dec6], Object.getOwnPropertyDescriptor(_class.prototype, "getFilterDefinitions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildOrderComponents", [_decoratorUtils.bind, _dec7], Object.getOwnPropertyDescriptor(_class.prototype, "buildOrderComponents"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)((state, props) => ({
  filterViewState: (0, _lo.get)(state, `component.state.${props.id}`)
}), {
  saveComponentState: _componentActions.saveComponentState
})(Filters);

exports.default = _default;