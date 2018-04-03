let dgram = require('dgram');

let socket = dgram.createSocket('udp4');
// 服务端；
socket.bind(8080, 'localhost', function () {
    socket.on('message', function (data,rinfo) {
        console.log(data);
        socket.send('hello',rinfo.port)
    });
});