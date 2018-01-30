import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Slider from '../components/Slider';
import MemoList from '../components/MemoList';
import { getStatusRequest, logoutRequest } from '../actions/account';
import { memoListRequest, memoPostRequest, memoEditRequest, memoRemoveRequest, commentPostRequest } from '../actions/memo';

class Home extends Component {

  componentDidMount(){
    this.props.getStatusRequest();
    this.props.memoListRequest(true);
    window.scrollTo(0, 0);
  }

  render() {
    const { isLoggedIn, username, userPicture, currentUser, logoutRequest, data, memoPostRequest, memoEditRequest, memoRemoveRequest, commentPostRequest } = this.props;
    return (
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          userPicture={userPicture}
          onPost={memoPostRequest}
          onLogout={logoutRequest}
        />
        <Slider isLoggedIn={isLoggedIn}/>
        <MemoList
          data={data}
          currentUser={currentUser}
          onEdit={memoEditRequest}
          onRemove={memoRemoveRequest}
          onComment={commentPostRequest}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.account.isLoggedIn,
    username: state.account.username,
    userPicture: state.account.userPicture,
    currentUser: state.account.currentUser,
    data: state.memo.list.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    memoListRequest: (latest, username) => {
      return dispatch(memoListRequest(latest, username));
    },
    memoPostRequest: (title, contents) => {
      return dispatch(memoPostRequest(title, contents));
    },
    memoEditRequest: (id, index, title, contents) => {
      return dispatch(memoEditRequest(id, index, title, contents));
    },
    memoRemoveRequest: (id, index) => {
      return dispatch(memoRemoveRequest(id, index));
    },
    commentPostRequest: (id, memo, price, files) => {
      return dispatch(commentPostRequest(id, memo, price, files))
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
