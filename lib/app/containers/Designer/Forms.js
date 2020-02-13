"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

var _VirtualListItem = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListItem"));

var _VirtualListManaged = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListManaged"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _TextIcon = _interopRequireDefault(require("app/components/molecules/TextIcon/TextIcon"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _AddForm = _interopRequireDefault(require("app/components/Designer/Modals/AddForm"));

var _DuplicateForm = _interopRequireDefault(require("app/components/Designer/Modals/DuplicateForm"));

var _ShareForm = _interopRequireDefault(require("app/components/Designer/Modals/ShareForm"));

var _DeleteForm = _interopRequireDefault(require("app/components/Designer/Modals/DeleteForm"));

var _FormLink = _interopRequireDefault(require("app/components/atoms/Link/FormLink"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _History = _interopRequireDefault(require("store/History"));

var _designerActions = require("store/actions/designer/designerActions");

var _date = require("app/utils/date/date");

var _hooks = require("app/utils/hook/hooks");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ListItemStyled = (0, _styledComponents.default)(_ListItem.default).withConfig({
  displayName: "Forms__ListItemStyled",
  componentId: "sc-1mj9m4x-0"
})(["width:100%;max-width:1000px;margin:0 auto;"]);

const useToggleMenu = showMenu => {
  const [isOpen, show] = (0, _react.useState)(false);
  const toggle = (0, _react.useCallback)(() => {
    showMenu(false);
    show(!isOpen);
  }, [isOpen, showMenu, show]);
  return [isOpen, toggle];
};

const FormItem = (0, _react.memo)(({
  form,
  onActionComplete
}) => {
  const {
    name,
    id,
    modifiedBy,
    modified,
    version
  } = form;
  const anchorEl = (0, _react.useRef)(null);
  const [isMenuOpen, toggleMenu, showMenu] = (0, _hooks.useToggle)();
  const [isDuplicateFormOpen, toggleDuplicateForm] = useToggleMenu(showMenu);
  const [isDeleteFormOpen, toggleDeleteForm] = useToggleMenu(showMenu);
  const [isShareFormOpen, toggleShareForm] = useToggleMenu(showMenu);
  return _react.default.createElement(ListItemStyled, {
    component: _react.default.createElement(_Icon.default, {
      name: "ballot",
      size: "lg"
    }),
    title: _react.default.createElement(_FormLink.default, {
      id: id
    }, name),
    subTitle: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_FormLink.default, {
      id: id
    }, "#", id), ", v.", version, modifiedBy && _react.default.createElement("div", null, "Updated By ", _react.default.createElement(_PeopleLink.default, {
      id: modifiedBy.id
    }, modifiedBy.name), ",", ' ', (0, _date.fromNow)(modified))),
    actions: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_platformUi.IconButton, {
      buttonRef: anchorEl,
      onClick: toggleMenu
    }, _react.default.createElement(_platformUi.MdiIcon, {
      name: "dots-vertical"
    })), _react.default.createElement(_platformUi.Menu, {
      open: isMenuOpen,
      anchorEl: anchorEl.current,
      onClose: toggleMenu
    }, _react.default.createElement(_platformUi.MenuItem, {
      onClick: toggleDuplicateForm
    }, "Duplicate form"), _react.default.createElement(_platformUi.MenuItem, {
      onClick: toggleDeleteForm
    }, "Delete form"), _react.default.createElement(_platformUi.MenuItem, {
      onClick: toggleShareForm
    }, "Share form")), isDuplicateFormOpen && _react.default.createElement(_DuplicateForm.default, {
      form: form,
      close: toggleDuplicateForm,
      onDuplicate: onActionComplete
    }), isDeleteFormOpen && _react.default.createElement(_DeleteForm.default, {
      form: form,
      close: toggleDeleteForm,
      onDelete: onActionComplete
    }), isShareFormOpen && _react.default.createElement(_ShareForm.default, {
      form: form,
      close: toggleShareForm,
      onShare: onActionComplete
    })),
    raised: true
  });
});
/**
 * View to display assigned task list
 */

