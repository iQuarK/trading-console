import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import OrderBook from './components/OrderBook';

test('renders without crashing', () => {
  expect(shallow(<App />).contains(<OrderBook />)).toBe(true);
});
