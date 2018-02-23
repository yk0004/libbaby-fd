import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MyComment from '../components/MyComment';
import { getStatusRequest, logoutRequest } from '../actions/account';
import { memoPostRequest, getCommentRequest } from '../actions/memo';
import Cookies from 'js-cookie';

class ByList extends Component {

  componentDidMount(){
    this.props.getStatusRequest().then(()=> {
      this.props.getCommentRequest(this.props.match.params.id);
      window.scrollTo(0, 0);
    })
  }

  handleLogout = () => {
    this.props.logoutRequest();
    Cookies.remove('key');
  }

  render() {
      const { isLoggedIn, username, userPicture, memoPostRequest, data } = this.props;
    return (
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          userPicture={userPicture}
          onPost={memoPostRequest}
          onLogout={this.handleLogout}
        />
        <MyComment
          data={data}
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
    data: state.memo.bycomment.data
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
    memoPostRequest: (title, contents) => {
      return dispatch(memoPostRequest(title, contents));
    },
    getCommentRequest: (id) => {
      return dispatch(getCommentRequest(id));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ByList);
