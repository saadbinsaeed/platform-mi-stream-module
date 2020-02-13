"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _ErrorBoundary = _interopRequireDefault(require("app/components/atoms/ErrorBoundary/ErrorBoundary"));

var _TasksAssignedToMeWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/TasksAssignedToMeWidget"));

var _TasksOwnedByMeWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/TasksOwnedByMeWidget"));

var _TasksImMemberWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/TasksImMemberWidget"));

var _TasksDoneWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/TasksDoneWidget"));

var _ProcessesOwnedByMeWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/ProcessesOwnedByMeWidget"));

var _ProcessesAssignedToMeWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/ProcessesAssignedToMeWidget"));

var _ProcessesMemberOfWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/ProcessesMemberOfWidget"));

var _ProcessesDoneWidget = _interopRequireDefault(require("app/containers/Dashboards/Widgets/ProcessesDoneWidget"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders the view to display the classification.
 */
const Dashboard = props => _react.default.createElement(_PageTemplate.default, {
  title: "Dashboard"
}, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Grid, {
  fluid: true,
  style: {
    paddingTop: '1.5rem'
  }
}, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_TasksAssignedToMeWidget.default, null))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_TasksOwnedByMeWidget.default, null))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_TasksImMemberWidget.default, null))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_TasksDoneWidget.default, null)))), _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_ProcessesAssignedToMeWidget.default, null))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_ProcessesOwnedByMeWidget.default, null))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_ProcessesMemberOfWidget.default, null))), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
  xs: 12,
  md: 6,
  lg: 3
}, _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_ProcessesDoneWidget.default, null)))))));

var _default = (0, _recompose.pure)(Dashboard);

exports.default = _default;