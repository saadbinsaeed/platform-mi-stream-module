"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _EntityClassifications = _interopRequireDefault(require("app/components/Entities/Classifications/EntityClassifications"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _utils = require("app/utils/utils");

var _entityAttributesActions = require("store/actions/entities/common/entityAttributesActions");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Dynamically renders classifications
 */
class ClassificationsTab extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "removeClass", id => {
      this.props.removeEntityClass(this.props.match.params.id, id).then(response => {
        if (response instanceof Error === false) {
          this.props.loadEntityClassesAndAttributes(this.props.match.params.id);
        }
      });
    });

    _defineProperty(this, "updateAttributes", event => {
      const {
        name,
        value
      } = event.target;
      const {
        attributes
      } = this.state;
      this.setState({
        attributes: { ...attributes,
          [name]: value
        }
      });
    });

    _defineProperty(this, "saveEntityAttributes", () => {
      if (!(0, _utils.deepEquals)(this.props.attributes, this.state.attributes)) {
        const {
          attributes
        } = this.state;

        if (attributes) {
          this.props.saveEntityAttributes(this.props.match.params.id, attributes);
        }
      }
    });

    const {
      isAdmin,
      type
    } = this.props;
    const permissions = this.props.permissions || [];
    const entityPermissions = this.props.entityPermissions || [];
    this.state = {
      canEdit: isAdmin || permissions.includes(`entity.${type}.edit`) && (entityPermissions.includes('edit') || entityPermissions.includes('write')),
      canViewClasses: isAdmin || permissions.includes('entity.classification.view'),
      attributes: this.props.attributes
    };
  }

  componentDidMount() {
    this.props.loadEntityClassesAndAttributes(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.loadEntityClassesAndAttributes(null);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.loadEntityClassesAndAttributes(this.props.match.params.id);
    }

    if (prevProps.isAdmin !== this.props.isAdmin || !(0, _utils.deepEquals)(prevProps.permissions, this.props.permissions) || !(0, _utils.deepEquals)(prevProps.entityPermissions, this.props.entityPermissions)) {
      const {
        isAdmin,
        type
      } = this.props;
      const permissions = this.props.permissions || [];
      const entityPermissions = this.props.entityPermissions || [];
      this.setState({
        canEdit: isAdmin || permissions.includes(`entity.${type}.edit`) && (entityPermissions.includes('edit') || entityPermissions.includes('write')),
        canViewClasses: isAdmin || permissions.includes('entity.classification.view')
      });
    }

    if (!(0, _utils.deepEquals)(prevProps.attributes, this.props.attributes)) {
      this.setState({
        attributes: this.props.attributes
      });
    }
  }

  render() {
    const {
      isLoading
    } = this.props;

    if (isLoading) {
      return _react.default.createElement(_Loader.default, null);
    }

    const {
      classes
    } = this.props;
    return _react.default.createElement(_EntityClassifications.default, _extends({}, this.state, {
      key: this.props.match.params.id,
      classes: classes,
      removeClass: this.removeClass,
      saveEntityAttributes: this.saveEntityAttributes,
      updateAttribute: this.updateAttributes
    }));
  }

}

_defineProperty(ClassificationsTab, "propTypes", {
  type: _propTypes.default.oneOf(['thing', 'organisation', 'person', 'custom']).isRequired,
  classes: _propTypes.default.array,
  loadEntityClassesAndAttributes: _propTypes.default.func.isRequired,
  removeEntityClass: _propTypes.default.func.isRequired,
  attributes: _propTypes.default.object,
  saveEntityAttributes: _propTypes.default.func.isRequired,
  isAdmin: _propTypes.default.bool,
  permissions: _propTypes.default.array,
  entityPermissions: _propTypes.default.array,
  isLoading: _propTypes.default.bool,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  })
});

_defineProperty(ClassificationsTab, "defaultProps", {
  classes: [],
  attributes: {},
  isAdmin: false,
  permissions: [],
  entityPermissions: [],
  isLoading: true
});

var _default = (0, _reactRedux.connect)(state => {
  const {
    data
  } = state.entities.commonClassifications.classifications;
  const {
    classes = [],
    attributes = {},
    entityPermissions = []
  } = data || {};
  const {
    isAdmin = false,
    permissions = []
  } = state.user.profile;
  const isLoading1 = state.entities.commonClassifications.classifications.isLoading || false;
  const isLoading2 = state.entities.common.removingClass || false;
  return {
    classes,
    isLoading: isLoading1 || isLoading2,
    attributes,
    entityPermissions,
    isAdmin,
    permissions
  };
}, {
  loadEntityClassesAndAttributes: _entityAttributesActions.loadEntityClassesAndAttributes,
  removeEntityClass: _entitiesActions.removeEntityClass,
  saveEntityAttributes: _entityAttributesActions.saveEntityAttributes
})((0, _reactRouterDom.withRouter)(ClassificationsTab));

exports.default = _default;