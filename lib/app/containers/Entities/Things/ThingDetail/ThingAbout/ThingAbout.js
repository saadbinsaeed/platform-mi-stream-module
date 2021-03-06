"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _ThingAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ThingAutocomplete"));

var _OrganisationAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/OrganisationAutocomplete"));

var _IconsSelect = _interopRequireDefault(require("app/components/molecules/IconsSelect/IconsSelect"));

var _ColorPicker = _interopRequireDefault(require("app/components/molecules/ColorPicker/ColorPicker"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _ImageUploader = _interopRequireDefault(require("app/components/molecules/ImageUploader/ImageUploader"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _LocationForm = _interopRequireDefault(require("app/components/Forms/LocationForm/LocationForm"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _date = require("app/utils/date/date");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _thingsActions = require("store/actions/entities/thingsActions");

var _stringUtils = require("app/utils/string/string-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CheckboxContainer = _styledComponents.default.div.withConfig({
  displayName: "ThingAbout__CheckboxContainer",
  componentId: "p1nnrz-0"
})(["display:flex;flex-direction:row;"]);
/**
 * The Thing About Tab.
 */


class ThingAbout extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "buildOwnerFilterBy", (0, _memoizeOne.default)((id, isAdmin) => {
      const filters = [{
        field: 'id',
        op: '<>',
        value: id
      }];

      if (!isAdmin) {
        filters.push({
          field: 'active',
          op: '=',
          value: true
        });
      }

      return filters;
    }));

    _defineProperty(this, "buildLocationForm", (0, _memoizeOne.default)((locationInfo, iconName, iconColor, location, handleChange) => {
      const iconInfo = {
        name: iconName,
        color: iconColor
      };
      return _react.default.createElement(_LocationForm.default, {
        name: "locationInfo",
        value: locationInfo || {},
        iconInfo: iconInfo,
        location: location,
        onChange: handleChange
      });
    }));

    this.state = {
      thingForm: (0, _Immutable.default)(props.thing),
      imageError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
  }
  /**
   * @override
   */


  componentWillReceiveProps(nextProps) {
    if (nextProps.thing !== this.props.thing) {
      this.setState({
        thingForm: (0, _Immutable.default)(nextProps.thing)
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

    if (type === 'number') {
      value = parseFloat(value);
    } else {
      value = (0, _stringUtils.stripUnwanted)(value);
    }

    if (name === 'name') {
      value = String(value).trimLeft();
    }

    this.setState({
      thingForm: (0, _lo.set)(this.state.thingForm, name, value)
    });
  }
  /**
   * Save the form.
   * @param event SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */


  onFormSubmit(event) {
    event.preventDefault();
    const {
      thingForm
    } = this.state;
    this.props.saveThing((0, _lo.set)(thingForm, 'thingId', thingForm.thingId && thingForm.thingId.trim()));
  }
  /**
   * @param image upload the specified Thing's image
   */


  uploadImage(image) {
    const reader = new FileReader();

    reader.onload = e => {
      this.props.uploadImage(this.props.thing.id, 'thing', image).then(() => {
        this.setState({
          imageError: false,
          imageToUpload: e.target.result
        });
      }).catch(error => {
        return error;
      });
    };

    reader.readAsDataURL(image);
  }
  /**
   * @param event a SyntheticEvent (https://facebook.github.io/react/docs/events.html).
   */


  handleImageError(event) {
    this.setState({
      imageError: true
    });
  }

  /**
   * Lifecycle hook.
   * @returns {XML}
   */
  render() {
    const {
      userProfile,
      location,
      isLoading
    } = this.props;
    const {
      permissions,
      isAdmin
    } = userProfile;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('entity.thing.edit');
    const {
      id,
      thingId,
      name,
      description,
      iconName,
      iconColor,
      createdDate,
      modifiedDate,
      image,
      dataOwner,
      parent,
      organisation,
      active,
      enableGis,
      locationInfo
    } = this.state.thingForm || {};
    const imageSrc = this.state.imageToUpload || image;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Form.default, {
      onSubmit: this.onFormSubmit,
      id: "form"
    }, _react.default.createElement(_Container.default, {
      width: "1024"
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      collapsed: this.props.allOpen,
      title: "Basic",
      description: _react.default.createElement("div", null, _react.default.createElement(_Field.default, {
        label: "ID",
        id: "id",
        name: "id",
        type: "number",
        placeholder: "",
        value: id,
        disabled: true
      }), _react.default.createElement(_Field.default, {
        label: "Last Modified",
        type: "datetime",
        id: "modified",
        placeholder: "",
        name: "modifiedDate",
        value: (0, _date.formatDate)(modifiedDate),
        disabled: true
      }), _react.default.createElement(_Field.default, {
        name: "createdDate",
        label: "Created On",
        type: "datetime",
        id: "created",
        placeholder: "",
        value: (0, _date.formatDate)(createdDate),
        disabled: true
      }), _react.default.createElement(_Field.default, {
        label: "Unique External Reference",
        name: "thingId",
        value: thingId,
        onChange: this.handleChange,
        disabled: !canEdit,
        title: "Max 60 characters",
        maxLength: "60"
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      collapsed: this.props.allOpen,
      title: "Thing Details",
      description: _react.default.createElement("div", null, _react.default.createElement(_ImageUploader.default, {
        title: "Upload image",
        image: imageSrc,
        isUploading: isLoading,
        uploadFunction: this.uploadImage,
        canEdit: canEdit,
        name: name
      }), _react.default.createElement(_Field.default, {
        label: "Name",
        name: "name",
        placeholder: "Name",
        value: name,
        onChange: this.handleChange,
        pattern: ".{3,60}",
        required: true,
        title: "3 to 60 characters",
        disabled: !canEdit
      }), _react.default.createElement(_UserAutocomplete.default, {
        name: "dataOwner",
        label: "Data Owner",
        value: dataOwner,
        onChange: this.handleChange,
        required: true,
        disabled: !canEdit,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      }), _react.default.createElement(_ThingAutocomplete.default, {
        label: "Parent",
        name: "parent",
        value: parent,
        onChange: this.handleChange,
        disabled: !canEdit,
        filterBy: this.buildOwnerFilterBy(id, isAdmin)
      }), _react.default.createElement(_OrganisationAutocomplete.default, {
        label: "Organisation",
        name: "organisation",
        value: organisation,
        onChange: this.handleChange,
        disabled: !canEdit,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      }), _react.default.createElement(_IconsSelect.default, {
        name: "iconName",
        label: "Icon",
        value: iconName,
        onChange: this.handleChange,
        disabled: !canEdit
      }), _react.default.createElement(_ColorPicker.default, {
        label: "Icon Color",
        name: "iconColor",
        placeholder: "Icon Color",
        value: iconColor,
        onChange: this.handleChange,
        disabled: !canEdit
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Entity Details",
      description: _react.default.createElement("div", null, _react.default.createElement(CheckboxContainer, null, _react.default.createElement(_CheckBox.default, {
        label: "Active",
        name: "active",
        checked: active,
        onChange: this.handleChange,
        disabled: !canEdit
      }), "\xA0\xA0", _react.default.createElement(_CheckBox.default, {
        label: "Show on Situational Awareness",
        name: "enableGis",
        checked: enableGis,
        onChange: this.handleChange,
        disabled: !canEdit
      })), _react.default.createElement(_Field.default, {
        label: "Description",
        name: "description",
        value: description,
        placeholder: "...",
        onChange: this.handleChange,
        disabled: !canEdit
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      collapsed: this.props.allOpen,
      title: "Location",
      description: this.buildLocationForm(locationInfo, iconName, iconColor, location, this.handleChange)
    })))), !canEdit ? null : _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, _react.default.createElement(_TextIcon.default, {
      icon: "content-save",
      label: "Save",
      color: "primary",
      form: "form",
      type: "submit"
    }))));
  }

}

_defineProperty(ThingAbout, "propTypes", {
  thing: _propTypes.default.object.isRequired,
  saveThing: _propTypes.default.func.isRequired,
  uploadImage: _propTypes.default.func,
  isLoading: _propTypes.default.bool,
  imageData: _propTypes.default.object,
  allOpen: _propTypes.default.bool,
  userProfile: _propTypes.default.object
});

const mapStateToProps = (state, props) => ({
  thing: (0, _lo.get)(state.entities.things.details.data, 'thing'),
  isLoading: state.entities.things.details.isLoading,
  imageData: (0, _lo.get)(state.entities.things.details.data, 'thing'),
  userProfile: state.user.profile
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  saveThing: _thingsActions.saveThing,
  uploadImage: _entitiesActions.uploadImage
})(ThingAbout);

exports.default = _default;