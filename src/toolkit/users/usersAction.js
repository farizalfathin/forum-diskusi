import { getAllUsers } from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'users/RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

function getAllUsersThunk() {
  return async (dispatch) => {
    try {
      const users = await getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      throw new Error('Error fetching users:', error);
    }
  };
}

export { ActionType, receiveUsersActionCreator, getAllUsersThunk };