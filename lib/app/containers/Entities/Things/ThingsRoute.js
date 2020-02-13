"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _ThingsList = _interopRequireDefault(require("app/containers/Entities/Things/ThingList/ThingsList"));

var _ThingAdd = _interopRequireDefault(require("app/containers/Entities/Things/ThingAdd/ThingAdd"));

var _ThingDetail = _interopRequireDefault(require("app/containers/Entities/Things/ThingDetail/ThingDetail"));

var _common = require("app/utils/propTypes/common");

var _routerUtils = require("app/utils/router/routerUtils");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _EntityChildrenDrawer = _interopRequireDefault(require("app/components/organisms/EntityChildrenDrawer/EntityChildrenDrawer"));

var _AddRelationship = _interopRequireDefault(require("app/containers/Entities/Relationships/AddRelationship"));

var _ClassificationsAddTab = _interopRequireDefault(require("app/containers/Common/ClassificationsTab/ClassificationsAddTab"));

var _AddRelationshipNew = _interopRequireDefault(require("app/containers/Entities/Relationships/AddRelationshipNew"));

var _EditRelationship = _interopRequireDefault(require("app/containers/Entities/Relationships/EditRelationship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines the routes for the Thing views
 */
class ThingsRoute extends _react.PureComponent {
  /**
   *
   */
  modalRouting(url) {
    return [_react.default.createElement(_reactRouterDom.Route, {
      key: "add",
      exact: true,
      path: `${url}/add`,
      component: _ThingAdd.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      key: "add_relationship",
      path: `${url}/:entityId/relationships/:type2/add`,
      exact: true,
      render: ({
        match: {
          params
        },
        location
      }) => _react.default.createElement(_AddRelationship.default, _extends({}, params, {
        location: location,
        type1: 'thing'
      }))
    })];
  }
  /**
   * @override
   */


  render() {
    const {
      match,
      location,
      previousLocation
    } = this.props;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canView = isAdmin || permissionsSet.has('entity.thing.view');

    if (!canView) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Things"
      });
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}`,
      exact: true,
      component: _ThingsList.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: '/things/:id/classifications/add'
    }, _react.default.createElement(_ClassificationsAddTab.default, {
      type: "thing"
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:entityId/relationships/add',
      render: ({
        match: {
          params = {}
        }
      }) => _react.default.createElement(_AddRelationshipNew.default, _extends({}, params, {
        baseUri: `/things/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
        ,
        type1: 'thing'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:entityId/relationships/:type2/:id/edit',
      render: ({
        match: {
          params = {}
        }
      }) => _react.default.createElement(_EditRelationship.default, _extends({}, params, {
        baseUri: `/things/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
        ,
        type1: 'thing'
      }))
    }), this.modalRouting(match.url), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id`,
      component: _ThingDetail.default
    })), (0, _routerUtils.isModal)(location, previousLocation) && _react.default.createElement(_reactRouterDom.Switch, null, this.modalRouting(match.url)), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id`,
      component: _EntityChildrenDrawer.default
    }));
  }

}

_defineProperty(ThingsRoute, "propTypes", {
  location: _propTypes.default.object,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string
  }),
  previousLocation: _propTypes.default.object,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  previousLocation: state.routing.previousLocation,
  userProfile: state.user.profile
}))(ThingsRoute);

exports.default = _default;