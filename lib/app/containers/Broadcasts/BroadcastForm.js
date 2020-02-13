"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _NotificationsBar = _interopRequireDefault(require("app/components/molecules/NotificationsBar/NotificationsBar"));

var _CardFooter = _interopRequireDefault(require("app/components/molecules/Card/CardFooter"));

var _lo = require("app/utils/lo/lo");

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

var _appActions = require("store/actions/app/appActions");

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _notification = _interopRequireDefault(require("media/sounds/notification.mp3"));

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const oneOfNotNull = data => {
  const required = {
    presence: {
      allowEmpty: false,
      message: '{label} is required.'
    }
  };

  if (!(0, _lo.get)(data, 'groups.length') && !(0, _lo.get)(data, 'users.length')) {
    return required;
  }

  return {};
};
/**
 * Create Broadcast
 */


let BroadcastForm = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class BroadcastForm extends _react.PureComponent {
  fieldDefinitions(isAdmin, data) {
    const definition = [{
      field: 'groups',
      type: 'groupTypeahead',
      properties: {
        label: 'Recipient groups',
        name: 'groups',
        multiple: true,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      },
      constraints: {
        custom: oneOfNotNull
      }
    }, {
      field: 'users',
      type: 'userTypeahead',
      properties: {
        label: 'Recipients',
        name: 'users',
        multiple: true,
        filterBy: isAdmin ? null : [{
          field: 'active',
          op: '=',
          value: true
        }]
      },
      constraints: {
        custom: oneOfNotNull
      }
    }, {
      field: 'message',
      type: 'text',
      properties: {
        label: 'Message',
        name: 'message'
      },
      constraints: {
        required: true,
        maxLength: 1000
      }
    }, {
      field: 'startDate',
      type: 'dateTime',
      properties: {
        label: 'Start time',
        name: 'startDate'
      },
      constraints: {
        required: true,
        datetime: {
          earliest: new Date(),
          message: '{label} cannot be before %{value}'
        }
      }
    }, {
      field: 'expiresAfterValue',
      type: 'number',
      properties: {
        label: 'Message expires after value',
        name: 'expiresAfterValue'
      },
      constraints: {
        required: true,
        numericality: {
          noString: true,
          onlyInteger: true,
          lessThanOrEqualTo: 999,
          notLessThanOrEqualTo: '{label} needs to be less than or equal to %{count}'
        }
      }
    }, {
      field: 'expiresAfterUnit',
      type: 'typeahead',
      properties: {
        label: 'Message expires after unit',
        name: 'expiresAfterUnit',
        options: [{
          value: 'D',
          label: 'Day(s)'
        }, {
          value: 'H',
          label: 'Hour(s)'
        }, {
          value: 'M',
          label: 'Minutes(s)'
        }, {
          value: 'S',
          label: 'Second(s)'
        }]
      },
      constraints: {
        required: true
      }
    }, {
      field: 'repeat',
      type: 'boolean',
      properties: {
        label: 'Repeat',
        name: 'repeat'
      }
    }, {
      field: 'repeatInterval',
      type: 'typeahead',
      properties: {
        label: 'Repeats',
        name: 'repeatInterval',
        options: this.repeatTypes,
        isVisible: data => {
          return data && data['repeat'];
        }
      },
      constraints: {
        required: true
      }
    }, {
      field: 'repeatValue',
      type: 'number',
      properties: {
        label: 'Repeat Every',
        name: 'repeatValue',
        isVisible: data => {
          return data && data['repeatInterval'] && data['repeatInterval'] !== 'DW';
        }
      },
      constraints: {
        required: true
      }
    }, {
      field: 'repeatValue',
      type: 'typeahead',
      properties: {
        label: 'Repeat Every',
        name: 'repeatValue',
        options: [{
          value: 'Mo',
          label: 'Monday'
        }, {
          value: 'Tu',
          label: 'Tuesday'
        }, {
          value: 'We',
          label: 'Wednesday'
        }, {
          value: 'Th',
          label: 'Thursday'
        }, {
          value: 'Fr',
          label: 'Friday'
        }, {
          value: 'Sa',
          label: 'Saturday'
        }, {
          value: 'Su',
          label: 'Sunday'
        }],
        isVisible: data => {
          return data && data['repeatInterval'] && data['repeatInterval'] === 'DW';
        },
        multiple: true
      },
      constraints: {
        required: true
      }
    }, {
      field: 'repeatEnds',
      type: 'dateTime',
      properties: {
        label: 'Repeat ends',
        name: 'repeatEnds',
        isVisible: data => {
          return data && data['repeat'];
        }
      },
      constraints: {
        required: true,
        datetime: {
          earliest: data && data['startDate'] || new Date(),
          message: '{label} cannot be before %{date}'
        }
      }
    }];
    return definition;
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "audio", void 0);

    _defineProperty(this, "formRef", _react.default.createRef());

    _defineProperty(this, "repeatTypes", [{
      value: 'H',
      label: 'Hourly',
      name: 'Hour'
    }, {
      value: 'D',
      label: 'Daily',
      name: 'Day'
    }, {
      value: 'DW',
      label: 'By Day of Week',
      name: 'Day(s) of the week'
    }, {
      value: 'W',
      label: 'Weekly',
      name: 'Week'
    }, {
      value: 'M',
      label: 'Monthly',
      name: 'Month'
    }, {
      value: 'Y',
      label: 'Yearly',
      name: 'Year'
    }]);

    const id = (0, _lo.get)(this, 'props.match.params.id');
    this.state = {
      broadcast: id ? props.broadcast : {
        startDate: new Date()
      },
      previewActive: false,
      buttonDisabled: false
    };

    if (id) {
      this.props.fetchBroadcast({
        id
      });
    } // $FlowFixMe


    this.audio = new Audio(_notification.default);
  }

  componentDidUpdate(prevProps) {
    const {
      broadcast,
      match,
      broadcastCreatedId
    } = this.props;

    if (broadcastCreatedId !== prevProps.broadcastCreatedId) {
      // this.props.history.push(`/broadcasts/edit/${this.props.broadcastCreatedId}`);
      this.props.history.goBack(); // Go back to the previous page instead of to Edit
    }

    const id = (0, _lo.get)(match, 'params.id');

    if (id !== (0, _lo.get)(prevProps, 'match.params.id')) {
      if (id) {
        this.props.fetchBroadcast({
          id
        });
      } else {
        this.setState({
          broadcast: {
            startDate: new Date()
          }
        });
      }
    }

    if (broadcast !== prevProps.broadcast) {
      this.setState({
        broadcast
      });
    }
  }
  /**
   * Function for dealing with our normal input on change
   */


  onChange(data) {
    this.setState({
      broadcast: data
    });
  }

  /*
   * Submit our form data
   */
  submitForm(event) {
    event.preventDefault();
    this.disableSubmitButton();
    this.formRef.current.isValidForm().then(({
      data,
      errors
    }) => {
      if (!errors) {
        const repeatValue = data['repeatValue'] && JSON.stringify(data['repeatValue']);
        const newData = { ...data,
          active: true,
          repeatValue
        };
        this.props.saveBroadcast(newData);
      }
    });
  }

  /**
   * Disable the submit button on press and slow the ability to repress.
   */
  disableSubmitButton() {
    this.setState({
      buttonDisabled: true
    });
    setTimeout(() => {
      this.setState({
        buttonDisabled: false
      });
    }, 2000);
  }

  togglePreview(event) {
    event.preventDefault();
    this.audio.pause();
    this.audio.currentTime = 0;
    this.setState({
      previewActive: !this.state.previewActive
    }, this.playAudio);
  }

  playAudio() {
    this.state.previewActive && this.audio.play().catch();
  }

  parseRepeatValue(repeatValue, repeatInterval) {
    if (repeatInterval === 'DW') {
      if (typeof repeatValue === 'string') {
        const repeatValueParsed = JSON.parse(repeatValue);
        this.setState(prevState => ({
          broadcast: { ...prevState.broadcast,
            repeatValue: repeatValueParsed
          }
        }));
      }
    }
  }

  /**
   * Render our create broadcast form
   */
  render() {
    const {
      isLoading,
      isSubmitting,
      match,
      userProfile: {
        isAdmin
      }
    } = this.props;
    const id = (0, _lo.get)(match, 'params.id');
    const {
      broadcast,
      previewActive
    } = this.state;
    const {
      message,
      repeatValue,
      repeatInterval
    } = broadcast || {};
    this.parseRepeatValue(repeatValue, repeatInterval);
    const messages = [{
      id: 1,
      text: message
    }];
    return _react.default.createElement(_react.Fragment, null, previewActive && _react.default.createElement(_NotificationsBar.default, {
      messages: messages
    }), _react.default.createElement(_Form.default, {
      loading: isLoading,
      method: "post"
    }, _react.default.createElement(_FormGenerator.default, {
      components: this.fieldDefinitions(isAdmin, broadcast),
      ref: this.formRef,
      data: broadcast,
      onChange: this.onChange,
      ListItemProps: {
        disableGutters: true
      }
    }), _react.default.createElement(_CardFooter.default, null, _react.default.createElement(_Button.default, {
      color: "warning",
      type: "button",
      onClick: this.togglePreview,
      disabled: isSubmitting
    }, previewActive ? 'Close Preview' : 'Preview'), _react.default.createElement(_Button.default, {
      onClick: this.submitForm,
      color: "primary",
      type: "submit",
      disabled: isSubmitting || this.state.buttonDisabled
    }, id ? 'Save' : 'Create'))));
  }

}, _defineProperty(_class2, "propTypes", {
  fetchBroadcast: _propTypes.default.func,
  saveBroadcast: _propTypes.default.func,
  showToastr: _propTypes.default.func,
  broadcastCreatedId: _propTypes.default.number,
  isLoading: _propTypes.default.bool,
  isSubmitting: _propTypes.default.bool,
  broadcast: _propTypes.default.object,
  match: _propTypes.default.object,
  location: _propTypes.default.object,
  history: _propTypes.default.object,
  userProfile: _propTypes.default.object
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "fieldDefinitions", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "fieldDefinitions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submitForm", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "submitForm"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disableSubmitButton", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "disableSubmitButton"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "togglePreview", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "togglePreview"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "playAudio", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "playAudio"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "parseRepeatValue", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "parseRepeatValue"), _class.prototype)), _class));

const mapStateToProps = state => {
  return {
    broadcastCreatedId: state.broadcasts.save.data && state.broadcasts.save.data.id,
    broadcast: state.broadcasts.detail.data,
    isLoading: state.broadcasts.detail.isLoading,
    isSubmitting: state.broadcasts.save.isLoading,
    userProfile: state.user.profile
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  fetchBroadcast: _broadcastsActions.fetchBroadcast,
  saveBroadcast: _broadcastsActions.saveBroadcast,
  showToastr: _appActions.showToastr
})(BroadcastForm);

exports.default = _default;