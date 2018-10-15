import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as io from 'socket.io-client';
import './styles.css';


class OrderBook extends Component {
    // loads socket.io after successfully mount the whole component
    componentDidMount() {
        let socket = io('http://localhost:3001');

        const msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'book', 
            symbol: 'tBTCUSD',
            prec: 'P0',
            freq: 'F0',
            len: '25' 
        });
              
        socket.on('connect', () => {
            socket.emit('subscribe', msg);
            socket.on('book', data => {
                console.log(data);
            });
        });

    }

    render() {
        const { books: { list } } = this.props;

        const withTotals = list.map((b,i) => {
            const amount = parseFloat((typeof b.amount === 'string' ? parseFloat(b.amount) : b.amount).toFixed(2));
            const count = parseFloat((typeof b.count === 'string' ? parseFloat(b.count) : b.count).toFixed(2));
            const total = count*amount;
            b.total = parseFloat(list[i-1] ? list[i-1].total +  total : total).toFixed(2);
            return b;
        });
        return (
        <div className="order-book">
            <h2>Order Book</h2>
            <div className="books">
                <header className="book">
                    <div className="count">Count</div>
                    <div className="amount">Amount</div>
                    <div className="total">Total</div>
                    <div className="price">Price</div>
                </header>
            {
                list.length && withTotals.map((book, idx) =>
                    <div className="book" key={idx}>
                        <div className="count">{book.count}</div>
                        <div className="amount">{book.amount}</div>
                        <div className="total">{book.total}</div>
                        <div className="price">{book.price}</div>
                    </div>
                )
            }
            </div>
        </div>);
    }
}

OrderBook.propTypes = {
    books: PropTypes.shape({
        list: PropTypes.arrayOf({
            price: PropTypes.number,
            rate: PropTypes.number,
            period: PropTypes.number,
            count: PropTypes.number,
            amount: PropTypes.number
        })
    })
};

export default OrderBook;