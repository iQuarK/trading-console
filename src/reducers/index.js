import { combineReducers } from 'redux';
import books from './books';
import trades from './trades';

export default combineReducers({
  books,
  trades
})