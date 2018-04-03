// 默认情况下用户应该是匿名状态
// 通过关键命令改名
// 支持显示在线列表；l:
// 广播功能 b:xxx
// 私聊功能 s:lisi：我爱你
const net = require('net');
let clients = {};
const port = 8080;
// 改名
function rename(nickname, newname, socket) {
    clients[nickname].nickname = newname;
    socket.write(`您当前的用户名是${newname}\r\n`)
}
// 展示用户列表；
function list(socket) {
    let users = `当前用户列表是:\r\n`;
    let ls = Object.keys(clients).map(key => {
        return clients[key].nickname;
    }).join('\r\n');
    socket.write(users + ls + `\r\n`);
}
function private(nickname, content, key) {
    let user;
    Object.keys(clients).forEach(key => {
        if (nickname === clients[key].nickname) {
            user = clients[key].socket;
        }
    });
    user.write(clients[key].nickname + ":" + content + `\r\n`);
}
function broadcast(nickname, content) {
    Object.keys(clients).forEach(item => {
        if (clients[item].nickname != nickname) {
            clients[item].socket.write(content + '\r\n')
        }
    })
}
const server = net.createServer(function (socket) {
    let key = socket.remoteAddress + socket.remotePort; //标识用户唯一性；客户端地址和端口号
    clients[key] = {
        nickname: '匿名',
        socket
    };
    server.maxConnections = 10;
    server.getConnections((err, counts) => {
        socket.write(`欢迎来到聊天室，当前用户数${counts}个，请输入用户名\r\n`)
    });
    socket.setEncoding('utf8');
    socket.on('data', function (chunk) {
        chunk = chunk.replace(/\r\n/, '');//去掉换行回车
        let chars = chunk.split(':');

        switch (chars[0]) {
            case 'r': // r: zhangshan
                rename(key, chars[1], socket);//zhangshan
                break;
            case 'l':
                list(socket);
                break;
            case 'b':
                broadcast(key, chars[1]);
                break;
            case 's':
                private(chars[1], chars[2], key);
                break;
            default:
                socket.write(`当前命令有误，重新输入！\r\n`)

        }
    })



});
server.listen(port, () => {
    console.log(`Server start ${port}`);
});

