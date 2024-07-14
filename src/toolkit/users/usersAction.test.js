// File: userActions.test.js

import { describe, it, expect, vi } from 'vitest';
import { getAllUsersThunk, receiveUsersActionCreator, ActionType } from './usersAction';
import { getAllUsers } from '../../utils/api';

vi.mock('../../utils/api');

describe('getAllUsersThunk', () => {
  it('dispatches RECEIVE_USERS when fetching users is successful', async () => {
    const mockDispatch = vi.fn();

    const users = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];

    getAllUsers.mockResolvedValueOnce(users);

    await getAllUsersThunk()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(receiveUsersActionCreator(users));
  });

  it('throws an error when fetching users fails', async () => {
    const mockDispatch = vi.fn();

    const errorMessage = 'Error fetching users';
    getAllUsers.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getAllUsersThunk()(mockDispatch)).rejects.toThrow(errorMessage);
  });
});
