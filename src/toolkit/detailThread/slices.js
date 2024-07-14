import { createSlice } from '@reduxjs/toolkit';
import {
  createNewCommentThunk, downVoteCommentThunk, downVoteThreadThunk, getDetailThreadThunk, neutralizeVoteCommentThunk, neutralizeVoteThreadThunk, upVoteCommentThunk, upVoteThreadThunk,
} from './thunks';

const detailThreadSlice = createSlice({
  name: 'detailThread',
  initialState: {
    status: 'idle',
    error: null,
    data: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailThreadThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(getDetailThreadThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'Success';
      })
      .addCase(getDetailThreadThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      })
      .addCase(createNewCommentThunk.fulfilled, (state, action) => {
        state.data.comments.unshift(action.payload);
      })
      .addCase(upVoteThreadThunk.fulfilled, (state, action) => {
        state.data.downVotesBy = state.data.downVotesBy?.filter((userId) => userId !== action.payload.userId);
        state.data.upVotesBy?.push(action.payload.userId);
      })
      .addCase(downVoteThreadThunk.fulfilled, (state, action) => {
        state.data.upVotesBy = state.data.upVotesBy?.filter((userId) => userId !== action.payload.userId);
        state.data.downVotesBy?.push(action.payload.userId);
      })
      .addCase(neutralizeVoteThreadThunk.fulfilled, (state, action) => {
        state.data.upVotesBy = state.data.upVotesBy?.filter((userId) => userId !== action.payload.userId);
        state.data.downVotesBy = state.data.downVotesBy?.filter((userId) => userId !== action.payload.userId);
      })
      .addCase(upVoteCommentThunk.fulfilled, (state, action) => {
        const comments = state.data.comments?.find((comment) => comment.id === action.payload.commentId);

        if (comments) {
          comments.downVotesBy = comments.downVotesBy?.filter((userId) => userId !== action.payload.userId);

          comments.upVotesBy?.push(action.payload.userId);
        }
      })
      .addCase(downVoteCommentThunk.fulfilled, (state, action) => {
        const comments = state.data.comments?.find((comment) => comment.id === action.payload.commentId);

        if (comments) {
          comments.upVotesBy = comments.upVotesBy?.filter((userId) => userId !== action.payload.userId);

          comments.downVotesBy?.push(action.payload.userId);
        }
      })
      .addCase(neutralizeVoteCommentThunk.fulfilled, (state, action) => {
        const comments = state.data.comments?.find((comment) => comment.id === action.payload.commentId);

        if (comments) {
          comments.upVotesBy = comments.upVotesBy?.filter((userId) => userId !== action.payload.userId);

          comments.downVotesBy = comments.downVotesBy?.filter((userId) => userId !== action.payload.userId);
        }
      });
  },
});

export default detailThreadSlice;
