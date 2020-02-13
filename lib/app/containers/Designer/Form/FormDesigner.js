"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _FormDesignerEditor = _interopRequireDefault(require("app/containers/Designer/Form/Tabs/FormDesignerEditor/FormDesignerEditor"));

var _FormDesignerPreview = _interopRequireDefault(require("app/containers/Designer/Form/Tabs/FormDesignerPreview/FormDesignerPreview"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _componentActions = require("store/actions/component/componentActions");

var _designerActions = require("store/actions/designer/designerActions");

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _formUtils = require("app/utils/designer/form/formUtils");

var _FormValidator = _interopRequireDefault(require("app/utils/validator/FormValidator"));

var _fieldSettingsUtils = require("app/utils/designer/form/fieldSettingsUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const affectliLogoBase64 = 'data:image/png;base64,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';

class FormDesigner extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "contentAreaRef", void 0);

    _defineProperty(this, "state", {
      isSaving: false,
      editorRightNavOpen: false,
      editorLeftNavOpen: true,
      previewRightNavOpen: true
    });

    _defineProperty(this, "toggleEditorLeftNav", open => this.setState({
      editorLeftNavOpen: open || !this.state.editorLeftNavOpen
    }));

    _defineProperty(this, "toggleEditorRightNav", open => this.setState({
      editorRightNavOpen: open || !this.state.editorRightNavOpen
    }));

    _defineProperty(this, "togglePreviewRightNav", open => this.setState({
      previewRightNavOpen: open || !this.state.previewRightNavOpen
    }));

    _defineProperty(this, "onSave", () => {
      this.setState({
        isSaving: true
      }, () => {
        const {
          match,
          formDesignerState: {
            fields
          }
        } = this.props;
        const id = (0, _utils.getStr)(match, 'params.id') || ''; // const backgroundColor = this.props.theme.layout.content.background;
        // domToImage(this.contentAreaRef.current, 'image/png', { backgroundColor, maxWidth: 300 })
        //     .then((formImageBase64) => {
        //         this.props.updateFormDefinition({
        //             id,
        //             fields: denormalizeFields(fields),
        //             formImageBase64,
        //         }, false, false).finally(() => this.setState({ isSaving: false }));
        //     });

        this.props.updateFormDefinition({
          id,
          fields: (0, _formUtils.denormalizeFields)(fields),
          //TODO ??? exampleData: { "test": true },
          formImageBase64: affectliLogoBase64
        }, false, false).finally(() => this.setState({
          isSaving: false
        }));
      });
    });

    _defineProperty(this, "saveDesignerState", stateUpdate => {
      this.props.saveComponentState('FormDesigner', stateUpdate);
    });

    _defineProperty(this, "savePreviewState", previewState => {
      this.props.saveComponentState('FormDesigner', {
        preview: previewState
      });
    });

    _defineProperty(this, "validate", (0, _memoizeOne.default)(fields => {
      const errors = {};
      (fields || []).forEach(field => this.validateField(errors, field));
      return Object.keys(errors).length === 0 ? null : errors;
    }));

    const _id = (0, _lo.get)(props, 'match.params.id');

    _id && props.loadFormDefinition(_id);
    this.contentAreaRef = _react.default.createRef();
  }

  componentDidUpdate(prevProps) {
    const prevId = (0, _lo.get)(prevProps, 'match.params.id');
    const id = (0, _lo.get)(this.props, 'match.params.id');

    if (id !== prevId) {
      id && this.props.loadFormDefinition(id);
    }

    const {
      form
    } = this.props;

    if (form && form !== prevProps.form) {
      const {
        id,
        name,
        version
      } = form;
      const fields = (0, _formUtils.normalizeFields)((0, _utils.getArray)(form, 'definition.fields') || []);
      this.props.saveComponentState('FormDesigner', {
        id,
        name,
        version,
        fields
      });
    }
  }

  validateField(errorsMap, field) {
    const {
      uuid,
      type,
      properties,
      children
    } = field;
    const validator = new _FormValidator.default((0, _fieldSettingsUtils.getFieldSettings)(type));
    const valid = validator.isValid({
      properties
    });

    if (!valid) {
      errorsMap[uuid] = validator.getMessages();
    }

    if (children) {
      children.forEach(child => this.validateField(errorsMap, child));
    }
  }

  render() {
    const {
      form,
      isLoading,
      formDesignerState
    } = this.props;
    const {
      isSaving,
      editorLeftNavOpen,
      editorRightNavOpen,
      previewRightNavOpen
    } = this.state;
    const {
      fields
    } = formDesignerState || {};
    const {
      name,
      version
    } = form || {};
    const id = (0, _utils.getStr)(this.props, 'match.params.id') || '';
    const errors = this.validate(fields); // const thumbnail =
    // <img src={`/activiti-app/app/rest/models/${id}/thumbnail?now=${Date.now()}`} alt="preview" />

    let content = _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    });

    if (!isLoading) {
      if (!form) {
        content = 'Ooooooooops: form not found :(';
      } else if (fields) {
        content = _react.default.createElement(_react.Fragment, null, isSaving && _react.default.createElement(_Loader.default, {
          absolute: true,
          backdrop: true
        }), _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
          label: "Editor",
          to: `/designer/form/${id}/editor`
        }), _react.default.createElement(_TabItem.default, {
          label: "Preview",
          to: `/designer/form/${id}/preview`
        })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
          path: `/designer/form/:id`,
          exact: true,
          render: () => _react.default.createElement(_reactRouterDom.Redirect, {
            to: `/designer/form/${id}/editor`
          })
        }), _react.default.createElement(_reactRouterDom.Route, {
          path: `/designer/form/:id/editor`,
          render: () => _react.default.createElement(_FormDesignerEditor.default, {
            saveDesignerState: this.saveDesignerState,
            formDesignerState: formDesignerState,
            leftNavOpen: editorLeftNavOpen,
            toggleLeftNav: this.toggleEditorLeftNav,
            rightNavOpen: editorRightNavOpen,
            toggleRightNav: this.toggleEditorRightNav,
            errors: errors
          })
        }), _react.default.createElement(_reactRouterDom.Route, {
          path: `/designer/form/:id/preview`,
          render: () => _react.default.createElement(_FormDesignerPreview.default, {
            designerState: formDesignerState,
            savePreviewState: this.savePreviewState,
            rightNavOpen: previewRightNavOpen,
            toggleRightNav: this.togglePreviewRightNav
          })
        })));
      }
    }

    return _react.default.createElement(_PageTemplate.default, {
      title: name,
      subTitle: `#${id}${version && `, v. ${version}`}`
    }, _react.default.createElement(_ContentArea.default, {
      innerRef: this.contentAreaRef
    }, content), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, _react.default.createElement(_TextIcon.default, {
      disabled: !!errors,
      icon: "content-save",
      label: "Save",
      color: 'primary',
      onClick: this.onSave
    }))));
  }

}

_defineProperty(FormDesigner, "propTypes", {
  match: _propTypes.default.object.isRequired,
  form: _propTypes.default.object,
  variables: _propTypes.default.object,
  formDesignerState: _propTypes.default.object,
  loadFormDefinition: _propTypes.default.func.isRequired,
  updateFormDefinition: _propTypes.default.func.isRequired,
  saveComponentState: _propTypes.default.func.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.designer.form.isLoading,
  form: state.designer.form.data,
  formDesignerState: state.component.state.FormDesigner
}), {
  loadFormDefinition: _designerActions.loadFormDefinition,
  updateFormDefinition: _designerActions.updateFormDefinition,
  saveComponentState: _componentActions.saveComponentState
})((0, _styledComponents.withTheme)(FormDesigner));

exports.default = _default;