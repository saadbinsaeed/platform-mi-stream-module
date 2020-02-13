"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _groupsActions = require("store/actions/admin/groupsActions");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _reducerUtils = require("app/utils/redux/reducer-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Group reducer.
 *
 * @param state - the current Redux state
 * @param action - the dispatched action
 * @returns the new Redux state
 */
const reducer = (state = (0, _Immutable.default)({
  availablePermissions: [],
  classes: {},
  selectedItems: [],
  entities: [],
  selectedEntities: [],
  selectedClasses: [],
  isLoading: false,
  groups: [],
  details: null,
  entityLoading: true,
  classifications: [],
  classificationDefinition: {
    isLoading: false
  }
}), {
  type,
  payload,
  error,
  meta
}) => {
  switch (type) {
    case _groupsActions.LOAD_GROUP_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _groupsActions.LOAD_GROUP:
      return (0, _Immutable.default)({ ...state,
        isLoading: false,
        details: payload.group
      });

    case _groupsActions.LOAD_GROUP_FINISHED:
      return (0, _Immutable.default)({ ...state,
        isLoading: false
      });

    case _groupsActions.LOAD_AVAILABLE_PERMISSIONS_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _groupsActions.LOAD_AVAILABLE_PERMISSIONS:
      {
        if (error) return (0, _Immutable.default)({ ...state,
          isLoading: false
        });
        const {
          records
        } = payload;
        return (0, _Immutable.default)({ ...state,
          availablePermissions: records || [],
          isLoading: false
        });
      }

    case _groupsActions.SELECTED_CLASSES:
      return (0, _Immutable.default)({ ...state,
        selectedClasses: payload
      });

    case _groupsActions.SELECTED_ENTITIES:
      return (0, _Immutable.default)({ ...state,
        selectedEntities: payload
      });

    case _groupsActions.LOAD_GROUP_CLASSES_STARTED:
    case _groupsActions.LOAD_GROUP_CLASSES:
      return (0, _Immutable.default)({ ...state,
        classes: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_CLASSES_STARTED, _groupsActions.LOAD_GROUP_CLASSES)(state.classes, {
          type,
          payload,
          error,
          meta
        })
      });

    case _groupsActions.LOAD_GROUP_CLASSIFICATION_DEFINITION_STARTED:
      return (0, _Immutable.default)({ ...state,
        classificationDefinition: {
          isLoading: true
        }
      });

    case _groupsActions.LOAD_GROUP_CLASSIFICATION_DEFINITION:
      if (error) {
        return (0, _Immutable.default)({ ...state,
          classificationDefinition: {
            isLoading: false
          }
        });
      }

      return (0, _Immutable.default)({ ...state,
        classificationDefinition: {
          isLoading: false,
          definition: payload && payload[0]
        }
      });

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;