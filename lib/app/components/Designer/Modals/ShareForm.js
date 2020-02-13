"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _immer = _interopRequireDefault(require("immer"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _hooks = require("app/utils/hook/hooks");

var _designerActions = require("store/actions/designer/designerActions");

var _platformUi = require("@mic3/platform-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const ShareForm = ({
  form,
  close,
  shareFormDefinition,
  onShare
}) => {
  const [share, setShareChange] = (0, _react.useState)(form.share);
  const [isShareDisabled, disableShare] = (0, _react.useState)(false);
  const shareAction = (0, _hooks.useReduxAction)({
    action: shareFormDefinition,
    parameters: [form.id, share],
    disableUI: disableShare,
    onSuccess: () => {
      onShare && onShare();
    }
  });
  const changePermission = (0, _react.useCallback)((userId, permission) => setShareChange((0, _immer.default)(share, draftShare => {
    draftShare.forEach(shareItem => {
      if (shareItem.user.id === userId) {
        shareItem.permission = permission ? 1 : 0;
      }
    });
  })), [share]);
  const removeUser = (0, _react.useCallback)(userId => setShareChange(share.filter(sh => sh.user.id !== userId)), [share]);
  const onShareUsers = (0, _react.useCallback)(event => {
    const newUser = event.target.value;
    setShareChange((0, _immer.default)(share, draftShare => {
      newUser[0] && draftShare.push({
        user: newUser[0],
        permission: 1
      });
    }));
  }, [setShareChange, share]);
  const usersFilterBy = (0, _react.useMemo)(() => share.map(({
    user
  }) => ({
    field: 'id',
    op: '<>',
    value: user.id
  })), [share]);

  const usersTable = _react.default.createElement(_platformUi.Table, null, _react.default.createElement(_platformUi.TableHead, null, _react.default.createElement(_platformUi.TableRow, null, _react.default.createElement(_platformUi.TableCell, null, "Shared with"), _react.default.createElement(_platformUi.TableCell, {
    align: "left"
  }, "Can edit"), _react.default.createElement(_platformUi.TableCell, {
    align: "left"
  }, "Actions"))), _react.default.createElement(_platformUi.TableBody, null, (0, _react.useCallback)(share.map(({
    user,
    permission
  }) => _react.default.createElement(_platformUi.TableRow, {
    key: user.name
  }, _react.default.createElement(_platformUi.TableCell, {
    component: "th",
    scope: "row"
  }, _react.default.createElement(_platformUi.Typography, {
    variant: "body1"
  }, _react.default.createElement(_platformUi.MdiIcon, {
    name: "account"
  }), user.name)), _react.default.createElement(_platformUi.TableCell, {
    align: "left"
  }, _react.default.createElement(_platformUi.Switch, {
    onClick: event => changePermission(user.id, event.target.checked),
    value: permission
  })), _react.default.createElement(_platformUi.TableCell, {
    align: "left"
  }, _react.default.createElement(_platformUi.IconButton, {
    onClick: () => removeUser(user.id)
  }, _react.default.createElement(_platformUi.MdiIcon, {
    name: "close",
    color: "error"
  }))))), [share])));

  return _react.default.createElement(_Modal.default, {
    title: "Share form",
    open: true,
    onToggle: close
  }, _react.default.createElement("p", null, "You can decide who you wish to share this form with and if they can edit it."), _react.default.createElement(_Form.default, null, _react.default.createElement(_UserAutocomplete.default, {
    name: "users",
    placeholder: "Search for a user...",
    onChange: onShareUsers,
    value: [],
    filterBy: usersFilterBy,
    multiple: true
  }), share.length ? usersTable : null, _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
    type: "button",
    onClick: close
  }, "Cancel"), _react.default.createElement(_Button.default, {
    disabled: isShareDisabled,
    onClick: shareAction,
    color: "primary"
  }, "Sharing form"))));
};

var _default = (0, _reactRedux.connect)(null, {
  shareFormDefinition: _designerActions.shareFormDefinition
})((0, _react.memo)(ShareForm));

exports.default = _default;