"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

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

var _thingsActions = require("store/actions/entities/thingsActions");

var _entityChildrenDrawerActions = require("store/actions/entityChildrenDrawer/entityChildrenDrawerActions");

var _utils = require("app/utils/utils");

var _dataTableIds = require("app/config/dataTableIds");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _ThingAbout = _interopRequireDefault(require("./ThingAbout/ThingAbout"));

var _ThingChildren = _interopRequireDefault(require("./ThingChildren/ThingChildren"));

var _ThingSummary = _interopRequireDefault(require("./ThingSummary/ThingSummary"));

var _RelationshipsTab = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipsTab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class
 * Main container to display the detail of a Thing
 *
 * @example <ThingView />
 */
class ThingDetail extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "actionTypes", [_thingsActions.THING_SAVE, _entitiesActions.UPLOAD_IMAGE]);

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

    props.loadThing(props.id);
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
      this.props.loadThing(id);
    }
  }

  /**
   * @override
   */
  render() {
    const {
      id,
      isLoading,
      thing
    } = this.props;

    if (!isLoading && !thing) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `Thing (ID:${id})`
      });
    }

    const createdBy = `${(0, _utils.stringify)((0, _lo.get)(thing, 'createdBy.name')) || ''} on ${(0, _date.formatDate)((0, _lo.get)(thing, 'createdDate'))}`;
    const modified = (0, _date.formatDate)((0, _lo.get)(thing, 'modifiedDate'));
    const status = (0, _lo.get)(thing, 'active') ? 'Active' : 'Inactive';
    const infoArray = this.buildInfo(createdBy, modified, status);
    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), thing && _react.default.createElement(_PageTemplate.default, {
      title: thing.name,
      subTitle: `#${thing.id}`,
      info: infoArray,
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "sitemap",
        title: "Open Children",
        onClick: this.props.openChildrenDrawer
      }),
      overflowHidden: true
    }, _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
      label: "Summary",
      to: `/things/${id}/summary`
    }), _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/things/${id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "Classifications",
      to: `/things/${id}/classifications`
    }), _react.default.createElement(_TabItem.default, {
      label: "Children",
      to: `/things/${id}/children`
    }), _react.default.createElement(_TabItem.default, {
      label: "Relationships",
      to: `/things/${id}/relationships`
    }), _react.default.createElement(_TabItem.default, {
      label: "Attachments",
      to: `/things/${id}/attachments`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/things/${id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `/things/:id`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/things/${id}/summary`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:id/summary',
      component: _ThingSummary.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:id/about',
      component: _ThingAbout.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:id/classifications'
    }, _react.default.createElement(_ClassificationsTab.default, {
      type: "thing"
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:id/children',
      component: _ThingChildren.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:id/relationships',
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/things/${id}/relationships/thing`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:entityId/relationships/:type2',
      render: ({
        match: {
          params
        }
      }) => _react.default.createElement(_RelationshipsTab.default, _extends({}, params, {
        dataTableId: _dataTableIds.THING_RELATIONSHIPS_DATA_TABLE,
        baseUri: `/things/${id}/relationships`,
        type1: 'thing'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:id/attachments'
    }, _react.default.createElement(_EntityAttachmentsView.default, {
      entityId: id,
      entityType: "thing",
      dataGridId: _dataTableIds.THING_ATTACHMENTS_DATA_TABLE
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/things/:id/history'
    }, _react.default.createElement(_EntityTimeline.default, {
      entityType: "thing",
      entityId: id
    })))));
  }

}

_defineProperty(ThingDetail, "propTypes", {
  id: _propTypes.default.string.isRequired,
  loadThing: _propTypes.default.func.isRequired,
  thing: _propTypes.default.object,
  isLoading: _propTypes.default.bool,
  lastActionError: _propTypes.default.bool,
  lastActionType: _propTypes.default.string,
  openChildrenDrawer: _propTypes.default.func,
  userProfile: _propTypes.default.object
});

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  userProfile: state.user.profile,
  isLoading: state.entities.things.details.isLoading,
  thing: (0, _lo.get)(state.entities.things.details.data, 'thing'),
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadThing: _thingsActions.loadThing,
  openChildrenDrawer: _entityChildrenDrawerActions.openEntityChildrenDrawer
})((0, _reactRouter.withRouter)(ThingDetail));

exports.default = _default;