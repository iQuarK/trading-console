import React, { Component } from 'react';
import './App.css';
import OrderBook from './components/OrderBook';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OrderBook />
      </div>
    );
  }
}

export default App;
