import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import chatReducer from "../reducer/ChatSlice";

const rootReducer = combineReducers({
    chat:chatReducer,
})

export const store = configureStore({
    reducer :rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;