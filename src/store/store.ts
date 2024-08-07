import { configureStore, combineReducers } from "@reduxjs/toolkit";
import chatReducer from "../reducer/ChatSlice";
import authReducer from "../reducer/AuthSlice";
const rootReducer = combineReducers({
    chat: chatReducer,
    auth: authReducer,
})

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;