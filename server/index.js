const _zipObject = require('lodash/zipObject');
const _isArray = require('lodash/isArray');
const _map = require('lodash/map');
const express = require('express');
const app = express();
const port = 3001;

const http = require('http').Server(app);
const io = require('socket.io')(http);
const fields = ['price', 'count', 'amount'];

io.on('connection', function(socket){
    // The user sends the data to subscribe to a service
    socket.on('subscribe', data => {
        // connect to bitfinex WebSocket API
        const ws = require('ws');
        const w = new ws('wss://api.bitfinex.com/ws/2');
        const dataJson = JSON.parse(data);

        w.on('message', (msg) => {
            const msgParsed = JSON.parse(msg);
            if (!msgParsed.event && typeof msgParsed[1] !== 'string') {
                let data = null;

                if (_isArray(msgParsed[1][0])) {
                    data = _map(msgParsed[1], item => _zipObject(fields, item));
                } else {
                    data = _zipObject(fields, msgParsed[1]);
                }
                socket.emit(dataJson.channel, JSON.stringify(data));
            }
            console.debug(msg);
        });

        w.on('open', () => w.send(data));
    });
});

http.listen(port, function(){
  console.log('listening on *:3001');
});
