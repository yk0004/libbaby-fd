import React, { Component } from 'react';
import './style.css';
// import { Link } from 'react-router-dom';

class Slider extends Component {

  render() {
    const loginView = <a href="http://lib-baby.herokuapp.com/auth/facebook" className="login">Facebook Login</a>;
    // const writeView = <Link to="/memo" className="main_btn">물품요청</Link>;
    return (
      <div className="slider">
        <div className="info">
          <div className="intro">
            <h1 className="letter">아기용품 직거래 장터</h1>
            <h2 className="letter">이젠 필요한 물품을 직접 요청하세요</h2>
            <h2 className="letter">복잡한 검색은 필요 없는 서비스</h2>
            <h3 className="letter">지금 바로 시작해 보세요</h3>
            {this.props.isLoggedIn? undefined : loginView}
          </div>
        </div>
      </div>
    );
  }

}

export default Slider;
