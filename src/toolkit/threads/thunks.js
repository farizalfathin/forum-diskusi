import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOwnThread, getAllThreads } from '../../utils/api';

export const getAllThreadsThunk = createAsyncThunk('threads/getAllThreadsThunk', async () => {
  const data = await getAllThreads();
  return data;
});

export const createNewThreadThunk = createAsyncThunk('threads/createNewThreadThunk', async ({ title, body, category }) => {
  const response = await createOwnThread({ title, body, category });
  return response;
});
