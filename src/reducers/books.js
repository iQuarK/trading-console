const initialState = {
  list: []
};

const books = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BOOK':
        return { ...state, list: [ ...state.books.list, action.data ] };
      default:
        return state;
    }
  };
  
  export default books;