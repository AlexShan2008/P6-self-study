let http = require('http');
// http基于tcp
// let server = http.createServer(function(req,res){

// });

let server = http.createServer();
// 监听的方法和上面的方法等效；
server.on('connection', function (req, res) {
    console.log('connection')
});
server.on('close', function (req, res) {

});
server.on('error', function (req, res) {

});
// curl  发http请求
//  模拟客户端创建连接  curl http://www.baidu.com -v  -v显示内容
// curl -v -d 'a=1' http://localhost:8080/abc?a=1#123
server.on('request', function (req, res) {
    // req 请求 可读流
    // res 响应 可写流
    let method = req.method;//POST
    let httpVersion = req.httpVersion;//1.1
    let url = req.url;///abc?a=1
    let header = req.headers;//名字都小写的；
    // console.log(method, httpVersion, url, header)

    let buffers = [];

    // 如果没有请求体是不会触发data事件；
    req.on('data', function (data) {
        buffers.push(data);
    });
    req.on('end', function () {
        let result = Buffer.concat(buffers);
        // socket.write socket.end
        res.write("hello ");
        res.end("wrold");
    })
});

server.listen(8080);