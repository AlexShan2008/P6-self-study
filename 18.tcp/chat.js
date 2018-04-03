const net = require('net');
const path = require('path');
let clients = {};
// websocket就是基于socket
function broadcast(nickname, chunk){
    Object.keys(clients).forEach(key=>{
        if(key !== nickname){
            // 不是自己；
            clients[key].write(`${nickname}:${chunk}\r\n`);
        }
    })
}
// 欢迎语；提示；输入用户名后就可以通信了；\r\n 换行回车；
// 自己说的话不应该通知自己，应该通知别人；
let server = net.createServer(function (socket) {
    // 每个人都会创建自己的socket套接字；
    server.maxConnections = 3;//3人同时
    server.getConnections((err, counts) => {

        socket.write(`欢迎来到聊天室，当前用户数${counts}个，请输入用户名\r\n`)
        let nickname;
        socket.setEncoding('utf8');
        socket.on('end',function(){
            clents[nickname] && clents[nickname].destroy();//销毁socket
            delete clents[nickname];//删除用户;

        })
        socket.on('data', function (chunk) {
            chunk = chunk.replace(/\r\n/);//去掉换行回车
            if (nickname) {
                // 发音
                // 通知其他人;broadcast
                broadcast(nickname,chunk);
            } else {
                // 配用户名；
                nickname = chunk;
                clients[chunk] = socket;
                socket.write(`您的新用户名是${nickname}\r\n`)
            }
        })


    });

});
let port = 8080;
server.listen(port);