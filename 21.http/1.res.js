const http = require('http');

let server = http.createServer(function (req, res) {
    // white不能在end之后调用；
    // res.write()
    // res.end()
    // 默认情况下返回给客户端内容 200
    // res.statusCode = 200;
    // // 设置返回文件类型；
    // // 必须在write方法前设置header
    // res.setHeader('Content-Type','text/plain');
    // res.setHeader('name','zfpx');//不会真正把header发送；write或者end之后再发出；
    // res.sendDate = false;//发送日期
    // res.headersSent //确认头是否被发出

    // 此方法调用会直接写入，不能和header同时使用
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })

    // Content-Lenght
    // 取响应头
    res.getHeader('name');
    res.removeHeader('name');

    res.end('ok');


}).listen(8080);
