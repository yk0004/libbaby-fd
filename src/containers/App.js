import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import List from './List';
import MyPage from './MyPage';
import ByList from './ByList';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/list" component={List}/>
      <Route path="/mypage" component={MyPage}/>
      <Route path="/buylist/:id" component={ByList}/>
    </div>
  );
}

export default App;
