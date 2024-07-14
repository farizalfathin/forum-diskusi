// File: leaderboardActions.test.js

import { describe, it, expect, vi } from 'vitest';
import { getLeaderboardsThunk, receiveLeaderboardsActionCreator, ActionType } from './leaderboardsAction';
import { getLeaderboards } from '../../utils/api';

vi.mock('../../utils/api');

describe('getLeaderboardsThunk', () => {
  it('dispatches RECEIVE_LEADERBOARDS when fetching leaderboards is successful', async () => {
    const mockDispatch = vi.fn();

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

    getLeaderboards.mockResolvedValueOnce(leaderboards);

    await getLeaderboardsThunk()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(leaderboards));
  });

  it('throws an error when fetching leaderboards fails', async () => {
    const mockDispatch = vi.fn();

    const errorMessage = 'Error fetching leaderboards';
    getLeaderboards.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getLeaderboardsThunk()(mockDispatch)).rejects.toThrow(errorMessage);
  });
});
