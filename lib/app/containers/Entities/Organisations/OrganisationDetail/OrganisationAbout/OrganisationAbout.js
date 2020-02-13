"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _moment = _interopRequireDefault(require("moment"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _PersonAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/PersonAutocomplete"));

var _OrganisationAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/OrganisationAutocomplete"));

var _IconsSelect = _interopRequireDefault(require("app/components/molecules/IconsSelect/IconsSelect"));

var _ColorPicker = _interopRequireDefault(require("app/components/molecules/ColorPicker/ColorPicker"));

var _LocationForm = _interopRequireDefault(require("app/components/Forms/LocationForm/LocationForm"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _ContactInfoListForm = require("app/components/Forms/ContactInfoListForm/ContactInfoListForm");

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _date = require("app/utils/date/date");

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _ImageUploader = _interopRequireDefault(require("app/components/molecules/ImageUploader/ImageUploader"));

var _organisationsActions = require("store/actions/entities/organisationsActions");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CheckboxContainer = _styledComponents.default.div.withConfig({
  displayName: "OrganisationAbout__CheckboxContainer",
  componentId: "sc-1ns1v3q-0"
})(["display:flex;flex-direction:row;"]);
/**
 * General tab in organisations view.
 * Todo: We probably should extract the form in it's own component, however
 * nearly the only code here is form related.
 */


class OrganisationAbout extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    this.state = {
      organisationForm: (0, _Immutable.default)(props.organisation || {})
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }
  /**
   * @override
   */


  componentWillReceiveProps(nextProps) {
    if (nextProps.organisation !== this.props.organisation) {
      this.setState({
        organisationForm: (0, _Immutable.default)(nextProps.organisation)
      });
    }
  }
  /**
   * Handle a form change
   * @param event
   */


  handleChange(event) {
    const {
      name,
      type,
      label
    } = event.target;
    let {
      value
    } = event.target;
    let organisationForm;
    const formData = this.state.organisationForm;
    value = (0, _stringUtils.stripUnwanted)(value);

    if (name === 'parent.id' || name === 'contactPerson.id') {
      const path = name.replace(/\.id/, '');
      organisationForm = { ...this.state.organisationForm,
        [path]: {
          'id': value || null,
          'name': label || null
        }
      };
    } else {
      if (type === 'number') {
        value = parseFloat(value);
      } else if (type === 'date') {
        value = value ? new Date(value).toISOString() : null;
      }

      if (name === 'name') {
        value = String(value).trimLeft();
      }

      organisationForm = (0, _Immutable.set)(formData, name, value);

      if (name === 'name' && (!formData.fullName || formData.fullName === formData.name)) {
        organisationForm = (0, _Immutable.set)(organisationForm, 'fullName', value);
      }
    }

    this.setState({
      organisationForm
    });
  }
  /**
   * @param image upload the specified Organisation's image
   */


  uploadImage(image) {
    const reader = new FileReader();

    reader.onload = e => {
      this.props.uploadImage(this.props.organisation.id, 'organisation', image).then(() => {
        this.setState({
          imageToUpload: e.target.result
        });
      }).catch(error => {
        return error;
      });
    };

    reader.readAsDataURL(image);
  }
  /**
   * Save the form.
   * @param event SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */


  onFormSubmit(event) {
    // prevent default execution
    event.preventDefault();
    const dateTime = (0, _moment.default)();
    let {
      organisationForm
    } = this.state;
    organisationForm = (0, _Immutable.set)(organisationForm, 'partyId', String((0, _lo.get)(organisationForm, 'partyId') || '').trim());
    organisationForm = (0, _Immutable.set)(organisationForm, 'modifiedDate', dateTime);

    if (!organisationForm.fullName) {
      organisationForm = (0, _Immutable.set)(organisationForm, 'fullName', organisationForm.name);
    }

    this.setState({
      organisationForm
    }, () => this.props.saveOrganisation(organisationForm));
  }
  /**
   * Lifecycle hook.
   * @returns {XML}
   */


  render() {
    const organisation = this.state.organisationForm;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('entity.organisation.edit');
    const {
      image
    } = organisation || {};
    const imageSrc = this.state.imageToUpload || image;
    const iconInfo = {
      name: organisation.iconName,
      color: organisation.iconColor
    };
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Form.default, {
      id: "form",
      onSubmit: this.onFormSubmit
    }, _react.default.createElement(_Container.default, {
      width: "1024"
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Basic",
      description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Field.default, {
        label: "ID",
        placeholder: "",
        type: "number",
        value: organisation.id,
        disabled: true
      }), _react.default.createElement(_Field.default, {
        label: "Last Modified",
        type: "datetime",
        value: (0, _date.formatDate)(organisation.modifiedDate),
        disabled: true
      }), _react.default.createElement(_Field.default, {
        label: "Created On",
        type: "datetime",
        value: (0, _date.formatDate)(organisation.createdDate),
        disabled: true
      }), _react.default.createElement(_Field.default, {
        name: "partyId",
        label: "Unique External Reference",
        title: "Max 60 characters",
        onChange: this.handleChange,
        maxLength: "60",
        value: (0, _lo.get)(organisation, 'partyId')
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Organisation Details",
      description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ImageUploader.default, {
        title: "Profile Image",
        image: imageSrc,
        isUploading: this.props.isLoading,
        uploadFunction: this.uploadImage,
        canEdit: canEdit,
        name: (0, _lo.get)(organisation, 'name', '')
      }), _react.default.createElement(_Field.default, {
        label: "Name",
        name: "name",
        placeholder: "Name",
        value: (0, _lo.get)(organisation, 'name', ''),
        onChange: this.handleChange,
        required: true,
        disabled: !canEdit,
        pattern: ".{3,60}",
        title: "3 to 60 characters"
      }), _react.default.createElement(_Field.default, {
        label: "Organisation Full Name",
        name: "fullName",
        placeholder: "Full Name",
        value: (0, _lo.get)(organisation, 'fullName', ''),
        onChange: this.handleChange,
        minLength: "1",
        disabled: !canEdit
      }), _react.default.createElement(_OrganisationAutocomplete.default, {
        name: "parent",
        label: "Parent Organisation",
        value: (0, _lo.get)(organisation, 'parent'),
        onChange: this.handleChange,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      }), _react.default.createElement(_UserAutocomplete.default, {
        name: "dataOwner",
        label: "Data Owner",
        value: organisation && organisation.dataOwner,
        onChange: this.handleChange,
        required: true,
        disabled: !canEdit,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      }), _react.default.createElement(_PersonAutocomplete.default, {
        name: "contactPerson",
        label: "Contact Person",
        value: (0, _lo.get)(organisation, 'contactPerson'),
        onChange: this.handleChange,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      }), _react.default.createElement(_IconsSelect.default, {
        name: "iconName",
        label: "Icon",
        value: (0, _lo.get)(organisation, 'iconName', ''),
        onChange: this.handleChange,
        disabled: !canEdit
      }), _react.default.createElement(_ColorPicker.default, {
        label: "Icon Color",
        name: "iconColor",
        placeholder: "Icon Color",
        value: organisation.iconColor,
        onChange: this.handleChange,
        disabled: !canEdit
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Entity Details",
      description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(CheckboxContainer, null, _react.default.createElement(_CheckBox.default, {
        label: "Active",
        name: "active",
        type: "checkbox",
        checked: (0, _lo.get)(organisation, 'active', true),
        onChange: evt => this.handleChange({
          target: {
            name: 'active',
            value: evt.target.checked,
            type: 'checkbox'
          }
        })
      }), "\xA0\xA0", _react.default.createElement(_CheckBox.default, {
        label: "Show on Situational Awareness",
        name: "enableGis",
        checked: (0, _lo.get)(organisation, 'enableGis', false),
        onChange: this.handleChange,
        disabled: !canEdit
      })), _react.default.createElement(_Field.default, {
        label: "Description",
        name: "description",
        placeholder: "Description",
        value: (0, _lo.get)(organisation, 'description', ''),
        onChange: this.handleChange
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Contact Info",
      description: _react.default.createElement(_ContactInfoListForm.ContactInfoListForm, {
        name: "contactInfo",
        value: organisation.contactInfo,
        onChange: this.handleChange
      })
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Location",
      description: _react.default.createElement(_LocationForm.default, {
        name: "locationInfo",
        value: (0, _lo.get)(organisation, 'locationInfo') || {},
        onChange: this.handleChange,
        iconInfo: iconInfo,
        location: this.props.location
      })
    })))), !canEdit ? null : _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_TextIcon.default, {
      icon: "content-save",
      label: "Save",
      color: "primary",
      type: "submit",
      form: "form"
    })));
  }

}

_defineProperty(OrganisationAbout, "propTypes", {
  // eslint-disable-next-line react/no-unused-prop-types
  organisation: _propTypes.default.object,
  saveOrganisation: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  uploadImage: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.object
});

const mapStateToProps = state => ({
  userProfile: state.user.profile
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  saveOrganisation: _organisationsActions.saveOrganisation,
  uploadImage: _entitiesActions.uploadImage
})(OrganisationAbout);

exports.default = _default;