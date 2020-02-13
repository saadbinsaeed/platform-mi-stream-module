"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactDeviceDetect = require("react-device-detect");

var _GroupEntitiesGrid = _interopRequireDefault(require("app/containers/Admin/GroupsAndPermissions/Details/Tabs/GroupEntitiesTab/GroupEntitiesGrid"));

var _common = require("app/utils/propTypes/common");

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _Menu = _interopRequireDefault(require("app/components/molecules/Menu/Menu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _lo = require("app/utils/lo/lo");

var _History = _interopRequireDefault(require("store/History"));

var _GroupTabEdit = _interopRequireDefault(require("app/containers/Admin/GroupsAndPermissions/Details/GroupTabEdit"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Container that is used to display the Entities tab of the Groups & Permissions details view.
 */
let GroupEntitiesTab = (_class = (_temp = _class2 = class GroupEntitiesTab extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "canEdit", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "goTo", type => e => {
      e.preventDefault();

      _History.default.push(`/groups/${this.id}/entities/${type}/add`);
    });

    this.state = {
      menuToggled: false,
      visible: false
    };
    const {
      group,
      match
    } = this.props;
    this.id = String((0, _lo.get)(match, 'params.id'));
    const {
      permissions,
      isAdmin
    } = props.userProfile;
    const permissionsSet = new Set(permissions || []);
    this.canEdit = group && group.id !== 1 && (isAdmin || permissionsSet.has('admin.group.edit'));
  }

  toggleMenu() {
    this.setState(prevState => ({
      menuToggled: !prevState.menuToggled
    }));
  }

  showDialog() {
    this.setState({
      visible: true
    });
  }

  closeDialog() {
    this.setState({
      visible: false
    });
  }

  /**
   * @override
   */
  render() {
    const groupId = this.props.match.params.id;
    const entityType = this.props.match.params.type;
    const {
      selectedEntities = []
    } = this.props;
    let organisationAction = null,
        thingAction = null,
        peopleAction = null,
        processDefAction = null,
        customEntityAction = null;

    if (this.canEdit) {
      organisationAction = _react.default.createElement(_ButtonIcon.default, {
        icon: "plus",
        onClick: this.goTo('organisation')
      });
      customEntityAction = _react.default.createElement(_ButtonIcon.default, {
        icon: "plus",
        onClick: this.goTo('custom')
      });
      thingAction = _react.default.createElement(_ButtonIcon.default, {
        icon: "plus",
        onClick: this.goTo('thing')
      });
      peopleAction = _react.default.createElement(_ButtonIcon.default, {
        icon: "plus",
        onClick: this.goTo('person')
      });
      processDefAction = _react.default.createElement(_ButtonIcon.default, {
        icon: "plus",
        onClick: this.goTo('proc_def')
      });
    }

    const grid = _react.default.createElement(_GroupEntitiesGrid.default, {
      groupId: groupId,
      entityType: entityType,
      toggleMenu: this.toggleMenu,
      showMenuButton: this.canEdit
    });

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Layout.default, {
      isToggled: this.state.menuToggled,
      leftNavOpen: this.props.leftNavOpen,
      noPadding: true,
      leftSidebar: this.canEdit ? _react.default.createElement(_Menu.default, null, _react.default.createElement(_MenuItem.default, {
        name: "Things",
        to: {
          pathname: `/groups/${this.id}/entities/thing`,
          state: {
            leftNavOpen: true
          }
        },
        className: entityType === 'thing' ? 'active' : '',
        actions: thingAction
      }), _react.default.createElement(_MenuItem.default, {
        name: "People",
        to: {
          pathname: `/groups/${this.id}/entities/person`,
          state: {
            leftNavOpen: true
          }
        },
        className: entityType === 'person' ? 'active' : '',
        actions: peopleAction
      }), _react.default.createElement(_MenuItem.default, {
        name: "Organisations",
        to: {
          pathname: `/groups/${this.id}/entities/organisation`,
          state: {
            leftNavOpen: true
          }
        },
        className: entityType === 'organisation' ? 'active' : '',
        actions: organisationAction
      }), _react.default.createElement(_MenuItem.default, {
        name: "Custom Entities",
        to: {
          pathname: `/groups/${this.id}/entities/custom`,
          state: {
            leftNavOpen: true
          }
        },
        className: entityType === 'custom' ? 'active' : '',
        actions: customEntityAction
      }), _react.default.createElement(_MenuItem.default, {
        name: "Process Definitions",
        to: {
          pathname: `/groups/${this.id}/entities/proc_def`,
          state: {
            leftNavOpen: true
          }
        },
        className: entityType === 'proc_def' ? 'active' : '',
        actions: processDefAction
      })) : null,
      content: grid
    }), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, selectedEntities.length > 0 && this.canEdit && _react.default.createElement(_TextIcon.default, {
      icon: "pencil",
      label: "Edit",
      onClick: this.showDialog,
      count: selectedEntities.length,
      color: "secondary"
    })), _react.default.createElement(_GroupTabEdit.default, {
      groupId: groupId,
      selectedRow: selectedEntities,
      closeDialog: this.closeDialog,
      open: this.state.visible
    })));
  }

}, _defineProperty(_class2, "propTypes", {
  group: _propTypes.default.object,
  selectedEntities: _propTypes.default.array,
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired,
    type: _propTypes.default.string.isRequired
  }),
  userProfile: _propTypes.default.object.isRequired
}), _defineProperty(_class2, "defaultProps", {
  leftNavOpen: !_reactDeviceDetect.isMobile
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "toggleMenu", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleMenu"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showDialog", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "showDialog"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeDialog", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "closeDialog"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  selectedEntities: state.admin.groups.group.selectedEntities,
  group: state.admin.groups.group.details,
  userProfile: state.user.profile
}))(GroupEntitiesTab);

exports.default = _default;