class Forms extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "virtualListRef", _react.default.createRef());

    _defineProperty(this, "state", {
      isAddFormOpen: false
    });

    _defineProperty(this, "filterDefinitions", [{
      field: 'name',
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      }
    }, {
      field: 'id',
      type: 'number',
      properties: {
        label: 'ID',
        name: 'name'
      }
    }, {
      field: 'createdBy.name',
      type: 'text',
      properties: {
        label: 'Created by',
        name: 'createdByName'
      },
      condition: 'startsWith'
    }, {
      field: 'modifiedBy.name',
      type: 'text',
      properties: {
        label: 'Updated by',
        name: 'modifiedByName'
      },
      condition: 'startsWith'
    }, {
      field: 'modified',
      type: 'dateTimeRange',
      properties: {
        label: 'Last update',
        name: 'modified'
      }
    }, {
      field: 'created',
      type: 'dateTime',
      properties: {
        label: 'Created',
        name: 'created'
      },
      filters: false
    }]);

    _defineProperty(this, "searchBar", ['name', 'id']);

    _defineProperty(this, "defaultOrder", [{
      field: 'created',
      direction: 'desc'
    }]);

    _defineProperty(this, "renderComponent", ({
      style,
      index,
      data,
      resize
    }) => {
      return _react.default.createElement(_VirtualListItem.default, {
        style: style,
        key: index,
        index: index,
        resize: resize,
        padding: 15
      }, _react.default.createElement(FormItem, {
        form: data,
        onActionComplete: (0, _lo.get)(this.virtualListRef, 'current.resetView')
      }));
    });

    _defineProperty(this, "toggleAddForm", () => this.setState({
      isAddFormOpen: !this.state.isAddFormOpen
    }));

    _defineProperty(this, "onFormAdded", id => _History.default.push(`/designer/form/${id}`));
  }

  render() {
    const {
      totalRecords,
      records,
      isLoading,
      startIndex,
      loadDesignerForms,
      createFormDefinition
    } = this.props;
    const {
      isAddFormOpen
    } = this.state;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Forms"
    }, _react.default.createElement(_Layout.default, null, _react.default.createElement(_Filters.default, {
      id: "DesignerForms",
      filterDefinitions: this.filterDefinitions,
      defaultOrder: this.defaultOrder,
      searchBar: this.searchBar
    }, (filterBy, orderBy) => _react.default.createElement(_VirtualListManaged.default, {
      ref: this.virtualListRef,
      renderComponent: this.renderComponent,
      itemSize: 121,
      itemCount: totalRecords || 0,
      loadData: loadDesignerForms,
      isLoading: isLoading,
      startIndex: startIndex || 0,
      filterBy: filterBy,
      orderBy: orderBy,
      list: records,
      maxWidth: "1024",
      title: `${totalRecords >= 1000 ? '999+' : totalRecords} Forms`
    }))), _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_TextIcon.default, {
      icon: "plus",
      label: "Add form",
      onClick: this.toggleAddForm
    })), _react.default.createElement(_AddForm.default, {
      open: isAddFormOpen,
      onClose: this.toggleAddForm,
      addForm: createFormDefinition,
      onFormAdded: this.onFormAdded
    }));
  }

}

_defineProperty(Forms, "propTypes", {
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  loadDesignerForms: _propTypes.default.func.isRequired,
  createFormDefinition: _propTypes.default.func.isRequired
});

_defineProperty(Forms, "defaultProps", {
  isLoading: false
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.designer.forms.isLoading,
  startIndex: state.designer.forms.startIndex,
  records: state.designer.forms.records,
  totalRecords: state.designer.forms.count
}), {
  loadDesignerForms: _designerActions.loadDesignerForms,
  createFormDefinition: _designerActions.createFormDefinition
})(Forms);

exports.default = _default;