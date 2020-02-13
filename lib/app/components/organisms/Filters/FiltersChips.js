"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _aboxConfig = require("app/config/aboxConfig");

var _date = require("app/utils/date/date");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _avatar = require("app/utils/avatar/avatar");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ChipStyled = (0, _styledComponents.default)(_platformUi.Chip).withConfig({
  displayName: "FiltersChips__ChipStyled",
  componentId: "sc-17djqa9-0"
})(["margin:1px;height:24px;", ""], ({
  theme,
  priority
}) => priority && `background: linear-gradient(45deg, ${theme.priorityGradients[priority][0]}, ${theme.priorityGradients[priority][1]}) !important;`);
const UserAvatar = (0, _styledComponents.default)(_platformUi.Avatar).withConfig({
  displayName: "FiltersChips__UserAvatar",
  componentId: "sc-17djqa9-1"
})(["background-color:", " !important;"], ({
  theme,
  name
}) => (0, _avatar.generateColor)(Object.values(theme.statusColors), name));
const ChipTooltip = (0, _react.memo)(({
  tooltip,
  ...restProps
}) => {
  const [isOpen, setTooltip] = (0, _react.useState)(false);
  const close = (0, _react.useCallback)(() => {
    setTooltip(false);
  }, [setTooltip]);
  const open = (0, _react.useCallback)(() => {
    setTooltip(true);
  }, [setTooltip]);
  return _react.default.createElement(_platformUi.ClickAwayListener, {
    onClickAway: close
  }, _react.default.createElement("div", null, _react.default.createElement(_platformUi.Tooltip, {
    PopperProps: {
      disablePortal: true
    },
    onClose: close,
    open: isOpen,
    disableFocusListener: true,
    disableHoverListener: true,
    disableTouchListener: true,
    title: tooltip
  }, _react.default.createElement(ChipStyled, _extends({}, restProps, {
    onClick: open
  })))));
});
let FiltersChips = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class FiltersChips extends _react.PureComponent {
  buildOnDelete(property) {
    return () => {
      this.props.onChange((0, _lo.set)(this.props.filters, property, null));
    };
  }

  parseTooltip(definition, filters, name, value) {
    let tooltip = value; // take Label from options if exist

    ((0, _lo.get)(definition, 'properties.options') || []).forEach(opt => {
      if ((0, _lo.get)(opt, 'value') === value) {
        tooltip = opt.label;
      }
    }); // define label by type

    switch (definition.type) {
      case 'userTypeahead':
        {
          const userName = (0, _utils.getStr)(filters, `${String(name)}.name`);
          tooltip = `${userName || ''} (${(0, _utils.getStr)(filters, `${String(name)}.login`) || ''})`;
          break;
        }

      case 'dateTimeRange':
        {
          tooltip = `${(0, _date.formatDate)(filters[name][0])} - ${(0, _date.formatDate)(filters[name][1])}`;
          break;
        }

      default:
    }

    return tooltip;
  }

  parseAvatar(definition, filters, name) {
    const {
      classes
    } = this.props;
    let avatar = null;

    switch (definition.type) {
      case 'userTypeahead':
        {
          const image = (0, _lo.get)(filters, `${String(name)}.image`);
          const userName = (0, _utils.getStr)(filters, `${String(name)}.name`);

          if (image) {
            avatar = _react.default.createElement(_platformUi.Avatar, {
              src: image,
              className: classes.avatar
            });
          } else if (userName) {
            avatar = _react.default.createElement(UserAvatar, {
              name: userName,
              className: classes.avatar
            }, (0, _avatar.createInitials)(userName));
          }

          break;
        }

      default:
    }

    return avatar;
  }

  buildChips(filters, filterDefinitions) {
    const {
      classes
    } = this.props;
    return Object.keys(filters).filter(name => filters[name] && name !== 'searchBar').map(name => {
      const definition = filterDefinitions.filter(def => name === (0, _lo.get)(def, 'properties.name'));
      const tooltip = this.parseTooltip(definition[0], filters, name, filters[name]);
      const avatar = this.parseAvatar(definition[0], filters, name);
      const extraProps = {};

      if (definition[0].field === 'priority') {
        extraProps.priority = (0, _aboxConfig.getPriorityColor)(filters[name]);
      }

      return _react.default.createElement(ChipTooltip, _extends({
        key: String(name),
        avatar: avatar,
        label: (0, _lo.get)(definition, '[0].properties.label'),
        onDelete: this.buildOnDelete(name),
        className: classes.chip,
        tooltip: tooltip,
        color: "primary"
      }, extraProps));
    });
  }

  render() {
    const {
      classes,
      filters,
      filterDefinitions
    } = this.props;
    return _react.default.createElement(_platformUi.Grid, {
      className: classes.appBar,
      container: true,
      spacing: 16,
      alignItems: "center"
    }, this.buildChips(filters, filterDefinitions));
  }

}, _defineProperty(_class2, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func.isRequired,
  filters: _propTypes.default.object.isRequired,
  filterDefinitions: _propTypes.default.array.isRequired
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "buildOnDelete", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "buildOnDelete"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "parseTooltip", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "parseTooltip"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "parseAvatar", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "parseAvatar"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildChips", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildChips"), _class.prototype)), _class));
;

const styles = theme => ({
  appBar: {
    margin: '8px 0px',
    width: '100%'
  },
  chip: {
    height: '24px',
    margin: '0 4px'
  },
  avatar: {
    width: '24px',
    height: '24px'
  }
});

var _default = (0, _platformUi.withStyles)(styles)(FiltersChips);

exports.default = _default;