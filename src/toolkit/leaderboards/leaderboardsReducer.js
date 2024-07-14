import { ActionType } from "./leaderboardsAction";

const initialState = {
    status: 'idle',
    error: null,
    list: [],
};

export default function leaderboardsReducer(state = initialState, action = {}) {
    switch (action.type) {
      case ActionType.RECEIVE_LEADERBOARDS:
        return {
          ...state,
          list: [...action.payload.leaderboards],
          status: 'Success',
          error: null,
        };
      default:
        return state;
    }
  }