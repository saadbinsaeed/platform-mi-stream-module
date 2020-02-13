"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _lo = require("app/utils/lo/lo");

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _userManagementAction = require("store/actions/admin/userManagementAction");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * General tab in users view.
 * Todo: We probably should extract the form in it's own component, however
 * nearly the only code here is form related.
 */
let UserAbout = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class UserAbout extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "formRef", _react.default.createRef());

    this.state = {
      user: (0, _Immutable.default)({ ...props.user,
        language: props.user.language && {
          name: props.user.language
        }
      })
    };
  }

  componentDidUpdate(prevProps) {
    const {
      user
    } = this.props;

    if (prevProps.user !== user) {
      this.setState({
        user: (0, _Immutable.default)({ ...user,
          language: user.language && {
            name: user.language
          }
        })
      });
    }
  }

  fieldDefinitions(user, isAdmin) {
    return [{
      field: 'panel',
      type: 'panel',
      properties: {
        header: 'Basic',
        expanded: true
      },
      children: [{
        field: 'id',
        type: 'number',
        properties: {
          label: 'ID',
          name: 'id',
          disabled: true
        }
      }, {
        field: 'lastUpdatedDate',
        type: 'dateTime',
        properties: {
          label: 'Last Authenticated',
          name: 'lastUpdatedDate',
          disabled: true,
          fullWidth: true
        }
      }, {
        field: 'createdDate',
        type: 'dateTime',
        properties: {
          label: 'Created On',
          name: 'createdDate',
          disabled: true,
          fullWidth: true
        }
      }, {
        field: 'createdBy.name',
        type: 'text',
        properties: {
          label: 'Created By',
          name: 'createdBy.name',
          disabled: true
        }
      }, {
        field: 'login',
        type: 'text',
        properties: {
          label: 'Login ID',
          name: 'login',
          disabled: true
        }
      }]
    }, {
      field: 'panel',
      type: 'panel',
      properties: {
        header: 'Person Details',
        expanded: true
      },
      children: [{
        field: 'image',
        type: 'avatarEditor',
        properties: {
          name: 'image',
          disabled: true,
          initials: user.name,
          image: user.image
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
          minLength: 3,
          maxLength: 50,
          email: true
        }
      }, {
        field: 'active',
        type: 'boolean',
        properties: {
          label: 'Active',
          name: 'active'
        }
      }, {
        field: 'language',
        type: 'customEntitiesTypeahead',
        properties: {
          label: 'Language',
          name: 'language',
          valueField: 'name',
          placeholder: 'Select language...',
          directoryType: 'languages'
        }
      }, {
        field: 'groups',
        type: 'groupTypeahead',
        properties: {
          label: 'Select User Groups',
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
      }]
    }];
  }

  handleChange(user) {
    this.setState({
      user
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.formRef.current.isValidForm().then(({
      data,
      errors
    }) => {
      if (!errors) {
        const {
          user
        } = this.state;
        this.props.updateUser({ ...user,
          language: (0, _lo.get)(user, 'language.name', null),
          groups: user.groups && user.groups.map(({
            id
          }) => id)
        });
      }
    });
  }

  render() {
    const {
      user
    } = this.state;
    const {
      isAdmin
    } = this.props.userProfile;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Container.default, {
      width: "1024"
    }, _react.default.createElement(_FormGenerator.default, {
      components: this.fieldDefinitions(user, isAdmin),
      ref: this.formRef,
      ListItemProps: {
        disableGutters: true
      },
      onChange: this.handleChange,
      data: user
    }))), _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_TextIcon.default, {
      icon: "content-save",
      label: "Save",
      color: "primary",
      form: "user_about_form",
      type: "submit",
      onClick: this.onFormSubmit
    })));
  }

}, _defineProperty(_class2, "propTypes", {
  user: _propTypes.default.object,
  updateUser: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.object
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "fieldDefinitions", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "fieldDefinitions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFormSubmit", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onFormSubmit"), _class.prototype)), _class));

const mapStateToProps = state => {
  return {
    userProfile: state.user.profile
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  updateUser: _userManagementAction.updateUser
})(UserAbout);

exports.default = _default;