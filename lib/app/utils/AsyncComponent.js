"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncComponent;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/* eslint-disable react/no-did-mount-set-state */

/**
 * Create a component that we can use to code split and dynamically load using react router
 * @param importComponent
 * @returns {AsyncComponent}
 */
function asyncComponent(importComponent) {
  /**
   * Render our async component
   */
  class AsyncComponent extends _react.Component {
    /**
     * Set our initial state
     * @param props
     */
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    /**
     * Mount the component once this async component has mounted in the dom
     * @returns {Promise.<void>}
     */


    async componentDidMount() {
      const {
        default: component
      } = await importComponent();
      this.setState({
        component
      });
    }
    /**
     * Render our async component
     * @returns {*}
     */


    render() {
      const C = this.state.component;
      return C ? _react.default.createElement(C, this.props) : null;
    }

  }

  return AsyncComponent;
}