import { configureStore } from '@reduxjs/toolkit';
import threadsSlice from './threads/slices';
import userSlice from './users/slices';
import leaderboardsSlice from './leaderboards/slices';
import authUserSlice from './authUser/slices';
import detailThreadSlice from './detailThread/slices';

const store = configureStore({
  reducer: {
    threads: threadsSlice.reducer,
    threadDetail: detailThreadSlice.reducer,
    authUser: authUserSlice.reducer,
    users: userSlice.reducer,
    leaderboards: leaderboardsSlice.reducer,
  },
});

export default store;
