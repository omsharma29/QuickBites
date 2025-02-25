import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartReducer from "../SliceFeature/cartSlice";
import authReducer from "../SliceFeature/authSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
});

// ✅ Export typed versions of dispatch and state selector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
