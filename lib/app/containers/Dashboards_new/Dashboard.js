"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _Immutable = require("app/utils/immutable/Immutable");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _ErrorBoundary = _interopRequireDefault(require("app/components/atoms/ErrorBoundary/ErrorBoundary"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ToolBar = _interopRequireDefault(require("app/components/molecules/ToolBar/ToolBar"));

var _platformUi = require("@mic3/platform-ui");

var _DashboardTaskWidget = _interopRequireDefault(require("app/containers/Dashboards_new/Widgets/DashboardTaskWidget"));

var _usersActions = require("store/actions/admin/usersActions");

var _dashboardWidgetConfig = require("app/config/dashboardWidgetConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CustomToolBar = (0, _styledComponents.default)(_ToolBar.default).withConfig({
  displayName: "Dashboard__CustomToolBar",
  componentId: "o3ckx1-0"
})(["[class*=\"ToolBar__ColRight\"]{&:before{display:none;}}"]);

const IconWrapper = _styledComponents.default.div.withConfig({
  displayName: "Dashboard__IconWrapper",
  componentId: "o3ckx1-1"
})(["display:flex;flex-direction:row;"]);
/**
 * Renders the view to display the classification.
 */


class Dashboard extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onDashboardSettingsChange", ({
      breadcrumbs,
      selectedGroup
    }, index) => {
      const setting = {
        breadcrumbs,
        selectedGroup
      };
      this.setState(state => ({
        dashboard: (0, _Immutable.set)(state.dashboard, `[${index}]`, setting)
      }));
    });

    _defineProperty(this, "saveDashboardPreference", isReset => {
      const {
        preferences,
        widgetGroups,
        saveUserPreferences
      } = this.props;
      const defaultPreference = [{
        selectedGroup: widgetGroups[0],
        breadcrumbs: []
      }, {
        selectedGroup: widgetGroups[0],
        breadcrumbs: []
      }, {
        selectedGroup: widgetGroups[0],
        breadcrumbs: []
      }];
      const userPreferences = { ...preferences,
        dashboard: isReset ? defaultPreference : this.state.dashboard
      };
      saveUserPreferences(userPreferences);
    });

    _defineProperty(this, "onClickReset", () => {
      this.setState(state => ({
        isReset: !state.isReset
      }));
      this.saveDashboardPreference(true);
    });

    this.state = {
      dashboard: [],
      isReset: false
    };
  }

  render() {
    return _react.default.createElement(_PageTemplate.default, {
      title: "Dashboard (BETA)"
    }, _react.default.createElement(CustomToolBar, {
      rightSide: _react.default.createElement(IconWrapper, null, _react.default.createElement(_platformUi.Tooltip, {
        title: "Save"
      }, _react.default.createElement(_platformUi.IconButton, {
        onClick: () => this.saveDashboardPreference(false)
      }, _react.default.createElement(_platformUi.MdiIcon, {
        name: "content-save",
        color: "inherit"
      }))), _react.default.createElement(_platformUi.Tooltip, {
        title: "Restore"
      }, _react.default.createElement(_platformUi.IconButton, {
        onClick: this.onClickReset
      }, _react.default.createElement(_platformUi.MdiIcon, {
        name: "restore",
        color: "inherit"
      }))))
    }), _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Grid, {
      fluid: true,
      style: {
        paddingTop: '1.5rem'
      }
    }, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_DashboardTaskWidget.default, {
      toggleReset: this.state.isReset,
      widgetIndex: 0,
      onDashboardSettingsChange: this.onDashboardSettingsChange
    }))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_DashboardTaskWidget.default, {
      toggleReset: this.state.isReset,
      widgetIndex: 1,
      onDashboardSettingsChange: this.onDashboardSettingsChange
    }))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_DashboardTaskWidget.default, {
      toggleReset: this.state.isReset,
      widgetIndex: 2,
      onDashboardSettingsChange: this.onDashboardSettingsChange
    })))))));
  }

}

_defineProperty(Dashboard, "propTypes", {
  preferences: _propTypes.default.object,
  widgetGroups: _propTypes.default.array,
  saveUserPreferences: _propTypes.default.func
});

const mapStateToProps = state => {
  return {
    preferences: state.user.preferences,
    widgetGroups: _dashboardWidgetConfig.widgetGroups
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  saveUserPreferences: _usersActions.saveUserPreferences
})(Dashboard);

exports.default = _default;