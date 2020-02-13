"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _Column = require("primereact/components/column/Column");

var _TreeTable = _interopRequireDefault(require("app/components/molecules/TreeTable/TreeTable"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _groupsActions = require("store/actions/admin/groupsActions");

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Container that is used to display the Group and Permission tab details view.
 */
class GroupPermisionsTab extends _react.PureComponent {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "nodesMap", {});

    _defineProperty(this, "onDataAvailable", null);

    _defineProperty(this, "onDataAvailableResolve", data => {});

    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDataAvailable = new Promise((resolve, reject) => {
      this.onDataAvailableResolve = resolve;
    }).then(({
      group,
      availablePermissions
    }) => {
      const tableData = this.buildPermissionForest(availablePermissions);
      let selection = [];

      if (group && group.permissions) {
        selection = group.permissions.map(permission => ({
          id: permission
        }));
        /*
         * set the partial selected flag
         */

        const selectionSet = new Set(group.permissions);
        Object.values(this.nodesMap).forEach(node => {
          if (!selectionSet.has(node.id)) {
            return;
          }

          let parent = this.nodesMap[node.data.parent];

          while (parent && !selectionSet.has(parent.id) && !parent.partialSelected) {
            parent.partialSelected = true;
            parent = this.nodesMap[parent.data.parent];
          }
        });
      }

      this.setState({
        tableData,
        selection
      });
    });
    const {
      group,
      availablePermissions
    } = this.props;

    if (group !== null && availablePermissions.length > 0) {
      this.onDataAvailableResolve({
        group,
        availablePermissions
      });
    }

    this.state = {
      tableData: [],
      selection: null
    };
  }
  /**
   * @override
   */


  componentDidMount() {
    this.props.loadAvailablePermissions();
  }
  /**
   * next props
   */


  componentWillReceiveProps({
    group,
    availablePermissions
  }) {
    if (group !== null && availablePermissions.length > 0) {
      this.onDataAvailableResolve({
        group,
        availablePermissions
      });
    }
  }
  /**
   * on selection change
   */


  onSelectionChange({
    originalEvent,
    selection
  }) {
    this.setState({
      selection
    });
  }
  /**
   * data formated for treetable
   */


  buildPermissionForest(availablePermissions) {
    const nodes = availablePermissions.map(({
      name,
      displayName,
      description,
      parent
    } = {}) => ({
      id: name,
      data: {
        name,
        displayName,
        description,
        parent: parent && parent.name
      },
      leaf: true
    }));
    this.nodesMap = {};
    nodes.forEach(node => this.nodesMap[node.data.name] = node); // eslint-disable-line no-return-assign

    nodes.forEach(node => {
      if (node.data.parent) {
        const parent = this.nodesMap[node.data.parent];

        if (!parent) {
          // eslint-disable-next-line no-console
          console.log(`wrong data: parent "${parent}" not found.`);
          return;
        }

        parent.leaf = false;

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    });
    return nodes.filter(node => !node.data.parent);
  }
  /**
   * Save the group general info.
   *
   * @param event SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */


  onFormSubmit(event) {
    event.preventDefault();
    const {
      group
    } = this.props;
    const {
      selection
    } = this.state;
    this.props.updateGroupPermissions({
      id: group.id,
      permissions: selection && selection.map(item => item.id)
    });
  }
  /**
   * @override
   */


  render() {
    const group = this.props.group || {};
    const {
      tableData,
      selection
    } = this.state;
    const permissions = this.props.userProfile.permissions;
    const isAdmin = this.props.userProfile.isAdmin;
    const permissionsSet = new Set(permissions || []);
    const canEdit = isAdmin || permissionsSet.has('admin.group.edit');
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_TreeTable.default, {
      value: tableData,
      selectionMode: group.id !== 1 && 'checkbox',
      selection: selection,
      selectionChange: this.onSelectionChange
    }, _react.default.createElement(_Column.Column, {
      field: "displayName",
      header: "Permission"
    }), _react.default.createElement(_Column.Column, {
      field: "description",
      header: "Description"
    }), _react.default.createElement(_Column.Column, {
      field: "name",
      header: "Path"
    }))), _react.default.createElement(_FooterBar.default, null, _react.default.createElement("div", null, group.id !== 1 && canEdit && _react.default.createElement(_TextIcon.default, {
      icon: "content-save",
      label: "Save",
      onClick: this.onFormSubmit,
      color: "primary"
    }))));
  }

}

_defineProperty(GroupPermisionsTab, "propTypes", {
  loadAvailablePermissions: _propTypes.default.func.isRequired,
  updateGroupPermissions: _propTypes.default.func.isRequired,
  availablePermissions: _propTypes.default.array.isRequired,
  group: _propTypes.default.object,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(state => ({
  availablePermissions: state.admin.groups.group.availablePermissions,
  group: state.admin.groups.group.details,
  userProfile: state.user.profile
}), {
  loadAvailablePermissions: _groupsActions.loadAvailablePermissions,
  updateGroupPermissions: _groupsActions.updateGroupPermissions
})(GroupPermisionsTab));

exports.default = _default;