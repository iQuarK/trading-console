import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('renders without crashing', () => {
  expect(shallow(<App />).contains(<code>src/App.js</code>)).toBe(true);
});
