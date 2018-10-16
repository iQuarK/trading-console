import React, { Component } from 'react';
import './App.css';
import OrderBook from './components/OrderBook';
import Trades from './components/Trades';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OrderBook />
        <Trades />
      </div>
    );
  }
}

export default App;
