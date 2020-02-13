"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _recompose = require("recompose");

var _ProcessesList = _interopRequireDefault(require("app/containers/Abox/ProcessesList/ProcessesList"));

var _MyApps = _interopRequireDefault(require("app/containers/Abox/MyApps/MyApps"));

var _StartProcess = _interopRequireDefault(require("app/containers/Abox/MyApps/StartProcess"));

var _ProcessStarted = _interopRequireDefault(require("app/containers/Abox/MyApps/ProcessStarted"));

var _ProcessViewRoute = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessViewRoute"));

var _TaskViewRoute = _interopRequireDefault(require("app/containers/Abox/TaskView/TaskViewRoute"));

var _AboxCalendar = _interopRequireDefault(require("app/containers/Abox/AboxCalendar/AboxCalendar"));

var _TaskList = _interopRequireDefault(require("app/containers/Abox/TaskList/TaskList"));

var _Timeline = _interopRequireDefault(require("app/containers/Abox/Timeline/Timeline"));

var _AddRelationshipNew = _interopRequireDefault(require("app/containers/Entities/Relationships/AddRelationshipNew"));

var _EditRelationship = _interopRequireDefault(require("app/containers/Entities/Relationships/EditRelationship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Define the routes for the Event's views.
 */
const AboxRoute = ({
  match: {
    url
  }
}) => _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/processes`,
  exact: true,
  component: _ProcessesList.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/processes-new`,
  exact: true,
  component: _MyApps.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/process/:entityId/relationships/add`,
  render: ({
    match: {
      params = {}
    }
  }) => _react.default.createElement(_AddRelationshipNew.default, _extends({}, params, {
    baseUri: `${url}/process/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
    ,
    type1: 'process'
  }))
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/process/:entityId/relationships/:type2/:id/edit`,
  render: ({
    match: {
      params = {}
    }
  }) => _react.default.createElement(_EditRelationship.default, _extends({}, params, {
    baseUri: `${url}/process/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
    ,
    type1: 'process'
  }))
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/process`,
  component: _ProcessViewRoute.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/process-start/:appId/:definitionKey`,
  exact: true,
  component: _StartProcess.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/process-started/:processId`,
  exact: true,
  component: _ProcessStarted.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/tasks`,
  exact: true,
  component: _TaskList.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/tasks/:id`,
  exact: true,
  component: // redirect for broken links affectli-project/affectli-support-issues#8270
  ({
    match: {
      params: {
        id
      }
    }
  }) => _react.default.createElement(_reactRouterDom.Redirect, {
    to: `${url}/task/${id}`
  })
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/tasks/:id/:tab`,
  exact: true,
  component: // redirect for broken links affectli-project/affectli-support-issues#8270
  ({
    match: {
      params: {
        id,
        tab
      }
    }
  }) => _react.default.createElement(_reactRouterDom.Redirect, {
    to: `${url}/task/${id}/${tab}`
  })
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/calendar`,
  component: _AboxCalendar.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/task/:entityId/relationships/add`,
  render: ({
    match: {
      params = {}
    }
  }) => _react.default.createElement(_AddRelationshipNew.default, _extends({}, params, {
    baseUri: `${url}/task/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
    ,
    type1: 'task'
  }))
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/task/:entityId/relationships/:type2/:id/edit`,
  render: ({
    match: {
      params = {}
    }
  }) => _react.default.createElement(_EditRelationship.default, _extends({}, params, {
    baseUri: `${url}/task/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
    ,
    type1: 'task'
  }))
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/task`,
  component: _TaskViewRoute.default
}), _react.default.createElement(_reactRouterDom.Route, {
  path: `${url}/timeline`,
  exact: true,
  component: _Timeline.default
}));

var _default = (0, _recompose.pure)(AboxRoute);

exports.default = _default;