"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripUnwanted = exports.isString = exports.cut = exports.uniqHash = exports.startsWith = void 0;

/**
 * Check if a string starts with a specified prefix.
 * Nulls values are handled without exceptions.
 * Two null references are considered to be equal.
 * The comparison is case sensitive.
 * <br/>
 * e.g.
 * <br/>
 * startsWith(null, null)      = true
 * startsWith(null, "abc")     = false
 * startsWith('abcdef', null)  = false
 * startsWith('abcdef', "abc") = true
 * startsWith('ABCDEF', "abc") = false
 *
 * @param string the string to check (may be null or undefined)
 * @param prefix the prefix to find (may be null or undefined)
 * @return {boolean} true if the string starts with the prefix, case sensitive, or both null (or undefined)
 */
const startsWith = (string, prefix) => {
  if (!string || !prefix) {
    return !string && !prefix;
  }

  return string.indexOf(prefix) === 0;
};
/**
 * Generate uniq hash string
 * @param number size of hash
 * @return {string} true if the string starts with the prefix, case sensitive, or both null (or undefined)
 */


exports.startsWith = startsWith;

const uniqHash = (size = 5) => `${Math.random().toString(36).substr(2, size)}`;
/**
 * Cut @text with @maxSize
 */


exports.uniqHash = uniqHash;

const cut = (text, maxSize, isTreeDots = true) => {
  if (text && text.length > maxSize) {
    const newText = text.slice(0, maxSize - 3);
    return isTreeDots ? `${newText}...` : newText;
  }

  return text;
};

exports.cut = cut;

const isString = value => typeof value === 'string';
/**
 * This function will be used to remove unwanted characters from given string
 * related issues are
 * https://gitlab.mi-c3.com/affectli-project/affectli-support-issues/issues/3188
 * https://gitlab.mi-c3.com/affectli-project/affectli-support-issues/issues/3190
 */


exports.isString = isString;

const stripUnwanted = str => {
  if (typeof str === 'string') {
    // eslint-disable-next-line no-control-regex
    return str.replace(/[\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000A\u000B\u000C\u000D\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001A\u001B\u001C\u001D\u001E\u001F\u007F\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F]/g, '');
  }

  return str;
};

exports.stripUnwanted = stripUnwanted;