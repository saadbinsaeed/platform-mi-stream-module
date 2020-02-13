"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _attachmentsActions = require("store/actions/common/attachmentsActions");

var _entitiesActions = require("store/actions/entities/entitiesActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const changelogReducer = (0, _reducerUtils.loadDataReducer)(_entitiesActions.LOAD_ENTITY_CHANGELOG_STARTED, _entitiesActions.LOAD_ENTITY_CHANGELOG, _reducerUtils.truthful);
const getEntityTypeReducer = (0, _reducerUtils.loadDataReducer)(_entitiesActions.GET_ENTITY_TYPE_STARTED, _entitiesActions.GET_ENTITY_TYPE, _reducerUtils.truthful);
/**
 * Generic Entity reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */

const reducer = (state = (0, _Immutable.default)({
  attachFileInProgress: false,
  deletingAttachments: false,
  addingClass: false,
  removingClass: false,
  expandedEntities: {
    isLoading: false,
    list: [],
    total: 0
  },
  changelog: {
    isLoading: false
  },
  entityType: {
    isLoading: false
  }
}), action, meta = {}) => {
  const {
    type
  } = action;

  switch (type) {
    case _attachmentsActions.ATTACH_FILE_STARTED:
      return (0, _Immutable.default)({ ...state,
        attachFileInProgress: true
      });

    case _attachmentsActions.ATTACH_FILE:
      return (0, _Immutable.default)({ ...state,
        attachFileInProgress: false
      });

    case _attachmentsActions.DELETE_ATTACHMENT_STARTED:
      return (0, _Immutable.default)({ ...state,
        deletingAttachments: true
      });

    case _attachmentsActions.DELETE_ATTACHMENT:
      return (0, _Immutable.default)({ ...state,
        deletingAttachments: false
      });

    case _entitiesActions.ADD_ENTITY_CLASS_STARTED:
      return (0, _Immutable.default)({ ...state,
        addingClass: true
      });

    case _entitiesActions.ADD_ENTITY_CLASS:
      return (0, _Immutable.default)({ ...state,
        addingClass: false
      });

    case _entitiesActions.REMOVE_ENTITY_CLASS_STARTED:
      return (0, _Immutable.default)({ ...state,
        removingClass: true
      });

    case _entitiesActions.REMOVE_ENTITY_CLASS:
      return (0, _Immutable.default)({ ...state,
        removingClass: false
      });

    case _entitiesActions.LOAD_ENTITY_CHANGELOG_STARTED:
    case _entitiesActions.LOAD_ENTITY_CHANGELOG:
      return (0, _Immutable.default)({ ...state,
        changelog: changelogReducer(state.changelog, action, meta)
      });

    case _entitiesActions.GET_ENTITY_TYPE_STARTED:
    case _entitiesActions.GET_ENTITY_TYPE:
      return (0, _Immutable.default)({ ...state,
        entityType: getEntityTypeReducer(state.entityType, action)
      });

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;