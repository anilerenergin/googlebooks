// bookStore.ts
import {createStore} from 'redux';
import bookReducer from '../store/reducers'; // Update the path as per your file structure
// Create the Redux store
const store = createStore(bookReducer);

export default store;
