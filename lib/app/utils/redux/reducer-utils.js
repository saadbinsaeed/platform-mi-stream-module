"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truthful = exports.compareId = exports.loadDataReducer = exports.dataTableReducer = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the reducer to handle the standard DataTable actions.
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 */
const dataTableReducer = (startActionType, endActionType, keepDataAtStart = () => false) => (state = {
  records: [],
  count: 0,
  isLoading: false,
  isDownloading: false
}, action) => {
  const {
    type,
    payload,
    error,
    meta
  } = action;

  switch (type) {
    case startActionType:
      {
        if (meta.download) {
          return (0, _Immutable.default)({ ...state,
            isDownloading: true
          });
        }

        let next = { ...state,
          isLoading: true
        };
        const keepData = keepDataAtStart({
          state,
          type,
          payload,
          error,
          meta
        });

        if (!keepData) {
          next = { ...next,
            records: [],
            count: 0
          };
        }

        return (0, _Immutable.default)(next);
      }

    case endActionType:
      {
        if (error) {
          return (0, _Immutable.default)({ ...state,
            records: [],
            isLoading: false
          });
        }

        if (meta.download) {
          return (0, _Immutable.default)({ ...state,
            isDownloading: false
          });
        }

        const {
          records = [],
          count = 0
        } = payload || {};
        return (0, _Immutable.default)({ ...state,
          ...(meta || {}),
          isLoading: false,
          records,
          count
        });
      }

    default:
      return state;
  }
};
/**
 * Returns the reducer to handle the standard DataTable actions.
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 */


exports.dataTableReducer = dataTableReducer;

const loadDataReducer = (startActionType, endActionType, keepDataAtStart = () => false) => (state = {
  data: null,
  isLoading: false
}, action) => {
  const {
    type,
    payload,
    error,
    meta
  } = action;

  switch (type) {
    case startActionType:
      const next = { ...state,
        isLoading: true
      };

      if (!keepDataAtStart({
        state,
        type,
        payload,
        error,
        meta
      })) {
        next.data = null;
      }

      return (0, _Immutable.default)(next);

    case endActionType:
      if (error) {
        return (0, _Immutable.default)({ ...state,
          error,
          meta,
          isLoading: false
        });
      }

      return (0, _Immutable.default)({ ...state,
        isLoading: false,
        data: payload
      });

    default:
      return state;
  }
};
/**
 * Compare new data Id and old data Id
 */


exports.loadDataReducer = loadDataReducer;

const compareId = ({
  state,
  meta
}) => (0, _utils.getStr)(state, 'data.id') === (0, _utils.getStr)(meta, 'id');
/**
 * @return true
 */


exports.compareId = compareId;

const truthful = () => true;

exports.truthful = truthful;