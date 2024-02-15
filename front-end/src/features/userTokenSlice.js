import { createSlice } from '@reduxjs/toolkit';


export const userTokenSlice = createSlice({
  name: "userToken",
  initialState: {
   value : {
    id : 0
   }
 
  },
  reducers: {
    updateUserToken : (state, action) => {
        state.value= action.payload;
    }
  }
});
export const {updateUserToken} = userTokenSlice.actions;
export default userTokenSlice.reducer;

