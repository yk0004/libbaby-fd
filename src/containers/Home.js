import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Slider from '../components/Slider';
import MemoList from '../components/MemoList';
import { getStatusRequest, logoutRequest } from '../actions/account';
import { memoListRequest, memoPostRequest, memoEditRequest, memoRemoveRequest, commentPostRequest } from '../actions/memo';
import Modal from 'antd/lib/modal';
import Cookies from 'js-cookie';

class Home extends Component {

  handleOk = () => {
    let loginData = {
                      isLoggedIn: true,
                      username: this.props.username
                    };
    Cookies.set('key',btoa(JSON.stringify(loginData)));
    this.props.history.push('/');
  }

  handleLogout = () => {
    this.props.logoutRequest();
    Cookies.remove('key');
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    this.props.memoListRequest(true);
    let loginData = Cookies.get('key');
    if(typeof loginData === "undefined") return;
    loginData = JSON.parse(atob(loginData));
    if(!loginData.isLoggedIn) return;
    this.props.getStatusRequest();
  }

  render() {
    const { isLoggedIn, username, userPicture, currentUser, data, memoPostRequest, memoEditRequest, memoRemoveRequest, commentPostRequest } = this.props;
    const { pathname } = this.props.history.location;
    let loginState = (pathname === '/login');
    return (
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          userPicture={userPicture}
          onPost={memoPostRequest}
          onLogout={this.handleLogout}
        />
        <Slider isLoggedIn={isLoggedIn}/>
        <MemoList
          data={data}
          currentUser={currentUser}
          onEdit={memoEditRequest}
          onRemove={memoRemoveRequest}
          onComment={commentPostRequest}
        />
        <Modal
          title="알림"
          visible={loginState}
          onOk={this.handleOk}
          onCancel={this.handleOk}
          closable={false}
        >
          <p>로그인 성공</p>
        </Modal>
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
