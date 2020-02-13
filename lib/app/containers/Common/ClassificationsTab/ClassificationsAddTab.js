"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _SelectClassesGrid = _interopRequireDefault(require("app/containers/Common/SelectionGrids/SelectClassesGrid"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _common = require("app/utils/propTypes/common");

var _History = _interopRequireDefault(require("store/History"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _dataTableIds = require("app/config/dataTableIds");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the view to add classes to thing.
 */
let ClassificationsAddTab = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class ClassificationsAddTab extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      selectedRows: [],
      selectedRowsCount: 0,
      selectedUri: '',
      lastKey: Date.now()
    });

    _defineProperty(this, "redirectBack", () => {
      const entityId = this.props.match.params.id;

      if (!entityId) {
        return null;
      }

      const {
        type
      } = this.props;
      const url = {
        // in any case user will be redirected back to classification tab if cancel button is clicked https://gitlab.mi-c3.com/affectli-project/affectli-support-issues/issues/6577
        thing: `/things/${entityId}/classifications`,
        person: `/people/${entityId}/classifications`,
        organisation: `/organisations/${entityId}/classifications`,
        custom: `/custom-entities/${entityId}/classifications`
      }[type];
      url && _History.default.push(url);
    });

    _defineProperty(this, "addClasses", event => {
      event.preventDefault();
      const {
        selectedUri
      } = this.state;

      if (!selectedUri) {
        return;
      }

      const id = this.props.match.params.id;
      const uris = Array.isArray(selectedUri) ? selectedUri : [selectedUri];
      this.props.addEntityClasses(id, uris).then(() => {
        this.setState({
          lastKey: Date.now()
        }, () => this.redirectBack());
      });
    });

    _defineProperty(this, "onSelectionChange", selectedRows => {
      const selectedUri = (Array.isArray(selectedRows) ? selectedRows : [selectedRows]).map(({
        uri
      }) => uri);
      this.setState({
        selectedUri,
        selectedRowsCount: selectedUri.length
      });
    });
  }

  buildCustomWhere(id, type, isAdmin) {
    const customWhere = [{
      field: 'applicableOn',
      op: '=',
      value: type
    }, {
      field: 'abstract',
      op: '<>',
      value: true
    }];

    if (!isAdmin) {
      customWhere.push({
        field: 'active',
        op: '=',
        value: true
      });
    }

    return customWhere;
  }

  buildExcludeBy(id) {
    return [{
      field: 'entities.id',
      op: '=',
      value: id
    }];
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      type,
      userProfile: {
        isAdmin
      }
    } = this.props;
    const {
      selectedUri,
      selectedRowsCount,
      lastKey
    } = this.state;
    const customWhere = this.buildCustomWhere(this.props.match.params.id, type, isAdmin);
    const excludeBy = this.buildExcludeBy(this.props.match.params.id);
    const customColumnDefinitions = [];

    if (isAdmin) {
      customColumnDefinitions.push({
        header: 'Active',
        field: 'active',
        sortable: false,
        bodyComponent: _BooleanRenderer.default,
        renderValue: ({
          value
        }) => value ? 'Active' : 'Inactive',
        type: 'boolean',
        options: [{
          label: 'All',
          value: ''
        }, {
          label: 'Active',
          value: true
        }, {
          label: 'Inactive',
          value: false
        }],
        style: {
          width: '100px',
          textAlign: 'center'
        }
      });
    }

    return _react.default.createElement(_PageTemplate.default, {
      title: "Add Classification"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_SelectClassesGrid.default, {
      key: lastKey,
      dataTableId: `${_dataTableIds.ADD_CLASSIFICATIONS_DATA_TABLE}/${type}`,
      onSelectionChange: this.onSelectionChange,
      match: this.props.match.params.id,
      selectedRows: this.state.selectedRows,
      customWhere: customWhere,
      excludeBy: excludeBy,
      customColumnDefinitions: customColumnDefinitions
    })), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      disabled: !selectedUri || !selectedUri.length || isLoading,
      loading: false,
      type: "submit",
      color: "primary",
      onClick: this.addClasses
    }, "Add Class"), _react.default.createElement(_Text.default, null, " ", selectedUri && selectedUri.length ? `${selectedRowsCount} class selected.` : '', " ")), _react.default.createElement(_Button.default, {
      type: "button",
      onClick: this.redirectBack
    }, "Cancel")));
  }

}, _defineProperty(_class2, "propTypes", {
  type: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom']).isRequired,
  addEntityClasses: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  })
}), _defineProperty(_class2, "defaultProps", {
  isLoading: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "buildCustomWhere", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildCustomWhere"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildExcludeBy", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "buildExcludeBy"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => {
  const isLoading1 = state.entities.commonClassifications.classifications.add;
  const isLoading2 = state.classifications.list.isLoading;
  return {
    isLoading: isLoading1 || isLoading2,
    userProfile: state.user.profile
  };
}, {
  addEntityClasses: _entitiesActions.addEntityClasses
})((0, _reactRouter.withRouter)(ClassificationsAddTab));

exports.default = _default;