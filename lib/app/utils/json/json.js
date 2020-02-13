"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperties = void 0;

const _addJsonPaths = (value, parentPath, paths, deepIntoArray) => {
  if (!value || typeof value !== 'object') {
    if (parentPath) {
      paths.push(parentPath);
    }

    return;
  }

  if (Array.isArray(value)) {
    if (deepIntoArray) {
      value.forEach((item, index) => {
        const path = parentPath ? `${parentPath}[${index}]` : `[${index}]`;

        _addJsonPaths(item, path, paths);
      });
    } else {
      if (parentPath) {
        paths.push(parentPath);
      }

      return;
    }
  } else {
    Object.entries(value).forEach(([key, item]) => {
      const path = parentPath ? `${parentPath}.${key}` : key;

      _addJsonPaths(item, path, paths, deepIntoArray);
    });
  }
};

const getProperties = (json, deepIntoArray) => {
  const paths = [];

  _addJsonPaths(json, '', paths, deepIntoArray);

  return paths;
};

exports.getProperties = getProperties;