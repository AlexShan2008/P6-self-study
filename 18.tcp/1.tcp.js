// TCP  net 模块
// 和http用法一致

const net = require('net');

// 创建一个tcp服务，里面放的是回调函数；监听函数，当连接到了时才会执行；
// socket 套接字 是一个duplex 可以支持读操作和写操作
let server = net.createServer({}, function (socket) {
    // 请求到来时会触发此函数；
    console.log('Welcome!')
    // telnet  1.命令行Mac下也是 telnet localhost 8080 打开telnet功能
    // window下用putty 模拟客户端访问
    // socket writer  read
    server.maxConnections = 2;//最大连接数2；默认是10
    server.getConnections(function (err, counts) {
        // 监控连接数；聊天室
        // socket每次连接都会产生一个新的socket
        socket.write(`当前最大容纳${server.maxConnections}人,现在有${counts}人`)
    });
    // 监听数据；data buffer -> 
    socket.setEncoding('utf8');
    socket.on('data', function (data) {
        console.log(data);
        // socket.end();//触发客户端的关闭；
        server.close();//close事件表示服务端不再接受新请求；当前的还能继续使用；当客户端全部关闭后，会执行close事件；
        // 所有客户端都关闭了，服务端就关闭，如果有人进来忍让可以继续；
        server.unref();

    });
    // 可以接受；
    server.on('end', function (err) {

    });
});
// backlog默认是511
let port = 8080;
// 如果端口号被占用；
server.listen(port, 'localhost', function () {
    console.log(`Server start ${port}`);

});
// 可以通过监听错误；
server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
        // 端口占用；
        server.listen(++port);
    }
});

// 可以通过服务关闭，close只有调用close方法才会触发；
server.on('close', function () {

});