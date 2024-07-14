import { createSlice } from '@reduxjs/toolkit';
import getLeaderboardsThunk from './thunks';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    status: 'idle',
    error: null,
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboardsThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(getLeaderboardsThunk.fulfilled, (state, action) => {
        state.list = [...action.payload];
        state.status = 'Success';
      })
      .addCase(getLeaderboardsThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      });
  },
});

export default leaderboardsSlice;
