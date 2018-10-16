import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as io from 'socket.io-client';
import _maxBy from 'lodash/maxBy';

import './styles.css';

const MAX_LINE = 375; // Grid sizes + gaps

class OrderBook extends Component {
    constructor(props) {
        super(props);
        
        // loads socket.io after successfully mount the whole component
        this.state = {
            socket: io('http://localhost:3001'),
            depth: 100
        };
        
        const msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'book', 
            symbol: 'tBTCUSD',
            prec: 'P0',
            freq: 'F1',
            len: '25' 
        });
              
        this.state.socket.on('connect', () => {
            this.state.socket.emit('subscribe', msg);
            this.state.socket.on('book', data => {
                this.props.onNewData(data);
            });
        });
    }

    addTotal = (element, parent) => {
        const total = element.count*element.amount;
        element.total = parseFloat((parent ? parent.total + total : total).toFixed(2));
        return element;
    }

    changePrecision = elem => {
        this.props.clearData();

        const msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'book', 
            symbol: 'tBTCUSD',
            prec: elem.target.value
        });

        this.state.socket.emit('subscribe', msg);
    }

    changeDepth = elem => {
        this.setState({ depth: elem.target.value });
    }

    render() {
        const { books: { bids, asks } } = this.props;
        const { depth } = this.state;
        const bidsTotals = bids.map((b,i) => this.addTotal(b, bids[i-1]));
        const asksTotals = asks.map((b,i) => this.addTotal(b, asks[i-1]));
        const maxis = [_maxBy(bids, 'total'), _maxBy(asks, 'total')];
        const maxTotal = _maxBy(maxis, 'total');

        return (
            <div className="order-book">
                <h2>Order Book</h2>
                <div>
                    Precision:
                    <select onChange={this.changePrecision}>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>

                    Depth:
                    <select onChange={this.changeDepth}>
                        <option value="100">100%</option>
                        <option value="75">75%</option>
                        <option value="50">50%</option>
                        <option value="25">25%</option>
                    </select>
                </div>
                <div className="g-row g-justify-center">
                    <div className="books">
                        <header className="book">
                            <div className="count">Count</div>
                            <div className="amount">Amount</div>
                            <div className="total">Total</div>
                            <div className="price">Price</div>
                        </header>
                    {
                        bids.length && bidsTotals.map((book, idx) => {
                            const percent = ((book.total*depth)/maxTotal.total);
                            const lineSize = ((percent/depth) * MAX_LINE * (depth/100))+'px';
                            
                            return (<div key={idx}>
                                <div className="line green">
                                    <div style={{width: lineSize}}></div>
                                </div>
                                <div className="book">
                                    <div className="count">{book.count}</div>
                                    <div className="amount">{book.amount}</div>
                                    <div className="total">{book.total}</div>
                                    <div className="price">{book.price}</div>
                                </div>
                            </div>);
                        })
                    }
                    </div>
                    <div className="books">
                        <header className="book ask">
                            <div className="price">Price</div>
                            <div className="total">Total</div>
                            <div className="amount">Amount</div>
                            <div className="count">Count</div>
                        </header>
                    {
                        asks.length && asksTotals.map((book, idx) => {
                            const percent = ((book.total*100)/maxTotal.total);
                            const lineSize = ((percent/100) * MAX_LINE * (depth/100))+'px';

                            return (<div className="book" key={idx}>
                                <div className="line red">
                                    <div style={{width: lineSize}}></div>
                                </div>
                                <div className="book ask">
                                    <div className="price">{book.price}</div>
                                    <div className="total">{book.total}</div>
                                    <div className="amount">{book.amount}</div>
                                    <div className="count">{book.count}</div>
                                </div>
                            </div>);
                        })
                    }
                    </div>
                </div>
            </div>);
    }
}

OrderBook.propTypes = {
    books: PropTypes.shape({
        bids: PropTypes.array,
        asks: PropTypes.array
    }).isRequired,
    onNewData: PropTypes.func.isRequired
};

export default OrderBook;