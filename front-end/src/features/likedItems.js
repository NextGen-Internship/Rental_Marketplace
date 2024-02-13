import { createSlice } from '@reduxjs/toolkit';

export const likedItemsSlice = createSlice({
  name: "likedItems",
  initialState: {
    values: [] // Initial state with an empty array
  },
  reducers: {
    like: (state, action) => {
      state.values = action.payload; // Assuming action.payload is already an array
    },
  }
});

export const { like } = likedItemsSlice.actions;
export default likedItemsSlice.reducer;
