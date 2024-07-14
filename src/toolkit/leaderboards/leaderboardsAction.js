import { getLeaderboards } from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'leaderboards/RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function getLeaderboardsThunk() {
  return async (dispatch) => {
    try {
      const leaderboards = await getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      throw new Error('Error fetching leaderboards:', error);
    }
  };
}

export { ActionType, receiveLeaderboardsActionCreator, getLeaderboardsThunk };