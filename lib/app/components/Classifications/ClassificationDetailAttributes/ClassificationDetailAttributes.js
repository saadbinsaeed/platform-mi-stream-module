"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassificationDetailAttributes = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AttributeDetailModal = _interopRequireDefault(require("app/containers/Classifications/AttributeDetailModal/AttributeDetailModal"));

var _transformer = require("app/utils/trasformer/transformer");

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _DragDropApp = _interopRequireDefault(require("./dragdrop/DragDropApp"));

require("./ClassificationDetailAttributes.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * General tab in classifications view.
 * Todo: We probably should extract the form in it's own component, however
 * nearly the only code here is form related.
 */
class ClassificationDetailAttributesComponent extends _react.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "setClassificationState", data => {
      this.setState({
        classificationForm: data.classification || null
      });
    });

    _defineProperty(this, "removeAttribute", uri => {
      let fields = this.props.classification.formDefinitions.fields;
      fields = fields.filter(field => {
        return field.f_uri !== uri;
      });
      this.setState({
        classificationForm: (0, _Immutable.set)(this.state.classificationForm, 'formDefinitions.fields', fields)
      }, () => {
        const {
          id,
          formDefinitions
        } = this.state.classificationForm || {};
        this.props.updateClassification({
          id,
          formDefinitions
        });
      });
    });

    _defineProperty(this, "updateOrder", fields => {
      const myArray = []; // Changing the order number

      Object.keys(fields).map(key => {
        myArray.push(fields[key].map((item, i) => Object.assign(Object.assign({}, item), {
          order_no: i.toString()
        }))); // handling immutable data

        return null;
      }); //Converting it to single array

      const allFieldsUpdated = [];
      myArray.forEach(arr => {
        arr.forEach(item => {
          allFieldsUpdated.push(item);
        });
      });
      const setForm = (0, _Immutable.set)(this.state, 'classificationForm.formDefinitions.fields', (0, _Immutable.default)(allFieldsUpdated));
      this.setState(setForm);
      const classificationForm = (0, _lo.get)(setForm, 'classificationForm');
      const {
        id,
        formDefinitions
      } = classificationForm || {};
      this.props.updateClassification({
        id,
        formDefinitions
      });
    });

    this.state = {
      classificationForm: props.classification || {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.removeAttribute = this.removeAttribute.bind(this);
  }
  /**
   * @override
   */


  componentDidUpdate(prevProps) {
    if (prevProps.classification !== this.props.classification) {
      this.setClassificationState(this.props);
    }
  }

  /**
   * Handle a form change
   * @param event
   */
  handleChange(event) {
    const {
      name,
      value
    } = event.target; // Set a nested state based on input name

    this.setState({
      classificationForm: (0, _Immutable.set)(this.state.classificationForm, name, value)
    });
  }
  /**
   * Remove Attribute
   * @param uri
   */


  /**
   * Lifecycle hook.
   * @returns {XML}
   */
  render() {
    const {
      classification,
      match
    } = this.props;
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('entity.classification.edit');
    const classificationFormFields = (0, _transformer.safeToJsArray)((0, _lo.get)(this.state, 'classificationForm.formDefinitions.fields'));
    const groupedFields = (0, _lo.groupBy)(classificationFormFields, 'group_name');
    const sortedFields = (0, _lo.map)(groupedFields, fields => (0, _lo.sortBy)(fields, field => Number(field.order_no)));
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Container.default, {
      width: "1024"
    }, sortedFields.length > 0 && _react.default.createElement(_DragDropApp.default, {
      classId: classification.id,
      fields: sortedFields,
      removeListItem: this.removeAttribute,
      handleChange: this.updateOrder,
      canEdit: canEdit
    }), canEdit && _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:attributeFieldUri`,
      exact: true,
      render: () => _react.default.createElement(_AttributeDetailModal.default, {
        classification: this.props.classification,
        updateClassification: this.props.updateClassification
      })
    }))), canEdit && _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_TextIcon.default, {
      label: "Add",
      icon: "plus",
      color: "primary",
      onClick: this.props.addAttribute
    })));
  }
  /**
   * Update order of items after each sort event.
   * @param fields
   */


}

_defineProperty(ClassificationDetailAttributesComponent, "propTypes", {
  classification: _propTypes.default.object,
  updateClassification: _propTypes.default.func,
  addAttribute: _propTypes.default.func,
  match: _propTypes.default.object,
  userProfile: _propTypes.default.object
});

const ClassificationDetailAttributes = (0, _reactRouterDom.withRouter)(ClassificationDetailAttributesComponent);
exports.ClassificationDetailAttributes = ClassificationDetailAttributes;