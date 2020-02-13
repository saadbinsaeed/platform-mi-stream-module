"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _reactRouterDom = require("react-router-dom");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _PopupMenu = _interopRequireDefault(require("app/components/molecules/PopupMenu/PopupMenu"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _GroupItem = _interopRequireDefault(require("./GroupItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CardTitleContainer = _styledComponents.default.h1.withConfig({
  displayName: "ClassificationItem__CardTitleContainer",
  componentId: "sc-10h3ojz-0"
})(["display:flex;flex-direction:column;margin:0 0 0 1rem;width:100%;overflow:hidden;"]);

const CardTitle = _styledComponents.default.span.withConfig({
  displayName: "ClassificationItem__CardTitle",
  componentId: "sc-10h3ojz-1"
})(["overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"]);

const CardSummary = (0, _styledComponents.default)(CardTitle).withConfig({
  displayName: "ClassificationItem__CardSummary",
  componentId: "sc-10h3ojz-2"
})(["font-size:0.6em;color:", ";font-weight:normal;line-height:1.1;"], ({
  theme
}) => theme.color.gray);
const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "ClassificationItem__StyledLink",
  componentId: "sc-10h3ojz-3"
})(["text-decoration:none;color:white;display:flex;"]);
/**
 * Single Classification Item component
 */

class ClassificationItem extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "filterGroups", (0, _memoizeOne.default)((groups, searchText, filterGroupName, filterAttrName) => {
      if (!groups) {
        return [];
      }

      if (!searchText && !filterGroupName && !filterAttrName) {
        return groups;
      }

      if (searchText && !filterGroupName && !filterAttrName) {
        return groups.filter(({
          name,
          fields = []
        }) => {
          return name.toLowerCase().includes(searchText) || !!fields.find(({
            name
          }) => {
            return name.toLowerCase().includes(searchText);
          });
        });
      }

      return groups.filter(({
        name,
        fields = []
      }) => {
        return name.toLowerCase().includes(filterGroupName) && !!fields.find(({
          name
        }) => {
          return name.toLowerCase().includes(filterAttrName);
        });
      });
    }));

    _defineProperty(this, "toggleCollapse", () => {
      this.setState(prevState => ({
        isCollapsed: !prevState.isCollapsed
      }));
    });

    _defineProperty(this, "removeClass", () => {
      this.props.removeClass && this.props.removeClass(this.props.uri);
    });

    this.state = {
      color: this.props.color || '#00BCD4',
      // fix for null database return, defaultProps doesn't work here
      isCollapsed: this.props.isCollapsed
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.setState({
        color: this.props.color || '#00BCD4'
      });
    }

    if (prevProps.isCollapsed !== this.props.isCollapsed) {
      // "force" update collapsed state when we press "collapse/expand all"
      this.setState({
        isCollapsed: this.props.isCollapsed
      });
    }
  }
  /**
   * toggleCollapse Function to set state of single classification collapsed/expanded
   */


  /**
   *
   * @returns {*}
   */
  render() {
    const {
      id,
      name,
      uri,
      groups,
      children,
      inherited,
      active
    } = this.props;
    const {
      canEdit,
      canViewClasses,
      attributes,
      updateAttribute,
      removeClass
    } = this.props;
    const {
      searchText,
      filterGroupName,
      filterAttrName
    } = this.props;
    const {
      color,
      isCollapsed
    } = this.state;
    const showEntireClass = searchText && name.toLowerCase().includes(searchText);
    const visibleGroups = showEntireClass ? groups : this.filterGroups(groups, searchText, filterGroupName, filterAttrName);
    return _react.default.createElement(_Card.default, {
      key: id,
      transparent: true,
      headerColor: "transparent",
      title: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Icon.default, {
        name: "label",
        hexColor: color
      }), _react.default.createElement(CardTitleContainer, null, _react.default.createElement(CardTitle, {
        title: name
      }, name), _react.default.createElement(CardSummary, {
        title: uri
      }, uri, !active ? ' (Inactive)' : ''), inherited && _react.default.createElement(CardSummary, null, "Parent of ", children.map(({
        name
      }) => name).join(',')))),
      description: _react.default.createElement(_reactStyledFlexboxgrid.Row, null, groups.length ? visibleGroups.length ? visibleGroups.map((group, index) => _react.default.createElement(_reactStyledFlexboxgrid.Col, {
        key: index,
        xs: 12,
        sm: 6,
        md: 4
      }, _react.default.createElement(_GroupItem.default, _extends({
        key: index
      }, group, {
        canEdit: canEdit,
        searchText: showEntireClass ? '' : searchText,
        filterAttrName: filterAttrName,
        attributes: attributes,
        updateAttribute: updateAttribute,
        isCollapsed: isCollapsed
      })))) : _react.default.createElement(_reactStyledFlexboxgrid.Col, {
        xs: 12
      }, _react.default.createElement(_Card.default, {
        headerColor: "#384147",
        description: _react.default.createElement("span", null, " No classification data matches search/filter criteria. ")
      })) : _react.default.createElement(_reactStyledFlexboxgrid.Col, {
        xs: 12
      }, _react.default.createElement(_Card.default, {
        headerColor: "#384147",
        description: _react.default.createElement("span", null, " No classification data is available. ")
      }))),
      headerActions: _react.default.createElement(_react.Fragment, null, visibleGroups.length || canViewClasses || !inherited && canEdit ? _react.default.createElement(_PopupMenu.default, {
        placement: "top right",
        nowrap: true,
        content: _react.default.createElement(_react.Fragment, null, visibleGroups.length ? _react.default.createElement(_MenuItem.default, {
          name: isCollapsed ? 'Expand groups' : 'Minimize groups',
          icon: isCollapsed ? 'chevron-down' : 'chevron-up',
          onClick: this.toggleCollapse
        }) : null, canViewClasses && _react.default.createElement(StyledLink, {
          to: `/classifications/${id}`
        }, _react.default.createElement(_MenuItem.default, {
          name: "Go to classification manager",
          icon: "exit-to-app"
        })), !inherited && canEdit && removeClass && _react.default.createElement(_MenuItem.default, {
          name: "Remove Classification",
          icon: "delete",
          onClick: this.removeClass
        }))
      }, _react.default.createElement(_Icon.default, {
        name: "dots-vertical"
      })) : null)
    });
  }

}

_defineProperty(ClassificationItem, "propTypes", {
  id: _propTypes.default.number.isRequired,
  uri: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  active: _propTypes.default.bool,
  color: _propTypes.default.string,
  groups: _propTypes.default.array,
  inherited: _propTypes.default.bool,
  classes: _propTypes.default.array,
  canEdit: _propTypes.default.bool,
  canViewClasses: _propTypes.default.bool,
  removeClass: _propTypes.default.func,
  searchText: _propTypes.default.string,
  filterGroupName: _propTypes.default.string,
  filterAttrName: _propTypes.default.string,
  attributes: _propTypes.default.object,
  updateAttribute: _propTypes.default.func.isRequired,
  isCollapsed: _propTypes.default.bool
});

_defineProperty(ClassificationItem, "defaultProps", {
  active: true,
  color: '#00BCD4',
  groups: [],
  inherited: false,
  classes: [],
  canEdit: false,
  canViewClasses: false,
  searchText: '',
  filterGroupName: '',
  filterAttrName: '',
  attributes: {},
  isCollapsed: false
});

var _default = ClassificationItem;
exports.default = _default;