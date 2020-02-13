"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _messengerActions = require("store/actions/messenger/messengerActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  messages: {},
  showMessenger: false,
  isLoading: false,
  attachFileInProgress: false,
  selection: {
    id: null,
    type: null
  }
};

var _default = (state = initialState, action) => {
  const {
    type,
    payload,
    error
  } = action;

  switch (type) {
    case _messengerActions.ATTACH_FILE_MESSEGE_STARTED:
      return (0, _Immutable.default)({ ...state,
        attachFileInProgress: true
      });

    case _messengerActions.ATTACH_FILE_MESSEGE:
      return (0, _Immutable.default)({ ...state,
        attachFileInProgress: false
      });

    case _messengerActions.TOGGLE_MESSENGER:
      return (0, _Immutable.default)({ ...state,
        showMessenger: !state.showMessenger
      });

    case _messengerActions.LOAD_MESSENGER_STARTED:
      return (0, _Immutable.default)({ ...state,
        showMessenger: true
      });

    case _messengerActions.LOAD_MESSENGER:
      return (0, _Immutable.default)({ ...state,
        selection: payload
      });

    case _messengerActions.LOAD_MESSENGER_PROCESS_MESSAGES_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _messengerActions.LOAD_MESSENGER_PROCESS_MESSAGES:
      {
        if (error) return (0, _Immutable.default)({ ...state,
          messages: {},
          isLoading: false
        });
        return (0, _Immutable.default)({ ...state,
          isLoading: false,
          messages: payload
        });
      }

    case _messengerActions.LOAD_MESSENGER_TASK_MESSAGES_STARTED:
      return (0, _Immutable.default)({ ...state,
        isLoading: true
      });

    case _messengerActions.LOAD_MESSENGER_TASK_MESSAGES:
      {
        if (error) return (0, _Immutable.default)({ ...state,
          messages: {},
          isLoading: false
        });
        return (0, _Immutable.default)({ ...state,
          isLoading: false,
          messages: payload
        });
      }

    default:
      return state;
  }
};

exports.default = _default;