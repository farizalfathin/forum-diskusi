import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../utils/api';

const getLeaderboardsThunk = createAsyncThunk('leaderboards/getLeaderboardsThunk', async () => {
  const data = await getLeaderboards();
  return data;
});

export default getLeaderboardsThunk;
