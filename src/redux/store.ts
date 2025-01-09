import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart";

// Create the store instance directly
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Export the store instance for usage in the application
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;