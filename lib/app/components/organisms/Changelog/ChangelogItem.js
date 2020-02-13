"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _polished = require("polished");

var _reactRouterDom = require("react-router-dom");

var _aboxConfig = require("app/config/aboxConfig");

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _ItemColumn = _interopRequireDefault(require("app/components/molecules/List/ItemColumn"));

var _ItemRow = _interopRequireDefault(require("app/components/molecules/List/ItemRow"));

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItemBase = _interopRequireDefault(require("app/components/molecules/List/ListItemBase"));

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _attachmentsUtils = require("app/utils/attachments/attachmentsUtils");

var _utils = require("app/utils/utils");

var _json = require("app/utils/json/json");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const ListItem = (0, _styledComponents.default)(_ListItemBase.default).withConfig({
  displayName: "ChangelogItem__ListItem",
  componentId: "sc-10htctv-0"
})(["word-break:break-all;a{color:", ";}"], ({
  theme
}) => theme.base.textColor);
const ChangesRow = (0, _styledComponents.default)(_ItemRow.default).withConfig({
  displayName: "ChangelogItem__ChangesRow",
  componentId: "sc-10htctv-1"
})(["background:", ";"], ({
  theme
}) => (0, _polished.darken)(0.05, theme.widget.background));

const MultipleItemStyled = _styledComponents.default.div.withConfig({
  displayName: "ChangelogItem__MultipleItemStyled",
  componentId: "sc-10htctv-2"
})(["padding:.5rem 1rem;"]);

const EmptyElement = _styledComponents.default.div.withConfig({
  displayName: "ChangelogItem__EmptyElement",
  componentId: "sc-10htctv-3"
})(["margin-bottom:-1rem;"]);

const UnorderedList = _styledComponents.default.ul.withConfig({
  displayName: "ChangelogItem__UnorderedList",
  componentId: "sc-10htctv-4"
})(["margin-top:0;margin-bottom:0;"]);

const OrderedList = _styledComponents.default.ol.withConfig({
  displayName: "ChangelogItem__OrderedList",
  componentId: "sc-10htctv-5"
})(["margin-top:0;margin-bottom:0;"]);

const Message = _styledComponents.default.div.withConfig({
  displayName: "ChangelogItem__Message",
  componentId: "sc-10htctv-6"
})(["display:inline;p{margin:0;}"]);

const AttachmentImage = _styledComponents.default.img.withConfig({
  displayName: "ChangelogItem__AttachmentImage",
  componentId: "sc-10htctv-7"
})(["max-width:100%;max-height:300px;position:relative;padding:5px 0;&:after{content:\"\\F82A\";font:normal normal normal 24px/1 \"Material Design Icons\";display:block;position:absolute;z-index:2;top:0;left:0;width:100%;height:100%;background-color:#343434;}&:before{content:attr(alt);display:block;position:absolute;z-index:3;top:4px;left:26px;width:100%;height:100%;}"]);

const convertDateTime = value => {
  const time = (0, _date.displayByKind)('time', value);

  if ((0, _date.isIsoDate)(value)) {
    return (0, _date.displayByKind)('datetime', value);
  } else if ((0, _moment.default)(value, _date.DATE_SAVE_FORMAT).isValid() && value.length === 8) {
    return (0, _date.displayByKind)('date', value);
  } else if (time && time !== 'Invalid date' && _date.TIME_SAVE_REGEXPR.test(value)) {
    return time;
  }
};
/**
 *
 */


