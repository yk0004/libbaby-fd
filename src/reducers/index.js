import { combineReducers } from 'redux';
import account from './account';
import memo from './memo';

export default combineReducers({
  account,
  memo
});
