// File: userReducer.js
import { ActionType } from './usersAction';

const initialState = {
  status: 'idle',
  error: null,
  list: [],
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return {
        ...state,
        list: action.payload.users,
        status: 'Success',
        error: null,
      };
    default:
      return state;
  }
}