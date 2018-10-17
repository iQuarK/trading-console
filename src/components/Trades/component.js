import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as io from 'socket.io-client';
import moment from 'moment';

import './styles.css';

class Trades extends Component {
    constructor(props) {
        super(props);
        
        // loads socket.io after successfully mount the whole component
        this.state = {
            socket: io('http://localhost:3001'),
            depth: 100
        };
        
        const msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'trades', 
            symbol: 'tBTCUSD'
        });
              
        this.state.socket.on('connect', () => {
            this.state.socket.emit('subscribe', msg);
            this.state.socket.on('trades', data => {
                this.props.onNewData(data);
            });
        });
    }

    render() {
        const { trades: { list } } = this.props;
        return (
            <div>
                <h2>Trades</h2>
            
                <div className="g-row g-justify-center">
                    <div className="trades">
                        <header className="trade">
                            <div className="time">Time</div>
                            <div className="price">Price</div>
                            <div className="amount">Amount</div>
                        </header>
                    {
                        list.length && list.map((trade, idx) =>
                            <div key={idx} className="trade">
                                <div className="time">
                                    {
                                        moment(trade.mts).format('HH:mm:ss')
                                    }
                                </div>
                                <div className="price">{trade.price}</div>
                                <div className="amount">{trade.amount}</div>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>);
    }
}

Trades.propTypes = {
    trades: PropTypes.shape({
        list: PropTypes.array.isRequired
    }).isRequired,
    onNewData: PropTypes.func.isRequired
};

export default Trades;