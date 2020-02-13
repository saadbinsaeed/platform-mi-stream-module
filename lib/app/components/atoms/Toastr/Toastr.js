"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Growl = require("primereact/components/growl/Growl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defErrorOpt = {
  severity: 'error',
  summary: 'Error',
  detail: 'Something went wrong...',
  life: 5000
};
const defInfoOpt = {
  severity: 'info',
  summary: 'Info',
  detail: '',
  life: 5000
};
const defWarnOpt = {
  severity: 'warn',
  summary: 'Warning',
  detail: '',
  life: 5000
};
const defSuccessOpt = {
  severity: 'success',
  summary: 'Success',
  detail: '',
  life: 5000
};

const ToastrStyle = _styledComponents.default.span.withConfig({
  displayName: "Toastr__ToastrStyle",
  componentId: "vnpuwd-0"
})([".ui-growl{z-index:99999 !important;}.ui-growl-message-error{background:", " !important;}.ui-growl-message-info{background:", " !important;}.ui-growl-message-warn{background:", " !important;}.ui-growl-message-success{background:", " !important;}"], ({
  theme
}) => theme.color.error, ({
  theme
}) => theme.color.info, ({
  theme
}) => theme.color.warning, ({
  theme
}) => theme.color.success);
/**
 * Input Renderer with SplitButton to change of option filtering
 */


class Toastr extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "toastr", void 0);
  }

  /**
    * Show toastr
    */
  show(options) {
    this.toastr.show({ ...options,
      life: 5000
    });
  }
  /**
    * Show success toastr
    */


  success(options) {
    this.toastr.show({ ...defSuccessOpt,
      ...options
    });
  }
  /**
    * Show info toastr
    */


  info(options) {
    this.toastr.show({ ...defInfoOpt,
      ...options
    });
  }
  /**
    * Show warning toastr
    */


  warn(options) {
    this.toastr.show({ ...defWarnOpt,
      ...options
    });
  }
  /**
    * Show error toastr
    */


  error(options) {
    this.toastr.show({ ...defErrorOpt,
      ...options
    });
  }
  /**
    * @override
    */


  render() {
    return _react.default.createElement(ToastrStyle, null, _react.default.createElement(_Growl.Growl, {
      ref: el => {
        this.toastr = el;
      }
    }));
  }

}

var _default = Toastr;
exports.default = _default;