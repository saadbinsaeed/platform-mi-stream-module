"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Alert = _interopRequireDefault(require("app/components/molecules/Alert/Alert"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _GroupItem = _interopRequireDefault(require("app/components/Entities/Classifications/GroupItem"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Select the group's classification and setup the classification's values.
 */
let GroupClassificationSection = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class GroupClassificationSection extends _react.Component {
  componentDidMount() {
    const uri = this.props.value;

    if (uri) {
      this.props.loadGroupClassificationDefinition(uri);
    }
  }

  componentDidUpdate(prevProps) {
    const uri = this.props.value;

    if (uri && uri !== prevProps.value) {
      this.props.loadGroupClassificationDefinition(uri);
    }
  }

  generateForm(groups, attributes, permissions, onChange) {
    return _react.default.createElement(_reactStyledFlexboxgrid.Row, null, (groups || []).map((group, index) => _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      key: index,
      xs: 12
    }, _react.default.createElement(_GroupItem.default, _extends({
      key: index
    }, group, {
      canEdit: permissions.includes('edit'),
      attributes: attributes,
      updateAttribute: onChange,
      isCollapsed: false
    })))));
  }

  generateAlert(uri, isLoading, definition, isActive, abstract, form) {
    if (isLoading || !uri) {
      return null;
    }

    if (!isActive) return _react.default.createElement(_Alert.default, {
      type: "background"
    }, "The classification is disabled.");
    if (!form) return _react.default.createElement(_Alert.default, {
      type: "background"
    }, "The classification does not have any attributes.");
    if (!definition) return _react.default.createElement(_Alert.default, {
      type: "background"
    }, `You do not have permission to view the classification "${uri}".`);
    return null;
  }

  render() {
    const {
      value,
      definition,
      isLoading,
      attributes,
      permissions
    } = this.props;
    const {
      active,
      abstract,
      groups
    } = definition || {};
    const uri = value;
    let form = null;

    if (!isLoading && uri && active && groups) {
      form = this.generateForm(groups, attributes, permissions, this.props.handleChangeClassification);
    }

    return _react.default.createElement("span", null, (!permissions || permissions.length === 0) && _react.default.createElement(_Field.default, {
      label: "Classification",
      name: "this.props.name",
      value: uri,
      disabled: true
    }), isLoading && _react.default.createElement(_Loader.default, {
      absolute: true
    }), form, this.generateAlert(uri, isLoading, definition, active, abstract, form));
  }

}, _defineProperty(_class2, "propTypes", {
  isLoading: _propTypes.default.bool,
  definition: _propTypes.default.object,
  value: _propTypes.default.string,
  handleChangeClassification: _propTypes.default.func,
  loadGroupClassificationDefinition: _propTypes.default.func
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "generateForm", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "generateForm"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "generateAlert", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "generateAlert"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.admin.groups.group.classificationDefinition.isLoading,
  definition: state.admin.groups.group.classificationDefinition.definition
}), {
  loadGroupClassificationDefinition: _groupsActions.loadGroupClassificationDefinition
})(GroupClassificationSection);

exports.default = _default;