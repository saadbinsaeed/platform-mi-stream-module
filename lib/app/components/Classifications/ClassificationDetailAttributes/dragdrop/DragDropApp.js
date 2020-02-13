"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _List = _interopRequireDefault(require("./List"));

var _dragDropUtils = require("./dragDropUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*const Column = styled.div`
    margin: 0 16px;
`;*/

/**
 *
 */
class DragDropApp extends _react.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "manipulateInputData", fields => {
      const matrix = (fields || []).map(arr => arr.map(item => ({
        id: item.f_uri,
        ...item
      })));
      const obj = {};
      matrix.forEach((data, index) => {
        obj[data[0].group_name] = data;
      });
      return obj;
    });

    _defineProperty(this, "onDragStart", initial => {});

    _defineProperty(this, "onDragEnd", dropResult => {
      if (!dropResult.destination) return;
      const groups = (0, _dragDropUtils.moveField)(this.state.fields, dropResult);
      this.props.handleChange(groups);
    });

    this.state = {
      fields: this.manipulateInputData(props.fields)
    };
  }
  /**
   * componentWillReceiveProps - description
   *
   * @param  {type} nextProps description
   * @return {type}           description
   */


  componentWillReceiveProps(nextProps) {
    if (this.props.fields !== nextProps.fields) {
      this.setState({
        fields: this.manipulateInputData(nextProps.fields)
      });
    }
  }
  /**
   * This function will take the input Array
   * and convert it to an object structure with each key
   * represents the group name
   */


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const {
      fields
    } = this.state;
    const {
      canEdit,
      classId
    } = this.props;
    return _react.default.createElement(_reactBeautifulDnd.DragDropContext, {
      onDragStart: this.onDragStart,
      onDragEnd: this.onDragEnd
    }, _react.default.createElement("div", null, Object.keys(fields).map(key => {
      return _react.default.createElement(_Card.default, {
        key: key,
        collapsible: true,
        title: key,
        description: _react.default.createElement(_List.default, {
          classId: classId,
          key: key,
          title: key,
          listId: key,
          listType: "card",
          groupData: fields[key],
          canEdit: canEdit,
          removeListItem: this.props.removeListItem
        })
      });
    })));
  }

}

exports.default = DragDropApp;

_defineProperty(DragDropApp, "propTypes", {
  fields: _propTypes.default.any,
  removeListItem: _propTypes.default.func,
  handleChange: _propTypes.default.func,
  canEdit: _propTypes.default.bool,
  classId: _propTypes.default.number
});