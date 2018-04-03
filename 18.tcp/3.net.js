const net = require('net');

let server = net.createServer(function (socket) {
    socket.pause();
    // 当客户端多长时间不访问，也可以出发一个函数；
    // 一般当时间到达后可以关闭客户端；
    socket.setTimeout(5000);//10s
    socket.on('data', function (chunk) {
        socket.pause();
        console.log(chunk)
    });
    socket.on('timeout',function(){
        socket.resume();
        // socket.end();
    });
    setTimeout(function() {
        socket.resume();
    },2000);
});
let port = 8080;
server.listen(port);
