"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGroupChangelog = exports.loadGroupClassificationDefinition = exports.loadGroupEntities = exports.loadGroupClasses = exports.removeGroupEntity = exports.loadAvailableEntities = exports.addEntitiesToGroup = exports.updatePermissions = exports.removeGroupUser = exports.addUsersToGroup = exports.loadGroupUsers = exports.deleteGroup = exports.updateGroupPermissions = exports.updateGroupDetails = exports.createGroup = exports.loadAvailablePermissions = exports.groupUsersAddList = exports.loadGroup = exports.loadGroups = exports.selectEntities = exports.selectClasses = exports.loadGroupAutocomplete = exports.LOAD_GROUP_CHANGELOG = exports.LOAD_GROUP_CHANGELOG_STARTED = exports.LOAD_GROUP_AUTOCOMPLETE = exports.LOAD_GROUP_AUTOCOMPLETE_STARTED = exports.LOAD_GROUP_CLASSIFICATION_DEFINITION = exports.LOAD_GROUP_CLASSIFICATION_DEFINITION_STARTED = exports.LOAD_GROUP_PROCESS_DEFINITIONS = exports.LOAD_GROUP_PROCESS_DEFINITIONS_STARTED = exports.LOAD_GROUP_CUSTOM = exports.LOAD_GROUP_CUSTOM_STARTED = exports.LOAD_GROUP_ORGANISATION = exports.LOAD_GROUP_ORGANISATION_STARTED = exports.LOAD_GROUP_PEOPLE = exports.LOAD_GROUP_PEOPLE_STARTED = exports.LOAD_GROUP_THINGS = exports.LOAD_GROUP_THINGS_STARTED = exports.LOAD_GROUP_ENTITIES = exports.LOAD_GROUP_ENTITIES_STARTED = exports.LOAD_GROUP_CLASSES = exports.LOAD_GROUP_CLASSES_STARTED = exports.REMOVE_GROUP_ENTITIES = exports.REMOVE_GROUP_ENTITIES_STARTED = exports.UPDATE_PERMISSIONS = exports.UPDATE_PERMISSIONS_STARTED = exports.REMOVE_GROUP_USERS = exports.REMOVE_GROUP_USERS_STARTED = exports.ADD_ENTITIES_TO_GROUP = exports.ADD_ENTITIES_TO_GROUP_STARTED = exports.ADD_GROUP_USERS = exports.ADD_GROUP_USERS_STARTED = exports.LOAD_GROUP_USERS = exports.LOAD_GROUP_USERS_STARTED = exports.DELETE_GROUP = exports.DELETE_GROUP_STARTED = exports.CREATE_GROUP = exports.CREATE_GROUP_STARTED = exports.UPDATE_GROUP = exports.UPDATE_GROUP_STARTED = exports.LOAD_GROUP_USERS_ADD_LIST = exports.LOAD_GROUP_USERS_ADD_LIST_STARTED = exports.LOAD_AVAILABLE_PERMISSIONS = exports.LOAD_AVAILABLE_PERMISSIONS_STARTED = exports.LOAD_GROUP_FINISHED = exports.LOAD_GROUP = exports.LOAD_GROUP_STARTED = exports.LOAD_GROUPS = exports.LOAD_GROUPS_STARTED = exports.SELECTED_ENTITIES = exports.SELECTED_CLASSES = void 0;

var _History = _interopRequireDefault(require("store/History"));

var _client = require("graphql/client");

var _actionUtils = require("app/utils/redux/action-utils");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _arrayUtils = require("app/utils/array/array-utils");

var _usersActions = require("./usersActions");

var _groupDetailQuery = _interopRequireDefault(require("graphql/groups/groupDetailQuery"));

var _updateGroupMutation = _interopRequireDefault(require("graphql/groups/updateGroupMutation"));

var _updatePermissionsMutation = _interopRequireDefault(require("graphql/groups/updatePermissionsMutation"));

var _addEntitiesToGroupMutation = _interopRequireDefault(require("graphql/groups/addEntitiesToGroupMutation"));

var _createGroupMutation = _interopRequireDefault(require("graphql/groups/createGroupMutation"));

var _addUsersToGroupMutation = _interopRequireDefault(require("graphql/groups/addUsersToGroupMutation"));

var _deleteGroupUserMutation = _interopRequireDefault(require("graphql/groups/deleteGroupUserMutation"));

