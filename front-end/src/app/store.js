import { configureStore } from "@reduxjs/toolkit";
import likedItemsReducer from "../features/likedItems.js";

export const store = configureStore({
  reducer: {
    likedItems: likedItemsReducer,
  },
});
