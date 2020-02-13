"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _common = require("app/utils/propTypes/common");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _lo = require("app/utils/lo/lo");

var _appActions = require("store/actions/app/appActions");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 */
class OpenEntity extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "fetchEntitiyType", () => {
      const entityId = String((0, _lo.get)(this.props, 'match.params.id'));
      this.props.getEntityType(entityId).then(response => {
        const type = (0, _lo.get)(response, 'entity.type');

        if (!(response instanceof Error)) {
          if ((0, _utils.isDefined)(type)) {
            this.setState({
              entityType: String(type),
              isLoading: false
            });
          } else {
            this.setState({
              entityType: null,
              isLoading: false
            });
            this.props.showToastr({
              severity: 'warn',
              detail: 'Invalid Entity Id'
            });
          }
        }
      });
    });

    this.state = {
      isLoading: true,
      entityType: null
    };
  }

  componentDidMount() {
    const entityId = String((0, _lo.get)(this.props, 'match.params.id'));

    if (entityId && this.props.getEntityType) {
      this.fetchEntitiyType();
    }
  }

  componentDidUpdate(prevProps) {
    const entityId = String((0, _lo.get)(this.props, 'match.params.id'));
    const prevId = String((0, _lo.get)(prevProps, 'match.params.id'));

    if (entityId !== prevId) {
      this.fetchEntitiyType();
    }
  }
  /**
   * render - description
   *
   * @return {type}  description
   */


  render() {
    const {
      entityType,
      isLoading
    } = this.state;
    const entityId = String((0, _lo.get)(this.props, 'match.params.id'));
    if (isLoading) return _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    });

    if (entityType && entityId) {
      const linkTo = {
        thing: `/things/${entityId}`,
        person: `/people/${entityId}`,
        organisation: `/organisations/${entityId}`,
        custom: `/custom-entities/${entityId}`
      }[entityType];
      if (linkTo) return _react.default.createElement(_reactRouterDom.Redirect, {
        to: linkTo
      });
    }

    return _react.default.createElement(_PageNotAllowed.default, {
      title: `Entity (ID:${entityId})`
    });
  }

}

_defineProperty(OpenEntity, "propTypes", {
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string
  }),
  getEntityType: _propTypes.default.func.isRequired,
  showToastr: _propTypes.default.func.isRequired
});

var _default = (0, _reactRedux.connect)(null, {
  showToastr: _appActions.showToastr,
  getEntityType: _entitiesActions.getEntityType
})(OpenEntity);

exports.default = _default;