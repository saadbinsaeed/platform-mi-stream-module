"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RelationshipAddThirdStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Courtesy = _interopRequireDefault(require("app/components/atoms/Courtesy"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _reactRedux = require("react-redux");

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _EntityClassifications = _interopRequireDefault(require("app/components/Entities/Classifications/EntityClassifications"));

var _entityAttributesActions = require("store/actions/entities/common/entityAttributesActions");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _event = require("app/utils/http/event");

var _appActions = require("store/actions/app/appActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Content = _styledComponents.default.div.withConfig({
  displayName: "RelationshipAddThirdStep__Content",
  componentId: "sc-53l05x-0"
})(["height:calc(100vh - 94px);overflow-y:auto;"]);

const GoBackWrapper = _styledComponents.default.div.withConfig({
  displayName: "RelationshipAddThirdStep__GoBackWrapper",
  componentId: "sc-53l05x-1"
})(["text-align:center;button{color:#529fbb;}"]);

const GoBackButton = ({
  onClose
}) => {
  return _react.default.createElement(GoBackWrapper, null, _react.default.createElement(_Button.default, {
    type: 'button',
    onClick: onClose
  }, "GO BACK"));
};
/**
 *  RelationshipAddFirstStep view
 */


class RelationshipAddThirdStep extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "updateAttributes", e => {
      const {
        name,
        value
      } = e.target;
      const {
        attributes
      } = this.props.value;
      const event = (0, _event.createEvent)('change', {
        name: 'attributes',
        value: { ...attributes,
          [name]: value
        }
      });
      this.props.onChange(event);
    });

    const {
      relationDefinition: {
        classification
      }
    } = props.value;

    if (classification) {
      props.loadClassificationAttributes(classification);
    } else {
      this.props.hideStepperSave();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading && !this.props.classes) {
      this.props.hideStepperSave();
    }
  }

  render() {
    const {
      classes,
      isLoading,
      onClose,
      value,
      isEdit
    } = this.props;
    const {
      attributes,
      relationDefinition: {
        classification
      }
    } = value;

    if (!classification) {
      return _react.default.createElement("div", null, _react.default.createElement(_Courtesy.default, {
        message: 'There is no classification for this relationship type.'
      }), isEdit && _react.default.createElement(GoBackButton, {
        onClose: onClose
      }));
    }

    if (isLoading) {
      return _react.default.createElement(_Loader.default, {
        absolute: true
      });
    }

    if (!classes) {
      return _react.default.createElement("div", null, _react.default.createElement(_Courtesy.default, {
        message: 'You don\'t have permission to add/update attributes.'
      }), isEdit && _react.default.createElement(GoBackButton, {
        onClose: onClose
      }));
    }

    return _react.default.createElement(Content, null, _react.default.createElement(_EntityClassifications.default, {
      attributes: attributes,
      canEdit: true,
      canAdd: false,
      canViewClasses: true,
      isSaveAvailable: false,
      classes: [classes],
      updateAttribute: this.updateAttributes
    }));
  }

}

exports.RelationshipAddThirdStep = RelationshipAddThirdStep;

_defineProperty(RelationshipAddThirdStep, "propTypes", {
  onClose: _propTypes.default.func,
  loadClassificationAttributes: _propTypes.default.func.isRequired,
  hideStepperSave: _propTypes.default.func.isRequired,
  value: _propTypes.default.object,
  isLoading: _propTypes.default.bool,
  isEdit: _propTypes.default.bool,
  classes: _propTypes.default.object
});

_defineProperty(RelationshipAddThirdStep, "defaultProps", {
  value: {}
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.entities.relationshipClassifications.isLoading,
  classes: state.entities.relationshipClassifications.data && (0, _entityAttributesActions.normalizeClass)(state.entities.relationshipClassifications.data)
}), {
  loadClassificationAttributes: _relationshipsActions.loadClassificationAttributes,
  hideStepperSave: _appActions.hideStepperSave
})(RelationshipAddThirdStep);

exports.default = _default;