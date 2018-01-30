import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import PostForm from '../Form';

let server_url = process.env.REACT_APP_SERVER_URI;

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  handlePopup = () => {
    this.setState({
      visible: true
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handlePost = (title, contents) => {
    this.props.onPost(title, contents)
    .then(()=> {
      this.setState({
        visible: false
      })
    })
  }

  render(){
    const { isLoggedIn, username, userPicture, onLogout } = this.props;
    const loginView = <a href={`${server_url}auth/facebook`} className="login">Facebook Login</a>;
    const userMenuView = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/mypage" className="mypage">My Page</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a href="/" onClick={onLogout} className="logout">LogOut</a>
        </Menu.Item>
      </Menu>
    );
    const userView = (
      <Dropdown overlay={userMenuView} trigger={['click']} placement="bottomCenter" >
        <div className="userInfo">
          <img src={userPicture} className="userPicture" alt="userpicture" />
          <span className="userName">{username}</span>
          <span className="userMenuBar">&#9660;</span>
        </div>
      </Dropdown>
    );
    const writeView = <a onClick={this.handlePopup} className="menu">물품요청</a>;

    return(
      <div className="navbar">
        <Link to="/" className="title">LIB BABY</Link>
        <div className="rightbar">
          <Link to="/list" className="menu">물품리스트</Link>
          {isLoggedIn? writeView : undefined }
          {isLoggedIn? userView : loginView }
        </div>
        <PostForm
          mode="post"
          visible={this.state.visible}
          onPost={this.handlePost}
          onCancel={this.handleCancel}
          card_title="물품구매"
        />
      </div>
    );
  }
}

export default Header;
