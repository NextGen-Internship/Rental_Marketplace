// import { configureStore } from "@reduxjs/toolkit";
// import likedItemsReducer from "../features/likedItems.js";
// import userReducer from "../features/userSlice.js";



// export const store = configureStore({
//   reducer: {
//     likedItems: likedItemsReducer,
//     user: userReducer,
//   },
// });



import { configureStore } from "@reduxjs/toolkit";
import likedItemsReducer from "../features/likedItems.js";
import userReducer from "../features/userSlice.js";

const store = configureStore({
  reducer: {
    likedItems: likedItemsReducer,
    user: userReducer,
  },
});

export default store;
