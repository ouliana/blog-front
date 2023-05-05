import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setAll(state, action) {
      return action.payload;
    },
    createNew(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setAll, createNew } = blogSlice.actions;
export default blogSlice.reducer;
