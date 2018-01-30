import React, { Component } from 'react';
import './style.css';
import Input from 'antd/lib/input';
const SearchBar = Input.Search;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleClick = (e) => {
    this.props.onSearch(e).then(()=> {
      this.setState({
        value: ''
      })
    })
  }

  render() {
    return (
      <div className="search">
        <SearchBar
          className="search_bar"
          placeholder="검색어를 입력하세요."
          onSearch={this.handleClick}
          enterButton
          onChange={this.handleChange}
          value={this.state.value}
          
        />
      </div>
    );
  }

}

export default Search;
