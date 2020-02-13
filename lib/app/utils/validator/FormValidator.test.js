"use strict";

var _FormValidator = _interopRequireDefault(require("./FormValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('validate form', () => {
  test('required', () => {
    expect(true).toBeTruthy();
    const formDefinition = [{
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      },
      constraints: {
        required: true
      }
    }, {
      type: 'textarea',
      properties: {
        label: 'Description',
        name: 'description'
      }
    }, {
      type: 'boolean',
      properties: {
        label: 'Done',
        name: 'done'
      }
    }];
    const validator = new _FormValidator.default(formDefinition);
    let data = {
      name: 'TODO',
      description: 'test validator',
      done: false
    };
    expect(validator.isValid(data)).toBeTruthy();
    data = {
      name: '',
      description: 'test validator',
      done: false
    };
    expect(validator.isValid(data)).toBeFalsy();
    expect(validator.getMessages()).toEqual(['Name is required.']);
    const errors = validator.getErrors(data);
    expect(errors).toBeTruthy();
    expect(Object.keys(errors).length).toEqual(1);
    expect(errors['name']).toEqual(['{label} is required.']);
    const components = validator.getComponents('name');
    expect(Array.isArray(components)).toBeTruthy();
    expect(components.length).toEqual(1);
    expect(validator.formatMessages('name', components[0])).toEqual(['Name is required.']);
    data = {
      name: 'Just with name'
    };
    expect(validator.isValid(data)).toBeTruthy();
    data = {
      description: 'Just with description'
    };
    expect(validator.isValid(data)).toBeFalsy();
    expect(validator.getMessages()).toEqual(['Name is required.']);
    data = {
      done: false
    };
    expect(validator.isValid(data)).toBeFalsy();
    data = {};
    expect(validator.isValid(data)).toBeFalsy();
  });
  test('multiple errors', () => {
    expect(true).toBeTruthy();
    const formDefinition = [{
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      },
      constraints: {
        required: true
      }
    }, {
      type: 'textarea',
      properties: {
        label: 'Description',
        name: 'description'
      }
    }, {
      type: 'boolean',
      properties: {
        label: 'Done',
        name: 'done'
      }
    }];
    const validator = new _FormValidator.default(formDefinition);
    let data = {
      name: 'TODO',
      description: 'test validator',
      done: false
    };
    expect(validator.isValid(data)).toBeTruthy();
    data = {
      name: '',
      description: false,
      done: 'ok'
    };
    expect(validator.isValid(data)).toBeFalsy();
    expect(validator.getMessages(data)).toEqual(['Name is required.', 'Done must be a boolean.']);
    expect(Object.keys(validator.getErrors(data)).sort()).toEqual(['done', 'name']);
  });
});