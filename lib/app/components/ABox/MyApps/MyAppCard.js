"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _History = _interopRequireDefault(require("store/History"));

var _Tooltip = _interopRequireDefault(require("app/components/atoms/Tooltip/Tooltip"));

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

var _Hr = _interopRequireDefault(require("app/components/atoms/Hr/Hr"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _mdi = require("app/utils/styles/mdi");

var _lo = require("app/utils/lo/lo");

var _stringUtils = require("app/utils/string/string-utils");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _MyAppCardProcess = _interopRequireDefault(require("./MyAppCardProcess"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const CardContainer = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__CardContainer",
  componentId: "sc-1ibn6yf-0"
})(["background-color:", ";color:", ";box-shadow:", ";border-radius:3px;"], ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.widget.textColor, ({
  theme
}) => theme.shadow.z1);

const CardHeader = _styledComponents.default.header.withConfig({
  displayName: "MyAppCard__CardHeader",
  componentId: "sc-1ibn6yf-1"
})(["background-color:", ";color:", ";padding:0.2rem 0.6rem;border-radius:", ";align-items:center;"], ({
  theme,
  backgroundColor
}) => backgroundColor || theme.widget.header.background, ({
  theme
}) => theme.widget.header.textColor, ({
  collapsed
}) => collapsed ? '3px' : '3px 3px 0 0');

const CardContent = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__CardContent",
  componentId: "sc-1ibn6yf-2"
})(["", ";padding:0.6rem;"], ({
  collapsed
}) => collapsed ? 'display: none' : '');

const Card = props => {
  const {
    header,
    children,
    collapsed,
    headerBackgroundColor
  } = props;
  return _react.default.createElement(CardContainer, null, _react.default.createElement(CardHeader, {
    backgroundColor: headerBackgroundColor,
    collapsed: collapsed
  }, header), _react.default.createElement(CardContent, {
    collapsed: collapsed
  }, children));
};

const HeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__HeaderContainer",
  componentId: "sc-1ibn6yf-3"
})(["display:grid;align-items:center;justify-content:left;grid-template-columns:1fr 6fr 1fr;"]);

const HeaderContent = _styledComponents.default.header.withConfig({
  displayName: "MyAppCard__HeaderContent",
  componentId: "sc-1ibn6yf-4"
})(["padding:0 0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;"]);

const HeaderTitle = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__HeaderTitle",
  componentId: "sc-1ibn6yf-5"
})(["font-size:1rem;font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:left;"]);

const HeaderSubTitle = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__HeaderSubTitle",
  componentId: "sc-1ibn6yf-6"
})(["font-size:0.73rem;font-style:italic;"]);

const HeaderActions = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__HeaderActions",
  componentId: "sc-1ibn6yf-7"
})(["white-space:nowrap;"]);

const HeaderInfo = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__HeaderInfo",
  componentId: "sc-1ibn6yf-8"
})(["display:grid;align-items:center;justify-content:left;grid-template-columns:7fr 1fr;padding:0.6rem 0.6rem 0 0.6rem;"]);

const HeaderAppDescription = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__HeaderAppDescription",
  componentId: "sc-1ibn6yf-9"
})(["font-size:0.85rem;padding:0 1rem;"]);

const CollapsedContent = _styledComponents.default.div.withConfig({
  displayName: "MyAppCard__CollapsedContent",
  componentId: "sc-1ibn6yf-10"
})(["", ";"], ({
  collapsed
}) => collapsed ? 'display: none' : '');

const Italic = _styledComponents.default.span.withConfig({
  displayName: "MyAppCard__Italic",
  componentId: "sc-1ibn6yf-11"
})(["display:block;font-style:italic;font-size:0.7rem;& > a{color:white;}"]);
/**
 * Renders the view to display the classification.
 */


