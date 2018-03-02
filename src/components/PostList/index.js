import React, { Component } from 'react';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import PostForm from '../Form';
import './style.css';
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      visible: false,
      card_title: '물품구매',
      id:'',
      title:'',
      contents:'',
      index:''
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleRemove = (id, index) => {
    this.props.onRemove(id, index);
  }

  handleEditView = (id,title,contents, index) => {
    this.setState({
      mode: "edit",
      visible: true,
      id,
      title,
      contents,
      index
    });
  }

  handleEdit = (id, index, title, contents) => {
    this.props.onEdit(id, index, title, contents)
    .then(()=> {
      this.setState({
        visible: false
      })
    })
  }

  handleCommentView = (id, title) => {
    if(this.props.isLoggedIn) {
      this.setState({
        mode: "comment",
        visible: true,
        id,
        title,
        contents:'',
        card_title: '물품판매'
      });
    } else {
      alert("로그인 후 이용하세요.");
    }    
  }

  handleComment = (id, memo, price, file) => {
    this.props.onComment(id, memo, price, file)
    .then(()=> {
      this.setState({
        visible: false
      })
    })
  }

  render() {
    const { currentUser, data } = this.props;

    return (
      <div className="myPost">
        <div className="myList_title">물품 리스트</div>
        <div className="list_outer">
          <div className="list_nav">
            <List
              itemLayout="horizonta"
              size="small"
              dataSource={data}
              renderItem={(item, index) => {
                const date = new Date(item.date.created);
                const month = date.getMonth()+1;
                const day = date.getDate();
                const year = date.getFullYear();
                const editView = (
                  <div>
                    {item.writer === currentUser ?
                    <a onClick={()=>{this.handleEditView(item._id,item.title,item.contents, index)}}>수정</a> :
                    <a onClick={()=>{this.handleCommentView(item._id, item.title)}}>물품등록</a>}
                  </div>
                );
                const removeView = (
                  <div>
                    {item.writer === currentUser ?
                      <a onClick={()=>{this.handleRemove(item._id, index)}}>삭제</a> : null}
                  </div>
                );

                return (
                  <div className="list_main">
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText type="message" text={item.comments.length} />, editView, removeView ]}
                    >
                      <List.Item.Meta id="list_meta"
                        title={item.title}
                        description={`작성일 : ${year}년 ${month}월 ${day}일`}
                      />
                      {item.contents}
                    </List.Item>
                  </div>
              )}}
            />
            <PostForm
              mode={this.state.mode}
              visible={this.state.visible}
              onEdit={this.handleEdit}
              onComment={this.handleComment}
              onCancel={this.handleCancel}
              id={this.state.id}
              index={this.state.index}
              title={this.state.title}
              contents={this.state.contents}
              card_title={this.state.card_title}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default PostList;
