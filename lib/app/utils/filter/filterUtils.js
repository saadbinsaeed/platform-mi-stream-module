"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startsWith = exports.includes = void 0;

/**
 * Filter the elements in the given list.
 *
 * @param list a list of items.
 * @param query the text to search.
 * @param options.type: the method to use to match the item.
 * @param options.property: the property of the object to match.
 * @param options.caseSensitive: indicates if the search must be case sensitive.
 */
const filter = (list, query, {
  type,
  property,
  caseSensitive
}) => {
  if (!list) {
    return [];
  }

  let q = (query || '').trim();

  if (!caseSensitive) {
    q = query.toLowerCase();
  }

  if (!q) {
    return [...list];
  }

  return list.filter(item => {
    let text = String((item && typeof item === 'object' && property ? item[property] : item) || '').trim();

    if (!caseSensitive) {
      text = text.toLowerCase();
    } // $FlowFixMe


    return text[type](q);
  });
};

const startsWith = (list, query, options) => filter(list, query, { ...options,
  type: 'startsWith'
});

exports.startsWith = startsWith;

const includes = (list, query, options) => filter(list, query, { ...options,
  type: 'includes'
});

exports.includes = includes;