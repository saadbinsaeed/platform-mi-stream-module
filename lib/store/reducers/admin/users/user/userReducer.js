"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _userManagementAction = require("store/actions/admin/userManagementAction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (state = (0, _Immutable.default)({
  rolesAreLoading: false,
  availableRoles: {}
}), {
  type,
  payload,
  error
}) => {
  switch (type) {
    case _userManagementAction.UPDATE_USER_STARTED:
    case _userManagementAction.CREATE_USER_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _userManagementAction.UPDATE_USER:
    case _userManagementAction.CREATE_USER:
      return (0, _Immutable.default)({ ...state,
        isLoading: false
      });

    case _userManagementAction.LOAD_ROLE_STARTED:
      return (0, _Immutable.default)({ ...state,
        rolesAreLoading: true
      });

    case _userManagementAction.LOAD_ROLE_OF:
      if (error) {
        return state;
      }

      return (0, _Immutable.default)({ ...state,
        rolesAreLoading: false,
        availableRoles: { ...state.availableRoles,
          [payload.employee]: (payload.data || []).map(element => ({
            value: element.user_role,
            label: element.user_role || 'No Result Found'
          }))
        }
      });

    default:
  }

  return state;
};

exports.default = _default;