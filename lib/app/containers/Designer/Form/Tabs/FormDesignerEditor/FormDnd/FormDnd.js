"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

var _DraggableElement = _interopRequireDefault(require("app/containers/Designer/Form/Tabs/FormDesignerEditor/FormDnd/DraggableElement"));

var _RowTarget = _interopRequireWildcard(require("app/containers/Designer/Form/Tabs/FormDesignerEditor/FormDnd/RowTarget"));

var _fieldUtils = require("app/utils/designer/form/fieldUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const OverlayWrapperStyled = _styledComponents.default.div.withConfig({
  displayName: "FormDnd__OverlayWrapperStyled",
  componentId: "sc-1amw7yi-0"
})(["position:absolute;top:0;left:0;right:0;bottom:0;z-index:1;transition:.2s;background:rgba(0,0,0,0.3);"]);

const DropHereStyled = _styledComponents.default.div.withConfig({
  displayName: "FormDnd__DropHereStyled",
  componentId: "sc-1amw7yi-1"
})(["height:128px;border:2px dashed white;display:flex;align-items:center;justify-content:center;"]);

const OverlayWrapperLabelStyled = _styledComponents.default.div.withConfig({
  displayName: "FormDnd__OverlayWrapperLabelStyled",
  componentId: "sc-1amw7yi-2"
})(["position:absolute;top:10px;right:0;z-index:1;transition:.2s;background:", ";padding:0 10px 0;border-radius:2px 0 0 2px;"], ({
  isSelected
}) => isSelected ? '#88B342' : '#1a6eaf');

const Error = (0, _react.memo)(({
  children
}) => _react.default.createElement("div", {
  style: {
    fontSize: '0.6em',
    color: '#C22525'
  }
}, children));
/*
 * Form DnD Context
 */

