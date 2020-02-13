"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _peopleActions = require("store/actions/entities/peopleActions");

var _History = _interopRequireDefault(require("store/History"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the view to add a Person.
 */
let PersonAdd = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class PersonAdd extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "formRef", _react.default.createRef());
  }

  fieldDefinitions(isAdmin) {
    return [{
      field: 'partyId',
      type: 'text',
      properties: {
        label: 'Unique External Reference',
        name: 'partyId'
      },
      constraints: {
        maxLength: 60
      }
    }, {
      field: 'name',
      type: 'text',
      properties: {
        label: 'Display Name',
        name: 'name'
      },
      constraints: {
        required: true,
        minLength: 3,
        maxLength: 60
      }
    }, {
      field: 'description',
      type: 'text',
      properties: {
        label: 'Description',
        name: 'description'
      }
    }, {
      field: 'classes',
      type: 'classificationTypeahead',
      properties: {
        label: 'Classification',
        name: 'classes',
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }],
        multiple: true,
        applicableOn: 'person'
      }
    }];
  }

  /**
   * Handle the form submit event.
   * @param e the form submit SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   * @returns {boolean} false.
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.formRef.current.isValidForm().then(({
      data,
      errors
    }) => {
      if (!errors) {
        this.props.savePerson(data).then(result => {
          const {
            id
          } = this.props.person || {};

          if (id) {
            _History.default.push(`/people/${id}/`);
          }
        });
      }
    });
  }

  /**
   * @override
   */
  render() {
    const {
      isLoading
    } = this.props;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canAdd = isAdmin || permissionsSet.has('entity.person.add');

    if (!canAdd) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "People"
      });
    }

    return _react.default.createElement(_Modal.default, {
      title: "Add person",
      open: true
    }, _react.default.createElement(_Form.default, {
      loading: isLoading
    }, _react.default.createElement(_FormGenerator.default, {
      components: this.fieldDefinitions(isAdmin),
      ref: this.formRef,
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
  savePerson: _propTypes.default.func,
  isLoading: _propTypes.default.bool,
  userProfile: _propTypes.default.object,
  person: _propTypes.default.object
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "fieldDefinitions", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "fieldDefinitions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFormSubmit", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onFormSubmit"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile,
  isLoading: state.entities.people.save.isLoading,
  person: state.entities.people.save.data
}), {
  savePerson: _peopleActions.savePerson
})(PersonAdd);

exports.default = _default;