import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOwnComment,
  downVoteComment,
  downVoteThread, getDetailThread, neutralizeVoteComment, neutralizeVoteThread, upVoteComment, upVoteThread,
} from '../../utils/api';

export const getDetailThreadThunk = createAsyncThunk('detailThread/getDetailThreadThunk', async (id) => {
  try {
    const data = await getDetailThread(id);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createNewCommentThunk = createAsyncThunk('detailThread/createNewCommentThunk', async ({ content, threadId }) => {
  try {
    const data = await createOwnComment({ content, threadId });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const upVoteThreadThunk = createAsyncThunk('detailThread/upVoteThreadThunk', async (id) => {
  try {
    const data = await upVoteThread(id);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const downVoteThreadThunk = createAsyncThunk('detailThread/downVoteThreadThunk', async (id) => {
  try {
    const data = await downVoteThread(id);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const neutralizeVoteThreadThunk = createAsyncThunk('detailThread/neutralizeVoteThreadThunk', async (id) => {
  try {
    const data = await neutralizeVoteThread(id);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const upVoteCommentThunk = createAsyncThunk('detailThread/upVoteCommentThunk', async ({ threadId, commentId }) => {
  try {
    const data = await upVoteComment(threadId, commentId);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const downVoteCommentThunk = createAsyncThunk('detailThread/downVoteCommentThunk', async ({ threadId, commentId }) => {
  try {
    const data = await downVoteComment(threadId, commentId);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const neutralizeVoteCommentThunk = createAsyncThunk('detailThread/neutralizeVoteCommentThunk', async ({ threadId, commentId }) => {
  try {
    const data = await neutralizeVoteComment(threadId, commentId);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});
