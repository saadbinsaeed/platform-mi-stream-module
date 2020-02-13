"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _History = _interopRequireDefault(require("store/History"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _userManagementAction = require("store/actions/admin/userManagementAction");

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the view to add User Management.
 */
let UserAdd = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class UserAdd extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      userToAdd: (0, _Immutable.default)({})
    });

    _defineProperty(this, "formRef", _react.default.createRef());
  }

  fieldDefinitions(isAdmin) {
    return [{
      field: 'login',
      type: 'text',
      properties: {
        label: 'Login Id',
        name: 'login'
      },
      constraints: {
        required: true,
        minLength: 3,
        maxLength: 50
      }
    }, {
      field: 'name',
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      },
      constraints: {
        required: true,
        minLength: 3,
        maxLength: 60
      }
    }, {
      field: 'partyId',
      type: 'text',
      properties: {
        label: 'Email',
        name: 'partyId'
      },
      constraints: {
        required: true,
        email: true
      }
    }, {
      field: 'employeeOf',
      type: 'organisationTypeahead',
      properties: {
        label: 'Employee of',
        name: 'employeeOf',
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }],
        valueField: 'id'
      },
      constraints: {
        required: true
      }
    }, {
      field: 'groups',
      type: 'groupTypeahead',
      properties: {
        label: 'Groups',
        name: 'groups',
        filterBy: groups => {
          const filterBy = [];

          if (groups && groups.length) {
            const modifiedGroups = groups.map(({
              name
            }) => name);
            filterBy.push({
              field: 'allChildren.name',
              op: 'not in',
              value: modifiedGroups
            }, {
              field: 'allParents.name',
              op: 'not in',
              value: modifiedGroups
            });
          }

          return filterBy;
        },
        multiple: true
      }
    }, {
      field: 'lang',
      type: 'customEntitiesTypeahead',
      properties: {
        label: 'Language',
        name: 'lang',
        valueField: 'name',
        placeholder: 'Select language...',
        directoryType: 'languages'
      }
    }];
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.formRef.current.isValidForm().then(({
      data,
      errors
    }) => {
      if (!errors) {
        this.props.createUser({ ...data,
          groups: data.groups && data.groups.map(({
            id
          }) => id),
          employeeOf: (0, _lo.get)(data, 'employeeOf')
        });
      }
    });
  }

  handleChange(data) {
    if (data.userid) {
      data = { ...data,
        userid: this._normalizeValue(data.userid)
      };
    }

    this.setState({
      userToAdd: data
    });
  }

  _normalizeValue(value) {
    if (value !== '') {
      return value.toLowerCase();
    }
  }

  render() {
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canAdd = isAdmin || permissionsSet.has('admin.user.add');

    if (!canAdd) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "User"
      });
    }

    const {
      isLoading
    } = this.props;
    const {
      userToAdd
    } = this.state;
    return _react.default.createElement(_Modal.default, {
      title: "Create New User",
      open: true
    }, _react.default.createElement(_Form.default, {
      loading: isLoading
    }, _react.default.createElement(_FormGenerator.default, {
      components: this.fieldDefinitions(isAdmin),
      ref: this.formRef,
      data: userToAdd,
      onChange: this.handleChange,
      ListItemProps: {
        disableGutters: true
      }
    }), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
      type: "button",
      onClick: _History.default.pushBack
    }, "Cancel"), _react.default.createElement(_Button.default, {
      onClick: this.onFormSubmit,
      type: "submit",
      color: "primary"
    }, "Submit"))));
  }

}, _defineProperty(_class2, "propTypes", {
  isLoading: _propTypes.default.bool,
  createUser: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.object.isRequired
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "fieldDefinitions", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "fieldDefinitions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFormSubmit", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onFormSubmit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_normalizeValue", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_normalizeValue"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)((state, ownProps) => ({
  isLoading: state.admin.users.user.isLoading,
  userProfile: state.user.profile
}), {
  createUser: _userManagementAction.createUser
})(UserAdd);

exports.default = _default;