"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ClassificationsTab = _interopRequireDefault(require("app/containers/Common/ClassificationsTab/ClassificationsTab"));

var _EntityAttachmentsView = _interopRequireDefault(require("app/containers/Entities/Attachments/EntityAttachmentsView"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _EntityTimeline = _interopRequireDefault(require("app/containers/Entities/Timeline/EntityTimeline"));

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _organisationsActions = require("store/actions/entities/organisationsActions");

var _entityChildrenDrawerActions = require("store/actions/entityChildrenDrawer/entityChildrenDrawerActions");

var _dataTableIds = require("app/config/dataTableIds");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _OrganisationAbout = _interopRequireDefault(require("./OrganisationAbout/OrganisationAbout"));

var _OrganisationChildren = _interopRequireDefault(require("./OrganisationChildren/OrganisationChildren"));

var _OrganisationsSummary = _interopRequireDefault(require("./OrganisationsSummary/OrganisationsSummary"));

var _RelationshipsTab = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipsTab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Organisation container
 */
class OrganisationDetail extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "actionTypes", [_organisationsActions.SAVE_ORGANISATION, _entitiesActions.UPLOAD_IMAGE]);

    _defineProperty(this, "buildInfo", (0, _fastMemoize.default)((createdBy, modified, status) => [{
      key: 'Created by',
      value: createdBy
    }, {
      key: 'Last Modified',
      value: modified
    }, {
      key: 'Status',
      value: status
    }]));

    props.loadOrganisation(props.id);
  }

  /**
   * @override
   * @param prevProps the properties that the component will receive.
   */
  componentDidUpdate(prevProps) {
    const {
      lastActionError,
      lastActionType,
      id
    } = this.props;

    if (prevProps.id !== id && id !== 'add' || !lastActionError && this.actionTypes.includes(lastActionType)) {
      this.props.loadOrganisation(id);
    }
  }

  /**
   * @override
   */
  render() {
    const {
      id,
      organisation,
      isLoading,
      recentAttachments,
      loadOrganisation
    } = this.props;

    if (!isLoading && !organisation) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `Organisation (ID:${id})`
      });
    }

    const {
      modifiedDate,
      active,
      createdDate
    } = organisation || {};
    const createdByName = String((0, _lo.get)(organisation, 'createdBy.name') || '');
    const createdBy = `${createdByName ? `${createdByName} on ` : ''}${(0, _date.formatDate)(createdDate)}`;
    const modified = (0, _date.formatDate)(modifiedDate);
    const status = `${active ? 'Active' : 'Inactive'}`;
    const infoArray = this.buildInfo(createdBy, modified, status);
    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), organisation && _react.default.createElement(_PageTemplate.default, {
      title: (0, _lo.get)(organisation, 'name'),
      subTitle: id,
      info: infoArray,
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "sitemap",
        title: "Open Children",
        onClick: this.props.openChildrenDrawer
      }),
      overflowHidden: true
    }, _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
      label: "Summary",
      to: `/organisations/${id}/summary`
    }), _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/organisations/${id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "Classifications",
      to: `/organisations/${id}/classifications`
    }), _react.default.createElement(_TabItem.default, {
      label: "Children",
      to: `/organisations/${id}/children`
    }), _react.default.createElement(_TabItem.default, {
      label: "Relationships",
      to: `/organisations/${id}/relationships`
    }), _react.default.createElement(_TabItem.default, {
      label: "Attachments",
      to: `/organisations/${id}/attachments`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/organisations/${id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `/organisations/:id`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/organisations/${id}/summary`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:id/summary'
    }, _react.default.createElement(_OrganisationsSummary.default, {
      organisation: organisation,
      recentAttachments: recentAttachments,
      loadOrganisation: loadOrganisation
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:id/about'
    }, _react.default.createElement(_OrganisationAbout.default, {
      organisation: organisation,
      location: this.props.location
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:id/classifications'
    }, _react.default.createElement(_ClassificationsTab.default, {
      type: "organisation"
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:id/children',
      exact: true,
      component: _OrganisationChildren.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:id/relationships',
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/organisations/${id}/relationships/thing`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:entityId/relationships/:type2',
      render: ({
        match: {
          params
        }
      }) => _react.default.createElement(_RelationshipsTab.default, _extends({}, params, {
        dataTableId: _dataTableIds.ORGANISATION_RELATIONSHIPS_DATA_TABLE,
        baseUri: `/organisations/${id}/relationships`,
        type1: 'organisation'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:id/attachments'
    }, _react.default.createElement(_EntityAttachmentsView.default, {
      entityId: id,
      entityType: "organisation",
      dataGridId: _dataTableIds.ORGANISATION_ATTACHMENTS_DATA_TABLE
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/organisations/:id/history'
    }, _react.default.createElement(_EntityTimeline.default, {
      entityType: "organisation",
      entityId: id
    })))));
  }

}

_defineProperty(OrganisationDetail, "propTypes", {
  id: _propTypes.default.string.isRequired,
  organisation: _propTypes.default.object,
  loadOrganisation: _propTypes.default.func,
  isLoading: _propTypes.default.bool,
  lastActionError: _propTypes.default.bool,
  lastActionType: _propTypes.default.string,
  recentAttachments: _propTypes.default.arrayOf(_propTypes.default.object)
});

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  userProfile: state.user.profile,
  isLoading: state.entities.organisations.details.isLoading,
  organisation: (0, _lo.get)(state.entities.organisations.details.data, 'organisation'),
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  recentAttachments: (0, _lo.get)(state.entities.organisations.details.data, 'recentAttachments')
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadOrganisation: _organisationsActions.loadOrganisation,
  openChildrenDrawer: _entityChildrenDrawerActions.openEntityChildrenDrawer
})((0, _reactRouterDom.withRouter)(OrganisationDetail));

exports.default = _default;