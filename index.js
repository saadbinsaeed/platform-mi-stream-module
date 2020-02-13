var routes = require('./lib/app/containers/Stream/Events/EventsRoute');
var reducer = require('./lib/store/reducers/stream/streamReducer');
module.exports = { routes: routes.default, reducer: reducer.default };
