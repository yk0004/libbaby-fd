import React, { Component } from 'react';
import './style.css';
import TimeAgo from 'react-timeago';
import koreaStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { withRouter } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import PostForm from '../Form';
const formatter = buildFormatter(koreaStrings);

class Memo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      visible: false,
      contents: '',
      card_title: '물품구매'
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleRemove = () => {
    let id = this.props.data._id;
    let index = this.props.index;
    this.props.onRemove(id, index);
  }

  handleEditView = () => {
    this.setState({
      mode: "edit",
      visible: true,
      contents: this.props.data.contents
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

  handleCommentView = () => {
    this.setState({
      mode: "comment",
      visible: true,
      contents: '',
      card_title: '물품판매'
    });
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
    const { data, ownership } = this.props;
    const counter = data.comments.length;

    const editMenuView = (
      <Menu>
        <Menu.Item key="0">
          <div onClick={this.handleEditView}>수정</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <div onClick={this.handleRemove}>삭제</div>
        </Menu.Item>
      </Menu>
    )
    const editView = (
      <Dropdown className="editView" overlay={editMenuView} trigger={['click']} placement="bottomRight">
        <a className="editView_btn">
          &#8801;
        </a>
      </Dropdown>
    )

    const blankView = (<div className="blank"></div>);
    return (
      <div className="card">
        {ownership? editView: blankView }
        <img src={data.picture} alt="user_photo" className="photo"/>
        <div className="card_title">구매: {data.title}</div>
        <div className="card_contents">{data.contents}</div>
        <div className="comment_btn" onClick={this.handleCommentView}>물품등록</div>
        <div className="card_footer">
          <div className="counter"> {counter}명 참여</div>
          <TimeAgo className="card_date" date={data.date.created} formatter={formatter}/>
        </div>
        <PostForm
          mode={this.state.mode}
          visible={this.state.visible}
          onEdit={this.handleEdit}
          onComment={this.handleComment}
          onCancel={this.handleCancel}
          id={this.props.data._id}
          index={this.props.index}
          title={data.title}
          contents={this.state.contents}
          card_title={this.state.card_title}
        />
      </div>
    );
  }

}

export default (withRouter)(Memo);
