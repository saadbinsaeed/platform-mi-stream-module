"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _RelationshipsTab = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipsTab"));

var _dataTableIds = require("app/config/dataTableIds");

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
* Renders the relationships of a Custom Enitity.
 */
class CustomEntityRelationship extends _react.PureComponent {
  /**
   * @override
   */
  render() {
    const id = this.props.match.params.id;
    const section = this.props.match.url.match(/([^/]*)\/*$/)[1];
    return _react.default.createElement(_RelationshipsTab.default, {
      entityId: id,
      entityType: 'custom',
      section: section,
      gridIdPrefix: _dataTableIds.CUSTOM_ENTITIES_RELATIONSHIPS_DATA_TABLE,
      toggleMenu: this.props.toggleMenu
    });
  }

}

_defineProperty(CustomEntityRelationship, "propTypes", {
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  }),
  toggleMenu: _propTypes.default.func
});

var _default = CustomEntityRelationship;
exports.default = _default;