"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _IFrame = _interopRequireDefault(require("app/components/atoms/IFrame/IFrame"));

var _lo = require("app/utils/lo/lo");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _History = _interopRequireDefault(require("store/History"));

var _appActions = require("store/actions/app/appActions");

var _PageNotAllowed = _interopRequireDefault(require("../ErrorPages/PageNotAllowed"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const LegacyAppContainer = _styledComponents.default.div.withConfig({
  displayName: "LegacyApp__LegacyAppContainer",
  componentId: "sc-1htrqzl-0"
})(["display:", ";", " ", ""], ({
  visible
}) => visible ? 'block' : 'none', ({
  isFormDetailView
}) => isFormDetailView && `
        position: absolute;
        top: 205px;
        left: 0;
        right: 0;
        bottom: 0;
    `, ({
  isStartProcessView
}) => isStartProcessView && `
        position: absolute;
        top: 55px;
        left: 0;
        right: 0;
        bottom: 0;
    `);
/**
 * Loads the Legacy Platform in an iframe.
 */


let LegacyApp = (_dec = (0, _decoratorUtils.debounce)(1000), (_class = (_temp = _class2 = class LegacyApp extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      key: this.props.legacyKey
    });

    _defineProperty(this, "empty", {
      title: '',
      src: '/legacy/#/empty'
    });
  }

  /**
   * @override
   */
  componentDidMount() {
    window.addEventListener('message', this.processMessage, false);
  }

  // WORKAROUND: issue#7947: the first time we go to maps we receive #/abox/empty first and then #/maps/situational_awareness/
  processMessage({
    data
  }) {
    if (data && data.key === 'legacy-hash' && data.hash) {
      const goTo = this.translateLegacyHash(data.hash);
      const isRedirectToTask = data.hash.startsWith('#/abox/activities') && window.location.hash.startsWith('#/abox/task/');

      if (data.newURL.includes('/#/abox/reload-full-page') || isRedirectToTask) {
        this.props.onReloadFullPage && this.props.onReloadFullPage();
      } else if (data.newURL.includes('/#/abox/processes-new')) {
        _History.default.push('/abox/processes-new');
      } else if (goTo) {
        if (goTo.includes('abox/processes/new') || goTo.includes('abox/process/new')) {
          return;
        }

        if (goTo !== (0, _lo.get)(this.props.routeHistory, '[0].pathname')) {
          _History.default.push(goTo);
        }
      } else if (window.location.hash === '#/legacy/maps' && !data.hash.startsWith('#/maps/')) {
        // if we are in the maps route but we are not loading maps means that a "browser back" have been executed
        this.props.history.goBack();
      } else if (window.location.hash.endsWith('/form')) {
        // if we are in the form route but we are not loading the form means that a "browser back" have been executed
        if (this.isLegacyTaskForm(this.props) && !data.hash.startsWith('#/task-form/') || !this.isLegacyTaskForm(this.props) && !data.hash.endsWith('/empty')) {
          this.props.history.goBack();
        }
      } else if (window.location.hash.startsWith('#/abox/process-start')) {
        // if we are in the starting process route but we are not loading the start form means that a "browser back" have been executed
        if (this.isLegacyStartForm(this.props) && !data.hash.startsWith('#/abox/processes/new') || !this.isLegacyStartForm(this.props) && !data.hash.endsWith('/empty')) {
          this.props.history.goBack();
        }
      }
    }
  }

  /**
   *
   */
  componentWillReceiveProps(nextProps) {
    const {
      route,
      location
    } = nextProps;

    if (route !== this.props.route && route.startsWith('/legacy') && !route.startsWith('/legacy/task')) {
      const {
        title
      } = this.getTitleAndSrc(nextProps);
      this.props.setHeader({
        title,
        subTitle: '',
        headerInfo: []
      });
    }

    const isOnTaskForm = location.pathname.match(/abox\/task\/(\d+)\/form$/);

    if (isOnTaskForm) {
      this.setState({
        key: nextProps.legacyKey
      });
    }
  }

  getRoute(props) {
    return props.route || props.location && props.location.pathname || '';
  }

  isLegacyStartForm(props) {
    const {
      processDefinition
    } = props;
    const startForm = (0, _lo.get)(processDefinition, '_startFormDefinition');
    return startForm && startForm.id && !startForm.definition.version;
  }

  isLegacyTaskForm(props) {
    const {
      task
    } = props;
    const form = (0, _lo.get)(task, 'form');
    return form && form.id && !form.definition.version;
  }
  /**
   * Build this application's route using the legacy's route (ifreme).
   *
   * @param legacyHash the legacy application's route.
   * @return this application's route.
   */


  translateLegacyHash(legacyHash) {
    switch (legacyHash) {
      case '#/maps/situational_awareness':
        return '/legacy/maps';

      case '#/maps/situational_awareness/':
        return '/legacy/maps';

      case '#/analytics/default/':
        return '/legacy/charts';

      case '#/abox/processes/new':
        return '/abox/processes-new';

      case '#/abox/dashboard':
        return '/dashboards';

      case '#/abox/activities/':
      case '#/abox/processes':
        return '/abox/processes';

      default:
        {
          if (legacyHash.startsWith('#/platform/')) {
            const matchUrl = legacyHash.replace('#/platform/', '');
            return `/${matchUrl}`;
          } else if (legacyHash.startsWith('#/abox/activities/')) {
            const processId = legacyHash.match(/#\/abox\/activities\/(\d+)/);
            return `/abox/process/${String(processId && processId[1])}/tasks`;
          } else if (legacyHash.startsWith('#/abox/tasks/')) {
            const taskId = legacyHash.match(/#\/abox\/tasks\/(\d+)/);
            return `/abox/task/${String(taskId && taskId[1])}/form`;
          } else if (legacyHash.startsWith('#/abox/processes/') && !legacyHash.startsWith('#/abox/processes/new')) {
            // $FlowFixMe
            const processId = legacyHash.match(/abox\/processes\/(.+)$/);
            return `/abox/process-started/${processId[1]}`;
          } else if (legacyHash.startsWith('#/abox/task-form/')) {
            const taskId = legacyHash.match(/#\/abox\/task-form\/(\d+)/);
            return `/abox/task/${String(taskId && taskId[1])}/form`;
          }

          return null;
        }
    }
  }
  /**
   * Build the title and the iframe's route using the route of this application.
   */


  getTitleAndSrc(props) {
    const route = this.getRoute(props);

    switch (route) {
      case '/legacy/abox/tasks-card-list':
      case '/legacy/tasks':
        _History.default.push('/abox/tasks');

        return this.empty;

      case '/legacy/empty':
        return this.empty;

      case '/legacy/maps':
        return {
          title: 'Situational Awareness',
          src: '/legacy/#/maps/situational_awareness/'
        };

      case '/legacy/charts':
        return {
          title: 'Charts',
          src: '/legacy/#/analytics/default/'
        };

      case '/legacy/dashboard':
        return {
          title: 'Dashboards',
          src: '/legacy/#/abox/dashboard'
        };

      case '/legacy/abox/activities':
        return {
          title: 'Card View',
          src: '/legacy/#/abox/activities/'
        };

      case '/legacy/abox':
        return {
          title: 'A-Box',
          src: '/legacy/#/abox/processes'
        };

      default:
        {
          if (route.startsWith('/legacy/process/')) {
            const processId = route.match(/\/legacy\/process\/(\d+)/);

            _History.default.push(`/abox/process/${String(processId && processId[1])}`);

            return this.empty;
          } else if (route.startsWith('/abox/activities')) {
            const processId = route.match(/\/abox\/activities\/(\d+)/);

            _History.default.push(`/abox/process/${String(processId && processId[1])}`);

            return this.empty;
          } else if (route.match(/\/abox\/processes\/(\d+)/)) {
            const processId = route.match(/\/abox\/processes\/(\d+)/);

            _History.default.push(`/abox/process/${String(processId && processId[1])}`);

            return this.empty;
          } else if (route.startsWith('/legacy/task/')) {
            const match = route.match(/\/legacy\/task\/(\d+)/);
            const taskId = String(match && match[1]);

            _History.default.push(`/abox/task/${taskId}`);

            return {
              title: '',
              src: `/legacy/#/task-form/${taskId}`
            };
          } else if (route.match(/abox\/task\/(\d+)\/form$/)) {
            // $FlowFixMe
            const taskId = route.match(/abox\/task\/(\d+)\/form$/)[1];

            if (taskId && this.isLegacyTaskForm(props)) {
              return {
                title: '',
                src: `/legacy/#/task-form/${taskId}`
              };
            } else {
              return this.empty;
            }
          } else if (route.match(/abox\/process-start\/(.+)\/(.+)\/(.+)$/)) {
            return this.empty;
          } else if (route.match(/abox\/process-start\/(\d+)\/(.+)$/)) {
            const matchUrl = route.match(/abox\/process-start\/(\d+)\/(.+)$/);
            const processDefinitionKey = matchUrl && matchUrl[2];

            if (processDefinitionKey && this.isLegacyStartForm(props)) {
              return {
                title: '',
                src: `/legacy/#/abox/processes/new/${String(processDefinitionKey)}`
              };
            } else {
              return this.empty;
            }
          } else if (!route.startsWith('/legacy/')) {
            return this.empty;
          }

          console.error('route', this.props.route, ' not mapped, returning the legacy abox empty page.'); // eslint-disable-line no-console

          return this.empty;
        }
    }
  }
  /**
   * @override
   */


  render() {
    const {
      src
    } = this.getTitleAndSrc(this.props);
    const route = this.getRoute(this.props);
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canViewMaps = isAdmin || permissionsSet.has('maps.sa.view');

    if (route === '/legacy/maps' && !canViewMaps) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Maps"
      });
    }

    const showTaskForm = route.match(/abox\/task\/(\d+)\/form$/) && this.isLegacyTaskForm(this.props);
    const showStartForm = route.startsWith('/abox/process-start/') && this.isLegacyStartForm(this.props);
    const visible = route.startsWith('/legacy') || showTaskForm || showStartForm;
    return _react.default.createElement(LegacyAppContainer, {
      visible: visible,
      isFormDetailView: showTaskForm,
      isStartProcessView: showStartForm,
      key: this.state.key
    }, _react.default.createElement(_IFrame.default, {
      src: src
    }));
  }

}, _defineProperty(_class2, "propTypes", {
  route: _propTypes.default.string.isRequired,
  userProfile: _propTypes.default.object,
  routeHistory: _propTypes.default.arrayOf(_propTypes.default.object),
  setHeader: _propTypes.default.func.isRequired,
  legacyKey: _propTypes.default.number
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "processMessage", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "processMessage"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  route: state.routing.location.pathname,
  userProfile: state.user.profile,
  routeHistory: state.history.list,
  processDefinition: (0, _lo.get)(state.abox.processDefinition, 'data[0]'),
  task: state.abox.task.details.data,
  legacyKey: state.legacy.legacyAppFormUpdate
}), {
  setHeader: _appActions.setHeader
})((0, _reactRouter.withRouter)(LegacyApp));

exports.default = _default;