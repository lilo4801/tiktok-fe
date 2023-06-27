import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './account/accountSlice';
import userReducer from './userSlice';

const rootReducer = {
    accounts: accountReducer,
    user: userReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
