const net = require('net');
const fs = require('fs');
const path = require('path');
const ws = fs.createWriteStream(path.join(__dirname, './1.txt'));
// pipe readable data不能同时使用
let server = net.createServer(function (socket) {
    // 监听客户端输入时 将可客户端输入的内容写到文件中；
    socket.pipe(ws,{end:false});

    setTimeout(() => {
        socket.unpipe(ws);
    }, 5000);
});
const port = 8080;
server.listen(port);
