"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _platformUi = require("@mic3/platform-ui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _polished = require("polished");

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _ListGroup = _interopRequireDefault(require("app/components/molecules/List/ListGroup"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _taskActions = require("store/actions/abox/taskActions");

var _processActions = require("store/actions/abox/processActions");

var _AddTeamMemberModal = _interopRequireDefault(require("app/containers/AddTeamMemberModal/AddTeamMemberModal"));

var _ResponsiveActions = _interopRequireDefault(require("app/components/molecules/ResponsiveActions/ResponsiveActions"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _ItemColumn = _interopRequireDefault(require("app/components/molecules/List/ItemColumn"));

var _ItemRow = _interopRequireDefault(require("app/components/molecules/List/ItemRow"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _GroupedAvatar = _interopRequireDefault(require("app/components/molecules/Avatar/GroupedAvatar"));

var _ListItemBase = _interopRequireDefault(require("app/components/molecules/List/ListItemBase"));

var _hooks = require("app/utils/hook/hooks");

var _date = require("app/utils/date/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ChangesRow = (0, _styledComponents.default)(_ItemColumn.default).withConfig({
  displayName: "AboxTeam__ChangesRow",
  componentId: "sc-1ig6oik-0"
})(["background:", ";"], ({
  theme
}) => (0, _polished.darken)(0.05, theme.widget.background));
const SearchField = (0, _styledComponents.default)(_platformUi.TextField).withConfig({
  displayName: "AboxTeam__SearchField",
  componentId: "sc-1ig6oik-1"
})(["padding:8px 16px !important;background:", ";"], ({
  theme
}) => theme.filters.toolbarBackground);
const ListItemExpandable = (0, _styledComponents.default)(_ListItemBase.default).withConfig({
  displayName: "AboxTeam__ListItemExpandable",
  componentId: "sc-1ig6oik-2"
})(["word-break:break-all;a{color:", ";}"], ({
  theme
}) => theme.base.textColor);

const AboxTeamGroupItem = ({
  group,
  endDate,
  type,
  removeTeamMember,
  id,
  createdDate
}) => {
  const [open, toggle] = (0, _hooks.useToggle)();
  const users = (0, _lo.get)(group, 'users') || [];
  const onDelete = (0, _react.useCallback)(() => removeTeamMember(group || {}, 'groups'), [group, removeTeamMember]);
  const usersList = (0, _react.useMemo)(() => users.filter(user => user.active).map((user, index) => _react.default.createElement(AboxTeamListItem, {
    user,
    endDate,
    canRemove: false,
    key: index
  })), [endDate, users]);
  return !!group && _react.default.createElement(ListItemExpandable, {
    raised: true,
    small: true
  }, _react.default.createElement(_ItemRow.default, null, _react.default.createElement(_ItemColumn.default, {
    shrink: true
  }, _react.default.createElement(_GroupedAvatar.default, {
    width: 40,
    height: 40,
    people: users,
    name: group.name
  })), _react.default.createElement(_ItemColumn.default, {
    grow: true,
    wrap: true
  }, _react.default.createElement("b", null, group.name), _react.default.createElement("div", null, group.id, createdDate ? ` - ${(0, _date.fromNow)(createdDate)}` : '')), _react.default.createElement(_ItemColumn.default, null, type === 'participant' && _react.default.createElement(_Icon.default, {
    name: "delete",
    onClick: onDelete
  }), _react.default.createElement(_ButtonIcon.default, {
    icon: "menu-down",
    onClick: toggle
  }))), open && _react.default.createElement(ChangesRow, null, usersList));
};

const AboxTeamListItem = ({
  user,
  endDate,
  canRemove,
  removeTeamMember,
  id,
  createdDate
}) => {
  const onDelete = (0, _react.useCallback)(() => removeTeamMember(user, 'users'), [removeTeamMember, user]);
  return _react.default.createElement(_ListItem.default, {
    component: _react.default.createElement(_Avatar.default, {
      src: (0, _lo.get)(user, 'image'),
      name: (0, _lo.get)(user, 'name'),
      size: "lg"
    }),
    title: _react.default.createElement(_PeopleLink.default, {
      id: (0, _lo.get)(user, 'id')
    }, (0, _lo.get)(user, 'name')),
    subTitle: `@${(0, _utils.getStr)(user, 'login') || ''}${createdDate ? ` - ${(0, _date.fromNow)(createdDate)}` : ''}`,
    actions: _react.default.createElement(_react.Fragment, null, !endDate && canRemove && _react.default.createElement(_ResponsiveActions.default, {
      actions: _react.default.createElement(_Icon.default, {
        name: "delete",
        onClick: onDelete
      })
    })),
    raised: true
  });
};

const isIncludes = (str, searchValue) => str.toLowerCase().includes(searchValue.toLowerCase());
/**
 * Renders the view to display the classification.
 */


class AboxTeam extends _react.PureComponent {
  /**
   * Set our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "listRef", _react.default.createRef());

    _defineProperty(this, "toggleAddUser", () => {
      this.setState({
        isAddTeamOpen: !this.state.isAddTeamOpen
      });
    });

    _defineProperty(this, "addTeamMembers", ({
      team: members,
      groups
    }) => {
      const {
        details: {
          id
        },
        type,
        addTeamMemberToTask,
        addTeamMemberToProcess
      } = this.props;
      const addTeamMember = type === 'task' ? addTeamMemberToTask : addTeamMemberToProcess;
      const userPromises = members.map(user => addTeamMember(id, 'users', user.id));
      const groupPromises = groups.map(group => addTeamMember(id, 'groups', group.id));
      Promise.all(userPromises).then(() => Promise.all(groupPromises)).then(() => this.props.reloadDetails(id)).finally(() => this.setState({
        isAddTeamOpen: false
      }));
    });

    _defineProperty(this, "removeTeamMember", (member, family) => {
      const {
        onDelete,
        details: {
          id
        },
        type,
        removeTeamMemberFromTask,
        removeTeamMemberFromProcess
      } = this.props;
      const removeTeamMember = type === 'task' ? removeTeamMemberFromTask : removeTeamMemberFromProcess;

      if (!member.id) {
        throw new Error('The team member is not associated to any user.');
      }

      if (onDelete) {
        onDelete(member);
      }

      removeTeamMember(id, family, member.id).then(() => this.props.reloadDetails(id));
    });

    _defineProperty(this, "buildList", (members, endDate, canRemove) => {
      members = (0, _lo.sortBy)(members, 'user.name', {
        caseInsensitive: true
      });
      return (members || []).map((member, index) => !(0, _lo.get)(member, 'group') ? _react.default.createElement(AboxTeamListItem, {
        key: index,
        user: (0, _lo.get)(member, 'user'),
        createdDate: (0, _lo.get)(member, 'createdDate'),
        id: (0, _lo.get)(member, 'id'),
        removeTeamMember: this.removeTeamMember,
        endDate: endDate,
        canRemove: canRemove
      }) : _react.default.createElement(AboxTeamGroupItem, {
        key: index,
        group: (0, _lo.get)(member, 'group'),
        createdDate: (0, _lo.get)(member, 'createdDate'),
        type: (0, _lo.get)(member, 'type'),
        id: (0, _lo.get)(member, 'id'),
        endDate: endDate,
        removeTeamMember: this.removeTeamMember
      }));
    });

    _defineProperty(this, "buildUserFilterBy", (0, _memoizeOne.default)((owner, assignee, teamMembers) => {
      const filterBy = [];
      if (owner) filterBy.push({
        field: 'id',
        op: '<>',
        value: owner.id
      });
      if (assignee) filterBy.push({
        field: 'id',
        op: '<>',
        value: assignee.id
      });

      if (teamMembers && teamMembers.length) {
        filterBy.push(...teamMembers.filter(member => member && member.user && member.user.id).map(({
          user: {
            id
          }
        }) => ({
          field: 'id',
          op: '<>',
          value: id
        })));
      }

      filterBy.push({
        field: 'active',
        op: '=',
        value: true
      });
      return filterBy;
    }));

    _defineProperty(this, "buildGroupFilterBy", (0, _memoizeOne.default)(teamMembers => {
      const filterBy = [];

      if (teamMembers && teamMembers.length) {
        filterBy.push(...teamMembers.filter(member => member && member.group && member.group.id).map(({
          group: {
            id
          }
        }) => ({
          field: 'id',
          op: '<>',
          value: id
        })));
      }

      return filterBy;
    }));

    _defineProperty(this, "_normalizeTeamMembers", (list, assignee, owner, searchValue, type) => (list || []).filter(item => {
      const isUser = (0, _lo.get)(item, 'user.id') && (0, _lo.get)(item, 'user.id') !== (0, _lo.get)(owner, 'id') && (0, _lo.get)(item, 'user.id') !== (0, _lo.get)(assignee, 'id');
      const isGroup = (0, _lo.get)(item, 'group.id');
      let isSearchable = true;

      if (isUser && searchValue) {
        isSearchable = isIncludes(`${(0, _utils.getStr)(item, 'user.name') || ''} ${(0, _utils.getStr)(item, 'user.login') || ''}`, searchValue);
      }

      if (isGroup && searchValue) {
        isSearchable = isIncludes((0, _utils.getStr)(item, 'group.name') || '', searchValue);
        (0, _lo.get)(item, 'group.users') || [].forEach(u => {
          if (isSearchable) {
            isSearchable = isIncludes(`${(0, _utils.getStr)(u, 'name') || ''} ${(0, _utils.getStr)(u, 'login') || ''}`, searchValue);
          }
        });
      }

      return item.type === type && (isUser || isGroup) && isSearchable;
    }));

    _defineProperty(this, "normalizeTeamMembers", (0, _memoizeOne.default)((list, assignee, owner, searchValue) => {
      const participants = this._normalizeTeamMembers(list, assignee, owner, searchValue, 'participant');

      const candidates = this._normalizeTeamMembers(list, assignee, owner, searchValue, 'candidate');

      return {
        participants,
        candidates
      };
    }));

    _defineProperty(this, "onSearch", event => {
      this.setState({
        searchValue: event.target.value
      });
    });

    this.state = (0, _Immutable.default)({
      isAddTeamOpen: false,
      serachValue: ''
    });
  }

  /**
   * @override
   */
  render() {
    const {
      reloadDetails,
      type,
      details,
      addTeamMembersTaskLoading,
      addTeamMembersProcessLoading
    } = this.props;
    const {
      searchValue
    } = this.state;
    const {
      id,
      teamMembers,
      assignee,
      endDate,
      createdBy
    } = details || {};
    const owner = type === 'task' ? (0, _lo.get)(this.props.details, 'owner') : createdBy;
    const {
      participants,
      candidates
    } = this.normalizeTeamMembers(teamMembers, assignee, owner, searchValue);
    const canAdd = !endDate && !!reloadDetails;
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(SearchField, {
      fullWidth: true,
      variant: "standard",
      margin: "none",
      placeholder: "Search...",
      InputProps: {
        disableUnderline: true
      },
      value: searchValue,
      onChange: this.onSearch
    }), _react.default.createElement(_Container.default, {
      width: "1024",
      style: {
        height: '100%'
      }
    }, owner && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ListGroup.default, {
      name: "Owner"
    }), _react.default.createElement(_List.default, null, _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_Avatar.default, {
        src: owner.image,
        name: owner.name,
        size: "lg",
        status: "busy"
      }),
      title: _react.default.createElement(_PeopleLink.default, {
        id: owner.id
      }, owner.name),
      subTitle: `@${owner.login}`,
      raised: true
    }))), assignee && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ListGroup.default, {
      name: "Assignee"
    }), _react.default.createElement(_List.default, null, _react.default.createElement(_ListItem.default, {
      component: _react.default.createElement(_Avatar.default, {
        src: assignee.image,
        name: assignee.name,
        size: "lg",
        status: "busy"
      }),
      title: _react.default.createElement(_PeopleLink.default, {
        id: assignee.id
      }, assignee.name),
      subTitle: `@${assignee.login}`,
      raised: true
    }))), _react.default.createElement(_ListGroup.default, {
      name: "Team members",
      actions: canAdd && _react.default.createElement(_platformUi.Button, {
        variant: "text",
        onClick: this.toggleAddUser
      }, "Add")
    }), participants.length > 0 ? this.buildList(participants, endDate, !!reloadDetails) : _react.default.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, "No Team Members"), candidates.length > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ListGroup.default, {
      name: "Candidate users"
    }), this.buildList(candidates, endDate, false))), !endDate && _react.default.createElement(_AddTeamMemberModal.default, {
      id: id,
      type: type,
      userFilterBy: this.buildUserFilterBy(owner, assignee, teamMembers),
      groupFilterBy: this.buildGroupFilterBy(teamMembers),
      open: this.state.isAddTeamOpen,
      onToggle: this.toggleAddUser,
      onChange: this.addTeamMembers,
      loading: addTeamMembersTaskLoading || addTeamMembersProcessLoading
    }));
  }

}

_defineProperty(AboxTeam, "propTypes", {
  type: _propTypes.default.string,
  isLoading: _propTypes.default.bool,
  addTeamMembersTaskLoading: _propTypes.default.bool,
  addTeamMembersProcessLoading: _propTypes.default.bool,
  details: _propTypes.default.object,
  addTeamMember: _propTypes.default.func,
  reloadDetails: _propTypes.default.func,
  deleteTeamMember: _propTypes.default.func,
  onDelete: _propTypes.default.func
});

var _default = (0, _reactRedux.connect)(state => ({
  addTeamMembersTaskLoading: state.abox.task.addTeamMembers.isLoading,
  addTeamMembersProcessLoading: state.abox.process.addTeamMembers.isLoading
}), {
  addTeamMemberToTask: _taskActions.addTeamMember,
  removeTeamMemberFromTask: _taskActions.removeTeamMember,
  addTeamMemberToProcess: _processActions.addTeamMember,
  removeTeamMemberFromProcess: _processActions.removeTeamMember
})(AboxTeam);

exports.default = _default;