class FormDnd extends _react.PureComponent {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "searchDraggableElement", event => {
      this.setState({
        draggableElements: this.renderDraggableElements(event.target.value)
      });
      ;
    });

    _defineProperty(this, "renderDraggableElements", (search = '') => (0, _fieldUtils.getElementsDefinitions)().filter(({
      type
    }) => search ? type.includes(search) : true).map((element, i) => {
      const {
        type,
        defaults
      } = element;
      const properties = { ...defaults
      };

      switch (type) {
        case 'group':
          properties.style = {
            height: '40px'
          };
          break;

        case 'panel':
          properties.style = {
            margin: '20px'
          };
          properties.header = 'Panel';
          break;

        case 'outcome':
          properties.style = {
            margin: '20px 0 0 20px'
          };
          properties.label = 'Outcome';
          break;

        case 'label':
          properties.style = {
            margin: '20px 0 0 20px'
          };
          properties.text = 'Label';
          break;

        default:
      }

      return _react.default.createElement(_DraggableElement.default, {
        style: {
          margin: '.7rem 0',
          padding: '.5rem'
        },
        key: i,
        element: element
      }, (0, _fieldUtils.addExtraSpace)(type), (0, _fieldUtils.getFieldByType)(type, properties), _react.default.createElement(OverlayWrapperStyled, null), _react.default.createElement(OverlayWrapperLabelStyled, null, "#", element.type));
    }));

    _defineProperty(this, "onDrop", (props, monitor, component) => {
      const {
        index
      } = props;
      const item = { ...monitor.getItem()
      };

      if (item.uuid) {
        this.props.move(item, this.props.uuid, index);
      } else {
        this.props.add(item, this.props.uuid, index);
      }
    });

    _defineProperty(this, "deleteElement", event => {
      const index = Number(event.target.dataset.index);
      this.props.remove(this.state.elements[index]);
    });

    _defineProperty(this, "onSelectElement", index => {
      const {
        elements
      } = this.state;
      this.props.onSelectElement(elements[index]);
    });

    _defineProperty(this, "buildDropArea", (0, _memoizeOne.default)((elements, selectedElement, errors, isRoot) => {
      if (elements.length === 0) {
        return _react.default.createElement(_RowTarget.default, {
          key: 'empty',
          index: elements.length,
          onDrop: this.onDrop
        }, _react.default.createElement(DropHereStyled, null, " Drop here "));
      }

      const listItems = [...elements.map((element, i) => {
        const {
          uuid,
          type,
          properties,
          defaults
        } = element;
        const {
          name,
          header
        } = properties || {};
        let label = name || header;
        label = label ? `${label} (#${type})` : `#${type}`;
        const isSelected = selectedElement && selectedElement.uuid === uuid;
        const errorMessages = errors && errors[element.uuid] || [];

        const target = _react.default.createElement(_react.Fragment, null, (0, _fieldUtils.addExtraSpace)(type), (0, _fieldUtils.getFieldByType)(type, (0, _fieldUtils.fillProperties)({ ...properties,
          key: i
        }, defaults)), _react.default.createElement(OverlayWrapperStyled, null), _react.default.createElement(OverlayWrapperLabelStyled, {
          isSelected: isSelected
        }, label), errorMessages.map((message, i) => _react.default.createElement(Error, {
          key: i
        }, message)));

        let childrenElements = null;

        if (element.type === 'group' || element.type === 'panel') {
          childrenElements = _react.default.createElement(FormDnd, {
            uuid: element.uuid,
            add: this.props.add,
            move: this.props.move,
            remove: this.props.remove,
            elements: element.children,
            selectedElement: selectedElement,
            renderContent: ({
              dropArea
            }) => dropArea,
            onSelectElement: this.props.onSelectElement,
            errors: errors,
            root: false
          });

          if (element.children && element.children.length > 0) {
            childrenElements = _react.default.createElement("div", {
              style: {
                border: '2px dashed white'
              }
            }, childrenElements);
          }
        }

        return _react.default.createElement(_platformUi.ListItem, {
          key: i,
          selected: isSelected
        }, _react.default.createElement(_platformUi.ListItemText, {
          primary: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_DraggableElement.default, {
            key: i,
            index: i,
            element: element
          }, _react.default.createElement(_RowTarget.default, {
            index: i,
            onDrop: this.onDrop,
            label: label,
            element: element,
            onClick: () => this.onSelectElement(i)
          }, target)), childrenElements)
        }), !element.toRemove && _react.default.createElement(_platformUi.ListItemSecondaryAction, null, _react.default.createElement(_platformUi.IconButton, {
          "aria-label": "Delete"
        }, _react.default.createElement(_platformUi.MdiIcon, {
          "data-index": i,
          name: "close-circle",
          size: 24,
          onClick: this.deleteElement
        }))));
      }), _react.default.createElement(_RowTarget.EmptyRowTarget, {
        key: '-1',
        index: elements.length,
        onDrop: this.onDrop
      })];
      return _react.default.createElement(_platformUi.List, null, listItems);
    }));

    this.state = {
      elements: (this.props.elements || []).filter(({
        type
      }) => type),
      draggableElements: this.renderDraggableElements()
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.elements !== this.props.elements) {
      this.setState({
        elements: (this.props.elements || []).filter(({
          type
        }) => type)
      });
    }
  }
  /**
   * Called by RowTarget when the drop ends.
   */


  render() {
    const {
      selectedElement,
      errors,
      root
    } = this.props;
    const {
      elements
    } = this.state;
    return this.props.renderContent({
      dropArea: this.buildDropArea(elements, selectedElement, errors, root),
      draggableElements: this.state.draggableElements,
      searchDraggableElement: this.searchDraggableElement
    });
  }

}

_defineProperty(FormDnd, "propTypes", {
  renderContent: _propTypes.default.func.isRequired,
  elements: _propTypes.default.arrayOf(_propTypes.default.object),
  selectedElement: _propTypes.default.object,
  uuid: _propTypes.default.string.isRequired,
  add: _propTypes.default.func.isRequired,
  move: _propTypes.default.func.isRequired,
  remove: _propTypes.default.func.isRequired,
  onSelectElement: _propTypes.default.func.isRequired
});

;
var _default = FormDnd;
exports.default = _default;