const initialState = {
  list: []
};

const trades = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRADE':
      return { ...state, list: [ ...state.list, action.data ] };
    case 'CLEAR_TRADES':
      return initialState;
    default:
      return state;
  }
};
  
  export default trades;