// 对比缓存；根据文件内容；
// ETag: 读取文件，md5摘要算法，进行对比；
// if-no-match
// 此方法消耗性能，大文件非常明显

let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let crypto = require('crypto');

let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url);
    let p = path.join(__dirname, 'public', '.' + pathname);
    fs.stat(p, function (err, stat) {
        // 一般会用文件的修改时间+文件大小进行处理；
        // 性能会更好；
        // stat.ctime+stat.size
        let md5 = crypto.createHash('md5');
        let rs = fs.createReadStream(p);
        rs.on('data', function (p) {
            md5.update(p);
        });
        rs.on('end', function () {
            let r = md5.digest('hex');//此方法消耗性能，大文件由此；
            // 下次再拿最新的ETag和客户端的ETag进行对比；
            let ifNoneMatch = req.headers['if-none-match'];
            if (ifNoneMatch) {
                if (r === ifNoneMatch) {
                    res.statusCode = 304;
                    res.end();
                } else {
                    sendFile(req, res, p, r);
                }
            } else {
                sendFile(req, res, p, r);
            }

        })

    })
});
function sendError(res) {
    res.statusCode = 404;
    res.end();
}
function sendFile(req, res, p, r) {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('ETage', r);
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res);
}
server.listen(8080);