var _deleteGroupEntityMutation = _interopRequireDefault(require("graphql/groups/deleteGroupEntityMutation"));

var _groupAutocompleteQuery = _interopRequireDefault(require("graphql/groups/groupAutocompleteQuery"));

var _groupUsersAddQuery = _interopRequireDefault(require("graphql/groups/groupUsersAddQuery"));

var _groupsQuery = _interopRequireDefault(require("graphql/groups/groupsQuery"));

var _groupEntitiesClassificationsQuery = _interopRequireDefault(require("graphql/groups/groupEntitiesClassificationsQuery"));

var _groupPermissionsQuery = _interopRequireDefault(require("graphql/groups/groupPermissionsQuery"));

var _groupUsersQuery = _interopRequireDefault(require("graphql/groups/groupUsersQuery"));

var _groupClassQuery = _interopRequireDefault(require("graphql/groups/groupClassQuery"));

var _groupThingsQuery = _interopRequireDefault(require("graphql/groups/groupThingsQuery"));

var _groupCustomEntitiesQuery = _interopRequireDefault(require("graphql/groups/groupCustomEntitiesQuery"));

var _groupOrganisationsQuery = _interopRequireDefault(require("graphql/groups/groupOrganisationsQuery"));

var _groupProcessDefinitionEntityQuery = _interopRequireDefault(require("graphql/groups/groupProcessDefinitionEntityQuery"));

var _groupPeopleQuery = _interopRequireDefault(require("graphql/groups/groupPeopleQuery"));

var _groupEntitiesAddQueryBuilder = _interopRequireDefault(require("graphql/groups/groupEntitiesAddQueryBuilder"));

var _groupChangelogQuery = _interopRequireDefault(require("graphql/groups/groupChangelogQuery"));

