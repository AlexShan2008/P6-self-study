const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

function getHostName(str) {
    let { hostname } = url.parse(str, true);
    return hostname;
}

let server = http.createServer(function (req, res) {
    let referer = req.headers['referer'] || req.headers['referrer'];//访问来源；Host Referer 
    // 先看一下图片的refer的值 还要看图片的请求路径；
    // 读取文件，返回给客户端；
    let { pathname } = url.parse(req.url, true);
    // c:xxx/public /index.html
    // file 请求的文件
    let file = path.join(__dirname, 'public', '.' + pathname);
    // 先判断文件是否存在
    fs.stat(file, function (err) {
        if (!err) {
            //存在
            if (referer) {
                let referHostName = getHostName(referer);
                let host = req.headers['host'].split(':')[0];

                if (referHostName !== host) {
                    // 防盗链
                    fs.createReadStream(path.join(__dirname, 'public', './bg10.jpg'));
                } else {
                    // 正常显示
                    // 设置header
                    fs.createReadStream(file).pipe(res);
                }
            } else {
                // 正常显示
                fs.createReadStream(file).pipe(res);
            }
        } else {
            res.end();
        }
    });




});
server.listen(8080);