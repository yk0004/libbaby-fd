import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';

const store = createStore(reducers, applyMiddleware(thunk));

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

export default Root;
