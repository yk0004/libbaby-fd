import React, { Component } from 'react';
import './style.css';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import Modal from 'antd/lib/modal';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class MyComment extends Component {

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { data } = this.props;

    return (
      <div className="myList">
        <div className="myList_title">{data.title}</div>
        <div className="list_outer">
          <div className="list_nav">
        <List
          itemLayout="vertical"
          size="small"
          dataSource={data.comments}
          renderItem={item => {
            const date = new Date(item.date);
            const month = date.getMonth()+1;
            const day = date.getDate();
            const year = date.getFullYear();
            const priceData = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return (
              <List.Item
                key={item.date}
                actions={[<a onClick={this.showModal}><IconText type="like-o" text="0" /></a>]}
                extra={
                  item.photo.map((photo,i)=> {
                    return (<img className="comment_img" key={i} src={`https://storage.googleapis.com/libbaby/${photo}`} width={120} height={120} alt="commentPhoto"/>)
                  })
                  }
              >
                <List.Item.Meta
                  title={item.memo}
                  description={`작성일 : ${year}년 ${month}월 ${day}일`}
                />
                {`가격 : ${priceData}원`}
              </List.Item>
          )}}
          />
            </div>
          </div>
          <div className="back">
          <Button className="back_btn" size="small" >
            <Link to="/mypage"><Icon type="left" />뒤로</Link>
          </Button>
        </div>
        <Modal
          title="구매요청"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>이 상품을 구매하시겠습니까?</p>
        </Modal>
        </div>

    );
  }

}

export default MyComment;
