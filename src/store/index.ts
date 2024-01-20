import {createStore, combineReducers} from 'redux';
import bookReducer from './reducers/bookReducer';

const rootReducer = combineReducers({
  book: bookReducer,
});

const store = createStore(rootReducer);

export default store;
