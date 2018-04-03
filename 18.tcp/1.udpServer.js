let dgram = require('dgram');
let socket = dgram.createSocket('udp4');

// 客户端监听数据；
socket.send("zhufeng", 8080, 'localhost', function () {
    console.log('success');
})