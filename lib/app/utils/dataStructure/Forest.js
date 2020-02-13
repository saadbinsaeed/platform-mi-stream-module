"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Forest {
  constructor(_nodes, uuid) {
    _defineProperty(this, "nodes", void 0);

    _defineProperty(this, "uuid", void 0);

    _defineProperty(this, "remove", element => {
      this.nodes = this._remove(this.nodes, element.uuid);
      return this;
    });

    _defineProperty(this, "update", element => {
      this.nodes = this._update(this.nodes, element);
      return this;
    });

    _defineProperty(this, "move", (element, parentUuid, index) => {
      const nodes = this._remove(this.nodes, element.uuid);

      this.nodes = this._add(this.uuid, nodes, element, parentUuid, index);
      return this;
    });

    this.nodes = this._addUuid(_nodes);
    this.uuid = uuid || (0, _v.default)();
  }

  /**
   * Adds an uuid to all the nodes in a forest (a forest is a collection of independent tree).
   *
   * @param forest a collection of trees.
   */
  _addUuid(forest) {
    return (forest || []).filter(({
      type
    }) => type).map(node => {
      if (!node.children) {
        // the node is a leaf
        if (!node.uuid) {
          return { ...node,
            uuid: (0, _v.default)()
          };
        }

        return node;
      }

      const nextChildren = this._addUuid(node.children);

      if (!node.uuid || nextChildren !== node.children) {
        return { ...node,
          uuid: node.uuid || (0, _v.default)(),
          children: nextChildren
        };
      }

      return node;
    });
  }

  /**
   * Removes the uuid from all the nodes in a forest (a forest is a collection of independent tree).
   *
   * @param forest a collection of trees.
   */
  _removeUuid(forest) {
    return (forest || []).filter(({
      type
    }) => type).map(node => {
      if (!node.children) {
        // the node is a leaf
        const {
          uuid,
          ...rest
        } = node;
        return rest;
      }

      const nextChildren = this._removeUuid(node.children);

      const {
        uuid,
        ...rest
      } = node;
      return { ...rest,
        children: nextChildren
      };
    });
  }

  _add(currentUuid, elements, elementToAdd, parentUuid, index) {
    if (currentUuid === parentUuid) {
      const next = [...elements];
      next.splice(index, 0, elementToAdd);
      return next;
    }

    return elements.map(element => {
      const {
        type,
        children = []
      } = element;

      if (type !== 'group' && type !== 'panel') {
        return element;
      }

      const nextChildren = this._add(element.uuid, children, elementToAdd, parentUuid, index);

      if (nextChildren === element.children) {
        return element;
      }

      return { ...element,
        children: nextChildren
      };
    });
  }

  _remove(elements, uuid) {
    const next = elements.filter(element => element.uuid !== uuid);

    if (next.length !== elements.length) {
      return next;
    }

    return elements.map(element => {
      if (!element.children) {
        return element;
      }

      const nextChildren = this._remove(element.children, uuid);

      if (nextChildren === element.children) {
        return element;
      }

      return { ...element,
        children: nextChildren
      };
    });
  }

  _update(elements, updatedElement) {
    return elements.map(element => {
      if (updatedElement.uuid === element.uuid) {
        return updatedElement;
      }

      if (!element.children) {
        return element;
      }

      const nextChildren = this._update(element.children, updatedElement);

      if (nextChildren === element.children) {
        return element;
      }

      return { ...element,
        children: nextChildren
      };
    });
  }

  /**
   * Returns all the nodes of this forest without the UUID.
   * Every time the method is called a new forest will be generated.
   */
  getNodes() {
    return this._removeUuid(this.nodes);
  }

  add(node, parentUuid, index) {
    this.nodes = this._add(this.uuid, this.nodes, { ...node,
      uuid: node.uuid || (0, _v.default)()
    }, parentUuid, index);
    return this;
  }

}

exports.default = Forest;