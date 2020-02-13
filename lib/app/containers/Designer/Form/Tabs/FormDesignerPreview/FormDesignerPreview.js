"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _platformUi = require("@mic3/platform-ui");

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _Textarea = _interopRequireDefault(require("app/containers/Designer/Form/components/Textarea"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FormDesignerPreview extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "contentAreaRef", _react.default.createRef());

    _defineProperty(this, "onChange", ({
      target: {
        name,
        value
      }
    }) => {
      const globalJson = (0, _lo.get)(this.props.designerState, 'preview.globalJson') || {};
      const localJson = (0, _lo.get)(this.props.designerState, 'preview.localJson') || {};
      this.props.savePreviewState({
        globalJson,
        localJson,
        [name]: value
      });
    });
  }

  render() {
    const {
      designerState,
      rightNavOpen,
      toggleRightNav
    } = this.props;
    const {
      fields
    } = designerState || {};
    const globalJson = (0, _lo.get)(this.props.designerState, 'preview.globalJson') || {};
    const localJson = (0, _lo.get)(this.props.designerState, 'preview.localJson') || {};
    const variables = {
      global: globalJson,
      local: localJson
    };
    return _react.default.createElement(_Layout.default, {
      showToggle: true,
      noPadding: true,
      content: _react.default.createElement(_FormGenerator.default, {
        components: fields,
        data: variables,
        useDataContext: true
      }),
      rightNavOpen: rightNavOpen,
      toggleRightNav: toggleRightNav,
      rightSidebar: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_platformUi.Typography, {
        key: 0,
        variant: "subheading"
      }, "Global Data (JSON format)"), _react.default.createElement(_Textarea.default, {
        key: 1,
        parseAs: 'JSON',
        name: "globalJson",
        value: globalJson,
        onChange: this.onChange
      }), _react.default.createElement(_platformUi.Typography, {
        key: 2,
        variant: "subheading"
      }, "Local Data (JSON format)"), _react.default.createElement(_Textarea.default, {
        key: 3,
        parseAs: 'JSON',
        name: "localJson",
        value: localJson,
        onChange: this.onChange
      }))
    });
  }

}

_defineProperty(FormDesignerPreview, "propTypes", {
  designerState: _propTypes.default.object.isRequired,
  savePreviewState: _propTypes.default.func.isRequired
});

var _default = FormDesignerPreview;
exports.default = _default;