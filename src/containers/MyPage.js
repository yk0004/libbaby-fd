import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MyList from '../components/MyList';
import { getStatusRequest, logoutRequest } from '../actions/account';
import { memoListRequest, memoPostRequest, getMyCommentRequest } from '../actions/memo';
import Cookies from 'js-cookie';

class MyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    this.props.getStatusRequest().then(()=>{
      this.props.memoListRequest(false, this.props.currentUser);
      this.props.getMyCommentRequest(this.props.currentUser).then(()=> {
        this.setState({
          isLoading: false
        });
      })
    })
  }

  handleLogout = () => {
    this.props.logoutRequest();
    Cookies.remove('key');
  }

  render() {
      const { isLoggedIn, username, userPicture, memoPostRequest, data, mycomment, currentUser } = this.props;
    return (
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          userPicture={userPicture}
          onPost={memoPostRequest}
          onLogout={this.handleLogout}
        />
        <MyList
          data={data}
          comment={mycomment}
          currentUser={currentUser}
          isLoading={this.state.isLoading}
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
    data: state.memo.list.data,
    mycomment: state.memo.mycomment.data
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
    getMyCommentRequest: (username) => {
      return dispatch(getMyCommentRequest(username));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
