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

var _IconsSelect = _interopRequireDefault(require("app/components/molecules/IconsSelect/IconsSelect"));

var _ColorPicker = _interopRequireDefault(require("app/components/molecules/ColorPicker/ColorPicker"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _LocationForm = _interopRequireDefault(require("app/components/Forms/LocationForm/LocationForm"));

var _ContactInfoListForm = require("app/components/Forms/ContactInfoListForm/ContactInfoListForm");

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _date = require("app/utils/date/date");

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _ImageUploader = _interopRequireDefault(require("app/components/molecules/ImageUploader/ImageUploader"));

var _peopleActions = require("store/actions/entities/peopleActions");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CheckboxContainer = _styledComponents.default.div.withConfig({
  displayName: "PersonAbout__CheckboxContainer",
  componentId: "sc-1ujwcrs-0"
})(["display:flex;flex-direction:row;"]);
/**
 * General tab in persons view.
 * Todo: We probably should extract the form in it's own component, however
 * nearly the only code here is form related.
 */


class PeopleAbout extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    this.state = {
      personForm: (0, _Immutable.default)(props.person || {})
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }
  /**
   * @override
   */


  componentDidUpdate(prevProps) {
    if (prevProps.person !== this.props.person) {
      this.setState({
        personForm: (0, _Immutable.default)(this.props.person)
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
      type
    } = event.target;
    let {
      value
    } = event.target;
    value = (0, _stringUtils.stripUnwanted)(value);

    if (type === 'number') {
      value = parseFloat(value);
    }

    if (name === 'dateOfBirth') {
      value = value ? new Date(value).toISOString() : null;
    }

    if (name === 'name') {
      value = String(value).trimLeft();
    } // Set a nested state based on field name


    this.setState({
      personForm: (0, _Immutable.set)(this.state.personForm, name, value)
    });
  }
  /**
   * Returns person dob in yyyy-mm-dd format
   * @param person
   * @returns {string}
   */


  getDateOfBirth(person) {
    return person.dateOfBirth ? (0, _moment.default)(person.dateOfBirth, _moment.default.ISO_8601).toDate() : null;
  }
  /**
   * @param image upload the specified Person's image
   */


  uploadImage(image) {
    const reader = new FileReader();

    reader.onload = e => {
      this.props.uploadImage(this.props.person.id, 'person', image).then(() => {
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
      personForm
    } = this.state;
    const partyId = personForm.partyId && personForm.partyId.trim();
    personForm = (0, _Immutable.set)(personForm, 'partyId', partyId);
    personForm = (0, _Immutable.set)(personForm, 'modifiedDate', dateTime);
    this.setState({
      personForm
    }, () => this.props.savePerson(personForm));
  }
  /**
   * Lifecycle hook.
   * @returns {XML}
   */


  render() {
    const person = this.state.personForm;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('entity.person.edit');
    const currentDate = (0, _moment.default)(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    const imageUrl = person.image;
    const imageSrc = this.state.imageToUpload || imageUrl;
    const iconInfo = {
      name: person.iconName,
      color: person.iconColor
    };
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Form.default, {
      onSubmit: this.onFormSubmit,
      id: "people_about_form"
    }, _react.default.createElement(_Container.default, {
      width: "1024"
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Basic",
      description: _react.default.createElement("div", null, _react.default.createElement(_Field.default, {
        label: "ID",
        placeholder: "",
        type: "number",
        value: person.id,
        disabled: true
      }), _react.default.createElement(_Field.default, {
        label: "Last Modified",
        type: "datetime",
        value: (0, _date.formatDate)(person.modifiedDate),
        disabled: true
      }), _react.default.createElement(_Field.default, {
        label: "Created On",
        type: "datetime",
        value: (0, _date.formatDate)(person.createdDate),
        disabled: true
      }), _react.default.createElement(_Field.default, {
        name: "partyId",
        label: "Unique External Reference",
        title: "Max 60 characters",
        onChange: this.handleChange,
        disabled: !!person.user,
        maxLength: "60",
        value: person.partyId
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Person Details",
      description: _react.default.createElement("div", null, _react.default.createElement(_ImageUploader.default, {
        title: "Profile Image",
        image: imageSrc,
        isUploading: this.props.imageUploading,
        uploadFunction: this.uploadImage,
        canEdit: canEdit,
        name: person.name
      }), _react.default.createElement(_Field.default, {
        label: "Name",
        name: "name",
        placeholder: "Name",
        value: person.name,
        onChange: this.handleChange,
        required: true,
        minLength: "1",
        disabled: !canEdit,
        pattern: ".{3,60}",
        title: "3 to 60 characters"
      }), _react.default.createElement(_UserAutocomplete.default, {
        name: "dataOwner",
        label: "Data Owner",
        value: person && person.dataOwner,
        onChange: this.handleChange,
        required: true,
        disabled: !canEdit,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      }), _react.default.createElement(_DateTimePickerModal.default, {
        maxDate: (0, _moment.default)(currentDate, _moment.default.ISO_8601).toDate(),
        minDate: (0, _moment.default)('1900-01-01T19:00:00.000Z', _moment.default.ISO_8601).toDate(),
        format: "DD/MM/YYYY",
        label: "Birthday",
        placeholder: "Birthday",
        name: "dateOfBirth",
        kind: "date",
        value: this.getDateOfBirth(person),
        onChange: this.handleChange,
        disableFormating: true
      }), _react.default.createElement(_IconsSelect.default, {
        name: "iconName",
        label: "Icon",
        value: person.iconName,
        onChange: this.handleChange,
        disabled: !canEdit
      }), _react.default.createElement(_ColorPicker.default, {
        label: "Icon Color",
        name: "iconColor",
        placeholder: "Icon Color",
        value: person.iconColor,
        onChange: this.handleChange,
        disabled: !canEdit
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Entity Details",
      description: _react.default.createElement("div", null, _react.default.createElement(CheckboxContainer, null, _react.default.createElement(_CheckBox.default, {
        label: "Active",
        name: "active",
        type: "checkbox",
        checked: person.active,
        onChange: this.handleChange
      }), "\xA0\xA0", _react.default.createElement(_CheckBox.default, {
        label: "Show on Situational Awareness",
        name: "enableGis",
        checked: person.enableGis,
        onChange: this.handleChange,
        disabled: !canEdit
      })), _react.default.createElement(_Field.default, {
        label: "Description",
        name: "description",
        placeholder: "Description",
        value: person.description,
        onChange: this.handleChange
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Contact Info",
      description: _react.default.createElement(_ContactInfoListForm.ContactInfoListForm, {
        name: "contactInfo",
        value: person.contactInfo,
        onChange: this.handleChange
      })
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Location",
      description: _react.default.createElement("div", null, _react.default.createElement(_LocationForm.default, {
        name: "locationInfo",
        value: person.locationInfo || {},
        onChange: this.handleChange,
        iconInfo: iconInfo,
        location: this.props.location
      }))
    })))), !canEdit ? null : _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_TextIcon.default, {
      icon: "content-save",
      label: "Save",
      color: "primary",
      form: "people_about_form",
      type: "submit"
    })));
  }

}

_defineProperty(PeopleAbout, "propTypes", {
  // eslint-disable-next-line react/no-unused-prop-types
  person: _propTypes.default.object,
  savePerson: _propTypes.default.func.isRequired,
  uploadImage: _propTypes.default.func.isRequired,
  imageUploading: _propTypes.default.bool,
  userProfile: _propTypes.default.object
});

const mapStateToProps = state => {
  return {
    userProfile: state.user.profile
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  savePerson: _peopleActions.savePerson,
  uploadImage: _entitiesActions.uploadImage
})(PeopleAbout);

exports.default = _default;