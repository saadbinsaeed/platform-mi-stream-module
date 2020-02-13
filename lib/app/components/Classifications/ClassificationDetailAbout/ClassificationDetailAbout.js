"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _appActions = require("store/actions/app/appActions");

var _Immutable = require("app/utils/immutable/Immutable");

var _lo = require("app/utils/lo/lo");

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _ClassificationsDropdownDeprecated = _interopRequireDefault(require("app/containers/Common/DropDowns/ClassificationsDropdownDeprecated"));

var _transformer = require("app/utils/trasformer/transformer");

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _reactRedux = require("react-redux");

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _ColorPicker = _interopRequireDefault(require("app/components/molecules/ColorPicker/ColorPicker"));

var _Select = _interopRequireDefault(require("app/components/molecules/Autocomplete/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CheckboxContainer = _styledComponents.default.div.withConfig({
  displayName: "ClassificationDetailAbout__CheckboxContainer",
  componentId: "rqir0j-0"
})(["display:flex;flex-direction:row;"]);
/**
 * General tab in classifications view.
 * Todo: We probably should extract the form in it's own component, however
 * nearly the only code here is form related.
 */


class ClassificationDetailAbout extends _react.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "colors", void 0);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "handleChange", event => {
      const {
        name,
        value
      } = event.target;

      const nValue = this._normalizeValue(name, value);

      this.setState({
        classificationForm: (0, _Immutable.set)(this.state.classificationForm, name, nValue)
      });
    });

    _defineProperty(this, "_normalizeValue", (name, value) => {
      if (name === 'uri') {
        return value.toLowerCase();
      }

      return value;
    });

    _defineProperty(this, "_manipulateData", (0, _memoizeOne.default)(classification => {
      const parents = (classification.parents || []).map(({
        uri
      }) => uri);
      return (0, _Immutable.set)(classification, 'parents', parents);
    }));

    _defineProperty(this, "onFormSubmit", e => {
      e.preventDefault();
      const classificationForm = (0, _lo.get)(this.state, 'classificationForm');
      const {
        id,
        name,
        abstract: cAbstract,
        active,
        color,
        applicableOn,
        dataOwner: {
          login
        },
        parents
      } = classificationForm || {};
      const uri = String((0, _lo.get)(classificationForm, 'uri')).trim();

      if (!uri) {
        this.props.showToastr({
          severity: 'warn',
          detail: 'Classification URI can not be empty'
        });
      } else if (/\s/.test(uri)) {
        this.props.showToastr({
          severity: 'warn',
          detail: 'Classification URI can not contain white spaces'
        });
      } else {
        const parentUris = (parents || []).map(parent => typeof parent === 'object' ? parent.uri : parent);
        this.props.updateClassification({
          id,
          name,
          uri,
          abstract: cAbstract,
          active,
          color,
          applicableOn,
          dataOwner: {
            login
          },
          parentUris
        });
      }
    });

    this.state = {
      classificationForm: this._manipulateData(props.classification)
    };
  }
  /**
   * @override
   */


  componentDidUpdate(prevsProp) {
    if (prevsProp.classification !== this.props.classification) {
      this.setState({
        classificationForm: this._manipulateData(this.props.classification)
      });
    }
  }
  /**
   * Handle a form change
   * @param event
   */


  render() {
    const classification = (0, _transformer.safeToJS)(this.state.classificationForm);
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('entity.classification.edit');

    if (!classification) {
      return null;
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Form.default, {
      id: "form",
      onSubmit: this.onFormSubmit
    }, _react.default.createElement(_Container.default, {
      width: "1024"
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "General Information",
      description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Field.default, {
        id: "name",
        label: "Name",
        name: "name",
        placeholder: "Name",
        value: (0, _lo.get)(classification, 'name'),
        onChange: this.handleChange,
        pattern: ".{3,60}",
        title: "3 to 60 characters",
        required: true
      }), _react.default.createElement(_Field.default, {
        id: "uri",
        name: "uri",
        label: "Class URI",
        placeholder: "Classification URI",
        pattern: ".{3,50}",
        required: true,
        value: (0, _lo.get)(classification, 'uri') || '',
        onChange: this.handleChange
      }), _react.default.createElement(_UserAutocomplete.default, {
        name: "dataOwner",
        label: "Data Owner",
        value: (0, _lo.get)(classification, 'dataOwner'),
        onChange: this.handleChange,
        required: true,
        disabled: !canEdit,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      }), _react.default.createElement(CheckboxContainer, null, _react.default.createElement(_CheckBox.default, {
        label: "Active",
        name: "active",
        checked: (0, _lo.get)(classification, 'active'),
        onChange: this.handleChange
      }), "\xA0\xA0", _react.default.createElement(_CheckBox.default, {
        id: "abstract",
        name: "abstract",
        label: "Abstract",
        placeholder: "Abstract",
        checked: (0, _lo.get)(classification, 'abstract'),
        onChange: this.handleChange
      })))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Classification Details",
      description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Select.default, {
        label: "Applies to",
        name: "applicableOn",
        value: (0, _lo.get)(classification, 'applicableOn') || [],
        onChange: this.handleChange,
        options: [{
          value: 'thing',
          label: 'Thing'
        }, {
          value: 'organisation',
          label: 'Organisation'
        }, {
          value: 'person',
          label: 'Person'
        }, {
          value: 'custom',
          label: 'Custom Entity'
        }, {
          value: 'group',
          label: 'Group'
        }, {
          value: 'relationship',
          label: 'Relationship'
        }],
        multiple: true
      }), _react.default.createElement(_ClassificationsDropdownDeprecated.default, {
        label: "Inherited from",
        name: "parents",
        valueProperty: "uri",
        value: classification.parents,
        onChange: this.handleChange,
        multiple: true,
        filterBy: [{
          field: 'id',
          op: '<>',
          value: classification.id
        }]
      }))
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Symbolisation Section",
      description: _react.default.createElement(_ColorPicker.default, {
        label: "Color",
        name: "color",
        value: (0, _lo.get)(classification, 'color'),
        onChange: this.handleChange
      })
    })))), canEdit && _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_TextIcon.default, {
      label: "Save",
      icon: "content-save",
      color: "primary",
      type: "submit",
      form: "form"
    })));
  }

}

_defineProperty(ClassificationDetailAbout, "propTypes", {
  classification: _propTypes.default.object,
  updateClassification: _propTypes.default.func,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(null, {
  showToastr: _appActions.showToastr
})(ClassificationDetailAbout);

exports.default = _default;