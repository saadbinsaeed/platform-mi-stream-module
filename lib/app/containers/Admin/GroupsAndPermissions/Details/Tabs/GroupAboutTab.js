"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _groupsActions = require("store/actions/admin/groupsActions");

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _lo = require("app/utils/lo/lo");

var _GroupClassificationSection = _interopRequireDefault(require("./GroupClassificationSection"));

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Container that is used to display the General tab of the Groups & Permissions details view.
 */
let GroupAboutTab = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class GroupAboutTab extends _react.Component {
  /**
   * @param props the Component's parameters.
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "formRef", _react.default.createRef());

    this.state = {
      group: props.group
    };
  }
  /**
   * componentDidUpdate - description
   *
   * @param  {type} prevProps description
   * @return {type}           description
   */


  componentDidUpdate(prevProps) {
    const group = this.props.group;

    if (prevProps.group !== group) {
      this.setState({
        group
      });
    }
  }

  fieldDefinitions(isAdmin, isSuperGroup) {
    const groupParentFilter = [{
      field: 'id',
      op: '<>',
      value: this.state.group.id
    }];
    return [{
      field: 'name',
      type: 'text',
      properties: {
        label: 'Group Name',
        name: 'name'
      },
      constraints: {
        required: true,
        minLength: 3,
        maxLength: 60
      }
    }, {
      field: 'category',
      type: 'text',
      properties: {
        label: 'Category',
        name: 'category'
      }
    }, {
      field: 'parent',
      type: 'groupTypeahead',
      properties: {
        label: 'Parent',
        name: 'parent',
        filterBy: isAdmin ? groupParentFilter : groupParentFilter.push({
          field: 'active',
          op: '=',
          value: true
        })
      },
      condition: '='
    }, {
      field: 'active',
      type: 'boolean',
      properties: {
        label: 'Active',
        name: 'active'
      }
    }, {
      field: 'classifications[0]',
      type: 'classificationTypeahead',
      properties: {
        label: 'Classification',
        name: 'classifications[0]',
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }],
        applicableOn: 'group'
      },
      condition: '='
    }].map(def => ({ ...def,
      properties: { ...def.properties,
        disabled: isSuperGroup
      }
    }));
  }

  handleChangeClassification(event) {
    const {
      name,
      value
    } = event.target;
    this.setState((0, _lo.set)(this.state, `group.attributes.${name}`, value));
  }

  handleGroupChanges(data) {
    const {
      group
    } = this.state;
    this.setState({
      group: { ...data,
        attributes: group.attributes
      }
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.formRef.current.isValidForm().then(({
      data,
      errors
    }) => {
      if (!errors) {
        this.props.updateGroupDetails(this.state.group);
      }
    });
  }

  getPermissions(isSuperGroup) {
    return !isSuperGroup ? ['view', 'edit', 'relation', 'start'] : [];
  }
  /**
   * @override
   */


  render() {
    const {
      group
    } = this.state;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('admin.group.edit');
    const {
      id,
      attributes
    } = group;
    const clsUri = (0, _lo.get)(group, 'classifications[0]') || {};
    const isSuperGroup = id === 1;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Form.default, {
      id: "form",
      onSubmit: this.onFormSubmit
    }, _react.default.createElement(_Container.default, {
      width: "1024"
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Group Details",
      description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_FormGenerator.default, {
        components: this.fieldDefinitions(isAdmin, isSuperGroup),
        ref: this.formRef,
        ListItemProps: {
          disableGutters: true
        },
        onChange: this.handleGroupChanges,
        data: group
      }), _react.default.createElement(_GroupClassificationSection.default, {
        name: "classificationDropdown",
        value: clsUri.uri || null,
        permissions: this.getPermissions(isSuperGroup),
        attributes: attributes,
        handleChangeClassification: this.handleChangeClassification,
        disabled: true
      }))
    })))), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, group.id !== 1 && canEdit && _react.default.createElement(_TextIcon.default, {
      icon: "content-save",
      label: "Save",
      form: "form",
      color: "primary"
    }))));
  }

}, _defineProperty(_class2, "propTypes", {
  group: _propTypes.default.object,
  updateGroupDetails: _propTypes.default.func,
  userProfile: _propTypes.default.object
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "fieldDefinitions", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "fieldDefinitions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChangeClassification", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleChangeClassification"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleGroupChanges", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleGroupChanges"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFormSubmit", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onFormSubmit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getPermissions", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "getPermissions"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  group: state.admin.groups.group.details,
  userProfile: state.user.profile
}), {
  updateGroupDetails: _groupsActions.updateGroupDetails
})(GroupAboutTab);

exports.default = _default;