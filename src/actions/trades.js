export const addTrade = request => ({
  type: 'ADD_TRADE',
  data: JSON.parse(request)
});

export const clearTrades = request => ({
  type: 'CLEAR_TRADES'
});
