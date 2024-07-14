import { createSlice } from '@reduxjs/toolkit';
import { createNewThreadThunk, getAllThreadsThunk } from './thunks';
import { downVoteThreadThunk, neutralizeVoteThreadThunk, upVoteThreadThunk } from '../detailThread/thunks';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    status: 'idle',
    error: null,
    category: 'all',
    list: [],
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllThreadsThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(getAllThreadsThunk.fulfilled, (state, action) => {
        state.list = [...action.payload];
        state.status = 'Success';
      })
      .addCase(getAllThreadsThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      })
      .addCase(createNewThreadThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(upVoteThreadThunk.fulfilled, (state, action) => {
        const threads = state.list.find((thread) => thread.id === action.payload.threadId);

        if (threads) {
          threads.downVotesBy = threads.downVotesBy.filter((userId) => userId !== action.payload.userId);

          threads.upVotesBy.push(action.payload.userId);
        }
      })
      .addCase(downVoteThreadThunk.fulfilled, (state, action) => {
        const threads = state.list.find((thread) => thread.id === action.payload.threadId);

        if (threads) {
          threads.upVotesBy = threads.upVotesBy.filter((userId) => userId !== action.payload.userId);

          threads.downVotesBy.push(action.payload.userId);
        }
      })
      .addCase(neutralizeVoteThreadThunk.fulfilled, (state, action) => {
        const threads = state.list.find((thread) => thread.id === action.payload.threadId);

        if (threads) {
          threads.upVotesBy = threads.upVotesBy.filter((userId) => userId !== action.payload.userId);
          threads.downVotesBy = threads.downVotesBy.filter((userId) => userId !== action.payload.userId);
        }
      });
  },
});

export const { filterByCategory } = threadsSlice.actions;
export default threadsSlice;