var _deleteGroupMutation = _interopRequireDefault(require("graphql/groups/deleteGroupMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SELECTED_CLASSES = '@@affectli/admin/groups/group/SELECTED_CLASSES';
exports.SELECTED_CLASSES = SELECTED_CLASSES;
const SELECTED_ENTITIES = '@@affectli/admin/groups/group/SELECTED_ENTITIES';
exports.SELECTED_ENTITIES = SELECTED_ENTITIES;
const LOAD_GROUPS_STARTED = '@@affectli/admin/groups/LOAD_GROUPS_STARTED';
exports.LOAD_GROUPS_STARTED = LOAD_GROUPS_STARTED;
const LOAD_GROUPS = '@@affectli/admin/groups/LOAD_GROUPS';
exports.LOAD_GROUPS = LOAD_GROUPS;
const LOAD_GROUP_STARTED = '@@affectli/admin/groups/LOAD_GROUP_STARTED';
exports.LOAD_GROUP_STARTED = LOAD_GROUP_STARTED;
const LOAD_GROUP = '@@affectli/admin/groups/LOAD_GROUP';
exports.LOAD_GROUP = LOAD_GROUP;
const LOAD_GROUP_FINISHED = '@@affectli/admin/groups/LOAD_GROUP_FINISHED';
exports.LOAD_GROUP_FINISHED = LOAD_GROUP_FINISHED;
const LOAD_AVAILABLE_PERMISSIONS_STARTED = '@@affectli/admin/groups/LOAD_AVAILABLE_PERMISSIONS_STARTED';
exports.LOAD_AVAILABLE_PERMISSIONS_STARTED = LOAD_AVAILABLE_PERMISSIONS_STARTED;
const LOAD_AVAILABLE_PERMISSIONS = '@@affectli/admin/groups/LOAD_AVAILABLE_PERMISSIONS';
exports.LOAD_AVAILABLE_PERMISSIONS = LOAD_AVAILABLE_PERMISSIONS;
const LOAD_GROUP_USERS_ADD_LIST_STARTED = '@@affectli/admin/groups/LOAD_GROUP_USERS_ADD_LIST_STARTED';
exports.LOAD_GROUP_USERS_ADD_LIST_STARTED = LOAD_GROUP_USERS_ADD_LIST_STARTED;
const LOAD_GROUP_USERS_ADD_LIST = '@@affectli/admin/groups/LOAD_GROUP_USERS_ADD_LIST';
exports.LOAD_GROUP_USERS_ADD_LIST = LOAD_GROUP_USERS_ADD_LIST;
const UPDATE_GROUP_STARTED = '@@affectli/admin/groups/UPDATE_GROUP_STARTED';
exports.UPDATE_GROUP_STARTED = UPDATE_GROUP_STARTED;
const UPDATE_GROUP = '@@affectli/admin/groups/UPDATE_GROUP';
exports.UPDATE_GROUP = UPDATE_GROUP;
const CREATE_GROUP_STARTED = '@@affectli/admin/groups/CREATE_GROUP_STARTED';
exports.CREATE_GROUP_STARTED = CREATE_GROUP_STARTED;
const CREATE_GROUP = '@@affectli/admin/groups/CREATE_GROUP';
exports.CREATE_GROUP = CREATE_GROUP;
const DELETE_GROUP_STARTED = '@@affectli/admin/groups/DELETE_GROUP_STARTED';
exports.DELETE_GROUP_STARTED = DELETE_GROUP_STARTED;
const DELETE_GROUP = '@@affectli/admin/groups/DELETE_GROUP';
exports.DELETE_GROUP = DELETE_GROUP;
const LOAD_GROUP_USERS_STARTED = '@@affectli/admin/groups/LOAD_GROUP_USERS_STARTED';
exports.LOAD_GROUP_USERS_STARTED = LOAD_GROUP_USERS_STARTED;
const LOAD_GROUP_USERS = '@@affectli/admin/groups/LOAD_GROUP_USERS';
exports.LOAD_GROUP_USERS = LOAD_GROUP_USERS;
const ADD_GROUP_USERS_STARTED = '@@affectli/admin/groups/ADD_GROUP_USERS_STARTED';
exports.ADD_GROUP_USERS_STARTED = ADD_GROUP_USERS_STARTED;
const ADD_GROUP_USERS = '@@affectli/admin/groups/ADD_GROUP_USERS';
exports.ADD_GROUP_USERS = ADD_GROUP_USERS;
const ADD_ENTITIES_TO_GROUP_STARTED = '@@affectli/admin/groups/ADD_ENTITIES_TO_GROUP_STARTED';
exports.ADD_ENTITIES_TO_GROUP_STARTED = ADD_ENTITIES_TO_GROUP_STARTED;
const ADD_ENTITIES_TO_GROUP = '@@affectli/admin/groups/ADD_ENTITIES_TO_GROUP';
exports.ADD_ENTITIES_TO_GROUP = ADD_ENTITIES_TO_GROUP;
const REMOVE_GROUP_USERS_STARTED = '@@affectli/admin/groups/REMOVE_GROUP_USERS_STARTED';
exports.REMOVE_GROUP_USERS_STARTED = REMOVE_GROUP_USERS_STARTED;
const REMOVE_GROUP_USERS = '@@affectli/admin/groups/REMOVE_GROUP_USERS';
exports.REMOVE_GROUP_USERS = REMOVE_GROUP_USERS;
const UPDATE_PERMISSIONS_STARTED = '@@affectli/admin/groups/UPDATE_PERMISSIONS_STARTED';
exports.UPDATE_PERMISSIONS_STARTED = UPDATE_PERMISSIONS_STARTED;
const UPDATE_PERMISSIONS = '@@affectli/admin/groups/UPDATE_PERMISSIONS';
exports.UPDATE_PERMISSIONS = UPDATE_PERMISSIONS;
const REMOVE_GROUP_ENTITIES_STARTED = '@@affectli/admin/groups/REMOVE_GROUP_ENTITIES_STARTED';
exports.REMOVE_GROUP_ENTITIES_STARTED = REMOVE_GROUP_ENTITIES_STARTED;
const REMOVE_GROUP_ENTITIES = '@@affectli/admin/groups/REMOVE_GROUP_ENTITIES';
exports.REMOVE_GROUP_ENTITIES = REMOVE_GROUP_ENTITIES;
const LOAD_GROUP_CLASSES_STARTED = '@@affectli/admin/groups/LOAD_GROUP_CLASSES_STARTED';
exports.LOAD_GROUP_CLASSES_STARTED = LOAD_GROUP_CLASSES_STARTED;
const LOAD_GROUP_CLASSES = '@@affectli/admin/groups/LOAD_GROUP_CLASSES';
exports.LOAD_GROUP_CLASSES = LOAD_GROUP_CLASSES;
const LOAD_GROUP_ENTITIES_STARTED = '@@affectli/admin/groups/LOAD_GROUP_ENTITIES_STARTED';
exports.LOAD_GROUP_ENTITIES_STARTED = LOAD_GROUP_ENTITIES_STARTED;
const LOAD_GROUP_ENTITIES = '@@affectli/admin/groups/LOAD_GROUP_ENTITIES';
exports.LOAD_GROUP_ENTITIES = LOAD_GROUP_ENTITIES;
const LOAD_GROUP_THINGS_STARTED = '@@affectli/admin/groups/LOAD_GROUP_THINGS_STARTED';
exports.LOAD_GROUP_THINGS_STARTED = LOAD_GROUP_THINGS_STARTED;
const LOAD_GROUP_THINGS = '@@affectli/admin/groups/LOAD_GROUP_THINGS';
exports.LOAD_GROUP_THINGS = LOAD_GROUP_THINGS;
const LOAD_GROUP_PEOPLE_STARTED = '@@affectli/admin/groups/LOAD_GROUP_PEOPLE_STARTED';
exports.LOAD_GROUP_PEOPLE_STARTED = LOAD_GROUP_PEOPLE_STARTED;
const LOAD_GROUP_PEOPLE = '@@affectli/admin/groups/LOAD_GROUP_PEOPLE';
exports.LOAD_GROUP_PEOPLE = LOAD_GROUP_PEOPLE;
const LOAD_GROUP_ORGANISATION_STARTED = '@@affectli/admin/groups/LOAD_GROUP_ORGANISATION_STARTED';
exports.LOAD_GROUP_ORGANISATION_STARTED = LOAD_GROUP_ORGANISATION_STARTED;
const LOAD_GROUP_ORGANISATION = '@@affectli/admin/groups/LOAD_GROUP_ORGANISATION';
exports.LOAD_GROUP_ORGANISATION = LOAD_GROUP_ORGANISATION;
const LOAD_GROUP_CUSTOM_STARTED = '@@affectli/admin/groups/LOAD_GROUP_CUSTOM_STARTED';
exports.LOAD_GROUP_CUSTOM_STARTED = LOAD_GROUP_CUSTOM_STARTED;
const LOAD_GROUP_CUSTOM = '@@affectli/admin/groups/LOAD_GROUP_CUSTOM';
exports.LOAD_GROUP_CUSTOM = LOAD_GROUP_CUSTOM;
const LOAD_GROUP_PROCESS_DEFINITIONS_STARTED = '@@affectli/admin/groups/LOAD_GROUP_PROCESS_DEFINITIONS_STARTED';
exports.LOAD_GROUP_PROCESS_DEFINITIONS_STARTED = LOAD_GROUP_PROCESS_DEFINITIONS_STARTED;
const LOAD_GROUP_PROCESS_DEFINITIONS = '@@affectli/admin/groups/LOAD_GROUP_PROCESS_DEFINITIONS';
exports.LOAD_GROUP_PROCESS_DEFINITIONS = LOAD_GROUP_PROCESS_DEFINITIONS;
const LOAD_GROUP_CLASSIFICATION_DEFINITION_STARTED = '@@affectli/admin/groups/LOAD_GROUP_CLASSIFICATION_DEFINITION_STARTED';
exports.LOAD_GROUP_CLASSIFICATION_DEFINITION_STARTED = LOAD_GROUP_CLASSIFICATION_DEFINITION_STARTED;
const LOAD_GROUP_CLASSIFICATION_DEFINITION = '@@affectli/admin/groups/LOAD_GROUP_CLASSIFICATION_DEFINITION';
exports.LOAD_GROUP_CLASSIFICATION_DEFINITION = LOAD_GROUP_CLASSIFICATION_DEFINITION;
const LOAD_GROUP_AUTOCOMPLETE_STARTED = '@@affectli/admin/groups/LOAD_GROUP_AUTOCOMPLETE_STARTED';
exports.LOAD_GROUP_AUTOCOMPLETE_STARTED = LOAD_GROUP_AUTOCOMPLETE_STARTED;
const LOAD_GROUP_AUTOCOMPLETE = '@@affectli/admin/groups/LOAD_GROUP_AUTOCOMPLETE';
exports.LOAD_GROUP_AUTOCOMPLETE = LOAD_GROUP_AUTOCOMPLETE;
const LOAD_GROUP_CHANGELOG_STARTED = '@@affectli/admin/groups/LOAD_GROUP_CHANGELOG_STARTED';
exports.LOAD_GROUP_CHANGELOG_STARTED = LOAD_GROUP_CHANGELOG_STARTED;
const LOAD_GROUP_CHANGELOG = '@@affectli/admin/groups/LOAD_GROUP_CHANGELOG';
/**
 * Loads the suggestions for the person autocomplete component.
 */

exports.LOAD_GROUP_CHANGELOG = LOAD_GROUP_CHANGELOG;
const loadGroupAutocomplete = (0, _actionUtils.loadData)(LOAD_GROUP_AUTOCOMPLETE_STARTED, LOAD_GROUP_AUTOCOMPLETE, _groupAutocompleteQuery.default);
/**
 * Set the selected Group's classes in the Redux's state.
 *
 * @param selectedClasses the selected classes.
 */

exports.loadGroupAutocomplete = loadGroupAutocomplete;

const selectClasses = (selectedClasses = []) => (dispatch, getState) => {
  dispatch({
    type: SELECTED_CLASSES,
    payload: (0, _Immutable.default)(selectedClasses)
  });
};
/**
 * Set the selected Group's entities in the Redux's state.
 *
 * @param selectedEntities the selected entities.
 */


exports.selectClasses = selectClasses;

const selectEntities = (selectedEntities = []) => (dispatch, getState) => {
  dispatch({
    type: SELECTED_ENTITIES,
    payload: (0, _Immutable.default)(selectedEntities)
  });
};
/**
 * Load classifications for grid header
 *
 * @param options
 * @param page
 * @param pageSize the query's options
 * @param orderBy
 * @param where
 */


exports.selectEntities = selectEntities;

const loadGroups = options => dispatch => {
  dispatch({
    type: LOAD_GROUPS_STARTED
  });
  return _client.graphql.query({
    query: _groupsQuery.default,
    variables: options,
    fetchPolicy: 'no-cache'
  }).then(response => {
    const {
      records
    } = (0, _Immutable.default)((0, _lo.get)(response, 'data') || {});
    dispatch({
      type: LOAD_GROUPS,
      payload: (0, _Immutable.default)((0, _lo.get)(response, 'data'))
    });
    return {
      records
    };
  }).catch(error => {
    dispatch({
      type: LOAD_GROUPS,
      payload: error,
      error: true
    });
  });
};
/**
 * Loads a Group.
 *
 */


exports.loadGroups = loadGroups;

const loadGroup = id => (0, _actionUtils.loadData)(LOAD_GROUP_STARTED, LOAD_GROUP, _groupDetailQuery.default)({
  id
});
/**
 * load users list to add in any group
 */


exports.loadGroup = loadGroup;

const groupUsersAddList = (groupId, isAdmin = false, options) => {
  options.excludeBy = {
    field: 'userGroups.group.id',
    op: '=',
    value: groupId
  };

  if (!isAdmin) {
    options.where.push({
      field: 'active',
      op: '=',
      value: true
    });
  }

  return (0, _actionUtils.loadTableData)(LOAD_GROUP_USERS_ADD_LIST_STARTED, LOAD_GROUP_USERS_ADD_LIST, _groupUsersAddQuery.default)(options);
};
/**
 * Loads the available permissions that can be assigned to a Group.
 * @param variables options for query
 */


exports.groupUsersAddList = groupUsersAddList;

const loadAvailablePermissions = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_AVAILABLE_PERMISSIONS_STARTED
  });

  _client.graphql.query({
    query: _groupPermissionsQuery.default,
    variables: {
      where: [{
        field: 'type',
        op: '=',
        value: 1
      }]
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    dispatch({
      type: LOAD_AVAILABLE_PERMISSIONS,
      payload: (0, _Immutable.default)((0, _lo.get)(response, 'data'))
    });
  }).catch(error => {
    dispatch({
      type: LOAD_AVAILABLE_PERMISSIONS,
      payload: error,
      error: true
    });
  });
};

