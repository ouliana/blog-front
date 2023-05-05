import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  body: '',
  type: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displaySuccess(state, action) {
      return {
        body: action.payload,
        type: 'success',
      };
    },
    displayError(state, action) {
      console.log('action.payload: ', action.payload);
      return {
        body: action.payload,
        type: 'error',
      };
    },
    clear() {
      return initialState;
    },
  },
});

export const { displaySuccess, displayError, clear } =
  notificationSlice.actions;
export default notificationSlice.reducer;
