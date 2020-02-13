"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _CollapsedContent = _interopRequireDefault(require("app/components/atoms/CollapsedContent/CollapsedContent"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _MyAppCard = _interopRequireDefault(require("app/components/ABox/MyApps/MyAppCard"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const MyAppListStyled = _styledComponents.default.div.withConfig({
  displayName: "MyAppsSection__MyAppListStyled",
  componentId: "sc-1nrtskk-0"
})(["padding:0.5rem 0.8rem;"]);

const TitleWrapper = _styledComponents.default.div.withConfig({
  displayName: "MyAppsSection__TitleWrapper",
  componentId: "sc-1nrtskk-1"
})(["display:flex;flex-grow:1;justify-content:center;align-items:center;.collapsed-cards{margin-left:auto;font-size:.8rem;color:rgba(255,255,255,0.4);}.collapsed-content,.collapsed-cards{cursor:pointer;}"]);

const CollapseIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "MyAppsSection__CollapseIcon",
  componentId: "sc-1nrtskk-2"
})(["opacity:0.6;"]);

const EmptySectionMsg = _styledComponents.default.div.withConfig({
  displayName: "MyAppsSection__EmptySectionMsg",
  componentId: "sc-1nrtskk-3"
})(["font-size:13px;margin-left:8px;"]);

const MasonryGrid = _styledComponents.default.div.withConfig({
  displayName: "MyAppsSection__MasonryGrid",
  componentId: "sc-1nrtskk-4"
})(["display:grid;grid-gap:10px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));grid-auto-rows:60px;"]);
/**
 * Renders the view to display the classification.
 */


let MyAppsSection = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class MyAppsSection extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "collapsing", false);

    this.state = {
      showContent: true,
      allCollapsed: props.collapsed
    };
  }

  toggleContent(e) {
    e.stopPropagation();

    if (this.props.appsList.length < 1) {
      return;
    }

    this.setState({
      showContent: !this.state.showContent
    });
  }

  toggleCollapsing(e) {
    e.stopPropagation();

    if (this.collapsing) {
      return;
    }

    this.collapsing = true;
    this.setState({
      collapsing: true
    }, () => setTimeout(() => {
      this.setState({
        allCollapsed: !this.state.allCollapsed,
        collapsing: false
      }, () => this.collapsing = false);
    }, 10));
  }

  getCards({
    appsList,
    allCollapsed,
    favoriteApps,
    addToFavorites,
    favoriteAppsPath,
    favoriteProcesses,
    favoriteProcessesPath
  }) {
    return appsList.filter(({
      processesDefinitions
    }) => processesDefinitions && processesDefinitions.length).sort((a, b) => a.name < b.name ? -1 : 1).map((app, appIndex) => _react.default.createElement(_MyAppCard.default, {
      app: app,
      key: appIndex,
      appIndex: appIndex,
      collapsed: allCollapsed,
      favoriteApps: favoriteApps,
      addToFavorites: addToFavorites,
      favoriteAppsPath: favoriteAppsPath,
      favoriteProcesses: favoriteProcesses,
      favoriteProcessesPath: favoriteProcessesPath,
      className: "item"
    }));
  }

  /**
   * @override
   */
  render() {
    const {
      appsList,
      title,
      favorites,
      favoriteAppsPath,
      favoriteProcessesPath,
      addToFavorites,
      errorMessage
    } = this.props;
    const {
      showContent,
      allCollapsed,
      collapsing
    } = this.state;
    const {
      toggleContent,
      toggleCollapsing
    } = this;
    const favoriteApps = new Set(favorites.favoriteApps);
    const favoriteProcesses = new Set(favorites.favoriteProcesses);
    const isEmptyList = appsList.length < 1;
    return _react.default.createElement(MyAppListStyled, null, _react.default.createElement(TitleWrapper, null, _react.default.createElement("h2", {
      className: "collapsed-content",
      onClick: toggleContent
    }, title, " ", _react.default.createElement(_Icon.default, {
      name: showContent ? 'menu-up' : 'menu-down'
    })), _react.default.createElement("div", {
      className: "collapsed-cards",
      onClick: collapsing ? null : toggleCollapsing
    }, !isEmptyList && _react.default.createElement("div", null, collapsing ? '...' : allCollapsed ? 'Expand' : 'Collapse', _react.default.createElement(CollapseIcon, {
      size: "sm",
      name: allCollapsed ? 'arrow-expand-vertical' : 'arrow-collapse-vertical'
    })))), _react.default.createElement(_CollapsedContent.default, {
      opened: showContent
    }, _react.default.createElement(MasonryGrid, {
      className: "grid"
    }, !isEmptyList ? this.getCards({
      appsList,
      allCollapsed,
      favoriteApps,
      addToFavorites,
      favoriteAppsPath,
      favoriteProcesses,
      favoriteProcessesPath
    }) : _react.default.createElement(EmptySectionMsg, null, errorMessage || `No ${title}.`))));
  }

}, _defineProperty(_class2, "propTypes", {
  appsList: _propTypes.default.array.isRequired,
  title: _propTypes.default.string.isRequired,
  addToFavorites: _propTypes.default.func.isRequired,
  favoriteAppsPath: _propTypes.default.string.isRequired,
  favoriteProcessesPath: _propTypes.default.string.isRequired,
  favorites: _propTypes.default.object.isRequired,
  errorMessage: _propTypes.default.string,
  collapsed: _propTypes.default.bool
}), _defineProperty(_class2, "defaultProps", {
  collapsed: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "toggleContent", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleContent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleCollapsing", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleCollapsing"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getCards", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "getCards"), _class.prototype)), _class));
var _default = MyAppsSection;
exports.default = _default;