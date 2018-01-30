import React, { Component } from 'react';
import './style.css';
import Memo from '../Memo';
import { CSSTransitionGroup } from 'react-transition-group'

class MemoList extends Component {

  render() {
    const { currentUser, data, onEdit, onRemove, onComment } = this.props;
    const memoView = data.map((memo, i) => {
      return (<Memo
        data={memo}
        ownership={memo.writer === currentUser}
        key={memo._id}
        index={i}
        onEdit={onEdit}
        onRemove={onRemove}
        onComment={onComment}
      />);
    });

    return (
      <div className="list_head">
        <CSSTransitionGroup className="list_head" transitionName="memo"
                                transitionEnterTimeout={2000}
                                transitionLeaveTimeout={1000}>
          {memoView}
        </CSSTransitionGroup>
      </div>
    );
  }

}

export default MemoList;
