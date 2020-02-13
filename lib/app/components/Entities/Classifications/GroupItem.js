"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _FieldItem = _interopRequireDefault(require("./FieldItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Single Classification Item component
 */
class GroupItem extends _react.PureComponent {
  render() {
    const {
      name,
      fields
    } = this.props;
    const {
      canEdit,
      isCollapsed,
      attributes,
      updateAttribute
    } = this.props;
    const {
      searchText,
      filterAttrName
    } = this.props;
    const showEntireGroup = searchText && name.toLowerCase().includes(searchText);
    const visibleFields = showEntireGroup ? fields : GroupItem._getVisibleFields(fields, searchText, filterAttrName);

    const fieldItems = GroupItem._buildFieldItems(visibleFields, attributes, updateAttribute, canEdit);

    const collapsed = !((searchText || filterAttrName) && visibleFields.length) && isCollapsed;
    return _react.default.createElement(_Card.default, {
      collapsible: true,
      collapsed: collapsed,
      headerColor: "#384147",
      title: name || 'Ungrouped',
      description: _react.default.createElement(_react.Fragment, null, " ", fieldItems, " ")
    });
  }

}

_defineProperty(GroupItem, "propTypes", {
  name: _propTypes.default.string,
  fields: _propTypes.default.array,
  canEdit: _propTypes.default.bool,
  searchText: _propTypes.default.string,
  filterAttrName: _propTypes.default.string,
  isCollapsed: _propTypes.default.bool,
  attributes: _propTypes.default.object,
  updateAttribute: _propTypes.default.func.isRequired
});

_defineProperty(GroupItem, "defaultProps", {
  name: 'Ungrouped',
  fields: [],
  canEdit: false,
  searchText: '',
  filterAttrName: '',
  isCollapsed: true,
  attributes: {}
});

_defineProperty(GroupItem, "_getVisibleFields", (0, _memoizeOne.default)((fields, searchText, filterAttrName) => {
  if (!fields) {
    return [];
  }

  if (!searchText && !filterAttrName) {
    return fields;
  }

  const text = filterAttrName || searchText;
  return fields.filter(({
    name
  }) => name.toLowerCase().includes(text));
}));

_defineProperty(GroupItem, "_buildFieldItems", (0, _memoizeOne.default)((visibleFields, attributes, updateAttribute, canEdit) => visibleFields.map((field, index) => _react.default.createElement(_FieldItem.default, _extends({}, field, {
  key: index,
  attributes: attributes,
  updateAttribute: updateAttribute,
  disabled: !canEdit,
  canBeAppendTo: true
})))));

var _default = GroupItem;
exports.default = _default;