const _zipObject = require('lodash/zipObject');
const _isArray = require('lodash/isArray');
const _map = require('lodash/map');
const express = require('express');
const app = express();
const port = 3001;

const http = require('http').Server(app);
const io = require('socket.io')(http);
const fields = {
    book: ['price', 'count', 'amount'],
    trades: ['id', 'mts', 'amount', 'price']
};

const zipBooks = (channel, data) => {
    let result = [];

    // it can be a set of books or just one book
    if (_isArray(data[0]) || _isArray(data[1][0])) {
        const d = _isArray(data[0]) ? data : data[1];
        result = _map(d, item => _zipObject(fields[channel], item));
    } else {
        if (_isArray(data[1])) {
            result = [ _zipObject(fields[channel], data[1]) ];
        }
    }

    return result;
};

const zipTrades = (channel, data) => {
    let result = [];
    // it can be a set of books or just one book
    if (_isArray(data[0]) || _isArray(data[1])) {
        const d = _isArray(data[0]) ? data : data[1];
        result = _map(d, item => _zipObject(fields[channel], item));
    } else {
        if (_isArray(data[2])) {
            result = [ _zipObject(fields[channel], data[2]) ];
        }
    }
    return result;
};

io.on('connection', function(socket){
    // The user sends the data to subscribe to a service
    socket.on('subscribe', data => {
        // connect to bitfinex WebSocket API
        const ws = require('ws');
        const w = new ws('wss://api.bitfinex.com/ws/2');
        const dataJson = JSON.parse(data);
        const channel = dataJson.channel;

        w.on('message', (msg) => {
            const msgParsed = JSON.parse(msg);
            if (!msgParsed.event && typeof msgParsed[1] !== 'string') {
                let data = [];
                switch(channel) {
                    case 'book':
                        data = zipBooks(channel, msgParsed[1]);
                        break;
                    case 'trades':
                        data = zipTrades(channel, msgParsed[1]);
                        break;
                    default:
                        data = [];
                }
                socket.emit(channel, JSON.stringify(data));
            }
            console.debug(`${channel} ${msg}`);
        });

        w.on('open', () => w.send(data));
    });
});

http.listen(port, function(){
  console.log('listening on *:3001');
});

module.exports = {
    zipBooks,
    zipTrades
};