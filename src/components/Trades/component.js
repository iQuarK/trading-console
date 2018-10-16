import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as io from 'socket.io-client';

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
        console.log(this.props.trades)
        return (<div>
            <h2>Trades</h2>
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