let MyAppsCard = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class MyAppsCard extends _react.PureComponent {
  // $FlowFixMe
  constructor(props) {
    super(props);

    _defineProperty(this, "card", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "elementRef", _react.default.createRef());

    this.state = {
      isAppDescriptionOpen: false,
      isAppProcessesOpen: !props.collapsed
    };
  }

  componentDidMount() {
    this.resizeGridItem();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      collapsed
    } = this.props;

    if (collapsed !== prevProps.collapsed) {
      this.setState({
        isAppProcessesOpen: !collapsed,
        isAppDescriptionOpen: false
      });
      this.updateCard();
    }

    if (prevProps.app !== this.props.app) {
      this.updateCard();
    }
  }

  resizeGridItem() {
    if (!(0, _lo.get)(this.elementRef, 'current.firstChild')) {
      return;
    }

    const domElement = this.elementRef.current;
    const rowHeight = 60;
    const rowGap = 10;

    if (domElement) {
      const rowSpan = Math.ceil((domElement.firstChild.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      domElement.style.gridRowEnd = `span ${rowSpan}`;
    }
  }

  updateCard() {
    setTimeout(this.resizeGridItem, 10);
  }

  toggleAppDescription(e) {
    const {
      isAppDescriptionOpen
    } = this.state;
    this.setState({
      isAppDescriptionOpen: !isAppDescriptionOpen
    });
    this.updateCard();
  }

  toggleAppProcesses(e) {
    this.setState({
      isAppProcessesOpen: !this.state.isAppProcessesOpen
    }, this.updateCard);
  }

  toggleAppFavorite() {
    const {
      addToFavorites,
      favoriteAppsPath,
      app: {
        id,
        name
      }
    } = this.props;
    addToFavorites(favoriteAppsPath, id, name, true);
    this.updateCard();
  }

  toggleProcessFavorite(processDefinitionKey, processDefinitionName) {
    const {
      addToFavorites,
      favoriteProcessesPath
    } = this.props;
    addToFavorites(favoriteProcessesPath, processDefinitionKey, processDefinitionName);
  }

  openProcess(definitionKey) {
    _History.default.push(`/abox/process-start/${this.props.app.id}/${definitionKey}`);
  }

  getProcesses(processesDefinitions, favoriteProcesses) {
    const definitions = [...processesDefinitions];
    return definitions.sort((a, b) => {
      const nameA = (0, _lo.get)(a, 'deployedModel.name') || '';
      const nameB = (0, _lo.get)(b, 'deployedModel.name') || ''; // $FlowFixMe

      return nameA < nameB ? -1 : nameA === nameB ? 0 : 1;
    }).map((processDefinition, processIndex) => {
      const isFavorite = favoriteProcesses.has(processDefinition.key);
      return _react.default.createElement(_MyAppCardProcess.default, {
        key: processDefinition.key,
        processDefinition: processDefinition,
        isFavorite: isFavorite,
        openProcess: this.openProcess,
        toggleFavorite: this.toggleProcessFavorite,
        updateCard: this.updateCard
      });
    });
  }

  render() {
    const {
      app,
      favoriteApps,
      favoriteProcesses
    } = this.props;
    const {
      name,
      createdBy,
      model,
      description,
      processesDefinitions,
      version,
      modifiedBy,
      modifiedDate,
      id
    } = app;
    const {
      icon,
      iconColor
    } = model;
    const {
      isAppDescriptionOpen,
      isAppProcessesOpen
    } = this.state;
    const isFavoriteApp = favoriteApps.has(id);
    return _react.default.createElement(_Tooltip.default, {
      innerRef: this.elementRef
    }, _react.default.createElement(Card, {
      headerBackgroundColor: iconColor,
      header: _react.default.createElement(_react.Fragment, null, _react.default.createElement(HeaderContainer, null, _react.default.createElement(_Icon.default, {
        name: _mdi.iconsSet.has(icon) ? icon : 'asterisk',
        onClick: this.toggleAppDescription,
        size: "lg"
      }), _react.default.createElement(HeaderContent, null, _react.default.createElement(HeaderTitle, {
        alt: name,
        onClick: this.toggleAppDescription
      }, name), _react.default.createElement(HeaderSubTitle, null, createdBy && createdBy.name)), _react.default.createElement(HeaderActions, null, _react.default.createElement(_Icon.default, {
        name: isAppDescriptionOpen ? 'close-circle-outline' : 'information',
        alt: isAppDescriptionOpen ? 'Close' : 'Description',
        onClick: this.toggleAppDescription,
        size: "sm"
      }), _react.default.createElement(_Icon.default, {
        name: isAppProcessesOpen ? 'arrow-up' : 'arrow-down',
        size: "sm",
        onClick: this.toggleAppProcesses
      }))), _react.default.createElement(CollapsedContent, {
        collapsed: !isAppDescriptionOpen
      }, _react.default.createElement(_Hr.default, null), _react.default.createElement(HeaderInfo, null, _react.default.createElement("div", null, _react.default.createElement(Italic, null, "Version: ", version), _react.default.createElement(Italic, null, modifiedBy && _react.default.createElement(_react.Fragment, null, "Last Updated: ", (0, _moment.default)(modifiedDate).format('DD MMMM'), ' ', "by ", _react.default.createElement(_Link.default, {
        to: `/user-management/${modifiedBy.login}`
      }, "@", modifiedBy.name)))), _react.default.createElement(_Icon.default, {
        name: isFavoriteApp ? 'star' : 'star-outline',
        onClick: this.toggleAppFavorite,
        alt: isFavoriteApp ? 'Remove from favorites' : 'Add to favorites',
        size: "sm"
      })), _react.default.createElement(HeaderAppDescription, null, (0, _stringUtils.cut)(description, 140)))),
      collapsed: !isAppProcessesOpen,
      onToggle: this.toggleAppProcesses
    }, this.getProcesses(processesDefinitions, favoriteProcesses)));
  }

}, _defineProperty(_class2, "propTypes", {
  app: _propTypes.default.object.isRequired,
  addToFavorites: _propTypes.default.func.isRequired,
  favoriteAppsPath: _propTypes.default.string.isRequired,
  favoriteProcessesPath: _propTypes.default.string.isRequired,
  favoriteApps: _propTypes.default.object,
  favoriteProcesses: _propTypes.default.object,
  collapsed: _propTypes.default.bool
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "resizeGridItem", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "resizeGridItem"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateCard", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "updateCard"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleAppDescription", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleAppDescription"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleAppProcesses", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleAppProcesses"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleAppFavorite", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleAppFavorite"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleProcessFavorite", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleProcessFavorite"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openProcess", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "openProcess"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getProcesses", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "getProcesses"), _class.prototype)), _class));
var _default = MyAppsCard;
exports.default = _default;