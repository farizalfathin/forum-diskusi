// File: userReducer.test.js

import { describe, it, expect } from 'vitest';
import usersReducer from './usersReducer';
import { ActionType } from './usersAction';

describe('usersReducer', () => {
  const initialState = {
    status: 'idle',
    error: null,
    list: [],
  };

  it('should return the initial state when no action is passed', () => {
    const result = usersReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle RECEIVE_USERS action', () => {
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

    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users },
    };

    const expectedState = {
      status: 'Success',
      error: null,
      list: users,
    };

    const result = usersReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
