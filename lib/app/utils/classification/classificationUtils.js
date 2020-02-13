"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSummaryElements = void 0;

const getFormElements = classes => {
  if (!classes || !classes.length) {
    return [];
  }

  return classes.reduce((formElements, {
    form_definitions
  }) => {
    if (form_definitions && form_definitions.fields && form_definitions.fields.length) {
      formElements.push(...form_definitions.fields);
    }

    return formElements;
  }, []);
};

const getSummaryElements = classes => {
  return getFormElements(classes).filter(element => element.summary);
};

exports.getSummaryElements = getSummaryElements;