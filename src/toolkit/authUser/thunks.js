import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUser, loginUser, getOwnUser, putAccessToken,
} from '../../utils/api';

export const registerUserThunk = createAsyncThunk('users/registerUserThunk', async ({ name, email, password }) => {
  await registerUser({ name, email, password });
});

export const loginUserThunk = createAsyncThunk('users/loginUserThunk', async ({ email, password }) => {
  const data = await loginUser({ email, password });
  putAccessToken(data);
});

export const getOwnUserThunk = createAsyncThunk('users/getOwnUserThunk', async () => {
  const data = await getOwnUser();
  return data;
});
