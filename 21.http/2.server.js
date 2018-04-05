const http = require('http');
let queryString = require('querystring');//解析JSON字符串；

let server = http.createServer(function (req, res) {
    console.log('ok')
    let contentType = req.headers['Content-Type']
    let buffers = [];
    req.on('data', function (chunk) {
        buffers.push(chunk);
    });
    // 建立连接以后；
    req.on('end',function(){

       let content = Buffer.concat(buffers).toString();
        if (contentType === 'application/json'){
            content = JSON.parser(content)
        } else if (contentType === 'application/x-www-form-urlencoded'){

            // queryString.parse('n*1&b*2','&','*')
            content = queryString.parse(content).name


        }
        console.log(content);
        // 发送数据；
        res.end('hello');
    })
});
server.listen(8080);