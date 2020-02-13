"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactDeviceDetect = require("react-device-detect");

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Menu = _interopRequireDefault(require("app/components/molecules/Menu/Menu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _RelationshipsGrid = _interopRequireDefault(require("./RelationshipsGrid"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class
 * Container that is used to display the Relationship of an entity
 */
class RelationshipsView extends _react.PureComponent {
  /**
   * @const {Object} propTypes - describes the properties of the Component
   * @const {Object} defaultProps - defines the default values of the properties of the Component
   */

  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleMenu", () => {
      this.setState(prevState => ({
        menuToggled: !prevState.menuToggled
      }));
    });

    this.state = {
      gridChange: 'relationships',
      menuToggled: !_reactDeviceDetect.isMobile
    };
    this.deleteRelationship = this.deleteRelationship.bind(this);
  }

  deleteRelationship(data) {
    this.props.deleteRelationship(data.id);
  }

  render() {
    const {
      section,
      entityId,
      entityType,
      gridIdPrefix,
      canEdit
    } = this.props;
    const baseUri = {
      thing: 'things',
      organisation: 'organisations',
      person: 'people',
      process: 'abox/process',
      task: 'abox/task',
      custom: 'custom-entities'
    }[entityType];
    const availableSections = ['relationships', 'organisations', 'people', 'things', 'custom'];

    if (!entityId || availableSections.indexOf(section) === -1) {
      return null;
    }

    const layoutExt = {
      height: '100%'
    };

    const grid = _react.default.createElement(_RelationshipsGrid.default, {
      dataTableId: `${gridIdPrefix}/${section}`,
      loadMethod: this.props.loadEntityRelationships,
      lastActionType: this.props.lastActionType,
      deleteMethod: this.deleteRelationship,
      isLoading: this.props.isLoading,
      isDownloading: this.props.isDownloading,
      records: this.props.records,
      totalRecords: this.props.totalRecords,
      countMax: this.props.countMax,
      section: section,
      canEdit: canEdit,
      toggleMenu: this.toggleMenu
    });

    let organisationsAction = null,
        peopleActions = null,
        thingsActions = null,
        customActions = null;

    if (canEdit) {
      organisationsAction = _react.default.createElement(_reactRouterDom.Link, {
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/organisations/add`,
          state: {
            modal: true
          }
        }
      }, _react.default.createElement(_Icon.default, {
        name: "plus"
      }));
      peopleActions = _react.default.createElement(_reactRouterDom.Link, {
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/people/add`,
          state: {
            modal: true
          }
        }
      }, _react.default.createElement(_Icon.default, {
        name: "plus"
      }));
      thingsActions = _react.default.createElement(_reactRouterDom.Link, {
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/things/add`,
          state: {
            modal: true
          }
        }
      }, _react.default.createElement(_Icon.default, {
        name: "plus"
      }));
      customActions = _react.default.createElement(_reactRouterDom.Link, {
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/custom/add`,
          state: {
            modal: true
          }
        }
      }, _react.default.createElement(_Icon.default, {
        name: "plus"
      }));
    }

    return _react.default.createElement(_Layout.default, {
      layoutStyle: layoutExt,
      isToggled: this.state.menuToggled,
      leftNavOpen: this.props.leftNavOpen,
      noPadding: true,
      leftSidebar: _react.default.createElement(_Menu.default, null, _react.default.createElement(_MenuItem.default, {
        name: "Things",
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/things`,
          state: {
            leftNavOpen: true
          }
        },
        actions: thingsActions,
        className: section === 'things' ? 'active' : ''
      }), _react.default.createElement(_MenuItem.default, {
        name: "People",
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/people`,
          state: {
            leftNavOpen: true
          }
        },
        actions: peopleActions,
        className: section === 'people' ? 'active' : ''
      }), _react.default.createElement(_MenuItem.default, {
        name: "Organisations",
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/organisations`,
          state: {
            leftNavOpen: true
          }
        },
        actions: organisationsAction,
        className: section === 'organisations' ? 'active' : ''
      }), _react.default.createElement(_MenuItem.default, {
        name: "Custom Entities",
        to: {
          pathname: `/${baseUri}/${entityId}/relationships/custom`,
          state: {
            leftNavOpen: true
          }
        },
        actions: customActions,
        className: section === 'custom' ? 'active' : ''
      })),
      content: grid
    });
  }

}

_defineProperty(RelationshipsView, "propTypes", {
  entityId: _propTypes.default.string.isRequired,
  gridIdPrefix: _propTypes.default.string.isRequired,
  loadEntityRelationships: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  isDownloading: _propTypes.default.bool.isRequired,
  deleteRelationship: _propTypes.default.func,
  records: _propTypes.default.array,
  totalRecords: _propTypes.default.number,
  countMax: _propTypes.default.number,
  canEdit: _propTypes.default.bool,
  section: _propTypes.default.oneOf(['relationships', 'organisations', 'people', 'things', 'children', 'custom']),
  entityType: _propTypes.default.oneOf(['thing', 'organisation', 'person', 'process', 'task', 'custom'])
});

_defineProperty(RelationshipsView, "defaultProps", {
  leftNavOpen: !_reactDeviceDetect.isMobile
});

var _default = RelationshipsView;
exports.default = _default;