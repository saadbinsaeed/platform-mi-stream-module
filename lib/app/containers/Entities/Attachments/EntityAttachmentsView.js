"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _attachmentsActions = require("store/actions/common/attachmentsActions");

var _attachmentsUtils = require("app/utils/attachments/attachmentsUtils");

var _VirtualListManaged = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListManaged"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _appActions = require("store/actions/app/appActions");

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

var _FooterBar = _interopRequireDefault(require("app/components/molecules/FooterBar/FooterBar"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _UploadButton = _interopRequireDefault(require("app/components/molecules/UploadButton/UploadButton"));

var _ResponsiveActions = _interopRequireDefault(require("app/components/molecules/ResponsiveActions/ResponsiveActions"));

var _DropzoneWrapper = _interopRequireDefault(require("app/components/molecules/Dropzone/DropzoneWrapper"));

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _date = require("app/utils/date/date");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _utils = require("app/utils/utils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const AttachmentIcon = (0, _recompose.onlyUpdateForKeys)(['item'])(props => {
  const {
    mimeType
  } = props.item;
  const iconName = (0, _attachmentsUtils.chooseIcon)(mimeType);
  return _react.default.createElement(AttachmentLinkRenderer, {
    data: props.item
  }, _react.default.createElement(_Icon.default, {
    name: iconName,
    size: "lg"
  }));
});
const ListItemStyled = (0, _styledComponents.default)(_ListItem.default).withConfig({
  displayName: "EntityAttachmentsView__ListItemStyled",
  componentId: "sc-10c6uny-0"
})(["width:100%;max-width:1024px;margin:0 auto;"]);

const Link = _styledComponents.default.a.withConfig({
  displayName: "EntityAttachmentsView__Link",
  componentId: "sc-10c6uny-1"
})(["text-decoration:none;"]);

const DropzoneWrapperFull = (0, _styledComponents.default)(_DropzoneWrapper.default).withConfig({
  displayName: "EntityAttachmentsView__DropzoneWrapperFull",
  componentId: "sc-10c6uny-2"
})(["height:calc(100vh - 240px);"]);

const AttachmentLinkRenderer = ({
  data,
  children
}) => {
  const {
    createdDate
  } = data;
  let url = data.url;

  if (url.includes('/api/rsc/')) {
    url = url.replace('/api/rsc/', '/graphql/file/');
  }

  return _react.default.createElement(Link, {
    target: "_blank",
    rel: "noopener noreferrer",
    download: true,
    href: `${url}/download?created=${createdDate}&token=${_affectliSso.default.getToken()}`
  }, children);
};
/**
 * Renders the view to display the entity attachments.
 */


let EntityAttachmentsView = (_class = (_temp = _class2 = class EntityAttachmentsView extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "canEdit", false);

    _defineProperty(this, "virtualListRef", _react.default.createRef());

    _defineProperty(this, "filterDefinitions", [{
      field: 'name',
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      }
    }, {
      field: 'mimeType',
      type: 'typeahead',
      properties: {
        label: 'Mime Type',
        name: 'mimeType',
        options: [{
          value: 'image',
          label: 'Image'
        }, {
          value: 'application',
          label: 'File'
        }, {
          value: 'text',
          label: 'Text'
        }, {
          value: 'application/octet-stream',
          label: 'Audio'
        }, {
          value: 'pdf',
          label: 'Pdf'
        }]
      }
    }, {
      field: 'createdDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Created date',
        name: 'createdDate'
      }
    }]);

    _defineProperty(this, "searchBar", ['name']);

    _defineProperty(this, "defaultOrder", [{
      field: 'createdDate',
      direction: 'desc'
    }]);

    _defineProperty(this, "uploadFile", file => {
      if ((0, _attachmentsUtils.isInvalidExtension)(file)) {
        this.props.showToastr({
          severity: 'warn',
          detail: 'Invalid file type Please upload a valid file!'
        });
      } else if ((0, _attachmentsUtils.isInvalidSize)(file)) {
        this.props.showToastr({
          severity: 'warn',
          detail: 'Maximum file size limit which is 50MB exceeded!'
        });
      } else {
        this.props.attachEntityFile(this.props.entityId, file).then(this.resetView);
      }
    });

    _defineProperty(this, "uploadAttachment", files => {
      const fileArray = Array.isArray(files) ? files : Object.values(files);
      (0, _utils.serialPromises)(fileArray, file => this.uploadFile(file));
    });

    _defineProperty(this, "buildRemoveAttachment", name => () => {
      this.props.deleteEntityAttachment(this.props.entityId, name).then(this.resetView);
    });

    _defineProperty(this, "loadAttachments", options => {
      const {
        entityId,
        entityType
      } = this.props;
      return this.props.loadEntityAttachments(entityId, entityType, options);
    });

    const {
      entityType: _entityType,
      userProfile: {
        permissions,
        isAdmin
      }
    } = props;
    const permissionsSet = new Set(permissions || []);

    if (_entityType === 'thing') {
      this.canEdit = isAdmin || permissionsSet.has('entity.thing.edit');
    } else if (_entityType === 'organisation') {
      this.canEdit = isAdmin || permissionsSet.has('entity.organisation.edit');
    } else if (_entityType === 'custom') {
      this.canEdit = isAdmin || permissionsSet.has('entity.custom.edit');
    } else {
      this.canEdit = isAdmin || permissionsSet.has('entity.person.edit');
    }
  } // $FlowFixMe


  resetView() {
    this.virtualListRef.current && this.virtualListRef.current.resetView();
  }

  renderComponent(props) {
    const {
      data,
      index,
      style
    } = props;
    return _react.default.createElement("div", {
      key: index,
      style: style
    }, _react.default.createElement(ListItemStyled, {
      component: _react.default.createElement(AttachmentIcon, {
        item: data
      }),
      title: _react.default.createElement(AttachmentLinkRenderer, {
        data: data
      }, data.name),
      subTitle: `${(0, _attachmentsUtils.getExtension)(data.mimeType)} - ${(0, _attachmentsUtils.formatBytes)(data.size)} ${(0, _date.fromNow)(data.createdDate)}`,
      actions: _react.default.createElement(_ResponsiveActions.default, {
        actions: [_react.default.createElement(AttachmentLinkRenderer, {
          data: data,
          key: "1"
        }, _react.default.createElement(_Icon.default, {
          name: "download"
        })), this.canEdit ? _react.default.createElement(_Icon.default, {
          name: "delete",
          onClick: this.buildRemoveAttachment(data.name),
          key: "2"
        }) : null]
      }),
      raised: true
    }));
  }

  /**
   * @override
   */
  render() {
    const {
      records,
      isLoading,
      totalRecords,
      startIndex,
      entityId,
      entityType
    } = this.props;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Filters.default, {
      id: `EntityAttachmentsView.${entityType}.${entityId}`,
      filterDefinitions: this.filterDefinitions,
      defaultOrder: this.defaultOrder,
      searchBar: this.searchBar
    }, (filterBy, orderBy) => _react.default.createElement(DropzoneWrapperFull, {
      onDropRejected: this.uploadAttachment,
      onDropAccepted: this.uploadAttachment
    }, _react.default.createElement(_VirtualListManaged.default, {
      ref: this.virtualListRef,
      renderComponent: this.renderComponent,
      itemSize: 100,
      itemCount: totalRecords || 0,
      loadData: this.loadAttachments,
      isLoading: isLoading,
      startIndex: startIndex || 0,
      filterBy: filterBy,
      orderBy: orderBy,
      list: records,
      maxWidth: "1024"
    }))), _react.default.createElement(_FooterBar.default, null, this.canEdit ? _react.default.createElement(_UploadButton.default, {
      multiple: true,
      label: "Upload",
      loading: false,
      onSelect: this.uploadAttachment
    }) : null));
  }

}, _defineProperty(_class2, "propTypes", {
  entityId: _propTypes.default.string.isRequired,
  entityType: _propTypes.default.oneOf(['thing', 'person', 'organisation', 'custom']).isRequired,
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  loadEntityAttachments: _propTypes.default.func.isRequired,
  deleteEntityAttachment: _propTypes.default.func.isRequired,
  attachEntityFile: _propTypes.default.func.isRequired,
  showToastr: _propTypes.default.func.isRequired
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "resetView", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "resetView"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "renderComponent", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "renderComponent"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile,
  startIndex: state.entities.attachments.startIndex,
  isLoading: state.entities.attachments.isLoading,
  isDownloading: state.entities.attachments.isDownloading,
  records: state.entities.attachments.records,
  totalRecords: state.entities.attachments.count,
  count: state.entities.attachments.count,
  countMax: state.entities.attachments.countMax
}), {
  showToastr: _appActions.showToastr,
  loadEntityAttachments: _attachmentsActions.loadEntityAttachments,
  deleteEntityAttachment: _attachmentsActions.deleteEntityAttachment,
  attachEntityFile: _attachmentsActions.attachEntityFile
})(EntityAttachmentsView);

exports.default = _default;