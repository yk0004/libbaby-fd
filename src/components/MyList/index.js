import React, { Component } from 'react';
import './style.css';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router-dom';
import MyComments from '../MyComments';
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class MyList extends Component {

  render() {
    const { data, comment, currentUser } = this.props;
    const mycomment = comment.map((data,i) => {
        return (<MyComments key={i} data={data.comments} username={currentUser}/>)

    })

    return (
      <div className="myList">
        <div className="myList_title">물품 구매리스트</div>
        <div className="list_outer">
          <div className="list_nav">
            <List
              itemLayout="horizontal"
              size="small"
              dataSource={data}
              renderItem={item => {
                const date = new Date(item.date.created);
                const month = date.getMonth()+1;
                const day = date.getDate();
                const year = date.getFullYear();
                return (
                  <div className="list_main">
                    <List.Item
                      key={item.title}
                      actions={[<Link to={`/buylist/${item._id}`}>
                        <IconText type="message" text={item.comments.length} /></Link>]}
                    >
                      <List.Item.Meta
                        title={item.title}
                        description={`작성일 : ${year}년 ${month}월 ${day}일`}
                      />
                      {item.contents}
                    </List.Item>
                  </div>
              )}}
            />
          </div>
        </div>
        <div className="myList_title" id="sell">물품 판매리스트</div>
        <div className="list_outer">
          <div className="list_nav">
            {mycomment}
          </div>
        </div>
      </div>
    );
  }

}

export default MyList;
