import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk, loginUserThunk, getOwnUserThunk } from './thunks';
import { putAccessToken } from '../../utils/api';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    status: 'idle',
    error: null,
    data: null,
  },
  reducers: {
    setStatusDefault: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    logoutOwnUser: (state) => {
      putAccessToken('');
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.status = 'Success';
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.status = 'Success';
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      })
      .addCase(getOwnUserThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(getOwnUserThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'Success';
      })
      .addCase(getOwnUserThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      });
  },
});

export const { setStatusDefault, logoutOwnUser } = authUserSlice.actions;
export default authUserSlice;
