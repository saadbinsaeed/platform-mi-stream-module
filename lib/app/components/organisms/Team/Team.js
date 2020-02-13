"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _TeamMembersList = _interopRequireDefault(require("./TeamMembersList/TeamMembersList"));

var _AddTeamMember = _interopRequireDefault(require("./AddTeamMember/AddTeamMember"));

var _ChangeAssignee = _interopRequireDefault(require("./ChangeAssignee/ChangeAssignee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Team Index Route for dealing with teams on processes
 */
class Team extends _react.PureComponent {
  /**
   * Render our routes
   */
  render() {
    const {
      match
    } = this.props; // console.log('match', match);

    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/add-person`,
      component: _AddTeamMember.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/change-assignee`,
      component: _ChangeAssignee.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/`,
      exact: true,
      component: _TeamMembersList.default
    }));
  }

}

_defineProperty(Team, "propTypes", {
  match: _propTypes.default.shape({
    url: _propTypes.default.string
  })
});

var _default = (0, _reactRouter.withRouter)(Team);

exports.default = _default;