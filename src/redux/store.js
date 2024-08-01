import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slice/toastslice';
import authReducer from './slice/authslice';
import tweetReducer from './slice/tweetslice';
import userReducer from './slice/userslice';

const store = configureStore({
    reducer: {

        toast: toastReducer,
        auth: authReducer,
        tweet: tweetReducer,
        user:userReducer,

    },
});

export default store;