exports.loadAvailablePermissions = loadAvailablePermissions;

const createGroup = record => (dispatch, getState) => {
  (0, _actionUtils.mutateData)(CREATE_GROUP_STARTED, CREATE_GROUP, _createGroupMutation.default, 'Group added.')({
    record
  })(dispatch, getState).then(({
    id
  }) => {
    if (id) {
      _History.default.push(`/groups/${id}/`);
    }
  });
};

exports.createGroup = createGroup;

const updateGroupDetails = ({
  id,
  category,
  name,
  active,
  parentId,
  parent,
  classificationUris,
  classifications,
  attributes
}) => {
  const record = {
    id,
    category,
    name,
    active,
    parentId,
    parent: (0, _lo.get)(parent, 'id') ? {
      id: (0, _lo.get)(parent, 'id')
    } : null,
    classificationUris,
    classifications: (0, _lo.get)(classifications, '[0].uri') ? [{
      uri: (0, _lo.get)(classifications, '[0].uri')
    }] : null,
    // If no classification selected then we need to pass null instead of empty array, otherwise GQL will throw an error
    attributes
  };
  return updateGroup(record);
};
/**
 * This function will update permissions of the group
 * https://gitlab.mi-c3.com/affectli-project/affectli-support-issues/issues/8223
 */


