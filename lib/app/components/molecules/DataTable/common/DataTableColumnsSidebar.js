"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Menu = _styledComponents.default.div.withConfig({
  displayName: "DataTableColumnsSidebar__Menu",
  componentId: "sc-1w2ph87-0"
})(["color:", ";"], ({
  theme
}) => theme.base.color);

const MenuItem = _styledComponents.default.div.withConfig({
  displayName: "DataTableColumnsSidebar__MenuItem",
  componentId: "sc-1w2ph87-1"
})(["padding:.5rem;display:flex;justify-content:space-between;"]);

const DraggableItem = _styledComponents.default.div.withConfig({
  displayName: "DataTableColumnsSidebar__DraggableItem",
  componentId: "sc-1w2ph87-2"
})(["", ";", ";", ";padding:0 .4rem 0 0;"], ({
  isDragging
}) => isDragging ? 'opacity: 0.5; background: green;' : '', ({
  draggableStyle
}) => draggableStyle || '', ({
  dragHandleProps
}) => dragHandleProps || '');
/**
 *
 */


class DataTableColumnsSidebar extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildColumns", (columns, columnsState) => (columnsState || []).map((state, originalIndex) => ({
      originalIndex,
      field: state.field,
      meta: columns[state.field],
      state
    })));

    _defineProperty(this, "getFixedColumns", columns => columns.filter(column => column.meta.expander || column.meta.fixed));

    _defineProperty(this, "getSortableColumns", columns => columns.filter(column => !(column.meta.expander || column.meta.fixed)));

    _defineProperty(this, "setVisibility", (event, columnIndex) => {
      const columns = (0, _lo.set)(this.props, `columnsState[${String(columnIndex)}].visible`, event.target.value);

      if (this.props.onChange) {
        this.props.onChange(columns.columnsState);
      }
    });

    _defineProperty(this, "setOrder", res => {
      const {
        columnsState,
        onChange
      } = this.props;

      if (!res.destination || !onChange) {
        return;
      }

      const columns = this.buildColumns(this.props.columns, columnsState);
      const sortableColumns = this.getSortableColumns(columns);
      const diff = columns.length - sortableColumns.length;
      const deleted = sortableColumns.splice(res.source.index - diff, 1);
      sortableColumns.splice(res.destination.index - diff, 0, deleted[0]);
      const allColumns = [...sortableColumns];
      const fixedColumns = this.getFixedColumns(columns);
      fixedColumns.forEach(column => {
        allColumns.splice(column.originalIndex, 0, column);
      });
      onChange(allColumns.map(column => column.state));
    });

    _defineProperty(this, "getDraggableItems", (0, _memoizeOne.default)(columns => this.getSortableColumns(columns).map(column => _react.default.createElement(_reactBeautifulDnd.Draggable, {
      key: column.field,
      draggableId: column.field,
      index: column.originalIndex
    }, (provided, snapshot) => // eslint-disable-line no-shadow
    _react.default.createElement("div", null, _react.default.createElement(DraggableItem, _extends({
      key: column.field,
      innerRef: provided.innerRef,
      isDragging: snapshot.isDragging,
      draggableStyle: provided.draggableProps,
      dragHandleProps: provided.dragHandleProps
    }, provided.draggableProps, provided.dragHandleProps), _react.default.createElement(MenuItem, {
      key: column.field
    }, _react.default.createElement(_CheckBox.default, {
      key: column.field,
      name: column.field,
      label: column.meta.header,
      checked: column.state.visible,
      onChange: event => this.setVisibility(event, column.originalIndex)
    }), _react.default.createElement(_Icon.default, {
      name: "drag-vertical"
    }))), provided.placeholder)))));
  }

  /**
   *
   */
  render() {
    const {
      columnsState,
      isOpen,
      toggle,
      resetUserPreferences,
      loadUserPreferences,
      saveUserPreferences
    } = this.props;
    const columns = this.buildColumns(this.props.columns, columnsState);
    return _react.default.createElement(_Drawer.default, {
      title: "Grid Options",
      isOpen: isOpen,
      isToggled: toggle
    }, resetUserPreferences && _react.default.createElement(_Button.default, {
      color: "secondary",
      onClick: resetUserPreferences
    }, "Default"), ' ', loadUserPreferences && _react.default.createElement(_Button.default, {
      color: "secondary",
      onClick: loadUserPreferences
    }, "Reload"), ' ', saveUserPreferences && _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: saveUserPreferences
    }, "Save"), _react.default.createElement(_reactBeautifulDnd.DragDropContext, {
      onDragEnd: this.setOrder
    }, _react.default.createElement(_reactBeautifulDnd.Droppable, {
      droppableId: "reorderableMenu",
      direction: "vertical"
    }, (provided, snapshot) => _react.default.createElement(Menu, _extends({
      innerRef: provided.innerRef
    }, snapshot), this.getDraggableItems(columns), provided.placeholder))));
  }

}

_defineProperty(DataTableColumnsSidebar, "propTypes", {
  isOpen: _propTypes.default.bool,
  toggle: _propTypes.default.func,
  columns: _propTypes.default.object.isRequired,
  columnsState: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  onChange: _propTypes.default.func.isRequired,
  saveUserPreferences: _propTypes.default.func,
  loadUserPreferences: _propTypes.default.func,
  resetUserPreferences: _propTypes.default.func
});

var _default = DataTableColumnsSidebar;
exports.default = _default;