"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ClassificationsTab = _interopRequireDefault(require("app/containers/Common/ClassificationsTab/ClassificationsTab"));

var _CustomEntityAbout = _interopRequireDefault(require("app/containers/Entities/CustomEntities/CustomEntityDetail/CustomEntityAbout"));

var _CustomEntityChildrenGrid = _interopRequireDefault(require("app/containers/Entities/CustomEntities/CustomEntityDetail/CustomEntityChildrenGrid"));

var _CustomEntitySummary = _interopRequireDefault(require("app/containers/Entities/CustomEntities/CustomEntityDetail/CustomEntitySummary"));

var _EntityAttachmentsView = _interopRequireDefault(require("app/containers/Entities/Attachments/EntityAttachmentsView"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _EntityTimeline = _interopRequireDefault(require("app/containers/Entities/Timeline/EntityTimeline"));

var _dataTableIds = require("app/config/dataTableIds");

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

var _entityChildrenDrawerActions = require("store/actions/entityChildrenDrawer/entityChildrenDrawerActions");

var _utils = require("app/utils/utils");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _RelationshipsTab = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipsTab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Main container to display the detail of a Custom Entity
 *
 * @example <Custom Entity View />
 */
class CustomEntityDetail extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "actionTypes", [_customEntitiesActions.CUSTOM_ENTITY_SAVE, _entitiesActions.UPLOAD_IMAGE]);

    _defineProperty(this, "buildInfo", (0, _memoizeOne.default)((createdBy, modified, status) => [{
      key: 'Created by',
      value: createdBy
    }, {
      key: 'Last Modified',
      value: modified
    }, {
      key: 'Status',
      value: status
    }]));

    props.loadCustomEntity(props.id);
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

    if (prevProps.id !== id || !lastActionError && this.actionTypes.includes(lastActionType)) {
      this.props.loadCustomEntity(id);
    }
  }

  /**
   * @override
   */
  render() {
    const {
      id,
      isLoading,
      customEntity
    } = this.props;

    if (!isLoading && !customEntity) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `Custom Entity (ID:${id})`
      });
    }

    const createdBy = `${(0, _utils.stringify)((0, _lo.get)(customEntity, 'createdBy.name')) || ''} on ${(0, _date.formatDate)((0, _lo.get)(customEntity, 'createdDate'))}`;
    const modified = (0, _date.formatDate)((0, _lo.get)(customEntity, 'modifiedDate'));
    const status = (0, _lo.get)(customEntity, 'active') ? 'Active' : 'Inactive';
    const infoArray = this.buildInfo(createdBy, modified, status);
    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), customEntity && _react.default.createElement(_PageTemplate.default, {
      title: customEntity.name,
      subTitle: `#${customEntity.id}`,
      info: infoArray,
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "sitemap",
        title: "Open Children",
        onClick: this.props.openChildrenDrawer
      }),
      overflowHidden: true
    }, _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
      label: "Summary",
      to: `/custom-entities/${id}/summary`
    }), _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/custom-entities/${id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "Classifications",
      to: `/custom-entities/${id}/classifications`
    }), _react.default.createElement(_TabItem.default, {
      label: "Children",
      to: `/custom-entities/${id}/children`
    }), _react.default.createElement(_TabItem.default, {
      label: "Relationships",
      to: `/custom-entities/${id}/relationships`
    }), _react.default.createElement(_TabItem.default, {
      label: "Attachments",
      to: `/custom-entities/${id}/attachments`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/custom-entities/${id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `/custom-entities/:id`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/custom-entities/${id}/summary`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:id/summary',
      component: _CustomEntitySummary.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:id/about',
      component: _CustomEntityAbout.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:id/classifications'
    }, _react.default.createElement(_ClassificationsTab.default, {
      type: "custom"
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:id/children',
      component: _CustomEntityChildrenGrid.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:id/relationships',
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/custom-entities/${id}/relationships/thing`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:entityId/relationships/:type2',
      render: ({
        match: {
          params
        }
      }) => _react.default.createElement(_RelationshipsTab.default, _extends({}, params, {
        dataTableId: _dataTableIds.CUSTOM_ENTITIES_RELATIONSHIPS_DATA_TABLE,
        baseUri: `/custom-entities/${id}/relationships`,
        type1: 'custom'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:id/attachments'
    }, _react.default.createElement(_EntityAttachmentsView.default, {
      entityId: id,
      entityType: "custom",
      dataGridId: _dataTableIds.CUSTOM_ENTITIES_ATTACHMENTS_DATA_TABLE
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/custom-entities/:id/history'
    }, _react.default.createElement(_EntityTimeline.default, {
      entityType: "custom",
      entityId: id
    })))));
  }

}

_defineProperty(CustomEntityDetail, "propTypes", {
  id: _propTypes.default.string.isRequired,
  loadCustomEntity: _propTypes.default.func.isRequired,
  customEntity: _propTypes.default.object,
  isLoading: _propTypes.default.bool,
  lastActionError: _propTypes.default.bool,
  lastActionType: _propTypes.default.string,
  openChildrenDrawer: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  userProfile: state.user.profile,
  isLoading: state.entities.customEntities.details.isLoading,
  customEntity: (0, _lo.get)(state.entities.customEntities.details.data, 'customEntity'),
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadCustomEntity: _customEntitiesActions.loadCustomEntity,
  openChildrenDrawer: _entityChildrenDrawerActions.openEntityChildrenDrawer
})(CustomEntityDetail);

exports.default = _default;