exports.updateGroupDetails = updateGroupDetails;

const updateGroupPermissions = ({
  id,
  permissions
}) => {
  const record = {
    id,
    permissions: permissions && permissions.length ? (0, _arrayUtils.getUnique)(permissions) : null // If no permission selected then we need to pass null instead of empty array, otherwise GQL will throw an error,

  };
  return updateGroup(record);
};

exports.updateGroupPermissions = updateGroupPermissions;

const updateGroup = record => (dispatch, getState) => {
  dispatch({
    type: LOAD_GROUP_STARTED
  });
  return (0, _actionUtils.mutateData)(UPDATE_GROUP_STARTED, UPDATE_GROUP, _updateGroupMutation.default, 'Group updated.')({
    record
  })(dispatch, getState).then(group => {
    if (!(group instanceof Error)) {
      dispatch({
        type: LOAD_GROUP,
        payload: {
          group
        }
      });
      dispatch((0, _usersActions.loadUserProfile)());
    } else {
      dispatch({
        type: LOAD_GROUP_FINISHED
      });
    }
  });
};
/**
 * Deletes a Group.
 *
 * @param id the  id of the group.
 */


const deleteGroup = id => (0, _actionUtils.mutateData)(DELETE_GROUP_STARTED, DELETE_GROUP, _deleteGroupMutation.default, 'Group Deleted')({
  id
});
/**
 * Load the users associated with the specified group
 *
 * @param groupId group id (required)
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 * @param isAdmin if current user is admin boolean default false
 * @returns {*}
 */