let ChangelogItem = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class ChangelogItem extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      showDetails: false
    });
  }

  componentDidUpdate() {
    this.props.resizeRow();
    this.props.updateHeight();
  }

  componentDidMount() {
    window.addEventListener('resize', this.props.resizeRow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.resizeRow);
  }

  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }
  /**
   * Check if the given value is a JSON or in case it isn't tryes to parse it.
   *
   * @param value the value to check/parse.
   * @return a JSON containig two properties: "isValid" indicates if the value is a JSON and "value" contains the value as JSON (only when isValid is true)
   */


  tryAsJson(value) {
    try {
      if (!(0, _utils.isDefined)(value) || typeof value === 'object') {
        return {
          isValid: true,
          value
        };
      } else if (typeof value === 'string' && value.startsWith('{')) {
        return {
          isValid: true,
          value: JSON.parse(value)
        };
      }

      return {
        isValid: false
      };
    } catch (e) {
      return {
        isValid: false
      };
    }
  }

  /*
   * # Standard Operations
   *
   * N new
   * E edit
   * D delete
   *
   * # Array Operations
   *
   * P push
   * R remove
   */
  getMessageType(kind) {
    const type = {
      N: 'created',
      E: 'updated',
      D: 'deleted',
      // array operations:
      P: 'added',
      R: 'removed',
      U: 'updated'
    }[kind];

    if (!type) {
      throw new Error(`Unknown kind ${kind}`);
    }

    ;
    return type;
  }

  getEntityUrl(entityType) {
    return {
      'thing': 'things',
      'organisation': 'organisations',
      'person': 'people',
      'custom': 'custom-entities',
      'task': 'abox/task',
      'process': 'abox/process',
      'group': 'groups',
      'classification': 'classifications'
    }[entityType];
  }

  enrichValue(path, value, kind, formatJson = true) {
    const {
      formatValue
    } = this;
    const {
      entityType
    } = this.props;

    switch (path[0]) {
      case 'parentId':
        return value ? _react.default.createElement(_reactRouterDom.Link, {
          to: `/${this.getEntityUrl(entityType)}/${value}`
        }, formatValue(value)) : 'with no value';

      default:
    }

    if (!(0, _utils.isDefined)(value)) {
      return null;
    }

    const propertyPath = path.join('.');

    switch (propertyPath) {
      case 'assignee.id':
      case 'owner.id':
        return value && _react.default.createElement("a", {
          href: `/#/${this.getEntityUrl('person')}/${value}`
        }, value);

      case 'variable.completion':
        return `${value}%`;

      case 'priority':
        return (0, _aboxConfig.getPriorityLabel)(value);

      default:
    }

    switch (path[0]) {
      case 'dateOfBirth':
        return (0, _date.formatDate)(new Date(value), _date.DATE_FORMAT);

      case 'iconName':
        return _react.default.createElement(_Icon.default, {
          name: value,
          size: "sm"
        });

      case 'image':
        return _react.default.createElement("a", {
          href: value,
          target: "_blank",
          rel: "noopener noreferrer"
        }, decodeURIComponent(value.split('/').pop()));

      case 'organisationId':
        return value && _react.default.createElement(_reactRouterDom.Link, {
          to: `/organisations/${value}`
        }, formatValue(value));

      case 'thingId':
        return value && _react.default.createElement(_reactRouterDom.Link, {
          to: `/things/${value}`
        }, formatValue(value));

      case 'children':
        return value && value.id && _react.default.createElement(_reactRouterDom.Link, {
          to: `/${this.getEntityUrl(entityType)}/${value.id}`
        }, formatValue(value.id));

      case 'attachments':
        {
          const {
            id,
            url,
            name,
            mimeType
          } = value;
          const href = url || `/graphql/file/${id}/download`;

          if (mimeType.startsWith('image/')) {
            return kind === 'R' ? _react.default.createElement(_react.Fragment, null, " ", _react.default.createElement(_Icon.default, {
              name: "image-off",
              size: "sm"
            }), ' ', name) : _react.default.createElement("div", null, _react.default.createElement("a", {
              href: href,
              target: "_blank",
              rel: "noopener noreferrer"
            }, _react.default.createElement(AttachmentImage, {
              alt: name,
              src: url || `/graphql/file/${id}`
            })));
          }

          const iconName = (0, _attachmentsUtils.chooseIcon)(mimeType);
          return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Icon.default, {
            name: iconName,
            size: "sm"
          }), " ", ' ', kind === 'R' ? name : _react.default.createElement("a", {
            href: href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, name));
        }

      case 'comments':
        {
          const {
            message,
            id,
            name,
            mimeType
          } = value;

          if (message) {
            return _react.default.createElement(Message, {
              dangerouslySetInnerHTML: {
                __html: message
              }
            });
          } else if (id) {
            const href = `/graphql/file/${id}/download`;
            const iconName = (0, _attachmentsUtils.chooseIcon)(mimeType);
            return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Icon.default, {
              name: iconName,
              size: "sm"
            }), " ", ' ', _react.default.createElement("a", {
              href: href,
              target: "_blank",
              rel: "noopener noreferrer"
            }, name));
          }

          return '';
        }

      case 'relations':
        {
          if (path.length === 1) {
            const {
              to: {
                id,
                name,
                type
              },
              definition
            } = value;
            return _react.default.createElement(_react.Fragment, null, " ", definition, " ", _react.default.createElement("a", {
              href: `/#/${this.getEntityUrl(type)}/${id}`
            }, id, " - ", name), " ");
          } else if (path[1] === 'attributes') {
            const date = convertDateTime(value);

            if (date) {
              return date;
            }
          }

          if (formatJson || typeof value !== 'object') {
            return formatValue(value);
          }

          return value;
        }

      case 'teamMembers':
        {
          const {
            id,
            type
          } = value;
          const entityType = !type || type === 'user' ? 'person' : 'group';
          return _react.default.createElement(_react.Fragment, null, type === 'group' ? 'group ' : '', _react.default.createElement("a", {
            href: `/#/${this.getEntityUrl(entityType)}/${id}`
          }, id));
        }

      case 'contactInfo':
        {
          let contacts = Array.isArray(value) ? value : [value];
          contacts = contacts.map(contact => {
            const {
              type,
              sub_type,
              identifier,
              is_primary,
              address
            } = contact;

            if (type === 'address') {
              const {
                line1,
                line2,
                city,
                province,
                code,
                country
              } = address || {};
              const formatted = Object.entries({
                line1,
                line2,
                city,
                province,
                code,
                country
              }).filter(([key, value]) => value).map(([key, value]) => value).join(', ');
              return address ? `address: ${formatted}` : _react.default.createElement(_react.Fragment, null, "with ", _react.default.createElement("b", null, "\"No value\""));
            }

            return _react.default.createElement(_react.Fragment, null, " ", type, " ", sub_type && `(${sub_type})`, ": ", identifier || _react.default.createElement("b", null, "\"No value\""), " ", is_primary && '(primary)', " ");
          });

          if (contacts.length === 1) {
            return contacts[0];
          }

          return _react.default.createElement("ul", null, contacts.map(contact => _react.default.createElement("li", null, contact)));
        }

      case 'entities.permissions':
        {
          const permissions = ((0, _lo.get)(value, 'permissions') || []).join(', ');
          const uid = (0, _lo.get)(value, 'entities[0].uid');
          const entityId = (0, _utils.getStr)(value, 'entities[0].entityId');
          const entityType = (0, _utils.getStr)(value, 'entities[0].entityType');
          return _react.default.createElement(_react.Fragment, null, ' ', "permissions to ", entityType, ' ', entityId ? _react.default.createElement(_reactRouterDom.Link, {
            to: `/${this.getEntityUrl(entityType || '')}/${entityId || ''}`
          }, uid) : _react.default.createElement("b", null, uid), " with", ' ', permissions ? _react.default.createElement("b", null, permissions) : 'no', " permissions");
        }

      case 'group.classificationUris':
        {
          return _react.default.createElement("b", null, (0, _lo.get)(value, '[0]'));
        }

      case 'entities':
        {
          if ((0, _utils.getStr)(value, 'entityType') === 'proc_def' || !(0, _lo.get)(value, 'entityId')) {
            return _react.default.createElement(_react.Fragment, null, ' ', this.props.translate([(0, _lo.get)(value, 'entityType')]), ' ', _react.default.createElement("b", null, (0, _lo.get)(value, 'uid')));
          } else {
            return _react.default.createElement(_react.Fragment, null, ' ', this.props.translate([(0, _lo.get)(value, 'entityType')]), ' ', _react.default.createElement("b", null, _react.default.createElement(_reactRouterDom.Link, {
              to: `/${this.getEntityUrl((0, _utils.getStr)(value, 'entityType') || '')}/${(0, _utils.getStr)(value, 'entityId') || ''}`
            }, (0, _lo.get)(value, 'uid'))));
          }
        }

      case 'attributes':
        {
          const date = convertDateTime(value);

          if (date) {
            return date;
          }

          break;
        }

      default:
    }

    if (formatJson || typeof value !== 'object') {
      return formatValue(value);
    }

    return value;
  }

  formatValue(value) {
    if (!(0, _utils.isDefined)(value)) {
      return '';
    }

    if ((0, _date.isIsoDate)(value)) {
      return (0, _date.formatDate)(new Date(value));
    }

    if (value instanceof Object) {
      return JSON.stringify(value);
    }

    return String(value);
  }

  displayJson(kind, path, value) {
    const {
      translate
    } = this.props;
    const label = translate(path);

    if (!value || typeof value !== 'object' || (0, _utils.isEmpty)(value)) {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("strong", null, label), " ", this.enrichValue(path, value, kind));
    }

    if (Array.isArray(value)) {
      return _react.default.createElement(_react.Fragment, null, label ? _react.default.createElement("strong", null, label, ":") : _react.default.createElement("br", null), _react.default.createElement(OrderedList, null, value.map(val => _react.default.createElement("li", {
        key: val
      }, this.displayJson(kind, [], val)))));
    }

    const properties = (0, _json.getProperties)(value);
    return _react.default.createElement(_react.Fragment, null, label ? _react.default.createElement("strong", null, label, ":") : _react.default.createElement("br", null), _react.default.createElement(UnorderedList, null, properties.sort().map(property => {
      const newValue = (0, _lo.get)(value, property);
      return _react.default.createElement("li", {
        key: property
      }, this.displayJson(kind, property.split('.'), newValue));
    })));
  }

  buildItemInfo(change) {
    const {
      entityType,
      translate
    } = this.props;
    const {
      path,
      item,
      kind,
      lhs,
      rhs
    } = change;
    const label = translate(path);
    const type = this.getMessageType(change.kind);

    if (change.valueTooLarge) {
      return _react.default.createElement(_react.Fragment, null, " ", type, " ", _react.default.createElement("strong", null, label), " (value not stored because is too large) ");
    }

    if (kind === 'N' && path.length === 0) {
      return _react.default.createElement(_react.Fragment, null, " ", type, " ", _react.default.createElement("b", null, entityType, "."), " ");
    } else if (kind === 'N' && (0, _lo.get)(path, '[0]') === 'name') {
      return _react.default.createElement(_react.Fragment, null, " ", type, " ", _react.default.createElement("b", null, entityType), " ", rhs);
    } else if (kind === 'E' && (0, _lo.get)(path, '[0]') === 'endDate') {
      return _react.default.createElement(_react.Fragment, null, " closed ", _react.default.createElement("b", null, entityType, "."), " ");
    } else if (kind === 'E') {
      const fromValue = this.enrichValue(path, lhs, kind);
      let toValue = this.enrichValue(path, rhs, kind);

      if (fromValue && toValue) {
        return _react.default.createElement(_react.Fragment, null, type, " ", _react.default.createElement("strong", null, label), _react.default.createElement("i", null, " from "), " ", fromValue, _react.default.createElement("i", null, " to "), " ", toValue);
      }

      toValue = this.enrichValue(path, rhs, kind, false);

      if ((0, _utils.isDefined)(toValue) && toValue === rhs && typeof rhs === 'object' && !(0, _utils.isEmpty)(rhs)) {
        return _react.default.createElement(_react.Fragment, null, type, " ", this.displayJson(kind, path, rhs));
      }

      if (!item && (0, _utils.isObject)(rhs) && (0, _utils.isEmpty)(rhs)) {
        return _react.default.createElement(_react.Fragment, null, type, " ", _react.default.createElement("strong", null, label), " with no value");
      }

      if (item) {
        return _react.default.createElement(_react.Fragment, null, type, " ", this.enrichValue(path, item, kind));
      }

      return _react.default.createElement(_react.Fragment, null, type, " ", _react.default.createElement("strong", null, label), fromValue && toValue ? _react.default.createElement(_react.Fragment, null, " ", _react.default.createElement("i", null, "from"), " ", fromValue, " ", _react.default.createElement("i", null, "to"), " ") : toValue ? ' with value ' : ' with no value ', toValue);
    } else if (path[0] === 'bpmnVariable') {
      if (kind === 'R' || kind === 'D') {
        return _react.default.createElement(_react.Fragment, null, " ", type, " ", _react.default.createElement("strong", null, label), " ");
      } else if (kind === 'N' || kind === 'P') {
        const itemJson = this.tryAsJson(item || rhs);

        if (itemJson.isValid && !(0, _utils.isEmpty)(itemJson.value)) {
          return _react.default.createElement(_react.Fragment, null, type, " ", this.displayJson(kind, path, itemJson.value));
        }
      }
    } else if (path[0] === 'group.users') {
      return _react.default.createElement(_react.Fragment, null, type, " ", _react.default.createElement("strong", null, label), _react.default.createElement(UnorderedList, null, item.map(val => _react.default.createElement("li", {
        key: val
      }, _react.default.createElement("b", null, "id"), " ", val))));
    }

    const value = this.enrichValue(path, item || rhs, kind, false);

    if (value === (item || rhs) && typeof value === 'object') {
      return _react.default.createElement(_react.Fragment, null, type, " ", this.displayJson(kind, path, value));
    }

    if ((kind === 'P' || kind === 'R') && path[0] === 'entities') {
      return _react.default.createElement(_react.Fragment, null, " ", type, " ", value, " ");
    }

    return _react.default.createElement(_react.Fragment, null, " ", type, " ", _react.default.createElement("strong", null, label), " ", value, " ");
  }

  buildExpandedList(changes) {
    return changes.map((change, i) => _react.default.createElement(MultipleItemStyled, {
      key: i
    }, this.buildItemInfo(change)));
  }

  buildSingleItem(changes) {
    const {
      logEntry,
      translate
    } = this.props;
    const user = logEntry.modifiedBy || {};
    return _react.default.createElement(ListItem, {
      raised: true,
      small: true
    }, _react.default.createElement(_ItemRow.default, null, _react.default.createElement(_ItemColumn.default, {
      shrink: true
    }, _react.default.createElement(_Avatar.default, {
      src: user.image,
      name: user.name,
      size: "lg"
    })), _react.default.createElement(_ItemColumn.default, {
      grow: true,
      wrap: true
    }, _react.default.createElement("b", null, _react.default.createElement("a", {
      href: `/#/people/${user.id}/summary`
    }, user.name), " "), this.buildItemInfo({ ...changes[0],
      label: translate((0, _lo.get)(changes[0], 'path', []))
    }), _react.default.createElement("div", null, _react.default.createElement("em", null, (0, _date.formatDate)(new Date(logEntry.modifiedDate)))))));
  }

  render() {
    const {
      logEntry,
      className
    } = this.props;
    const user = logEntry.modifiedBy || {};
    const changes = logEntry.changes;

    if (changes.length === 0) {
      return _react.default.createElement(EmptyElement, null);
    } else if (changes.length === 1) {
      return this.buildSingleItem(changes);
    }

    return _react.default.createElement(ListItem, {
      className: className,
      raised: true,
      small: true
    }, _react.default.createElement(_ItemRow.default, null, _react.default.createElement(_ItemColumn.default, {
      shrink: true
    }, _react.default.createElement(_Avatar.default, {
      src: user.image,
      name: user.name,
      size: "lg"
    })), _react.default.createElement(_ItemColumn.default, {
      grow: true,
      wrap: true
    }, _react.default.createElement("b", null, _react.default.createElement("a", {
      href: `/#/people/${user.id}/summary`
    }, user.name)), " updated ", _react.default.createElement("b", null, "multiple"), " values.", _react.default.createElement("div", null, _react.default.createElement("em", null, (0, _date.formatDate)(new Date(logEntry.modifiedDate))))), _react.default.createElement(_ItemColumn.default, null, _react.default.createElement(_ButtonIcon.default, {
      icon: "menu-down",
      onClick: this.toggleDetails
    }))), this.state.showDetails && _react.default.createElement(ChangesRow, null, _react.default.createElement(_List.default, null, this.buildExpandedList(changes))));
  }

}, _defineProperty(_class2, "propTypes", {
  logEntry: _propTypes.default.object.isRequired,
  translate: _propTypes.default.func.isRequired,
  resizeRow: _propTypes.default.func,
  updateHeight: _propTypes.default.func
}), _defineProperty(_class2, "defaultProps", {
  resizeRow: () => {},
  updateHeight: () => {}
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "toggleDetails", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "toggleDetails"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "tryAsJson", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "tryAsJson"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getMessageType", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "getMessageType"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getEntityUrl", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "getEntityUrl"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "enrichValue", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "enrichValue"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "formatValue", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "formatValue"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "displayJson", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "displayJson"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildItemInfo", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "buildItemInfo"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildExpandedList", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "buildExpandedList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildSingleItem", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "buildSingleItem"), _class.prototype)), _class));
;
var _default = ChangelogItem;
exports.default = _default;