"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _common = require("app/utils/propTypes/common");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _UserAbout = _interopRequireDefault(require("app/containers/Admin/UserManagement/Details/UserAbout"));

var _UserHistory = _interopRequireDefault(require("app/containers/Admin/UserManagement/Details/UserHistory"));

var _userManagementAction = require("store/actions/admin/userManagementAction");

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Defines the routes for User Management views
 */
let UserDetail = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class UserDetail extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "actionTypes", [_userManagementAction.UPDATE_USER]);

    props.id && props.loadUser(props.id);
  }

  componentDidUpdate(prevProps) {
    const {
      lastActionError,
      lastActionType,
      id
    } = this.props;

    if (prevProps.id !== id && id !== 'add' || !lastActionError && this.actionTypes.includes(lastActionType)) {
      this.props.loadUser(id);
    }
  }

  buildInfo(createdDate, createdBy, modified, status) {
    return [{
      key: 'Created date',
      value: createdDate
    }, {
      key: 'Created by',
      value: createdBy
    }, {
      key: 'Last authenticated',
      value: modified
    }, {
      key: 'Status',
      value: status
    }];
  }

  render() {
    const {
      isLoading,
      user,
      id,
      isUpdateLoading
    } = this.props;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canView = isAdmin || permissionsSet.has('admin.user.view');

    if (!canView) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Users"
      });
    }

    const {
      active,
      createdBy,
      createdDate,
      lastUpdatedDate
    } = user || {};
    const status = active ? 'Active' : 'Inactive';
    const infoArray = this.buildInfo((0, _date.formatDate)(createdDate), String((0, _lo.get)(createdBy, 'name')), (0, _date.formatDate)(lastUpdatedDate), status);
    return _react.default.createElement(_react.Fragment, null, (isLoading || isUpdateLoading) && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), user && _react.default.createElement(_PageTemplate.default, {
      title: (0, _lo.get)(user, 'name'),
      subTitle: ` #${id} `,
      info: infoArray
    }, _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/user-management/${id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/user-management/${id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `/user-management/:id`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/user-management/${id}/about`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/user-management/:id/about`
    }, _react.default.createElement(_UserAbout.default, {
      user: user,
      location: this.props.location
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: `/user-management/:id/history`
    }, _react.default.createElement(_UserHistory.default, {
      user: user
    })))));
  }

}, _defineProperty(_class2, "propTypes", {
  match: (0, _common.RouterMatchPropTypeBuilder)({}),
  userProfile: _propTypes.default.object,
  loadUser: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  isUpdateLoading: _propTypes.default.bool,
  lastActionError: _propTypes.default.bool,
  lastActionType: _propTypes.default.string,
  user: _propTypes.default.object
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "buildInfo", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildInfo"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)((state, ownProps) => ({
  id: ownProps.match.params.id,
  user: state.admin.users.details.data,
  isLoading: state.admin.users.details.isLoading,
  isUpdateLoading: state.admin.users.user.isLoading,
  userProfile: state.user.profile,
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError
}), {
  loadUser: _userManagementAction.loadUser
})((0, _reactRouterDom.withRouter)(UserDetail));

exports.default = _default;