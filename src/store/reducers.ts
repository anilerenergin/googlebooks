const initialState = {
  books: [] as Book[],
};

const bookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bookReducer;
