"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _History = _interopRequireDefault(require("store/History"));

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Circle = _styledComponents.default.span.withConfig({
  displayName: "DashboardTaskWidgetList__Circle",
  componentId: "kslj3k-0"
})(["display:block;margin:0 auto;width:8px;height:8px;border-radius:50%;background:", ";"], ({
  backgroundColor
}) => backgroundColor);

const StyledDropdow = (0, _styledComponents.default)(_Dropdown.default).withConfig({
  displayName: "DashboardTaskWidgetList__StyledDropdow",
  componentId: "kslj3k-1"
})(["&.ui-state-default,.ui-state-default,.ui-inputtext{border:none;background:transparent;color:rgba(255,255,255,0.6);transition:color 0.5s;&:hover{background:transparent !important;}}&:hover{&,.ui-state-default,.ui-inputtext{border:none !important;color:#fff !important;}}.ui-dropdown-label{line-height:40px;min-height:48px;}.ui-inputtext{font-weight:500 !important;font-size:16px;}"]);

const StyledDiv = _styledComponents.default.div.withConfig({
  displayName: "DashboardTaskWidgetList__StyledDiv",
  componentId: "kslj3k-2"
})(["padding:0 0.5rem;max-height:240px;overflow-y:auto;"]);

const StyledRow = (0, _styledComponents.default)(_reactStyledFlexboxgrid.Row).withConfig({
  displayName: "DashboardTaskWidgetList__StyledRow",
  componentId: "kslj3k-3"
})(["padding:10px 0.5rem;border-top:1px solid rgba(255,255,255,0.24);border-bottom:1px solid transparent;font-size:14px;"]);
const StyledLink = (0, _styledComponents.default)(_Link.default).withConfig({
  displayName: "DashboardTaskWidgetList__StyledLink",
  componentId: "kslj3k-4"
})(["color:#4BB9D9 !important;"]);
const StyledDropDownCol = (0, _styledComponents.default)(_reactStyledFlexboxgrid.Col).withConfig({
  displayName: "DashboardTaskWidgetList__StyledDropDownCol",
  componentId: "kslj3k-5"
})(["", "{padding:0;}"], _InputWrapper.default);
const StyledButtonIcon = (0, _styledComponents.default)(_ButtonIcon.default).withConfig({
  displayName: "DashboardTaskWidgetList__StyledButtonIcon",
  componentId: "kslj3k-6"
})(["opacity:0.6;padding:0;width:100%;height:100%;display:block;transition:opacity 0.5s;&:hover{opacity:1;}"]);
const NavigationRow = (0, _styledComponents.default)(_reactStyledFlexboxgrid.Row).withConfig({
  displayName: "DashboardTaskWidgetList__NavigationRow",
  componentId: "kslj3k-7"
})(["padding:0 1.1rem;"]);

class DashboardTaskWidgetList extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onOptionLinkClick", (option, event) => {
      event.preventDefault();
      const {
        breadcrumbs,
        selectedGroup
      } = this.props;
      const subFilters = (0, _utils.isEmpty)(breadcrumbs) ? [] : breadcrumbs.map(breadcrumb => {
        return {
          [breadcrumb.field]: breadcrumb.selectedOption.value
        };
      });
      const mainFilter = {
        [selectedGroup.field]: option.value
      };
      const filters = (0, _utils.isEmpty)(subFilters) ? mainFilter : Object.assign(...subFilters, mainFilter);
      this.props.saveComponentState('TaskListFilters', {
        filters
      });

      _History.default.push('/abox/tasks');
    });

    _defineProperty(this, "onWidgetGroupChange", event => {
      const {
        value
      } = event.target;
      const group = this.props.availableGroups.find(g => g.name === value);

      if (group) {
        this.props.onWidgetGroupChange(group);
      }
    });

    _defineProperty(this, "widgetGroupOptions", groups => {
      return groups.map(group => ({
        label: group.name,
        value: group.name
      }));
    });

    _defineProperty(this, "widgetOptionList", () => {
      const {
        selectedGroupOptions,
        onWidgetOptionSelect
      } = this.props;
      return selectedGroupOptions.map((option, idx) => {
        return _react.default.createElement(StyledRow, {
          middle: "xs",
          key: idx
        }, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
          xs: 1
        }, _react.default.createElement(Circle, {
          backgroundColor: (0, _lo.get)(option, 'itemStyle.color')
        })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
          xs: 8,
          lg: 7
        }, option.name), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
          xs: 2,
          lg: 3
        }, _react.default.createElement(StyledLink, {
          to: '/abox/tasks',
          onClick: e => {
            this.onOptionLinkClick(option, e);
          }
        }, option.count)), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
          xs: 1
        }, option.count > 1 && _react.default.createElement(StyledButtonIcon, {
          icon: "chevron-right",
          onClick: () => onWidgetOptionSelect(option)
        })));
      });
    });
  }

  render() {
    const {
      selectedGroup,
      availableGroups,
      breadcrumbs,
      getPrevSelectedGroup
    } = this.props;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(NavigationRow, {
      middle: "xs"
    }, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 1
    }, breadcrumbs.length > 0 && _react.default.createElement(StyledButtonIcon, {
      icon: "chevron-left",
      onClick: () => getPrevSelectedGroup()
    })), _react.default.createElement(StyledDropDownCol, {
      xs: 10
    }, _react.default.createElement(StyledDropdow, {
      key: 'name',
      value: selectedGroup.name,
      onChange: e => this.onWidgetGroupChange(e),
      options: this.widgetGroupOptions(availableGroups)
    }))), _react.default.createElement(StyledDiv, null, this.widgetOptionList()));
  }

}

_defineProperty(DashboardTaskWidgetList, "propTypes", {
  selectedGroup: _propTypes.default.object,
  breadcrumbs: _propTypes.default.array,
  availableGroups: _propTypes.default.array,
  selectedGroupOptions: _propTypes.default.array,
  saveComponentState: _propTypes.default.func,
  onWidgetGroupChange: _propTypes.default.func,
  onWidgetOptionSelect: _propTypes.default.func,
  getPrevSelectedGroup: _propTypes.default.func
});

var _default = DashboardTaskWidgetList;
exports.default = _default;