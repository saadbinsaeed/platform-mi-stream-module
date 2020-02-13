"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveComponentState = exports.SAVE_COMPONENT_STATE = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SAVE_COMPONENT_STATE = '@@affectli/component/SAVE_COMPONENT_STATE';
/**
 * Updates the runtime state of the component with the given ID.
 *
 * @param id the component's ID.
 * @param stateUpdate the state updates.
 */

exports.SAVE_COMPONENT_STATE = SAVE_COMPONENT_STATE;

const saveComponentState = (id, stateUpdate) => (dispatch, getState) => {
  if (!id || !stateUpdate) {
    throw new Error('The component ID and the stateUpdate are required.');
  }

  const currentState = (0, _lo.get)(getState(), `component.state.${id}`) || {}; // the next state will be a shallow merge between the current state and the state passed as parameter

  const next = { ...currentState,
    ...stateUpdate
  };
  dispatch({
    type: SAVE_COMPONENT_STATE,
    payload: (0, _Immutable.default)({
      id,
      state: next
    })
  });
};

exports.saveComponentState = saveComponentState;