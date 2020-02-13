"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _History = _interopRequireDefault(require("store/History"));

var _myAppsActions = require("store/actions/abox/myAppsActions");

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _formUtils = require("app/utils/designer/form/formUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FooterBarStyled = (0, _styledComponents.default)(_FooterBar.default).withConfig({
  displayName: "StartProcess__FooterBarStyled",
  componentId: "sc-18g3vqr-0"
})(["position:fixed;bottom:0;z-index:9;left:0;right:0;"]);
/**
 * Renders the view to display the classification.
 */

class StartProcess extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "definitionKey", void 0);

    _defineProperty(this, "appId", void 0);

    _defineProperty(this, "goToMyApps", () => {
      _History.default.push(`/abox/processes-new`);
    });

    _defineProperty(this, "normalizeFormDefinitionFields", (0, _memoizeOne.default)(fields => (0, _formUtils.normalizeFields)(fields)));

    this.definitionKey = (0, _utils.getStr)(props, 'match.params.definitionKey') || '';
    this.appId = (0, _utils.getNum)(props, 'match.params.appId');

    if (this.appId && this.definitionKey) {
      this.props.loadProcessDefinition(this.appId, this.definitionKey);
    }
  }

  /**
   * @override
   */
  render() {
    const {
      isLoadingDefinition,
      definition
    } = this.props;
    const version = (0, _lo.get)(definition, '_startFormDefinition.definition.version');
    let components;

    if (version) {
      components = this.normalizeFormDefinitionFields((0, _lo.get)(definition, '_startFormDefinition.definition.fields'));
    }

    return _react.default.createElement(_PageTemplate.default, {
      title: 'Start Process',
      subTitle: (0, _lo.get)(definition, 'deployedModel.name', 'No Name')
    }, isLoadingDefinition ? _react.default.createElement(_Loader.default, {
      absolute: true
    }) : _react.default.createElement(_react.Fragment, null, version && _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_FormGenerator.default, {
      components: components
    })), _react.default.createElement(FooterBarStyled, null, _react.default.createElement(_TextIcon.default, {
      icon: "close",
      label: "Close",
      onClick: this.goToMyApps
    }))));
  }

}

_defineProperty(StartProcess, "propTypes", {
  loadStartedProcessDetails: _propTypes.default.func,
  loadProcessDefinition: _propTypes.default.func,
  isLoadingDefinition: _propTypes.default.bool,
  isLoadingProcess: _propTypes.default.bool,
  definition: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoadingDefinition: state.abox.processDefinition.isLoading,
  definition: (0, _lo.get)(state.abox.processDefinition, 'data[0]')
}), {
  loadProcessDefinition: _myAppsActions.loadProcessDefinition
})(StartProcess);

exports.default = _default;