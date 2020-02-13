"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReduxAction = exports.useOnChange = exports.useToggle = void 0;

var _react = require("react");

// $FlowFixMe
const useToggle = () => {
  const [isOpen, show] = (0, _react.useState)(false);
  const toggle = (0, _react.useCallback)(() => show(!isOpen), [isOpen]);
  return [isOpen, toggle, show];
};
/**
 * Use this hook to handle the variable changes providing an additional onChange function.
 *
 * @param value the property value
 * @param refresh if "true" it refreshes the value on every change, otherwise it set the value only the first time. This flag shouldn't be modified during the hook life cycle!
 *
 * @return three items: the value, the onChange function, the set function.
 */


exports.useToggle = useToggle;

const useOnChange = (value, refresh = true) => {
  const [val, setValue] = (0, _react.useState)(value);
  refresh && (0, _react.useEffect)(() => {
    // eslint-disable-line react-hooks/rules-of-hooks
    setValue(value);
  }, [value]);
  const onChange = (0, _react.useCallback)(e => {
    setValue(e.target.value);
  }, [setValue]);
  return [val, onChange, setValue];
};
/**
 * Use a Redux action.
 *
 * @param action the action (required). If the action is asyncronous it must return a Promise.
 * @param paramters an array containing the action parameters (optional).
 * @param disableUI the function to disable the UI (optional).
 * @param onSuccess the function to call on success (optional).
 * @param onError the function to call on error (optional).
 */


exports.useOnChange = useOnChange;

const useReduxAction = ({
  action,
  parameters,
  disableUI,
  onSuccess,
  onError
}) => (0, _react.useCallback)(() => {
  disableUI && disableUI(true);
  const result = parameters ? action(...parameters) : action();
  const promise = result instanceof Promise ? result : Promise.resolve(result);
  return promise.then(res => {
    disableUI && disableUI(false);

    if (res instanceof Error) {
      onError && onError(res);
    } else {
      onSuccess && onSuccess(res);
    }

    return res;
  });
}, [parameters, action, disableUI, onError, onSuccess]);

exports.useReduxAction = useReduxAction;