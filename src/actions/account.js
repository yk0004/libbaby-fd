import axios from 'axios';
import {
  GET_STATUS,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAILURE,
  LOGOUT
} from './ActionTypes';
axios.defaults.withCredentials = true;
const server_url = process.env.REACT_APP_SERVER_URI;

export const getStatusRequest = () => {
  return (dispatch) => {
    dispatch(getStatus());

    return axios.get(`${server_url}getstatus`)
      .then((response) => {
        const { user } = response.data;
        if(user) {
          dispatch(getStatusSuccess(true, user.profile.name, user.profile.picture, user.facebook));
        } else {
          dispatch(getStatusSuccess(false, user));
        }
      }).catch((error) => {
        dispatch(getStatusFailure());
      })
  }
}

export const getStatus = () => {
  return {
    type: GET_STATUS
  };
}

export const getStatusSuccess = (isLoggedIn, username, userPicture, facebook) => {
  return {
    type: GET_STATUS_SUCCESS,
    isLoggedIn,
    username,
    userPicture,
    facebook
  };
}

export const getStatusFailure = () => {
  return {
    type: GET_STATUS_FAILURE
  };
}

export const logoutRequest = () => {
  return (dispatch) => {
    return axios.get(`${server_url}logout`)
      .then(() => {
        dispatch(logout());
      }).catch(()=> {
        console.log("logout failed");
      })
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  };
}
