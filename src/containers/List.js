import React, { Component } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import PostList from '../components/PostList';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import { getStatusRequest, logoutRequest } from '../actions/account';
import { memoListRequest, memoPostRequest, memoEditRequest, memoRemoveRequest, memoSearchRequest, commentPostRequest } from '../actions/memo';

class List extends Component {

  componentDidMount(){
    this.props.getStatusRequest();
    this.props.memoListRequest(false);
    window.scrollTo(0, 0);
  }

  handleSearch = (keyword) => {
    return this.props.memoSearchRequest(keyword)
    .then(() => {
      if(this.props.data.length === 0) {
        const error = () => {
          const modal = Modal.error({
              title: '검색된 물품이 없습니다.'
          });
          setTimeout(() => modal.destroy(), 1500 );
        };
        error();
      }
    })
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
        <Search onSearch={this.handleSearch} />
        <PostList
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
    memoSearchRequest: (keyword) => {
      return dispatch(memoSearchRequest(keyword));
    },
    commentPostRequest: (id, memo, price, files) => {
      return dispatch(commentPostRequest(id, memo, price, files))
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(List);
