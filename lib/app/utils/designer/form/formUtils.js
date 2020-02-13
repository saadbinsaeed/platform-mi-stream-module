"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.denormalizeFields = exports.normalizeFields = void 0;

var _lo = require("app/utils/lo/lo");

var _FormField = require("app/containers/Designer/Form/components/FormField");

const _eval = js => {
  try {
    return eval(js); // eslint-disable-line no-eval
  } catch (e) {
    return null;
  }
};

const normalize = field => {
  let normalized = field;

  switch (field.type) {
    case 'typeahead':
      if (field.properties.fetchData) {
        normalized = (0, _lo.set)(normalized, 'properties.fetchData', _eval(field.properties.fetchData));
      }

      if (field.properties.staticOptions) {
        normalized = (0, _lo.set)(normalized, 'properties.staticOptions', JSON.parse(field.properties.staticOptions));
      }

      break;

    case 'textarea':
      {
        const {
          parseAs,
          value
        } = field.properties;

        if (parseAs === 'javascript') {
          normalized = (0, _lo.set)(normalized, 'properties.value', _eval(value));
        } else if (parseAs === 'HTML') {
          const div = document.createElement('div');
          div.innerHTML = value;
          normalized = (0, _lo.set)(normalized, 'properties.value', div);
        }

        break;
      }

    default:
  }

  if (field.properties.help) {
    const div = document.createElement('div');
    div.innerHTML = field.properties.help;
    normalized = (0, _lo.set)(normalized, 'properties.help', div);
  }

  _FormField.events.forEach(handler => {
    if (field.properties[handler]) {
      normalized = (0, _lo.set)(normalized, `properties.${handler}`, _eval(field.properties[handler]));
    }
  });

  if (field.children) {
    normalized.children = field.children.map(normalize);
  }

  return normalized;
};

const normalizeFields = fields => fields && fields.filter(f => f && f.type === 'react').map(field => {
  const {
    miconfig
  } = field;

  try {
    const meta = miconfig ? JSON.parse(miconfig) : {};
    return normalize(meta);
  } catch (e) {
    console.warn('invalid form field', field); // eslint-disable-line no-console

    return null;
  }
});

exports.normalizeFields = normalizeFields;

const _stringify = field => {
  let stringifiable = field;

  switch (field.type) {
    case 'typeahead':
      if (field.properties.fetchData) {
        stringifiable = (0, _lo.set)(stringifiable, 'properties.fetchData', String(field.properties.fetchData));
      }

      if (field.properties.staticOptions) {
        stringifiable = (0, _lo.set)(stringifiable, 'properties.staticOptions', String(field.properties.staticOptions));
      }

      break;

    case 'textarea':
      {
        const {
          parseAs,
          value
        } = field.properties;

        if (parseAs === 'javascript') {
          stringifiable = (0, _lo.set)(stringifiable, 'properties.value', String(value));
        } else if (parseAs === 'HTML') {
          stringifiable = (0, _lo.set)(stringifiable, 'properties.value', value.innerHtml);
        }

        break;
      }

    default:
  }

  if (field.properties.help) {
    stringifiable = (0, _lo.set)(stringifiable, 'properties.help', field.properties.help.innerHTML);
  }

  _FormField.events.forEach(handler => {
    if (field.properties[handler]) {
      stringifiable = (0, _lo.set)(stringifiable, `properties.${handler}`, String(field.properties[handler]));
    }
  });

  if (field.children) {
    stringifiable.children = field.children.map(_stringify);
  }

  return stringifiable;
};

const stringify = field => JSON.stringify(_stringify(field));

const denormalizeFields = fields => fields && fields.map(field => {
  try {
    const miconfig = field && stringify(field);
    return {
      type: 'react',
      miconfig
    };
  } catch (e) {
    console.warn('cannot denormalize field', field); // eslint-disable-line no-console

    return null;
  }
}).filter(f => f);

exports.denormalizeFields = denormalizeFields;