let net = require('net');
let { StringDecoder } = require('string_decoder');//防止buffer乱码
let { Readable } = require('stream');
class IncomingMessage extends Readable {
    _read(){}
}

// 解析请求体
function parser(socket, callback) {
    let buffers = [];
    let sd = new StringDecoder();
    let im = new IncomingMessage();//可读流
    function fn() {
        let res = {write:socket.write.bind(socket),end:socket.write.bind(socket)}
        let content = socket.read();
        buffers.push(content);
        let str = sd.write(Buffer.concat(buffers));
        console.log(str);
        if (str.match(/\r\n\r/)) {
            let result = str.split('\r\n\r\n');
            let head = parserHeader(result[0]);
            Object.assign(im, head);
            // 先默认socket是req对象；内部又封装了一个可读流；
            socket.removeListener('readable', fn);//移除监听
            socket.unshift(Buffer.from(result[1]));//将内容塞回流中
            if (result[1]) {
                // 请求体有内容
                socket.on('data', (data) => {
                    im.push(data);
                    im.push(null);//才能触发end事件
                    callback(im);
                })
            } else {
                im.push(null);
                callback(im);
            }

        }
    }
    socket.on('readable', fn);

}
function parserHeader(head) {
    let lines = head.split(/\r\n/);//解析成多行
    let headLine = lines.shift();
    let method = headLine.split(' ')[0];
    let url = headLine.split(' ')[1];
    let httpVersion = headLine.split(' ')[2].split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1];
    });
    return { url, method, httpVersion, headers }

}

let server = net.createServer(function (socket) {
    parser(socket, function (req, res) {
        server.emit('request', req, res);
    })

});
server.on('request', function (req, res) {
    console.log(req.url);
    console.log(req.headers);
    console.log(req.httpVersion);
    console.log(req.method);
    req.on('data', (data) => {
        console.log(data.toString())
    });
    req.on('end',data=>{
        console.log(data)
    })
});

server.on('connection', function () {
    console.log('jian li lianjie')
});

server.listen(3000);