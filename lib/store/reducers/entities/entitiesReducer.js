"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _attachmentsActions = require("store/actions/common/attachmentsActions");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _entitiesCommonReducer = _interopRequireDefault(require("./common/entitiesCommonReducer"));

var _thingsReducer = _interopRequireDefault(require("./things/thingsReducer"));

var _organisationsReducer = _interopRequireDefault(require("./organisations/organisationsReducer"));

var _peopleReducer = _interopRequireDefault(require("./people/peopleReducer"));

var _directoriesReducer = _interopRequireDefault(require("./directories/directoriesReducer"));

var _commonClassificationsReducer = _interopRequireDefault(require("./commonClassifications/commonClassificationsReducer"));

var _customEntitiesReducer = _interopRequireDefault(require("store/reducers/entities/customEntities/customEntitiesReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  commonClassifications: _commonClassificationsReducer.default,
  common: _entitiesCommonReducer.default,
  things: _thingsReducer.default,
  organisations: _organisationsReducer.default,
  people: _peopleReducer.default,
  directories: _directoriesReducer.default,
  customEntities: _customEntitiesReducer.default,
  activities: (0, _reducerUtils.dataTableReducer)(_entitiesActions.LOAD_ENTITY_ACTIVITIES_STARTED, _entitiesActions.LOAD_ENTITY_ACTIVITIES),
  attachments: (0, _reducerUtils.dataTableReducer)(_attachmentsActions.GET_ATTACHMENTS_STARTED, _attachmentsActions.GET_ATTACHMENTS, () => true),
  relationships: (0, _reducerUtils.dataTableReducer)(_relationshipsActions.GET_RELATIONSHIPS_STARTED, _relationshipsActions.GET_RELATIONSHIPS),
  relationship: (0, _reducerUtils.loadDataReducer)(_relationshipsActions.GET_RELATIONSHIP_STARTED, _relationshipsActions.GET_RELATIONSHIP),
  relationshipsAdd: (0, _reducerUtils.dataTableReducer)(_relationshipsActions.LOAD_RELATIONSHIP_ENTITIES_ADD_STARTED, _relationshipsActions.LOAD_RELATIONSHIP_ENTITIES_ADD, () => true),
  entityData: (0, _reducerUtils.loadDataReducer)(_relationshipsActions.LOAD_ENTITY_DATA_STARTED, _relationshipsActions.LOAD_ENTITY_DATA),
  relationshipClassifications: (0, _reducerUtils.loadDataReducer)(_relationshipsActions.LOAD_RELATIONSHIP_CLASSIFICATIONS_STARTED, _relationshipsActions.LOAD_RELATIONSHIP_CLASSIFICATIONS)
});

exports.default = _default;