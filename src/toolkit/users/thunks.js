import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../../utils/api';

const getAllUsersThunk = createAsyncThunk('users/getAllUsersThunk', async () => {
  const data = await getAllUsers();
  return data;
});

export default getAllUsersThunk;