exports.deleteGroup = deleteGroup;

const loadGroupUsers = (groupId, options, isAdmin = false) => {
  const opt = { ...options
  };
  opt.where = [...(opt.where || []), {
    field: 'group.id',
    op: '=',
    value: groupId
  }];

  if (!isAdmin) {
    opt.where.push({
      field: 'user.active',
      op: '=',
      value: true
    });
  }

  return (0, _actionUtils.loadTableData)(LOAD_GROUP_USERS_STARTED, LOAD_GROUP_USERS, _groupUsersQuery.default)(opt);
};
/**
 * Adds a list of users to the Group.
 *
 * @param groupId {number} the ID of the Group.
 * @param userIds {string[]} the IDs of the users to add to the group.
 *
 * @returns {function(Function, Function)} the function to dispatch the action.
 */


exports.loadGroupUsers = loadGroupUsers;

const addUsersToGroup = ({
  groupId,
  userIds
}) => (0, _actionUtils.mutateData)(ADD_GROUP_USERS_STARTED, ADD_GROUP_USERS, _addUsersToGroupMutation.default, `${userIds.length} users added.`)({
  groupId,
  userIds
});
/**
 * Removes the specified users from the specified group.
 *
 * @param id the group user id
 * @param userId the id of removed user
 * @returns {function(Function, Function): *} the function to dispatch the action.
 */


exports.addUsersToGroup = addUsersToGroup;

const removeGroupUser = (id, userId) => (dispatch, getState) => (0, _actionUtils.mutateData)(REMOVE_GROUP_USERS_STARTED, REMOVE_GROUP_USERS, _deleteGroupUserMutation.default, 'User removed..')({
  id: Number(id)
})(dispatch, getState).then(mbError => {
  // if non-admin user removes himself from the group we need to reload his profile and redirect to main page
  if (!(mbError instanceof Error) && userId === getState().user.profile.id && !getState().user.profile.isAdmin) {
    dispatch((0, _usersActions.loadUserProfile)());

    _History.default.push('/');
  }
});
/**
 * Updates the group's permissions of the specified entities.
 */


exports.removeGroupUser = removeGroupUser;

const updatePermissions = ({
  groupId,
  groupEntityIds,
  permissions
}) => (0, _actionUtils.mutateData)(UPDATE_PERMISSIONS_STARTED, UPDATE_PERMISSIONS, _updatePermissionsMutation.default, 'Permissions Updated')({
  groupId,
  groupEntityIds,
  permissions
});
/**
 * Adds the specified Entities to the specified Group.
 */


