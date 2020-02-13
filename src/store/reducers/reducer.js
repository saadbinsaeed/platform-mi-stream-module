/* @flow */

/**
 * Each folder in this directory structure /reducers represents a slice
 * of the application state. Navigating this directory structure should be
 * the equivalent of navigating the app state.
 */
import { combineReducers } from 'redux';

import admin from './admin/adminReducer';
import app from './app/appReducer';
import routing from './routing/routerHistoryReducer';
import user from './user/userReducer';
import broadcasts from './broadcasts/broadcastReducer';
import chat from './messenger/messengerReducer';
import common from './common/commonReducer';
import stream from './stream/streamReducer';
import global from './global/globalReducer';

const rootReducer = combineReducers({
    admin,
    app,
    user,
    chat,
    broadcasts,
    common,
    routing,
    stream,
    global
});

export default rootReducer;
