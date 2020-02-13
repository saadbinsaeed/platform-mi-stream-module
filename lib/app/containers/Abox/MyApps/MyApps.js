"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FAVORITE_PROCESSES = exports.FAVORITE_APPS = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _InputText = _interopRequireDefault(require("app/components/atoms/Input/InputText"));

var _MyAppsSection = _interopRequireDefault(require("app/components/ABox/MyApps/MyAppsSection"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _utils = require("app/utils/utils");

var _myAppsActions = require("store/actions/abox/myAppsActions");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _dec3, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const SearchLineStyled = _styledComponents.default.div.withConfig({
  displayName: "MyApps__SearchLineStyled",
  componentId: "sc-19f97rn-0"
})(["padding:10px;margin:0 auto;width:85%;@media(max-width:", "){width:100%;}"], ({
  theme
}) => theme.media.sm);

const FAVORITE_APPS = 'favoriteApps';
exports.FAVORITE_APPS = FAVORITE_APPS;
const FAVORITE_PROCESSES = 'favoriteProcesses';
/**
 * Renders the view to display the classification.
 */

exports.FAVORITE_PROCESSES = FAVORITE_PROCESSES;
let MyApps = (_dec = (0, _decoratorUtils.debounce)(), _dec2 = (0, _decoratorUtils.memoize)(_utils.shallowEquals), _dec3 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class MyApps extends _react.PureComponent {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "map", {});

    this.state = {
      appList: (0, _Immutable.default)(props.records)
    };
    this.props.loadAboxMyApps();
    this.props.loadAboxMyAppsFavorites();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      records
    } = this.props;

    if (prevProps.records !== records) {
      this.setState({
        appList: (0, _Immutable.default)(records)
      });
    }
  }

  onSearch({
    value
  }) {
    let result = this.props.records;
    const searchValue = value.toLowerCase();

    if (searchValue) {
      result = this.props.records.reduce((appList, app, index) => {
        const {
          name,
          description,
          processesDefinitions
        } = app;
        const mathcedProcessesDefinitions = processesDefinitions.reduce((list, process, index) => {
          const {
            description,
            deployedModel: {
              name
            }
          } = process;

          if (name && name.toLowerCase().includes(searchValue) || description && description.toLowerCase().includes(searchValue)) {
            list.push(process);
          }

          return list;
        }, []);

        if (name && name.toLowerCase().includes(searchValue) || description && description.toLowerCase().includes(searchValue)) {
          appList.push(app);
        } else if (mathcedProcessesDefinitions.length > 0) {
          appList.push({ ...app,
            processesDefinitions: mathcedProcessesDefinitions
          });
        }

        return appList;
      }, []);
    }

    this.setState({
      appList: (0, _Immutable.default)(result)
    });
  }

  getMyAppSection({
    title,
    appsList,
    favorites,
    collapsed,
    errorMessage
  }) {
    return _react.default.createElement(_MyAppsSection.default, {
      favoriteAppsPath: FAVORITE_APPS,
      favoriteProcessesPath: FAVORITE_PROCESSES,
      addToFavorites: this.props.saveAboxMyAppsFavorites,
      title: title,
      favorites: favorites,
      appsList: appsList,
      collapsed: collapsed,
      errorMessage: errorMessage
    });
  }

  _buildMap(appList, isProcessesMap = false) {
    this.map = {};
    appList.forEach(app => {
      if (isProcessesMap) {
        app.processesDefinitions.forEach(process => {
          this.map[process.key] = {
            process,
            app
          };
        });
      } else {
        this.map[app.id] = app;
      }
    });
  }

  _compileFavoriteLists(appList, favorites) {
    this._buildMap(appList);

    const favoriteAppList = ((0, _lo.get)(favorites, FAVORITE_APPS) || []).reduce((list, id) => {
      if (id && this.map[id]) {
        list.push(this.map[id]);
      }

      return list;
    }, []);

    this._buildMap(appList, true);

    const appTmpList = {};
    const favoriteProcessesList = ((0, _lo.get)(favorites, FAVORITE_PROCESSES) || []).reduce((list, key) => {
      const data = this.map[key];

      if (key && data) {
        const compiledApp = { ...data.app
        };

        if (appTmpList[compiledApp.id]) {
          compiledApp.processesDefinitions = [...appTmpList[compiledApp.id].processesDefinitions, data.process];
          list.splice(appTmpList[compiledApp.id].index, 1, compiledApp);
          appTmpList[compiledApp.id] = {
            index: appTmpList[compiledApp.id].index,
            processesDefinitions: compiledApp.processesDefinitions
          };
        } else {
          compiledApp.processesDefinitions = [data.process];
          list.push(compiledApp);
          appTmpList[compiledApp.id] = {
            index: list.length - 1,
            processesDefinitions: compiledApp.processesDefinitions
          };
        }
      }

      return list;
    }, []);
    return {
      favoriteAppList,
      favoriteProcessesList
    };
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      favorites
    } = this.props;
    const {
      appList
    } = this.state;
    const {
      onSearch,
      _compileFavoriteLists
    } = this;

    const {
      favoriteAppList,
      favoriteProcessesList
    } = _compileFavoriteLists(appList, favorites);

    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), _react.default.createElement(_PageTemplate.default, {
      title: "My Apps",
      icon: "classification-tags",
      iconType: "af"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(SearchLineStyled, null, _react.default.createElement(_InputText.default, {
      type: "search",
      onChange: onSearch,
      placeholder: "Global Search",
      size: "50"
    })), this.getMyAppSection({
      title: 'Favorite Apps',
      appsList: favoriteAppList,
      favorites: favorites,
      collapsed: false
    }), this.getMyAppSection({
      title: 'Favorite Processes',
      appsList: favoriteProcessesList,
      favorites: favorites,
      collapsed: false
    }), this.getMyAppSection({
      title: 'All Apps',
      appsList: appList,
      favorites: favorites,
      collapsed: true,
      errorMessage: 'No Apps to display.'
    }))));
  }

}, _defineProperty(_class2, "propTypes", {
  isLoading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array.isRequired,
  favorites: _propTypes.default.object.isRequired,
  loadAboxMyApps: _propTypes.default.func.isRequired,
  loadAboxMyAppsFavorites: _propTypes.default.func.isRequired,
  saveAboxMyAppsFavorites: _propTypes.default.func.isRequired
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "onSearch", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "onSearch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getMyAppSection", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "getMyAppSection"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_buildMap", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_buildMap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_compileFavoriteLists", [_decoratorUtils.bind, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "_compileFavoriteLists"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.app.list.isLoading,
  records: state.abox.app.list.records,
  favorites: state.abox.app.list.favorites
}), {
  loadAboxMyApps: _myAppsActions.loadAboxMyApps,
  loadAboxMyAppsFavorites: _myAppsActions.loadAboxMyAppsFavorites,
  saveAboxMyAppsFavorites: _myAppsActions.saveAboxMyAppsFavorites
})(MyApps);

exports.default = _default;