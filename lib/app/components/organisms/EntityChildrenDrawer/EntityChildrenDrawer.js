"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

var _utils = require("app/utils/utils");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _EntityChildrenDrawerChild = _interopRequireDefault(require("app/components/organisms/EntityChildrenDrawer/EntityChildrenDrawerChild"));

var _entityChildrenDrawerActions = require("store/actions/entityChildrenDrawer/entityChildrenDrawerActions");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Input = _interopRequireDefault(require("app/components/atoms/Input/Input"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _lo = require("app/utils/lo/lo");

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DrawerHeader = _styledComponents.default.div.withConfig({
  displayName: "EntityChildrenDrawer__DrawerHeader",
  componentId: "sc-1ni1run-0"
})(["display:flex;flex-direction:column;"]);

const StyledAvatar = (0, _styledComponents.default)(_Avatar.default).withConfig({
  displayName: "EntityChildrenDrawer__StyledAvatar",
  componentId: "sc-1ni1run-1"
})(["margin-right:5px;"]);

const DrawerHeaderTop = _styledComponents.default.div.withConfig({
  displayName: "EntityChildrenDrawer__DrawerHeaderTop",
  componentId: "sc-1ni1run-2"
})(["display:flex;flex-direction:row;justify-content:space-between;padding:20px 10px 10px 10px;"]);

const HeaderDataContainer = _styledComponents.default.div.withConfig({
  displayName: "EntityChildrenDrawer__HeaderDataContainer",
  componentId: "sc-1ni1run-3"
})(["display:flex;"]);

const HeaderTextContainer = _styledComponents.default.div.withConfig({
  displayName: "EntityChildrenDrawer__HeaderTextContainer",
  componentId: "sc-1ni1run-4"
})(["display:flex;flex-direction:column;"]);

const DrawerHeaderEntityName = _styledComponents.default.h1.withConfig({
  displayName: "EntityChildrenDrawer__DrawerHeaderEntityName",
  componentId: "sc-1ni1run-5"
})(["margin:0;padding:0 5px;"]);

const DrawerHeaderEntityId = _styledComponents.default.h2.withConfig({
  displayName: "EntityChildrenDrawer__DrawerHeaderEntityId",
  componentId: "sc-1ni1run-6"
})(["margin:0;padding:0 5px;"]);

const DrawerHeaderInput = (0, _styledComponents.default)(_Input.default).withConfig({
  displayName: "EntityChildrenDrawer__DrawerHeaderInput",
  componentId: "sc-1ni1run-7"
})(["width:calc(100% - 20px );margin:0 10px 0 10px;"]);
const StyledTitleText = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "EntityChildrenDrawer__StyledTitleText",
  componentId: "sc-1ni1run-8"
})(["max-width:160px;display:block;white-space:nowrap;"]);

const Par = _styledComponents.default.p.withConfig({
  displayName: "EntityChildrenDrawer__Par",
  componentId: "sc-1ni1run-9"
})(["padding:1rem;"]);

const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "EntityChildrenDrawer__StyledLink",
  componentId: "sc-1ni1run-10"
})(["text-decoration:none;&:hover{text-decoration:underline;}"]);

const CourtesyText = _styledComponents.default.p.withConfig({
  displayName: "EntityChildrenDrawer__CourtesyText",
  componentId: "sc-1ni1run-11"
})(["text-align:left;margin:0;font-size:0.9rem;"]);

/**
 * EntityChildrenDrawer to display children navigation for entities
 */
