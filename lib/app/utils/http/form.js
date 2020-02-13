"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleChange = void 0;

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @private
 *
 * Saves the new value of an input in the Component's state.
 */
const onChange = (component, event, formName) => {
  event.preventDefault();
  const {
    name,
    value
  } = event.target;
  const formState = component.state[formName] || (0, _Immutable.default)({});
  const newFormState = (0, _Immutable.set)(formState, name, value);
  component.setState({
    [formName]: newFormState
  });
};
/**
 * Returns the attributes to store the changes of an input field in the Component's state.
 *
 * @param component the component
 * @param fieldPath the field path in the state (used to read/write the value)
 * @param formName the form name (default: 'form')
 * @param valueFieldName the name of the file that contains the value (default: 'value')
 *
 * @return {{name: *, value: *, onChange: (function(*=))}} the field attributes to handle the changes
 */


const handleChange = (component, fieldPath, formName, valueFieldName) => {
  const form = component.state[formName || 'form'] || (0, _Immutable.default)({});
  const valueField = valueFieldName || 'value';
  return {
    name: fieldPath,
    [valueField]: (0, _lo.get)(form, fieldPath),
    onChange: event => {
      onChange(component, event, formName || 'form');
    }
  };
};

exports.handleChange = handleChange;