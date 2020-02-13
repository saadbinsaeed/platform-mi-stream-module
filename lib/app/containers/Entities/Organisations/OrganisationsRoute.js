"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _common = require("app/utils/propTypes/common");

var _routerUtils = require("app/utils/router/routerUtils");

var _OrganisationsGrid = _interopRequireDefault(require("app/components/Entities/Organisations/OrganisationsGrid/OrganisationsGrid"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _OrganisationAddContainer = _interopRequireDefault(require("./OrganisationAdd/OrganisationAddContainer"));

var _OrganisationDetail = _interopRequireDefault(require("./OrganisationDetail/OrganisationDetail"));

var _ClassificationsAddTab = _interopRequireDefault(require("../../Common/ClassificationsTab/ClassificationsAddTab"));

var _EntityChildrenDrawer = _interopRequireDefault(require("app/components/organisms/EntityChildrenDrawer/EntityChildrenDrawer"));

var _AddRelationship = _interopRequireDefault(require("app/containers/Entities/Relationships/AddRelationship"));

var _AddRelationshipNew = _interopRequireDefault(require("app/containers/Entities/Relationships/AddRelationshipNew"));

var _EditRelationship = _interopRequireDefault(require("app/containers/Entities/Relationships/EditRelationship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines the routes for the Organisations views
 */
class OrganisationsRoute extends _react.PureComponent {
  /**
   *
   */
  modalRouting(url) {
    return [_react.default.createElement(_reactRouterDom.Route, {
      key: "add",
      path: `${url}/add`,
      component: _OrganisationAddContainer.default
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
        type1: 'organisation'
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
    const canView = isAdmin || permissionsSet.has('entity.organisation.view');

    if (!canView) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Organisations"
      });
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}`,
      exact: true,
      component: _OrganisationsGrid.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: '/organisations/:id/classifications/add'
    }, _react.default.createElement(_ClassificationsAddTab.default, {
      type: "organisation"
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:entityId/relationships/add',
      render: ({
        match: {
          params = {}
        }
      }) => _react.default.createElement(_AddRelationshipNew.default, _extends({}, params, {
        baseUri: `/organisations/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
        ,
        type1: 'organisation'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:entityId/relationships/:type2/:id/edit',
      render: ({
        match: {
          params = {}
        }
      }) => _react.default.createElement(_EditRelationship.default, _extends({}, params, {
        baseUri: `/organisations/${String(params.entityId)}/relationships` // eslint-disable-line flowtype-errors/show-errors
        ,
        type1: 'organisation'
      }))
    }), this.modalRouting(match.url), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id`,
      component: _OrganisationDetail.default
    })), (0, _routerUtils.isModal)(location, previousLocation) && _react.default.createElement(_reactRouterDom.Switch, null, this.modalRouting(match.url)), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id`,
      component: _EntityChildrenDrawer.default
    }));
  }

}

_defineProperty(OrganisationsRoute, "propTypes", {
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
}), null)(OrganisationsRoute);

exports.default = _default;