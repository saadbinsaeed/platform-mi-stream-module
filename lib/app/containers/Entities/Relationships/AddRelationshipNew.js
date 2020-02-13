"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AddRelationshipNew = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _History = _interopRequireDefault(require("store/History"));

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _common = require("app/utils/propTypes/common");

var _Stepper = _interopRequireDefault(require("app/components/Stepper/Stepper"));

var _RelationshipAddFirstStep = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipAddFirstStep"));

var _RelationshipAddSecondStep = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipAddSecondStep"));

var _RelationshipAddThirdStep = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipAddThirdStep"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 *  ThingNewRelationship view
 */
let AddRelationshipNew = (_class = (_temp = _class2 = class AddRelationshipNew extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {});

    this.fetchEntityData();
  }
  /**
   * this should produce data like this:
   *
   nodeId1: BigInt!
   nodeId2: BigInt!
    relationDefinitionId: BigInt
    attributes: JSON
   * @param data
   * @param type1
   * @param entityId
   * @returns {{remove: string}|{nodeId2: number, nodeId1: number, relationDefinitionId: *}}
   */


  static prepareCreateData(data, type1, entityId) {
    const {
      relationDefinition,
      type2,
      entity2,
      attributes
    } = data;
    const record = {
      relationDefinitionId: relationDefinition.id,
      nodeId1: 0,
      nodeId2: 0,
      attributes
    };
    const {
      entityType1,
      entityType2,
      isReverse
    } = relationDefinition;

    if (entityType1 === type1 && entityType2 === type2 && !isReverse) {
      record.nodeId1 = Number(entityId);
      record.nodeId2 = Number(entity2.id);
    } else {
      // else if (entityType1 === type2 && entityType2 === type1)
      record.nodeId1 = Number(entity2.id);
      record.nodeId2 = Number(entityId);
    }

    return record;
  }

  componentDidUpdate(prevProps) {
    if (this.props.entityId !== prevProps.entityId) {
      this.fetchEntityData();
    }
  }

  fetchEntityData() {
    if (this.props.entityId && this.props.type1) {
      this.props.loadEntityData(this.props.entityId, this.props.type1);
    }
  }

  onCompletion(data) {
    // we finished our steps and now we need to create relationship and redirect to correct view
    return this.props.createRelationship(AddRelationshipNew.prepareCreateData(this.state, this.props.type1, this.props.entityId));
  }

  onClose() {
    const {
      baseUri
    } = this.props;
    const {
      type2
    } = this.state;

    if (type2) {
      return _History.default.push(`${baseUri}/${type2}`);
    }

    _History.default.push(baseUri);
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

  render() {
    const {
      entityId,
      type1,
      userProfile: {
        isAdmin = false
      } = {},
      isLoading,
      entityData
    } = this.props;

    if (isLoading) {
      return _react.default.createElement(_Loader.default, {
        absolute: true,
        backdrop: true
      });
    }

    if (!entityData || !entityData.id) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `${type1} (ID:${entityId})`
      });
    }

    return _react.default.createElement(_Stepper.default, {
      steps: [{
        title: 'Add New Relationship',
        subTitle: 'Choose "Entity Type" and "Relationship Type"',
        formId: 'relationshipsAddStep1',
        content: _react.default.createElement(_RelationshipAddFirstStep.default, {
          type1: type1,
          isAdmin: isAdmin,
          onChange: this.onChange,
          value: this.state
        })
      }, {
        title: 'Select Related Record',
        subTitle: 'Choose One Related Record',
        formId: 'relationshipsAddStep2',
        content: _react.default.createElement(_RelationshipAddSecondStep.default, {
          entityId: entityId,
          type1: type1,
          isAdmin: isAdmin,
          onChange: this.onChange,
          value: this.state
        })
      }, {
        title: 'Add Attributes',
        subTitle: 'Add attributes to the relationship',
        formId: 'classificationForm',
        content: _react.default.createElement(_RelationshipAddThirdStep.default, {
          onClose: this.onClose,
          onChange: this.onChange,
          value: this.state
        })
      }],
      onClose: this.onClose,
      onDone: this.onCompletion
    });
  }

}, _defineProperty(_class2, "propTypes", {
  userProfile: _propTypes.default.object,
  type1: _common.allTypesProps.isRequired,
  entityId: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool,
  entityData: _propTypes.default.object,
  loadEntityData: _propTypes.default.func.isRequired
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "fetchEntityData", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "fetchEntityData"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onCompletion", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onCompletion"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClose", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onClose"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype)), _class);
exports.AddRelationshipNew = AddRelationshipNew;

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile,
  isLoading: state.entities.entityData.isLoading,
  entityData: state.entities.entityData.data
}), {
  createRelationship: _relationshipsActions.createRelationship,
  loadEntityData: _relationshipsActions.loadEntityData
})(AddRelationshipNew);

exports.default = _default;