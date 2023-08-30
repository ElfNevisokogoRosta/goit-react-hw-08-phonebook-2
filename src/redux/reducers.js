import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isLoggedIn: false,
};

export const contactBookSlice = createSlice({
  name: 'contactBook',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.isLoggedIn = false;
      state.token = '';
    },
  },
});

export const { addToken, removeToken } = contactBookSlice.actions;
export const contactBookReducer = contactBookSlice.reducer;
