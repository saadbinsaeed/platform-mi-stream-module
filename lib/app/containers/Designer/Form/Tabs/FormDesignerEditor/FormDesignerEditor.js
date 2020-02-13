"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _platformUi = require("@mic3/platform-ui");

var _FieldSettingsSidebar = _interopRequireDefault(require("app/containers/Designer/Form/Tabs/FormDesignerEditor/Sidebar/FieldSettingsSidebar"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _FormDnd = _interopRequireDefault(require("app/containers/Designer/Form/Tabs/FormDesignerEditor/FormDnd/FormDnd"));

var _Forest = _interopRequireDefault(require("app/utils/dataStructure/Forest"));

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _fieldSettingsUtils = require("app/utils/designer/form/fieldSettingsUtils");

var _fieldUtils = require("app/utils/designer/form/fieldUtils");

var _statefulInput = _interopRequireDefault(require("app/utils/hoc/statefulInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultSelectedElment = null;
const SearchField = (0, _statefulInput.default)(_platformUi.TextField);

class FormDesignerEditor extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      selectedElement: defaultSelectedElment
    });

    _defineProperty(this, "contentAreaRef", _react.default.createRef());

    _defineProperty(this, "move", (element, parentUuid, index) => {
      this.props.saveDesignerState({
        fields: this.forest().move(element, parentUuid, index).nodes
      });
    });

    _defineProperty(this, "add", (element, parentUuid, index) => {
      this.props.saveDesignerState({
        fields: this.forest().add(element, parentUuid, index).nodes
      });
    });

    _defineProperty(this, "remove", element => {
      const removeElement = () => this.props.saveDesignerState({
        fields: this.forest().remove(element).nodes
      });

      if (element.uuid === (0, _lo.get)(this.state, 'selectedElement.uuid')) {
        this.setState({
          selectedElement: defaultSelectedElment
        }, removeElement);
      } else {
        removeElement();
      }
    });

    _defineProperty(this, "updateSelectedElementSettings", settingsValues => {
      if (!this.state.selectedElement) {
        return;
      }

      const selectedElement = { ...this.state.selectedElement,
        ...settingsValues
      };
      this.setState({
        selectedElement
      }, (0, _utils.debounce)(() => this.props.saveDesignerState({
        fields: this.forest().update(selectedElement).nodes
      }), 300));
    });

    _defineProperty(this, "_forest", (0, _memoizeOne.default)(elements => new _Forest.default(elements)));

    _defineProperty(this, "forest", () => this._forest((0, _lo.get)(this.props.formDesignerState, 'fields')));

    _defineProperty(this, "onSelectElement", selectedElement => this.setState({
      selectedElement
    }, () => {
      if (this.state.selectedElement) {
        this.props.toggleRightNav(true); // opens the props sidebar
      } else {
        this.props.toggleRightNav(); // opens the props sidebar
      }
    }));

    _defineProperty(this, "buildSettingsValues", (0, _memoizeOne.default)(selectedElement => {
      const {
        type,
        children,
        settings,
        defaults,
        uuid,
        ...variables
      } = selectedElement || {};
      return (0, _utils.isEmpty)(variables) ? defaults || {} : variables;
    }));

    _defineProperty(this, "getSettingsValues", (0, _memoizeOne.default)(selectedElement => {
      if (!selectedElement) {
        return null;
      }

      const properties = (0, _fieldUtils.fillProperties)(selectedElement.properties, selectedElement.defaults);
      const settings = selectedElement.settings;
      return {
        properties,
        settings
      };
    }));
  }

  render() {
    // const thumbnail = <img src={`https://affectli.dev.mi-c3.com/activiti-app/app/rest/models/${id}/thumbnail?now=${Date.now()}`} alt="preview" />
    const {
      selectedElement
    } = this.state;
    const {
      errors,
      leftNavOpen,
      rightNavOpen,
      toggleLeftNav,
      toggleRightNav
    } = this.props;
    return _react.default.createElement(_reactDnd.DragDropContextProvider, {
      backend: _reactDndHtml5Backend.default
    }, _react.default.createElement(_FormDnd.default, {
      elements: this.forest().nodes,
      uuid: this.forest().uuid,
      add: this.add,
      move: this.move,
      remove: this.remove,
      onSelectElement: this.onSelectElement,
      selectedElement: selectedElement,
      errors: errors,
      renderContent: ({
        dropArea,
        draggableElements,
        searchDraggableElement
      }) => _react.default.createElement(_Layout.default, {
        showToggle: true,
        noPadding: true,
        leftNavOpen: leftNavOpen,
        toggleLeftNav: toggleLeftNav,
        rightNavOpen: rightNavOpen,
        toggleRightNav: toggleRightNav,
        leftSidebar: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(SearchField, {
          name: "search",
          variant: "standard",
          label: "search field",
          onChange: searchDraggableElement
        }), draggableElements),
        content: dropArea,
        rightSidebar: _react.default.createElement(_FieldSettingsSidebar.default, {
          settingsDefinition: selectedElement && (0, _fieldSettingsUtils.getFieldSettings)(selectedElement.type),
          settingsValues: this.getSettingsValues(selectedElement),
          updateSettings: this.updateSelectedElementSettings
        })
      })
    }));
  }

}

_defineProperty(FormDesignerEditor, "propTypes", {
  formDesignerState: _propTypes.default.object.isRequired,
  saveDesignerState: _propTypes.default.func.isRequired,
  errors: _propTypes.default.object
});

var _default = FormDesignerEditor;
exports.default = _default;