exports.updatePermissions = updatePermissions;

const addEntitiesToGroup = (groupId, entityType, selectedEntities = []) => {
  // for classificatios the uid is the uri, for all the other entities the uid is the id
  const entities = selectedEntities.map(({
    id,
    uri
  }) => ({
    uid: String(uri || id),
    entityType
  }));
  return (0, _actionUtils.mutateData)(ADD_ENTITIES_TO_GROUP_STARTED, ADD_ENTITIES_TO_GROUP, _addEntitiesToGroupMutation.default, `Entity(ies) added. ${entityType !== 'proc_def' ? 'Note: This group\'s permissions will apply to any existing children or future children of these entity(ies).' : ''}`)({
    groupId,
    entities
  });
};
/**
 * Loads available entities list that can be added to group .
 */


exports.addEntitiesToGroup = addEntitiesToGroup;

const loadAvailableEntities = (groupId, entityType, isAdmin = false, options) => {
  const entity = {
    thing: 'things',
    person: 'people',
    organisation: 'organisations',
    custom: 'customEntities',
    proc_def: 'processDefinitionEntities'
  }[entityType];
  const countType = {
    thing: 'thing',
    person: 'person',
    organisation: 'organisation',
    custom: 'customEntity',
    proc_def: 'processDefinitionEntity'
  }[entityType];

  if (entityType !== 'proc_def' && !isAdmin) {
    options.where.push({
      field: 'active',
      op: '=',
      value: true
    });
  }

  return (0, _actionUtils.loadTableData)(LOAD_GROUP_ENTITIES_STARTED, LOAD_GROUP_ENTITIES, (0, _groupEntitiesAddQueryBuilder.default)({
    entity,
    countType
  }))({ ...options,
    excludeBy: [{
      field: 'entityGroups.group.id',
      op: '=',
      value: groupId
    }]
  });
};
/**
 * Removes the specified Entities from the specified Group.
 */


exports.loadAvailableEntities = loadAvailableEntities;

const removeGroupEntity = (id, entityType = '') => (0, _actionUtils.mutateData)(REMOVE_GROUP_ENTITIES_STARTED, REMOVE_GROUP_ENTITIES, _deleteGroupEntityMutation.default, entityType === 'classification' ? 'Classfication removed' : 'Entity removed')({
  id: Number(id)
});
/**
 * Get the Classes related to the Group.
 *
 * @param groupId the id of the Group (required)
 * @param options the query's options
 * @param isAdmin if user is admin boolean
 * @returns {*}
 */


exports.removeGroupEntity = removeGroupEntity;

const loadGroupClasses = (groupId, options, isAdmin = false) => {
  const filterByGroup = [{
    field: 'group.id',
    op: '=',
    value: groupId
  }, {
    field: 'classification.id',
    op: 'is not null'
  }];

  if (!isAdmin) {
    filterByGroup.push({
      field: 'classification.active',
      op: '=',
      value: true
    });
  }

  if (options.where) {
    options.where = [...options.where, ...filterByGroup];
  } else {
    options.where = [...filterByGroup];
  }

  return (0, _actionUtils.loadTableData)(LOAD_GROUP_CLASSES_STARTED, LOAD_GROUP_CLASSES, _groupEntitiesClassificationsQuery.default)(options);
};

exports.loadGroupClasses = loadGroupClasses;

const loadGroupProcessDefinitions = options => {
  return (0, _actionUtils.loadTableData)(LOAD_GROUP_PROCESS_DEFINITIONS_STARTED, LOAD_GROUP_PROCESS_DEFINITIONS, _groupProcessDefinitionEntityQuery.default)(options);
};

const loadGroupCustomEntities = options => {
  return (0, _actionUtils.loadTableData)(LOAD_GROUP_CUSTOM_STARTED, LOAD_GROUP_CUSTOM, _groupCustomEntitiesQuery.default)(options);
};

const loadGroupOrganisations = options => {
  return (0, _actionUtils.loadTableData)(LOAD_GROUP_ORGANISATION_STARTED, LOAD_GROUP_ORGANISATION, _groupOrganisationsQuery.default)(options);
};

const loadGroupThings = options => {
  return (0, _actionUtils.loadTableData)(LOAD_GROUP_THINGS_STARTED, LOAD_GROUP_THINGS, _groupThingsQuery.default)(options);
};

