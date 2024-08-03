// Store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";

const Store = configureStore({
    reducer: {
        [ProductSlice.reducerPath]: ProductSlice.reducer,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;