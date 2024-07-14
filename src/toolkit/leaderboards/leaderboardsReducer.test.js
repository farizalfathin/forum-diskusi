// File: leaderboardsReducer.test.js

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './leaderboardsReducer';
import { ActionType } from './leaderboardsAction';

describe('leaderboardsReducer', () => {
  const initialState = {
    status: 'idle',
    error: null,
    list: [],
  };

  it('should return the initial state when no action is passed', () => {
    const result = leaderboardsReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle RECEIVE_LEADERBOARDS action', () => {
    const leaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 5,
      },
    ];

    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: { leaderboards },
    };

    const expectedState = {
      status: 'Success',
      error: null,
      list: leaderboards,
    };

    const result = leaderboardsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
