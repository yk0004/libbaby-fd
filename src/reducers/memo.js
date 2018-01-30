import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: []
  },
  edit: {
    status: 'INIT',
    error: -1
  },
  remove: {
    status: 'INIT',
    error: -1
  },
  search: {
    status: 'INIT'
  },
  bycomment: {
    status: 'INIT',
    data: []
  },
  mycomment: {
    status: 'INIT',
    data: []
  }
};

const memo = (state=initialState, action) => {
  switch(action.type) {
    case types.MEMO_POST:
      return update(state, {
        post: {
          status: { $set: 'WAITING'},
          error: { $set: -1 }
        }
      });
    case types.MEMO_POST_SUCCESS:
      return update(state, {
        post: {
          status: { $set: 'SUCCESS'}
        }
      });
    case types.MEMO_POST_FAILURE:
      return update(state, {
        post: {
          status: { $set: 'FAILURE'},
          error: { $set: action.error }
        }
      });
    case types.MEMO_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING'}
        }
      });
    case types.MEMO_LIST_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS'},
          data: { $set: action.data }
        }
      });
    case types.MEMO_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE'}
        }
      });
    case types.MEMO_EDIT:
      return update(state, {
        edit: {
          status: { $set: 'WAITING' }
        }
      });
    case types.MEMO_EDIT_SUCCESS:
      return update(state, {
        edit: {
          status: { $set: 'SUCCESS'}
        },
        list: {
          data: { [action.index]: { $set: action.data }}
        }
      });
    case types.MEMO_EDIT_FAILURE:
      return update(state, {
        edit: {
          status: { $set: 'FAILURE'},
          error: { $set: action.error }
        }
      });
    case types.MEMO_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING'}
        }
      });
    case types.MEMO_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS'}
        },
        list: {
          data: { $splice: [[action.index, 1]]}
        }
      });
    case types.MEMO_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE'},
          error: { $set: action.error }
        }
      });
    case types.MEMO_SEARCH:
      return update(state, {
        search: {
          status: { $set: 'WAITING'}
        }
      });
    case types.MEMO_SEARCH_SUCCESS:
      return update(state, {
        search: {
          status: { $set: 'SUCCESS'}
        },
        list: {
          data: { $set: action.data}
        }
      });
    case types.MEMO_SEARCH_FAILURE:
      return update(state, {
        search: {
          status: { $set: 'FAILURE'}
        }
      });
    case types.GET_COMMENT:
      return update(state, {
        bycomment: {
          status: { $set: 'WAITING'}
        }
      });
    case types.GET_COMMENT_SUCCESS:
      return update(state, {
        bycomment: {
          status: { $set: 'SUCCESS'},
          data: { $set: action.data }
        }
      });
    case types.GET_COMMENT_FAILURE:
      return update(state, {
        bycomment: {
          status: { $set: 'FAILURE'}
        }
      });
    case types.GET_MY_COMMENT:
      return update(state, {
        mycomment: {
          status: { $set: 'WAITING'}
        }
      });
    case types.GET_MY_COMMENT_SUCCESS:
      return update(state, {
        mycomment: {
          status: { $set: 'SUCCESS'},
          data: { $set: action.data }
        }
      });
    case types.GET_MY_COMMENT_FAILURE:
      return update(state, {
        mycomment: {
          status: { $set: 'FAILURE'}
        }
      });
    default:
      return state;
  }
}

export default memo;
