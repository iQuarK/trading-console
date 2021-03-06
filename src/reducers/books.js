import _sortBy from 'lodash/sortBy';
import _slice from 'lodash/slice';

const initialState = {
  bids: [],
  asks: []
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      // if it has an array instead of an object, then all should be processed
      let { bids, asks } = state;
      const length = action.data.length;

      for(let i=0; i<length; i++) {
        const elem = action.data[i];
        if (elem.count > 0) {
          if (elem.amount <= 0) {
            asks.push({ ...elem, amount: Math.abs(elem.amount)});
          } else {
            bids.push(elem);
          }
        }
      }
      bids = _slice(_sortBy(bids, ['price']), 0, 25);
      asks = _slice(_sortBy(asks, ['price']), 0, 25);
      return { ...state, bids, asks };
    case 'CLEAR_BOOKS':
      return initialState;
    default:
      return state;
  }
};
  
  export default books;