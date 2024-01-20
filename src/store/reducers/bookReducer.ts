import {SET_BOOKS} from '../actions/bookActions';

const initialState = {
  books: [],
};

const bookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BOOKS:
      return {...state, books: action.payload};
    default:
      return state;
  }
};

export default bookReducer;
