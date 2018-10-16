export const addBook = request => ({
  type: 'ADD_BOOK',
  data: JSON.parse(request)
});

export const clearBooks = request => ({
  type: 'CLEAR_BOOKS'
});
