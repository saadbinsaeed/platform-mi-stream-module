"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EditRelationship = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _History = _interopRequireDefault(require("store/History"));

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _Stepper = _interopRequireDefault(require("app/components/Stepper/Stepper"));

var _RelationshipAddThirdStep = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipAddThirdStep"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _appActions = require("store/actions/app/appActions");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 *  ThingNewRelationship view
 */
let EditRelationship = (_class = (_temp = _class2 = class EditRelationship extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {});

    const {
      id,
      loadRelationship
    } = props;
    loadRelationship(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.loadRelationship(this.props.id);
    }
  }

  onCompletion() {
    const {
      attributes
    } = this.state;
    return this.props.updateRelationship({
      id: this.props.id,
      attributes
    });
  }

  onChange(event) {
    const {
      name,
      value
    } = event.target;
    this.setState({
      [name]: value
    });
  }

  onClose() {
    const {
      baseUri,
      type2
    } = this.props;

    _History.default.push(`${baseUri}/${type2}`);
  }

  render() {
    const {
      isLoading,
      relationship
    } = this.props;

    if (isLoading) {
      return _react.default.createElement(_Loader.default, {
        absolute: true
      });
    }

    if (!relationship) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `relationship between ${this.props.id} ${this.props.entityId}`
      });
    }

    return _react.default.createElement(_Stepper.default, {
      steps: [{
        title: 'Edit Attributes',
        subTitle: 'Edit attributes of the relationship',
        formId: 'classificationForm',
        content: _react.default.createElement(_RelationshipAddThirdStep.default, {
          isEdit: true,
          onClose: this.onClose,
          onChange: this.onChange,
          value: { ...relationship,
            ...this.state
          }
        })
      }],
      onClose: this.onClose,
      onDone: this.onCompletion
    });
  }

}, _defineProperty(_class2, "propTypes", {
  id: _propTypes.default.string.isRequired,
  type2: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool,
  updateRelationship: _propTypes.default.func.isRequired,
  loadRelationship: _propTypes.default.func.isRequired,
  relationship: _propTypes.default.object,
  showToastr: _propTypes.default.func.isRequired
}), _defineProperty(_class2, "defaultProps", {
  isLoading: true
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "onCompletion", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onCompletion"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClose", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onClose"), _class.prototype)), _class);
exports.EditRelationship = EditRelationship;

var _default = (0, _reactRedux.connect)(state => ({
  relationship: state.entities.relationship.data,
  isLoading: state.entities.relationship.isLoading
}), {
  updateRelationship: _relationshipsActions.updateRelationship,
  loadRelationship: _relationshipsActions.loadRelationship,
  showToastr: _appActions.showToastr
})(EditRelationship);

exports.default = _default;