const loadGroupPeople = options => {
  return (0, _actionUtils.loadTableData)(LOAD_GROUP_PEOPLE_STARTED, LOAD_GROUP_PEOPLE, _groupPeopleQuery.default)(options);
};
/**
 * Get all the Entities related with a group.
 *
 * @param groupId the id of the Group (required).
 * @param entityType type of entity (thing, custom, processDef etc.)
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 * @param isAdmin boolean if user is admin
 * @returns {*}
 */


const loadGroupEntities = (groupId, entityType, options, isAdmin = false) => {
  const opt = { ...options
  };
  opt.where = [...(opt.where || []), {
    field: 'group.id',
    op: '=',
    value: groupId
  }];
  const activeField = {
    thing: 'thing.active',
    person: 'person.active',
    organisation: 'organisation.active',
    custom: 'customEntity.active'
  };
  const idField = {
    thing: 'thing.id',
    person: 'person.id',
    organisation: 'organisation.id',
    custom: 'customEntity.id',
    proc_def: 'processDefinitionEntity.id'
  };

  if (idField[entityType]) {
    opt.where.push({
      field: idField[entityType],
      op: 'is not null'
    });
  }

  if (entityType && !isAdmin && activeField[entityType]) {
    opt.where.push({
      field: activeField[entityType],
      op: '=',
      value: true
    });
  }

  switch (entityType) {
    case 'thing':
      return loadGroupThings(opt);

    case 'person':
      return loadGroupPeople(opt);

    case 'organisation':
      return loadGroupOrganisations(opt);

    case 'custom':
      return loadGroupCustomEntities(opt);

    case 'proc_def':
      return loadGroupProcessDefinitions(opt);

    default:
      return null;
  }
};

exports.loadGroupEntities = loadGroupEntities;

const _loadGroupClassByUri = (uri, filterBy = []) => {
  if (!uri) {
    return Promise.resolve(null);
  }

  const queryOptions = {
    filterBy: [...(filterBy || []), {
      field: 'uri',
      op: '=',
      value: uri
    }]
  };
  return _client.graphql.query({
    query: _groupClassQuery.default,
    variables: queryOptions,
    fetchPolicy: 'no-cache'
  }).then(response => {
    return (0, _Immutable.default)((0, _lo.get)(response, 'data.result') || []).map(record => {
      const fields = (record.formDefinitions || {}).fields || []; // get the fields' groups names removing the duplicates

      const fieldGroupsNames = Array.from(new Set(fields.map(({
        group_name
      }) => group_name || 'Ungrouped')));
      return { ...record,
        groups: fieldGroupsNames.map(name => ({
          name: name,
          fields: fields.filter(({
            group_name
          }) => (group_name || 'Ungrouped') === name)
        }))
      };
    });
  });
};
/**
 * Load the group's classification definition.
 */


const loadGroupClassificationDefinition = uri => (dispatch, getState) => {
  dispatch({
    type: LOAD_GROUP_CLASSIFICATION_DEFINITION_STARTED
  });
  return _loadGroupClassByUri(uri).then(data => {
    dispatch({
      type: LOAD_GROUP_CLASSIFICATION_DEFINITION,
      payload: (0, _Immutable.default)(data)
    });
    return (0, _Immutable.default)(data);
  }).catch((0, _actionUtils.dispatchError)(dispatch, LOAD_GROUP_CLASSIFICATION_DEFINITION));
};
/**
 * Fetch the group changelog.
 *
 * @param id the entity ID.
 */


exports.loadGroupClassificationDefinition = loadGroupClassificationDefinition;

const loadGroupChangelog = (id, options) => dispatch => {
  dispatch({
    type: LOAD_GROUP_CHANGELOG_STARTED
  });
  return _client.graphql.query({
    query: _groupChangelogQuery.default,
    variables: {
      id,
      uid: String(id),
      ...options
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    const payload = {
      changes: (0, _lo.get)(response, 'data.group.changelog'),
      startIndex: options.startIndex,
      count: (0, _lo.get)(response, 'data.count')
    };
    dispatch({
      type: LOAD_GROUP_CHANGELOG,
      payload
    });
  }).catch(error => {
    dispatch({
      type: LOAD_GROUP_CHANGELOG,
      payload: error,
      error: true
    });
  });
};

exports.loadGroupChangelog = loadGroupChangelog;