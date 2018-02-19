import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  getStatus: 'INIT',
  username: '',
  userPicture: '',
  currentUser: '',
  isLoggedIn: false
};

const account = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_STATUS:
      return update(state, {
        getStatus: { $set: 'WAITING'},
        isLoggedIn: { $set: false }
      });
    case types.GET_STATUS_SUCCESS:
      return update(state, {
        getStatus: { $set: 'SUCCESS'},
        username: { $set: action.username },
        userPicture: {$set: action.userPicture },
        isLoggedIn: { $set: action.isLoggedIn },
        currentUser: { $set: action.facebook }
      });
    case types.GET_STATUS_FAILURE:
      return update(state, {
        getStatus: { $set: 'FAILURE'},
        isLoggedIn: { $set: false }
      });
    case types.LOGOUT:
      return update(state, {
        isLoggedIn: { $set: false }
      });
    default:
      return state;
  }
}

export default account;
