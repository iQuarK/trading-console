const express = require('express');
const app = express();
const port = 3001;

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    // The user sends the data to subscribe to a service
    socket.on('subscribe', data => {
        // connect to bitfinex WebSocket API
        const ws = require('ws')
        const w = new ws('wss://api.bitfinex.com/ws/2')
        const dataJson = JSON.parse(data);

        w.on('message', (msg) => {
            if (!msg.event) {
                socket.emit(dataJson.channel, msg);
            }
            console.debug(msg);
        });

        w.on('open', () => w.send(data))
    });
});

http.listen(port, function(){
  console.log('listening on *:3001');
});