class EntityChildrenDrawer extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      searchText: ''
    });

    _defineProperty(this, "onClose", () => {
      this.load(null);
      this.props.closeChildrenDrawer();
    });

    _defineProperty(this, "getLink", id => {
      return this.props.location.pathname.replace((0, _lo.get)(this, 'props.match.params.id') || '', id);
    });

    _defineProperty(this, "onSearchTextChange", event => {
      // TODO: maybe add debounce?
      event.preventDefault();
      const {
        value
      } = event.target;
      this.setState({
        searchText: (value || '').toLowerCase()
      });
    });

    _defineProperty(this, "load", id => {
      this.setState({
        searchText: ''
      });
      this.props.loadChildren(id);
    });

    _defineProperty(this, "loadParent", event => {
      event.preventDefault();

      if (this.props.entity && this.props.entity.parent && this.props.entity.parent.id) {
        this.load(this.props.entity.parent.id);
      }
    });

    _defineProperty(this, "renderDrawerHeader", ({
      toggleDrawer
    }) => {
      const {
        name = '',
        id = '',
        image = '',
        parent = false
      } = this.props.entity || {};
      return _react.default.createElement(DrawerHeader, null, _react.default.createElement(DrawerHeaderTop, null, _react.default.createElement("div", null, !this.props.entity ? _react.default.createElement(_Icon.default, {
        color: 'red',
        colorIndex: 2,
        name: 'information'
      }) : parent && parent.id && _react.default.createElement(_ButtonIcon.default, {
        icon: "chevron-left",
        onClick: this.loadParent
      })), _react.default.createElement("div", null, !name && !id ? !this.props.entity ? _react.default.createElement(CourtesyText, null, 'You don\'t have permission', _react.default.createElement("br", null), "to access parent #", this.props.currentId) : _react.default.createElement(_Loader.default, null) : _react.default.createElement(HeaderDataContainer, null, _react.default.createElement(StyledAvatar, {
        src: image,
        name: name,
        size: "xl"
      }), _react.default.createElement(HeaderTextContainer, null, _react.default.createElement(DrawerHeaderEntityName, null, _react.default.createElement(StyledLink, {
        to: this.getLink(id)
      }, _react.default.createElement(StyledTitleText, {
        title: name
      }, name))), _react.default.createElement(DrawerHeaderEntityId, null, "#", id)))), _react.default.createElement("div", null, _react.default.createElement(_ButtonIcon.default, {
        icon: "close",
        onClick: toggleDrawer
      }))), _react.default.createElement(DrawerHeaderInput, {
        type: "text",
        value: this.state.searchText,
        onChange: this.onSearchTextChange,
        placeholder: "Search...",
        title: 'Search for children name'
      }));
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(0, _utils.deepEquals)(this.props, nextProps) || !(0, _utils.deepEquals)(this.state, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && this.props.isOpen !== prevProps.isOpen) {
      this.load((0, _utils.getNum)(this, 'props.match.params.id') || 0);
    }
  }

  componentWillUnmount() {
    this.props.closeChildrenDrawer();
    this.props.loadChildren(null);
  }

  renderContent() {
    if (!this.props.isOpen) {
      return null;
    }

    if (this.props.isLoading) {
      return _react.default.createElement(_Loader.default, null);
    }

    if (!this.props.children || !this.props.children.length) {
      return _react.default.createElement(Par, null, "No children found."); // TODO: clarify massage from requirements
    }

    const children = this.constructor.getChildren(this.props.children, this.state.searchText);

    if (!children || !children.length) {
      return _react.default.createElement(Par, null, "No children found for searched text \"", this.state.searchText, "\""); // TODO: clarify massage from requirements
    }

    return children.map((child, index) => _react.default.createElement(_EntityChildrenDrawerChild.default, _extends({}, child, {
      key: index,
      getLink: this.getLink,
      load: this.load,
      className: String(child.id) === String(this.props.match.params.id) ? 'selected' : ''
    })));
  }

  render() {
    return _react.default.createElement(_Drawer.default, {
      DrawerHeader: this.renderDrawerHeader,
      isOpen: this.props.isOpen,
      isToggled: this.onClose,
      drawerContentPadding: '0px'
    }, this.renderContent());
  }

}

_defineProperty(EntityChildrenDrawer, "defaultProps", {
  isOpen: false,
  children: []
});

_defineProperty(EntityChildrenDrawer, "getChildren", (0, _memoizeOne.default)((children, searchText) => {
  if (!children || !children.length) {
    return false;
  }

  if (!searchText) {
    return children;
  }

  return children.filter(({
    name
  }) => name.toLowerCase().includes(searchText));
}));

var _default = (0, _reactRedux.connect)(state => {
  const {
    entity = {},
    entities = []
  } = state.entityChildrenDrawer.data || {};
  return {
    isOpen: state.entityChildrenDrawer.isOpen,
    isLoading: state.entityChildrenDrawer.isLoading,
    entity,
    children: entities,
    currentId: state.entityChildrenDrawer.currentId
  };
}, {
  loadChildren: _entityChildrenDrawerActions.loadEntityChildrenDrawer,
  closeChildrenDrawer: _entityChildrenDrawerActions.closeEntityChildrenDrawer
})((0, _reactRouter.withRouter)(EntityChildrenDrawer));

exports.default = _default;