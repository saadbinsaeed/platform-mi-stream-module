"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _ProcessSummaryTab = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessSummaryTab"));

var _ProcessAboutTab = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessAboutTab"));

var _ProcessTimelineTab = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessTimelineTab"));

var _ProcessSubProcessesTab = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessSubProcessesTab"));

var _AboxAttachments = _interopRequireDefault(require("app/components/ABox/Attachments/AboxAttachments"));

var _ProcessTasksTab = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessTasksTab"));

var _AboxTeam = _interopRequireDefault(require("app/components/ABox/Team/AboxTeam"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _processActions = require("store/actions/abox/processActions");

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _messengerActions = require("store/actions/messenger/messengerActions");

var _aboxConfig = require("app/config/aboxConfig");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _RelationshipsTab = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipsTab"));

var _AddRelationship = _interopRequireDefault(require("app/containers/Entities/Relationships/AddRelationship"));

var _dataTableIds = require("app/config/dataTableIds");

var _dec, _dec2, _dec3, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 *
 */
let ProcessRoute = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), _dec3 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class ProcessRoute extends _react.PureComponent {
  /**
   * constructor - description
   */
  constructor(_props) {
    super(_props);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "handleCancelAboxProcessActivity", () => this.props.cancelProcess(this.id).then(() => this.props.loadProcessDetails(this.id)));

    _defineProperty(this, "buildAboxAttachments", props => _react.default.createElement(_AboxAttachments.default, _extends({}, props, {
      type: "process"
    })));

    _defineProperty(this, "buildAboxTeam", props => _react.default.createElement(_AboxTeam.default, _extends({}, props, {
      reloadDetails: this.props.loadProcessDetails,
      details: this.props.details,
      type: "process"
    })));

    _defineProperty(this, "loadMessenger", () => this.props.loadMessenger(this.id, 'process'));

    this.id = (0, _utils.stringify)((0, _lo.get)(_props, 'match.params.id')) || '';
    this.props.loadProcessDetails(this.id);
    this.props.loadSubprocesses(this.id);
  }
  /**
   * @override
   */


  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.id = (0, _utils.stringify)(this.props.match.params.id) || '';
      this.props.loadProcessDetails(this.id);
      this.props.loadSubprocesses(this.id);
    } else if (!prevProps.outdated && this.props.outdated) {
      this.props.loadProcessDetails(this.id);
    }
  }

  buildInfo(details) {
    if (!details) {
      return null;
    }

    const {
      createdBy,
      createDate,
      endDate,
      status
    } = details;
    const createdByName = createdBy && createdBy.name || '';
    const created = createDate && (0, _date.formatDate)(createDate) || '';
    const modified = status && status.lastUpdate && (0, _date.formatDate)(status.lastUpdate) || '';
    return [{
      key: 'Created by',
      value: createdByName
    }, {
      key: 'Created Date',
      value: created
    }, {
      key: 'Last Modified Date',
      value: modified
    }, {
      key: 'Status',
      value: !endDate ? 'Open' : 'Closed'
    }];
  }

  buildMenuItems(details) {
    return _react.default.createElement(_MenuItem.default, {
      name: "Cancel process",
      icon: "cancel",
      onClick: this.handleCancelAboxProcessActivity
    });
  }

  getBackStyles(headerBackgroundColor) {
    return {
      background: headerBackgroundColor
    };
  }

  /**
   * @override
   */
  render() {
    const {
      match,
      details,
      isLoading,
      theme
    } = this.props;

    if (!isLoading && !details) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `Process (${this.id})`
      });
    }

    const {
      name,
      variables,
      endDate
    } = details || {};
    const infoArray = this.buildInfo(details);
    const menuItems = !endDate ? this.buildMenuItems(details) : null;
    const priority = (0, _utils.getNum)(details, 'variables.priority') || '';
    const priorityColor = endDate ? 'disabled' : (0, _aboxConfig.getPriorityColor)(priority);
    const headerBackgroundColor = `linear-gradient(45deg, ${theme.priorityGradients[priorityColor][0]}, ${theme.priorityGradients[priorityColor][1]})`;
    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      backdrop: true,
      absolute: true
    }), details && _react.default.createElement(_PageTemplate.default, {
      title: name || 'No Name',
      subTitle: `#${this.id}`,
      pillText: `${variables && Math.floor(Number(variables.progress)) || 0}%`,
      info: infoArray,
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "messenger",
        type: "af",
        title: "Open messenger",
        onClick: this.loadMessenger
      }),
      menuItems: menuItems,
      color: this.getBackStyles(headerBackgroundColor),
      overflowHidden: true
    }, _react.default.createElement(_TabRow.default, {
      color: headerBackgroundColor
    }, _react.default.createElement(_TabItem.default, {
      label: "Summary",
      to: `/abox/process/${this.id}/summary`
    }), _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/abox/process/${this.id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "Sub-Processes",
      to: `/abox/process/${this.id}/sub-processes`
    }), _react.default.createElement(_TabItem.default, {
      label: "Tasks",
      to: `/abox/process/${this.id}/tasks`
    }), _react.default.createElement(_TabItem.default, {
      label: "Team",
      to: `/abox/process/${this.id}/team`
    }), _react.default.createElement(_TabItem.default, {
      label: "Relationships",
      to: `/abox/process/${this.id}/relationships`
    }), _react.default.createElement(_TabItem.default, {
      label: "Attachments",
      to: `/abox/process/${this.id}/attachments`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/abox/process/${this.id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `${match.url}/summary`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/process/:id/summary`,
      exact: true,
      component: _ProcessSummaryTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/process/:id/about`,
      exact: true,
      component: _ProcessAboutTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/process/:id/sub-processes`,
      exact: true,
      component: _ProcessSubProcessesTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/process/:id/tasks`,
      exact: true,
      component: _ProcessTasksTab.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/process/:id/team`,
      exact: true,
      component: this.buildAboxTeam
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/process/:id/attachments`,
      exact: true,
      component: this.buildAboxAttachments
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `/abox/process/:entityId/relationships/:type2/add`,
      exact: true,
      render: ({
        match: {
          params
        },
        location
      }) => _react.default.createElement(_AddRelationship.default, _extends({}, params, {
        location: location,
        type1: 'process'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/process/:id/relationships',
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/abox/process/${this.id}/relationships/thing`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/process/:entityId/relationships/:type2',
      render: ({
        match: {
          params
        }
      }) => _react.default.createElement(_RelationshipsTab.default, _extends({}, params, {
        dataTableId: _dataTableIds.ABOX_PROCESS_RELATIONSHIPS_DATA_TABLE,
        baseUri: `/abox/process/${this.id}/relationships`,
        type1: 'process'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/abox/process/:id/history',
      render: () => _react.default.createElement(_ProcessTimelineTab.default, {
        id: this.id
      })
    }))));
  }

}, _defineProperty(_class2, "propTypes", {
  details: _propTypes.default.object,
  isLoading: _propTypes.default.bool,
  loadProcessDetails: _propTypes.default.func,
  cancelProcess: _propTypes.default.func,
  uploadProcessAttachment: _propTypes.default.func,
  loadMessenger: _propTypes.default.func,
  loadSubprocesses: _propTypes.default.func
}), _defineProperty(_class2, "defaultProps", {
  details: {},
  isLoading: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "buildInfo", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildInfo"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildMenuItems", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "buildMenuItems"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getBackStyles", [_decoratorUtils.bind, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "getBackStyles"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.process.details.isLoading,
  details: state.abox.process.details.data,
  outdated: state.abox.process.detailsOutdated
}), {
  loadProcessDetails: _processActions.loadProcessDetails,
  loadMessenger: _messengerActions.loadMessenger,
  cancelProcess: _processActions.cancelProcess,
  loadSubprocesses: _processActions.loadSubprocesses
})((0, _styledComponents.withTheme)(ProcessRoute));

exports.default = _default;