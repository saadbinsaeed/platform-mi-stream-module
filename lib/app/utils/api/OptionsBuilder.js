"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("app/utils/utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Creates and manipulates the query's options to send to our API.
 */
class OptionsBuilder {
  /**
   * @param options the initial options.
   */
  constructor(options, config) {
    _defineProperty(this, "options", void 0);

    _defineProperty(this, "config", void 0);

    this.options = options || {};
    this.config = config || {
      legacyWhere: false
    };
  }
  /**
   * Adds a filter.
   *
   * @param condition the condition to add.
   * @return this builder.
   */


  filter(condition) {
    const filterByProp = this.config.legacyWhere ? 'where' : 'filterBy';
    let filterBy = this.options[filterByProp];

    if ((0, _utils.isObject)(filterBy)) {
      filterBy = [filterBy, condition];
    } else {
      filterBy = [...(filterBy || []), condition];
    }

    this.options = { ...this.options,
      [filterByProp]: filterBy
    };
    return this;
  }
  /**
   * Sets the specified order if the query does not specify any order.
   *
   * @param order the default order.
   * @return this builder.
   */


  defaultOrder(order) {
    if (!this.options.orderBy) {
      this.options.orderBy = Array.isArray(order) ? order : [order];
    }

    return this;
  }
  /**
   * Sets the start and stop indexes if the query does not specify them.
   *
   * @param startIndex the default start index.
   * @param stopIndex the default stop index.
   * @return this builder.
   */


  defaultStartStopIndexs(startIndex, stopIndex) {
    if (!(this.options.startIndex >= 0)) {
      this.options.startIndex = startIndex;
    }

    if (!(this.options.stopIndex >= 0)) {
      this.options.stopIndex = stopIndex;
    }

    return this;
  }
  /**
   * @return the options.
   */


  build() {
    return this.options;
  }

}

var _default = OptionsBuilder;
exports.default = _default;