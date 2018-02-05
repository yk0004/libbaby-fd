import {
  MEMO_POST,
  MEMO_POST_SUCCESS,
  MEMO_POST_FAILURE,
  MEMO_LIST,
  MEMO_LIST_SUCCESS,
  MEMO_LIST_FAILURE,
  MEMO_EDIT,
  MEMO_EDIT_SUCCESS,
  MEMO_EDIT_FAILURE,
  MEMO_REMOVE,
  MEMO_REMOVE_SUCCESS,
  MEMO_REMOVE_FAILURE,
  MEMO_SEARCH,
  MEMO_SEARCH_SUCCESS,
  MEMO_SEARCH_FAILURE,
  COMMENT_POST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAILURE,
  GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  GET_MY_COMMENT,
  GET_MY_COMMENT_SUCCESS,
  GET_MY_COMMENT_FAILURE
} from './ActionTypes';
import axios from 'axios';
axios.defaults.withCredentials = true;
const server_url = process.env.REACT_APP_SERVER_URI;

export const memoPostRequest = (title, contents) => {
  return (dispatch) => {
    dispatch(memoPost());

    return axios.post(`${server_url}post`, {title, contents})
    .then((response) => {
      dispatch(memoPostSuccess());
    }).catch((error) => {
      dispatch(memoPostFailure(error.data.code));
    });
  };
}

export const memoPost = () => {
  return {
    type: MEMO_POST
  };
}

export const memoPostSuccess = () => {
  return {
    type: MEMO_POST_SUCCESS
  };
}

export const memoPostFailure = (error) => {
  return {
    type: MEMO_POST_FAILURE,
    error
  };
}

export const memoListRequest = (Latest, username) => {
  return (dispatch) => {
    dispatch(memoList());
    let url = `${server_url}post`;

    if(Latest) {
      url = `${url}/latest`;
    } else if(typeof username !== "undefined") {
      url = `${url}/${username}`;
    }

    return axios.get(url)
    .then((response) => {
      dispatch(memoListSuccess(response.data));
    }).catch((error) => {
      dispatch(memoListFailure());
    });
  };
}

export const memoList = () => {
  return {
    type: MEMO_LIST
  };
}

export const memoListSuccess = (data) => {
  return {
    type: MEMO_LIST_SUCCESS,
    data
  };
}

export const memoListFailure = () => {
  return {
    type: MEMO_LIST_FAILURE
  };
}

export const memoEditRequest = (id, index, title, contents) => {
  return (dispatch) => {
    dispatch(memoEdit());

    return axios.put(`${server_url}post/` + id, {title, contents})
    .then((response) => {
      dispatch(memoEditSuccess(index, response.data.memo));
    }).catch((error) => {
      dispatch(memoEditFailure(error.data));
    });
  };
}

export const memoEdit = () => {
  return {
    type: MEMO_EDIT
  };
}

export const memoEditSuccess = (index, data) => {
  return {
    type: MEMO_EDIT_SUCCESS,
    index,
    data
  };
}

export const memoEditFailure = (error) => {
  return {
    type: MEMO_EDIT_FAILURE,
    error
  };
}

export const memoRemoveRequest = (id, index) => {
  return (dispatch) => {
    dispatch(memoRemove());

    return axios.delete(`${server_url}post/` + id)
    .then((response) => {
      dispatch(memoRemoveSuccess(index));
    }).catch((error) => {
      dispatch(memoRemoveFailure(error.data.code));
    });
  };
}

export const memoRemove = () => {
  return {
    type: MEMO_REMOVE
  };
}

export const memoRemoveSuccess = (index) => {
  return {
    type: MEMO_REMOVE_SUCCESS,
    index
  };
}

export const memoRemoveFailure = (error) => {
  return {
    type: MEMO_REMOVE_FAILURE,
    error
  };
}

export const memoSearchRequest = (keyword) => {
  return (dispatch) => {
    dispatch(memoSearch());

    return axios.get(`${server_url}search/` + keyword)
    .then((response) => {
      dispatch(memoSearchSuccess(response.data));
    }).catch((error) => {
      dispatch(memoSearchFailure());
    });
  };
}

export const memoSearch = () => {
  return {
    type: MEMO_SEARCH
  };
}

export const memoSearchSuccess = (data) => {
  return {
    type: MEMO_SEARCH_SUCCESS,
    data
  };
}

export const memoSearchFailure = () => {
  return {
    type: MEMO_SEARCH_FAILURE
  };
}

export const commentPostRequest = (id, memo, price, files) => {
  return (dispatch) => {
    dispatch(commentPost());

    let data = new FormData();
    for(let i = 0; i < files.length; i++) {
      data.append('photo', files[i].originFileObj);
    }
    data.append('memo', memo);
    data.append('price', price);

    return axios.put(`${server_url}comment/` + id, data)
    .then((response) => {
    }).catch((error) => {
      dispatch(commentPostFailure(error));
    });
  };
}

export const commentPost = () => {
  return {
    type: COMMENT_POST
  };
}

export const commentPostSuccess = (data) => {
  return {
    type: COMMENT_POST_SUCCESS,
    data
  };
}

export const commentPostFailure = (error) => {
  return {
    type: COMMENT_POST_FAILURE,
    error
  }
}

export const getCommentRequest = (id) => {
  return (dispatch) => {
    dispatch(getComment());

    return axios.get(`${server_url}comment/` + id)
    .then((response) => {
      dispatch(getCommentSuccess(response.data));
    }).catch((error) => {
      dispatch(getCommentFailure());
    });
  };
}

export const getComment = () => {
  return {
    type: GET_COMMENT
  };
}

export const getCommentSuccess = (data) => {
  return {
    type: GET_COMMENT_SUCCESS,
    data
  };
}

export const getCommentFailure = () => {
  return {
    type: GET_COMMENT_FAILURE
  }
}

export const getMyCommentRequest = (username) => {
  return (dispatch) => {
    dispatch(getMyComment());

    return axios.get(`${server_url}mycomment/` + username)
    .then((response) => {
      dispatch(getMyCommentSuccess(response.data));
    }).catch((error) => {
      dispatch(getMyCommentFailure());
    });
  };
}

export const getMyComment = () => {
  return {
    type: GET_MY_COMMENT
  };
}

export const getMyCommentSuccess = (data) => {
  return {
    type: GET_MY_COMMENT_SUCCESS,
    data
  };
}

export const getMyCommentFailure = () => {
  return {
    type: GET_MY_COMMENT_FAILURE
  }
}
