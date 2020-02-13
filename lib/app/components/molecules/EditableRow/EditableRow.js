"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Container = _styledComponents.default.div.withConfig({
  displayName: "EditableRow__Container",
  componentId: "sc-17o60so-0"
})(["display:flex;justify-content:space-between;"]);

const ActionIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "EditableRow__ActionIcon",
  componentId: "sc-17o60so-1"
})(["margin-left:8px;line-height:0;"]);
/**
 *
 */

class EditableRow extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "unmouted", false);

    _defineProperty(this, "elementRef", _react.default.createRef());

    _defineProperty(this, "state", {
      editing: false
    });

    _defineProperty(this, "getInput", () => {
      const ref = this.elementRef.current;
      return ref && (ref.querySelector('input') || ref.querySelector('textarea') || ref.querySelector('select'));
    });

    _defineProperty(this, "setFocus", () => {
      const input = this.getInput();
      input && input.focus();
    });

    _defineProperty(this, "enableEditing", () => {
      this.setState({
        editing: true,
        value: this.props.value
      }, this.setFocus);
    });

    _defineProperty(this, "disableEditing", () => {
      setTimeout(() => !this.unmouted && this.setState({
        editing: false
      }), 300);
    });

    _defineProperty(this, "onChange", event => {
      const {
        name,
        value
      } = event.target || event;
      this.setState({
        name,
        value
      }, this.props.onChange && this.props.onChange(event));
    });

    _defineProperty(this, "onSave", () => {
      const {
        name
      } = this.props;
      const {
        value
      } = this.state;

      if (value !== undefined) {
        // if the value is changed
        this.props.save({
          name,
          value,
          target: {
            name,
            value
          }
        });
      }

      this.disableEditing();
    });
  }

  componentWillUnmount() {
    this.unmouted = true;
  } // $FlowFixMe


  render() {
    const {
      EditComponent,
      showClose,
      disabled,
      name
    } = this.props;
    const {
      value
    } = this.state;
    return _react.default.createElement(Container, {
      innerRef: this.elementRef,
      onBlur: showClose ? null : this.disableEditing
    }, this.state.editing ? _react.default.createElement(_Flex.default, {
      grow: true,
      spaceBetween: true
    }, _react.default.createElement(EditComponent, {
      name: name,
      value: value,
      onChange: this.onChange
    }), showClose && _react.default.createElement(ActionIcon, {
      name: "close",
      onClick: this.disableEditing
    }), _react.default.createElement(ActionIcon, {
      name: "content-save",
      onClick: this.onSave
    })) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Flex.default, {
      grow: true,
      spaceBetween: true,
      style: {
        overflow: 'hidden'
      }
    }, this.props.children), _react.default.createElement(_Flex.default, null, !disabled && _react.default.createElement(ActionIcon, {
      name: "pencil",
      onClick: this.enableEditing
    }))));
  }

}

_defineProperty(EditableRow, "propTypes", {
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.any,
  save: _propTypes.default.func.isRequired,
  EditComponent: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func
});

var _default = EditableRow;
exports.default = _default;