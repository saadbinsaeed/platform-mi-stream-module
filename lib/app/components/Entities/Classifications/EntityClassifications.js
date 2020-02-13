"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _platformUi = require("@mic3/platform-ui");

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _ActionBar = _interopRequireDefault(require("app/components/molecules/ActionBar/ActionBar"));

var _InputText = require("primereact/components/inputtext/InputText");

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _ClassificationItem = _interopRequireDefault(require("./ClassificationItem"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const BurgerWrap = _styledComponents.default.div.withConfig({
  displayName: "EntityClassifications__BurgerWrap",
  componentId: "sc-546e6c-0"
})(["display:flex;line-height:16px;.Icon{border-right:1px solid #5f5f5f;padding:0 10px 0 10px;&:last-child{border-right:none;margin-right:0px;}}"]);

const FullWidthInputText = (0, _styledComponents.default)(_InputText.InputText).withConfig({
  displayName: "EntityClassifications__FullWidthInputText",
  componentId: "sc-546e6c-1"
})(["width:100%;text-indent:10px;"]);
/**
 * Dynamically renders classifications
 */

let EntityClassifications = (_class = (_temp = _class2 = class EntityClassifications extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "sortAndFilter", (0, _memoizeOne.default)((classes, isAscending, searchText, filterClassName, filterGroupName, filterAttrName) => {
      if (!classes) {
        return [];
      }

      return this.filterClasses(this.sortClasses(classes, isAscending), searchText, filterClassName, filterGroupName, filterAttrName);
    }));

    _defineProperty(this, "state", {
      searchText: '',
      filterClassName: '',
      filterGroupName: '',
      filterAttrName: '',
      isFiltersOpen: false,
      isCollapsed: true,
      isSortAscending: null
    });

    _defineProperty(this, "toggleCollapse", () => {
      this.setState(prevState => ({
        isCollapsed: !prevState.isCollapsed
      }));
    });

    _defineProperty(this, "toggleSorting", () => {
      this.setState(prevState => ({
        isSortAscending: !prevState.isSortAscending
      }));
    });

    _defineProperty(this, "onClassificationSubmit", event => {
      event.preventDefault();
      this.props.saveEntityAttributes(event);
    });

    _defineProperty(this, "handleSearch", event => {
      const {
        value
      } = event.target;
      this.setState({
        searchText: (value || '').toLowerCase()
      });
    });
  }

  filterClasses(classes, searchText, filterClassName, filterGroupName, filterAttrName) {
    if (!classes) {
      return [];
    }

    if (!searchText && !filterClassName && !filterGroupName && !filterAttrName) {
      return classes;
    }

    if (searchText && !filterClassName && !filterGroupName && !filterAttrName) {
      return classes.filter(({
        name,
        groups
      }) => {
        // the class name contains the searchText
        return name.toLowerCase().includes(searchText) || !!groups.find(({
          name,
          fields
        }) => {
          // at least one group's name contains the searchText
          return name.toLowerCase().includes(searchText) || !!fields.find(({
            name
          }) => {
            // at least one attribute's name contains the searchText
            return name.toLowerCase().includes(searchText);
          });
        });
      });
    }

    return classes.filter(({
      name,
      groups
    }) => {
      return name.toLowerCase().includes(filterClassName) && !!groups.find(({
        name,
        fields
      }) => {
        return name.toLowerCase().includes(filterGroupName) && !!fields.find(({
          name
        }) => {
          return name.toLowerCase().includes(filterAttrName);
        });
      });
    });
  }

  sortClasses(classes, isAscending) {
    if (!classes) {
      return [];
    }

    if (isAscending === null) {
      return classes;
    }

    const modifiable = [...classes];
    modifiable.sort(({
      name = ''
    }, {
      name: name2 = ''
    }) => {
      const first = name.toLowerCase();
      const second = name2.toLowerCase();
      return first > second ? 1 : second > first ? -1 : 0;
    });
    return isAscending ? modifiable : modifiable.reverse();
  }

  __buildClassificationItems(visibleClasses) {
    const {
      classes,
      attributes,
      canEdit,
      canViewClasses,
      removeClass,
      updateAttribute
    } = this.props;
    const {
      isCollapsed,
      searchText,
      filterClassName,
      filterGroupName,
      filterAttrName
    } = this.state;
    return visibleClasses.map((classification, index) => _react.default.createElement(_ClassificationItem.default, _extends({}, classification, {
      key: index,
      classes: classes,
      canEdit: canEdit,
      canViewClasses: canViewClasses,
      removeClass: removeClass,
      searchText: searchText,
      filterClassName: filterClassName,
      filterGroupName: filterGroupName,
      filterAttrName: filterAttrName,
      updateAttribute: updateAttribute,
      attributes: attributes,
      isCollapsed: isCollapsed
    })));
  }
  /**
   * @override
   */


  render() {
    const {
      canEdit,
      canAdd,
      classes,
      isSaveAvailable
    } = this.props;
    const {
      isCollapsed,
      isSortAscending,
      searchText,
      filterClassName,
      filterGroupName,
      filterAttrName
    } = this.state;
    const isSearchDisabled = filterClassName || filterGroupName || filterAttrName;
    const visibleClasses = this.sortAndFilter(classes, isSortAscending, searchText, filterClassName, filterGroupName, filterAttrName);
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ActionBar.default, {
      left: _react.default.createElement(_platformUi.TextField, {
        onChange: this.handleSearch,
        InputProps: {
          disableUnderline: true
        },
        variant: "standard",
        margin: "none",
        value: searchText,
        placeholder: isSearchDisabled ? 'Clear filters to enable this field' : 'Search for classification / group / attribute name ...',
        disabled: isSearchDisabled
      }),
      right: _react.default.createElement(BurgerWrap, null, _react.default.createElement(_Icon.default, {
        onClick: () => this.setState({
          isFiltersOpen: true
        }),
        name: "filter"
      }), _react.default.createElement(_Icon.default, {
        onClick: this.toggleSorting,
        name: isSortAscending ? 'sort-ascending' : 'sort-descending',
        title: `Click here to sort classes by name in ${!isSortAscending ? 'ascending' : 'descending'} order`
      }), canEdit && canAdd && _react.default.createElement(_reactRouterDom.Link, {
        to: `${this.props.match.url}/add`
      }, _react.default.createElement(_Icon.default, {
        name: "plus"
      })), _react.default.createElement(_Icon.default, {
        onClick: this.toggleCollapse,
        name: isCollapsed ? 'unfold-more-horizontal' : 'unfold-less-horizontal',
        title: `Click here to ${isCollapsed ? 'show' : 'hide'} attributes of all classifications`
      })),
      rightShrink: true
    }), _react.default.createElement(_Layout.default, {
      content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, null, visibleClasses && visibleClasses.length ? isSaveAvailable ? _react.default.createElement(_Form.default, {
        title: "",
        onSubmit: this.onClassificationSubmit,
        id: "classificationForm"
      }, this.__buildClassificationItems(visibleClasses)) : this.__buildClassificationItems(visibleClasses) : this.state.searchText ? `No classification/group/attribute matches search criteria "${this.state.searchText}"` : 'No classification data is available for this entity.'), _react.default.createElement(_Drawer.default, {
        title: "Filters",
        isOpen: this.state.isFiltersOpen,
        isToggled: () => this.setState({
          isFiltersOpen: !this.state.isFiltersOpen
        }),
        footer: _react.default.createElement(_Flex.default, {
          spaceBetween: true,
          grow: true
        }, _react.default.createElement(_Button.default, {
          onClick: () => this.setState({
            filterClassName: '',
            filterGroupName: '',
            filterAttrName: ''
          })
        }, "Clear all"))
      }, _react.default.createElement(_react.Fragment, null, _react.default.createElement("h4", null, "Classification Name"), _react.default.createElement(FullWidthInputText, {
        type: 'text',
        onChange: e => this.setState({
          filterClassName: e.target.value.toLowerCase(),
          searchText: ''
        }),
        value: this.state.filterClassName,
        placeholder: "Type classification name"
      }), _react.default.createElement("h4", null, "Group Name"), _react.default.createElement(FullWidthInputText, {
        type: 'text',
        onChange: e => this.setState({
          filterGroupName: e.target.value.toLowerCase(),
          searchText: ''
        }),
        value: this.state.filterGroupName,
        placeholder: "Type group name"
      }), _react.default.createElement("h4", null, "Attribute Name"), _react.default.createElement(FullWidthInputText, {
        type: 'text',
        onChange: e => this.setState({
          filterAttrName: e.target.value.toLowerCase(),
          searchText: ''
        }),
        value: this.state.filterAttrName,
        placeholder: "Type attribute name"
      }))))
    }), isSaveAvailable && _react.default.createElement(_FooterBar.default, null, classes && classes.length ? _react.default.createElement(_TextIcon.default, {
      icon: "content-save",
      label: "Save",
      color: "primary",
      form: "classificationForm",
      type: "submit"
    }) : null));
  }

}, _defineProperty(_class2, "propTypes", {
  classes: _propTypes.default.array,
  removeClass: _propTypes.default.func,
  attributes: _propTypes.default.object,
  updateAttribute: _propTypes.default.func.isRequired,
  saveEntityAttributes: _propTypes.default.func,
  canEdit: _propTypes.default.bool,
  canViewClasses: _propTypes.default.bool,
  canAdd: _propTypes.default.bool,
  isSaveAvailable: _propTypes.default.bool
}), _defineProperty(_class2, "defaultProps", {
  classes: [],
  attributes: {},
  canEdit: false,
  canViewClasses: false,
  canAdd: true,
  isSaveAvailable: true
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "__buildClassificationItems", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "__buildClassificationItems"), _class.prototype)), _class);

var _default = (0, _reactRouterDom.withRouter)(EntityClassifications);

exports.default = _default;