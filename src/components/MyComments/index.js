import React, { Component } from 'react';
import List from 'antd/lib/list';
import './style.css';

class MyComments extends Component {

  render() {
    const comments = this.props.data.map((data,i) => {
      if(data.name !== this.props.username) {
        return;
      }
      return data;
    });


    return (
      <List
        itemLayout="vertical"
        size="small"
        dataSource={comments}
        renderItem={item => {
          const date = new Date(item.date);
          const month = date.getMonth()+1;
          const day = date.getDate();
          const year = date.getFullYear();
          const priceData = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return (
            <List.Item
              key={item.date}
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
    );
  }

}

export default MyComments;
