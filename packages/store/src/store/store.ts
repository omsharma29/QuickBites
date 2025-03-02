import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../SliceFeature/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
});

// ✅ Export typed versions of dispatch and state selector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
