"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDeviceDetect = require("react-device-detect");

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _RelationshipsGrid = _interopRequireDefault(require("app/components/Entities/Relationships/RelationshipsGrid"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the view to shoe the relationships of an entity.
 */
class RelationshipsTab extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleMenu", () => {
      this.setState(prevState => ({
        menuToggled: !prevState.menuToggled
      }));
    });

    _defineProperty(this, "loadRows", options => {
      const {
        entityId,
        type1,
        type2,
        userProfile: {
          isAdmin
        }
      } = this.props;
      return this.props.fetchEntityRelationships(entityId, type1, type2, options, isAdmin);
    });

    this.state = {
      menuToggled: this.props.leftNavOpen
    };
  }

  /**
   * @override
   */
  render() {
    const {
      baseUri,
      entityId,
      type1,
      type2,
      userProfile: {
        isAdmin
      }
    } = this.props;
    return _react.default.createElement(_RelationshipsGrid.default, {
      type1: type1,
      type2: type2,
      entityId: entityId,
      dataTableId: `${this.props.dataTableId}/${type2}`,
      loadRows: this.loadRows,
      deleteRelationship: this.props.deleteRelationship,
      isLoading: this.props.isLoading,
      isDownloading: this.props.isDownloading,
      records: this.props.records,
      totalRecords: this.props.recordsCount,
      countMax: this.props.countMax,
      canEdit: true,
      isAdmin: isAdmin,
      toggleMenu: this.toggleMenu,
      baseUri: baseUri
    });
  }

}

_defineProperty(RelationshipsTab, "propTypes", {
  dataTableId: _propTypes.default.string.isRequired,
  baseUri: _propTypes.default.string.isRequired,
  entityId: _propTypes.default.string.isRequired,
  type1: _common.allTypesProps.isRequired,
  type2: _common.allTypesProps.isRequired,
  fetchEntityRelationships: _propTypes.default.func.isRequired,
  deleteRelationship: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  leftNavOpen: _propTypes.default.bool,
  userProfile: _propTypes.default.object
});

_defineProperty(RelationshipsTab, "defaultProps", {
  leftNavOpen: !_reactDeviceDetect.isMobile
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.entities.relationships.isLoading,
  isDownloading: state.entities.relationships.isDownloading,
  records: state.entities.relationships.records,
  recordsCount: state.entities.relationships.count,
  recordsCountMax: state.entities.relationships.countMax,
  userProfile: state.user.profile
}), {
  fetchEntityRelationships: _relationshipsActions.fetchEntityRelationships,
  deleteRelationship: _relationshipsActions.deleteRelationship
})(RelationshipsTab);

exports.default = _default;