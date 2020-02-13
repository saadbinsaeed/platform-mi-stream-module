"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _peopleActions = require("store/actions/entities/peopleActions");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _utils = require("app/utils/utils");

var _default = (0, _redux.combineReducers)({
  save: (0, _reducerUtils.loadDataReducer)(_peopleActions.UPDATE_PERSON_STARTED, _peopleActions.UPDATE_PERSON),
  details: (0, _reducerUtils.loadDataReducer)(_peopleActions.LOAD_PERSON_STARTED, _peopleActions.LOAD_PERSON, ({
    state,
    meta
  }) => (0, _utils.getStr)(state, 'data.person.id') === (0, _utils.getStr)(meta, 'id')),
  list: (0, _reducerUtils.dataTableReducer)(_peopleActions.LOAD_PEOPLE_LIST_STARTED, _peopleActions.LOAD_PEOPLE_LIST)
});

exports.default = _default;