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

var _moment = _interopRequireDefault(require("moment"));

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

var _aboxActions = require("store/actions/abox/aboxActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AttachmentIcon = (0, _recompose.onlyUpdateForKeys)(['item'])(props => {
  const {
    mimeType,
    id
  } = props.item;
  const iconName = (0, _attachmentsUtils.chooseIcon)(mimeType);
  return _react.default.createElement(_attachmentsUtils.AttachmentLink, {
    id: id
  }, _react.default.createElement(_Icon.default, {
    name: iconName,
    size: "lg"
  }));
});
const ListItemStyled = (0, _styledComponents.default)(_ListItem.default).withConfig({
  displayName: "AboxAttachments__ListItemStyled",
  componentId: "sc-1b3mel3-0"
})(["width:100%;max-width:1024px;margin:0 auto;"]);
const DropzoneWrapperFull = (0, _styledComponents.default)(_DropzoneWrapper.default).withConfig({
  displayName: "AboxAttachments__DropzoneWrapperFull",
  componentId: "sc-1b3mel3-1"
})(["height:calc(100vh - 240px);"]);
/**
 * Renders the view to display the classification.
 */

class AboxAttachments extends _react.PureComponent {
  constructor(...args) {
    super(...args);

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
      },
      sort: false
    }, {
      field: 'createDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Created date',
        name: 'createDate'
      }
    }]);

    _defineProperty(this, "searchBar", ['name']);

    _defineProperty(this, "defaultOrder", [{
      field: 'createDate',
      direction: 'desc'
    }]);

    _defineProperty(this, "refresh", () => {
      this.virtualListRef.current && this.virtualListRef.current.resetView();
    });

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
        return this.props.uploadAboxAttachment(this.props.match.params.id, this.props.type, file);
      }
    });

    _defineProperty(this, "uploadAttachment", files => {
      const fileArray = Array.isArray(files) ? files : Object.values(files);
      return Promise.all(fileArray.map(file => this.uploadFile(file))).then(this.refresh);
    });

    _defineProperty(this, "buildRemoveAttachment", id => () => {
      this.props.deleteAboxAttachment(id).then(this.refresh);
    });

    _defineProperty(this, "renderComponent", props => {
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
        title: _react.default.createElement(_attachmentsUtils.AttachmentLink, {
          id: data.id
        }, data.name),
        subTitle: `${(0, _attachmentsUtils.getExtension)(data.mimeType)} - ${(0, _attachmentsUtils.formatBytes)(data.size)} ${(0, _moment.default)(data.createDate).from((0, _moment.default)())}`,
        actions: _react.default.createElement(_ResponsiveActions.default, {
          actions: [_react.default.createElement(_attachmentsUtils.AttachmentLink, {
            id: data.id,
            key: "1"
          }, _react.default.createElement(_Icon.default, {
            name: "download"
          })), _react.default.createElement(_Icon.default, {
            name: "delete",
            onClick: this.buildRemoveAttachment(data.id),
            key: "2"
          })]
        }),
        raised: true
      }));
    });

    _defineProperty(this, "loadAttachments", options => {
      const id = this.props.match.params.id;
      return this.props.loadAboxAttachments(id, this.props.type, options);
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.outdated && this.props.outdated) {
      this.refresh();
    }
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
      match
    } = this.props;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Filters.default, {
      id: `AboxAttachments.${match.params.id}`,
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
    }))), _react.default.createElement(_FooterBar.default, null, _react.default.createElement(_UploadButton.default, {
      label: "Upload",
      loading: false,
      onSelect: this.uploadAttachment,
      multiple: true
    })));
  }

}

_defineProperty(AboxAttachments, "propTypes", {
  type: _propTypes.default.string,
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  outdated: _propTypes.default.bool,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  loadAboxAttachments: _propTypes.default.func.isRequired,
  deleteAboxAttachment: _propTypes.default.func.isRequired,
  uploadAboxAttachment: _propTypes.default.func.isRequired,
  showToastr: _propTypes.default.func.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  records: state.abox.attachments.records,
  outdated: state.abox.attachmentsOutdated,
  // this flag is true if the list of records is outdated
  isLoading: state.abox.attachments.isLoading,
  totalRecords: state.abox.attachments.count,
  startIndex: state.abox.attachments.startIndex
}), {
  showToastr: _appActions.showToastr,
  loadAboxAttachments: _aboxActions.loadAboxAttachments,
  deleteAboxAttachment: _aboxActions.deleteAboxAttachment,
  uploadAboxAttachment: _aboxActions.uploadAboxAttachment
})(AboxAttachments);

exports.default = _default;