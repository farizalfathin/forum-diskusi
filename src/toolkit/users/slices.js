import { createSlice } from '@reduxjs/toolkit';
import getAllUsersThunk from './thunks';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    error: null,
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.list = [...action.payload];
        state.status = 'Success';
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice;
