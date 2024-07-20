import {applyMiddleware, combineReducers} from 'redux';

import authreducer from "./reducers/authreducer";

const rootreducer = combineReducers({
    auth:authreducer,
});

const store = createStore(rootreducer, )